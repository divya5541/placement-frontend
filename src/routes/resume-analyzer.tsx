import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge as Tag } from "../components/ui/badge";

export const Route = createFileRoute("/resume-analyzer")({
  component: ResumeAnalyzerPage,
});

/* =========================================================
   TYPES
========================================================= */

interface AIAnalysis {
  overallScore?: number;

  scores?: {
    ats?: number;
    jobMatch?: number;
    skills?: number;
    content?: number;
    formatting?: number;
    projects?: number;
  };

  formattingAnalysis?: {
    score?: number;
    issues?: string[];
  };

  skillsDetected?: string[];
  keywordsDetected?: string[];
  missingSections?: string[];

  jobRoleMatch?: {
    score?: number;
    explanation?: string;
  };

  improvementSuggestions?: string[];
  overallSummary?: string;
}

interface CandidateData {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

interface SkillsData {
  matched?: string[];
  missing?: string[];
  recommended?: string[];
  technical?: string[];
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  tools?: string[];
}

interface KeywordsData {
  matched?: string[];
  missing?: string[];
  recommended?: string[];
}

interface SectionAnalysis {
  score?: number;
  feedback?: string;
  issues?: string[];
  suggestions?: string[];
  improvedVersion?: string;
}

interface ExperienceItem {
  company?: string;
  role?: string;
  duration?: string;
  score?: number;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
  improvedBullets?: string[];
}

interface ProjectItem {
  name?: string;
  score?: number;
  technologies?: string[];
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
  improvedDescription?: string;
}

interface AnalysisResult {
  overallScore?: number;
  careerLevel?: string;

  scores?: ScoreData;
  candidate?: CandidateData;
  skills?: SkillsData;
  keywords?: KeywordsData;

  sections?: {
    summary?: SectionAnalysis;
    experience?: ExperienceItem[];
    projects?: ProjectItem[];
    education?: SectionAnalysis;
    certifications?: SectionAnalysis;
  };

  strengths?: string[];
  weaknesses?: string[];
  redFlags?: string[];
  improvements?: string[];
  optimizationPlan?: string[];

  aiRewrites?: {
    summary?: string;
    [key: string]: unknown;
  };

  interviewQuestions?: string[];

  resume?: {
    filename?: string;
    textLength?: number;
  };

  extractedText?: string;

  [key: string]: unknown;
}

/* =========================================================
   SCORE CIRCLE
========================================================= */

const ScoreCircle = ({
  score,
  label,
  size = "large",
}: {
  score: number;
  label: string;
  size?: "large" | "small";
}) => {
  const large = size === "large";
  const radius = large ? 68 : 45;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  function getScoreLabel(score: number): ReactNode {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 45) return "Fair";
    if (score >= 25) return "Needs improvement";
    return "Low";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative ${
          large ? "h-44 w-44" : "h-28 w-28"
        }`}
      >
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={large ? 12 : 9}
            className="text-muted"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={large ? 12 : 9}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="text-primary transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-black ${
              large ? "text-4xl" : "text-2xl"
            }`}
          >
            {score}
          </span>

          <span className="text-xs text-muted-foreground">
            / 100
          </span>
        </div>
      </div>

      <div
        className={`mt-3 font-bold ${
          large ? "text-lg" : "text-sm"
        }`}
      >
        {label}
      </div>

      <div className="mt-1 text-xs font-medium text-muted-foreground">
        {getScoreLabel(score)}
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

function ResumeAnalyzerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isDragging, setIsDragging] = useState(false);

  /* =========================================================
     FILE HANDLING
  ========================================================= */

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validExtension =
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".docx");

    if (!allowedTypes.includes(file.type) && !validExtension) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume size should be less than 5 MB.");
      return;
    }

    setError("");
    setResumeFile(file);
    setAnalysisResult(null);
    setActiveTab("overview");
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    validateAndSetFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    validateAndSetFile(file);
  };

  const removeFile = () => {
    setResumeFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     ANALYZE RESUME
  ========================================================= */

const handleAnalyze = async () => {
  if (!resumeFile) {
    setError("Please upload your resume first.");
    return;
  }

  if (!jobRole.trim()) {
    setError("Please enter the job role.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobRole", jobRole.trim());
    formData.append("jobDescription", jobDescription.trim());

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      throw new Error(
        "VITE_API_URL is missing. Please check your frontend .env file."
      );
    }

    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/resume/analyze`,
      {
        method: "POST",
        body: formData,
      }
    );

    /*
     * Read the response safely.
     * This helps us see the REAL backend error instead of
     * only showing "Failed to analyze resume."
     */
    const responseText = await response.text();

    let data: any = null;

    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch {
      console.error(
        "Backend returned a non-JSON response:",
        responseText
      );
    }

    if (!response.ok) {
      console.error("Resume API error:", {
        status: response.status,
        statusText: response.statusText,
        response: responseText,
      });

      const backendMessage =
        data?.error ||
        data?.message ||
        responseText ||
        response.statusText ||
        "Unknown backend error";

      throw new Error(
        `Resume analysis failed (${response.status}): ${backendMessage}`
      );
    }

    if (!data) {
      throw new Error(
        "The backend returned an empty response."
      );
    }

    console.log(
      "FULL RESUME API RESPONSE:",
      data
    );

    console.log(
      "FULL AI ANALYSIS:",
      JSON.stringify(data.analysis, null, 2)
    );

    if (!data.analysis) {
      throw new Error(
        "The AI backend did not return an analysis."
      );
    }

    const ai = data.analysis;

    setAnalysisResult({
  overallScore: ai.overallScore ?? 0,

  scores: {
    ats: ai.scores?.ats ?? 0,
    jobMatch: ai.scores?.jobMatch ?? 0,
    skills: ai.scores?.skills ?? 0,
    content: ai.scores?.content ?? 0,
    formatting: ai.scores?.formatting ?? 0,
    projects: ai.scores?.projects ?? 0,
  },

      skills: {
        matched: ai.skillsDetected ?? [],
        missing: ai.missingSkills ?? [],
        recommended: ai.recommendedSkills ?? [],
        technical: ai.skillsDetected ?? [],
        frontend: ai.frontendSkills ?? [],
        backend: ai.backendSkills ?? [],
        databases: ai.databaseSkills ?? [],
        tools: ai.toolsSkills ?? [],
      },

      keywords: {
        matched: ai.keywordsDetected ?? [],
        missing: ai.missingKeywords ?? [],
        recommended: ai.recommendedKeywords ?? [],
      },

      sections: {
        summary: {
          score: ai.formattingAnalysis?.score ?? 0,
          feedback: ai.overallSummary ?? "",
          issues: ai.formattingAnalysis?.issues ?? [],
          suggestions: ai.improvementSuggestions ?? [],
        },
      },

      strengths: [
        ...(ai.strengths ?? []),
        ...(ai.skillsDetected ?? []).slice(0, 3),
      ],

      weaknesses: [
        ...(ai.weaknesses ?? []),
        ai.jobRoleMatch?.explanation ?? "",
        ...(ai.formattingAnalysis?.issues ?? []),
      ].filter(Boolean),

      improvements: ai.improvementSuggestions ?? [],

      optimizationPlan:
        ai.optimizationPlan ??
        ai.improvementSuggestions ??
        [],

      redFlags:
        ai.redFlags ??
        ai.formattingAnalysis?.issues ??
        [],

      resume: data.resume,

      extractedText: data.extractedText,

      /*
       * Keep the original AI fields too.
       * This prevents useful backend data from being lost.
       */
      atsScore: ai.atsScore,
      formattingAnalysis: ai.formattingAnalysis,
      skillsDetected: ai.skillsDetected,
      keywordsDetected: ai.keywordsDetected,
      missingSections: ai.missingSections,
      jobRoleMatch: ai.jobRoleMatch,
      improvementSuggestions: ai.improvementSuggestions,
      overallSummary: ai.overallSummary,
    });

    setActiveTab("overview");
  } catch (error) {
    console.error("Resume analyzer error:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong while analyzing the resume."
    );
  } finally {
    setLoading(false);
  }
};



  /* =========================================================
     HELPERS
  ========================================================= */

  const getScore = (
    value: number | undefined,
    fallback = 0
  ) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return fallback;
    }

    return Math.max(0, Math.min(100, Math.round(value)));
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Needs Improvement";
    return "Needs Attention";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90)
      return "Your resume is highly competitive for the selected role.";

    if (score >= 80)
      return "Your resume is strong, with a few areas that can be optimized.";

    if (score >= 70)
      return "Your resume is good, but targeted improvements can make it stronger.";

    if (score >= 60)
      return "Your resume needs several improvements before applying.";

    return "Your resume needs significant optimization.";
  };

  const safeArray = <T,>(value: T[] | undefined): T[] => {
    return Array.isArray(value) ? value : [];
  };

  const overallScore = getScore(
    analysisResult?.overallScore,
    analysisResult
      ? Math.round(
          (
            getScore(analysisResult.scores?.ats) +
            getScore(analysisResult.scores?.jobMatch) +
            getScore(analysisResult.scores?.content) +
            getScore(analysisResult.scores?.skills) +
            getScore(analysisResult.scores?.formatting)
          ) / 5
        )
      : 0
  );

  const scores = {
    ats: getScore(analysisResult?.scores?.ats),
    jobMatch: getScore(analysisResult?.scores?.jobMatch),
    content: getScore(analysisResult?.scores?.content),
    skills: getScore(analysisResult?.scores?.skills),
    formatting: getScore(analysisResult?.scores?.formatting),
    projects: getScore(analysisResult?.scores?.projects),
  };

  /* =========================================================
     COPY
  ========================================================= */

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      console.error("Could not copy text.");
    }
  };

  /* =========================================================
     UI COMPONENTS
  ========================================================= */

  const ScoreCircle = ({
    score,
    label,
    size = "large",
  }: {
    score: number;
    label: string;
    size?: "large" | "small";
  }) => {
    const large = size === "large";
    const radius = large ? 68 : 45;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative ${
            large ? "h-44 w-44" : "h-28 w-28"
          }`}
        >
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={large ? 12 : 9}
              className="text-muted"
            />

            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={large ? 12 : 9}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              className="text-primary transition-all duration-1000"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-black ${
                large ? "text-4xl" : "text-2xl"
              }`}
            >
              {score}
            </span>

            <span className="text-xs text-muted-foreground">
              / 100
            </span>
          </div>
        </div>

        <div
          className={`mt-3 font-bold ${
            large ? "text-lg" : "text-sm"
          }`}
        >
          {label}
        </div>

        <div className="mt-1 text-xs font-medium text-muted-foreground">
          {getScoreLabel(score)}
        </div>
      </div>
    );
  };

  const ScoreCard = ({
    title,
    score,
    description,
    icon,
  }: {
    title: string;
    score: number;
    description: string;
    icon: string;
  }) => {
    return (
      <Card className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                {icon}
              </div>

              <div>
                <p className="font-bold">{title}</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>

            <div className="text-2xl font-black">
              {score}
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{
                width: `${score}%`,
              }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Performance
            </span>

            <span className="font-semibold">
              {getScoreLabel(score)}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const Tag = ({
    children,
    type = "default",
  }: {
    children: ReactNode;
    type?: "default" | "success" | "warning" | "danger";
  }) => {
    const classes = {
      default: "bg-muted text-foreground",
      success:
        "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
      warning:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
      danger:
        "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes[type]}`}
      >
        {children}
      </span>
    );
  };

  const SectionTitle = ({
    icon,
    title,
    description,
  }: {
    icon: string;
    title: string;
    description?: string;
  }) => (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  /* =========================================================
     TABS
  ========================================================= */

  const tabs = [
    ["overview", "Overview", "📊"],
    ["ats", "ATS & Match", "🤖"],
    ["skills", "Skills", "🧠"],
    ["sections", "Resume Review", "📑"],
    ["recommendations", "AI Plan", "✨"],
    ["interview", "Interview", "🎤"],
  ];

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
                <span>✨</span>
                AI-Powered Career Intelligence
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Turn your resume into your{" "}
                <span className="text-primary">
                  competitive advantage.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Get an AI-powered resume analysis that checks ATS
                compatibility, job matching, skills, keywords,
                content quality and improvement opportunities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <HeroFeature icon="✓" text="ATS Analysis" />
                <HeroFeature icon="🎯" text="Job Matching" />
                <HeroFeature icon="🧠" text="Skill Gap Detection" />
                <HeroFeature icon="✨" text="AI Recommendations" />
                <HeroFeature icon="🎤" text="Interview Prep" />
              </div>
            </div>

            {/* Hero Preview */}

            <div className="relative">
              <Card className="overflow-hidden border-primary/10 shadow-2xl">
                <div className="border-b bg-muted/40 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        AI RESUME REPORT
                      </p>

                      <p className="mt-1 font-bold">
                        Candidate Analysis
                      </p>
                    </div>

                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                      Analysis Ready
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-[130px_1fr] items-center gap-5">
                    <div className="flex justify-center">
                      <ScoreCircle
                        score={86}
                        label="Resume Score"
                        size="small"
                      />
                    </div>

                    <div className="space-y-4">
                      <MiniScore
                        label="ATS Compatibility"
                        score={91}
                      />

                      <MiniScore
                        label="Job Match"
                        score={84}
                      />

                      <MiniScore
                        label="Skills"
                        score={88}
                      />

                      <MiniScore
                        label="Content Quality"
                        score={82}
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl bg-primary/5 p-4">
                    <div className="flex items-center gap-2">
                      <span>✨</span>

                      <span className="text-sm font-bold">
                        AI Insight
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Your resume has strong technical skills.
                      Focus on measurable achievements and
                      role-specific keywords to improve your
                      chances further.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INPUT SECTION
      ===================================================== */}

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              📄
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Analyze Your Resume
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Upload your resume and tell us what role you're
              targeting. Our AI will do the rest.
            </p>
          </div>

          <Card className="overflow-hidden border-border/60 shadow-xl">
            <CardHeader className="border-b bg-muted/20 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  1
                </div>

                <div>
                  <CardTitle>Upload your resume</CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    PDF or DOCX • Maximum 5 MB
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 p-6 sm:p-8">
              {/* Upload */}

              <div className="space-y-3">
                <label className="text-sm font-bold">
                  Resume File
                </label>

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-12 ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                    📄
                  </div>

                  <p className="mt-5 font-bold">
                    {isDragging
                      ? "Drop your resume here"
                      : resumeFile
                        ? resumeFile.name
                        : "Click to upload or drag & drop"}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Supported formats: PDF and DOCX
                  </p>

                  {!resumeFile && (
                    <div className="mt-5 inline-flex rounded-lg border bg-background px-4 py-2 text-xs font-semibold">
                      Choose Resume
                    </div>
                  )}
                </div>

                {resumeFile && (
                  <div className="flex flex-col justify-between gap-3 rounded-xl border bg-muted/40 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                        ✓
                      </div>

                      <div>
                        <p className="max-w-[250px] truncate text-sm font-semibold sm:max-w-md">
                          {resumeFile.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {(resumeFile.size / 1024 / 1024).toFixed(
                            2
                          )}{" "}
                          MB • Ready for analysis
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile();
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Job role */}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    2
                  </div>

                  <div>
                    <label
                      htmlFor="jobRole"
                      className="text-sm font-bold"
                    >
                      Target Job Role
                    </label>

                    <p className="text-xs text-muted-foreground">
                      What position are you applying for?
                    </p>
                  </div>
                </div>

                <Input
                  id="jobRole"
                  placeholder="e.g. MERN Stack Developer"
                  value={jobRole}
                  onChange={(event) =>
                    setJobRole(event.target.value)
                  }
                  className="h-12"
                />
              </div>

              {/* Job Description */}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    3
                  </div>

                  <div>
                    <label
                      htmlFor="jobDescription"
                      className="text-sm font-bold"
                    >
                      Job Description
                    </label>

                    <p className="text-xs text-muted-foreground">
                      Optional, but recommended for accurate
                      job matching.
                    </p>
                  </div>
                </div>

                <Textarea
                  id="jobDescription"
                  placeholder="Paste the complete job description here..."
                  rows={8}
                  value={jobDescription}
                  onChange={(event) =>
                    setJobDescription(event.target.value)
                  }
                  className="resize-y"
                />
              </div>

              {/* Error */}

              {error && (
                <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                  <span>⚠️</span>

                  <span>{error}</span>
                </div>
              )}

              {/* Analyze */}

              <Button
                type="button"
                className="h-13 w-full text-base font-bold shadow-lg transition-all hover:shadow-xl"
                size="lg"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading
                  ? "✨ AI is analyzing your resume..."
                  : "✨ Analyze My Resume"}
              </Button>

              {/* Loading */}

              {loading && (
                <AnalysisLoading />
              )}

              <p className="text-center text-xs text-muted-foreground">
                🔒 Your resume is analyzed securely and is not
                used to make hiring decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* =====================================================
          ANALYSIS DASHBOARD
      ===================================================== */}

      {analysisResult && (
        <section className="border-t bg-muted/20 px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Dashboard Header */}

            <Card className="overflow-hidden border-primary/10 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-xl bg-primary p-3 text-xl text-primary-foreground">
                          ✨
                        </div>

                        <div>
                          <h2 className="text-2xl font-black">
                            Your Resume Intelligence Report
                          </h2>

                          <p className="mt-1 text-sm text-muted-foreground">
                            AI-powered analysis completed
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Tag>
                          📄{" "}
                          {analysisResult.resume?.filename ||
                            resumeFile?.name ||
                            "Uploaded Resume"}
                        </Tag>

                        <Tag>
                          🎯 Target: {jobRole}
                        </Tag>

                        {analysisResult.careerLevel && (
                          <Tag>
                            👤 Level:{" "}
                            {analysisResult.careerLevel}
                          </Tag>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-background/80 p-5 text-center shadow-sm backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Overall Score
                      </p>

                      <div className="mt-1 flex items-baseline justify-center">
                        <span className="text-5xl font-black text-primary">
                          {overallScore}
                        </span>

                        <span className="ml-1 text-lg text-muted-foreground">
                          /100
                        </span>
                      </div>

                      <p className="mt-1 text-sm font-bold">
                        {getScoreLabel(overallScore)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}

                <div className="overflow-x-auto border-t">
                  <div className="flex min-w-max">
                    {tabs.map(([value, label, icon]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setActiveTab(value)}
                        className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition ${
                          activeTab === value
                            ? "text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span>{icon}</span>
                        {label}

                        {activeTab === value && (
                          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* =================================================
                OVERVIEW
            ================================================= */}

            {activeTab === "overview" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="📊"
                  title="Resume Performance"
                  description="See how your resume performs across the most important hiring factors."
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <ScoreCard
                    title="ATS Compatibility"
                    score={scores.ats}
                    icon="🤖"
                    description="How easily ATS systems can read and process your resume."
                  />

                  <ScoreCard
                    title="Job Match"
                    score={scores.jobMatch}
                    icon="🎯"
                    description="How closely your resume aligns with the target role."
                  />

                  <ScoreCard
                    title="Content Quality"
                    score={scores.content}
                    icon="✍️"
                    description="Strength and effectiveness of your resume content."
                  />

                  <ScoreCard
                    title="Skills"
                    score={scores.skills}
                    icon="🧠"
                    description="Relevance and strength of your listed skills."
                  />

                  <ScoreCard
                    title="Formatting"
                    score={scores.formatting}
                    icon="📐"
                    description="Professional structure and formatting quality."
                  />

                  <ScoreCard
                    title="Projects"
                    score={scores.projects}
                    icon="🚀"
                    description="Quality and relevance of your projects."
                  />
                </div>

                {/* Overall */}

                <Card className="overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">
                      <div className="flex justify-center">
                        <ScoreCircle
                          score={overallScore}
                          label="Overall Score"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Tag type="success">
                            AI Analysis Complete
                          </Tag>

                          <Tag>
                            {getScoreLabel(overallScore)}
                          </Tag>
                        </div>

                        <h3 className="mt-4 text-2xl font-black">
                          {getScoreMessage(overallScore)}
                        </h3>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                          Your resume has been evaluated across
                          ATS compatibility, job relevance,
                          skills, content quality, formatting
                          and project strength.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <Tag>
                            {scores.ats}% ATS
                          </Tag>

                          <Tag>
                            {scores.jobMatch}% Job Match
                          </Tag>

                          <Tag>
                            {scores.skills}% Skills
                          </Tag>

                          <Tag>
                            {scores.content}% Content
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths */}

                <div className="grid gap-6 lg:grid-cols-2">
                  <InsightCard
                    title="Top Strengths"
                    icon="💪"
                    type="success"
                    items={analysisResult.strengths}
                    emptyText="No strengths were returned by the AI."
                  />

                  <InsightCard
                    title="Biggest Weaknesses"
                    icon="⚠️"
                    type="danger"
                    items={analysisResult.weaknesses}
                    emptyText="No major weaknesses were returned."
                  />
                </div>

                {/* Red Flags */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      🚨 Resume Risk & Red Flags
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {safeArray(
                      analysisResult.redFlags
                    ).length > 0 ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        {safeArray(
                          analysisResult.redFlags
                        ).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 dark:border-red-900 dark:bg-red-950/20"
                          >
                            <span className="mr-2">
                              🚨
                            </span>

                            {item}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl bg-green-50 p-5 text-sm text-green-800 dark:bg-green-950/20 dark:text-green-300">
                        <span className="text-xl">✓</span>

                        <span>
                          No major resume red flags were
                          detected.
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* =================================================
                ATS
            ================================================= */}

            {activeTab === "ats" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="🤖"
                  title="ATS & Job Match Intelligence"
                  description="Understand how ATS systems and recruiters may evaluate your resume."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                  <ScoreInsightCard
                    score={scores.ats}
                    title="ATS Compatibility"
                    icon="🤖"
                    description="A higher ATS score means your resume is easier for automated screening systems to parse."
                  />

                  <ScoreInsightCard
                    score={scores.jobMatch}
                    title="Job Match"
                    icon="🎯"
                    description={`Your resume's alignment with ${jobRole}.`}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      🎯 Job Description Keyword Analysis
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <KeywordGroup
                      title="Matched Keywords"
                      icon="🟢"
                      items={analysisResult.keywords?.matched}
                      type="success"
                    />

                    <KeywordGroup
                      title="Missing Keywords"
                      icon="🔴"
                      items={analysisResult.keywords?.missing}
                      type="danger"
                    />

                    <KeywordGroup
                      title="Recommended Keywords"
                      icon="🟡"
                      items={
                        analysisResult.keywords?.recommended
                      }
                      type="warning"
                    />
                  </CardContent>
                </Card>

                {/* Candidate */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      👤 Candidate Information
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <InfoItem
                        label="Name"
                        value={
                          analysisResult.candidate?.name
                        }
                      />

                      <InfoItem
                        label="Email"
                        value={
                          analysisResult.candidate?.email
                        }
                      />

                      <InfoItem
                        label="Phone"
                        value={
                          analysisResult.candidate?.phone
                        }
                      />

                      <InfoItem
                        label="LinkedIn"
                        value={
                          analysisResult.candidate?.linkedin
                        }
                      />

                      <InfoItem
                        label="GitHub"
                        value={
                          analysisResult.candidate?.github
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* =================================================
                SKILLS
            ================================================= */}

            {activeTab === "skills" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="🧠"
                  title="Skills Intelligence"
                  description="Identify what you already have, what you're missing and what you should learn next."
                />

                <div className="grid gap-6 lg:grid-cols-3">
                  <SkillCard
                    title="Matched Skills"
                    icon="✓"
                    type="success"
                    skills={analysisResult.skills?.matched}
                  />

                  <SkillCard
                    title="Missing Skills"
                    icon="!"
                    type="danger"
                    skills={analysisResult.skills?.missing}
                  />

                  <SkillCard
                    title="Recommended Skills"
                    icon="+"
                    type="warning"
                    skills={analysisResult.skills?.recommended}
                  />
                </div>

                {/* Skill gap summary */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      📈 Skill Gap Overview
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <StatBox
                        label="Matched"
                        value={
                          safeArray(
                            analysisResult.skills?.matched
                          ).length
                        }
                        description="Skills already aligned"
                      />

                      <StatBox
                        label="Missing"
                        value={
                          safeArray(
                            analysisResult.skills?.missing
                          ).length
                        }
                        description="Skills to consider adding"
                      />

                      <StatBox
                        label="Recommended"
                        value={
                          safeArray(
                            analysisResult.skills?.recommended
                          ).length
                        }
                        description="Skills that can strengthen your profile"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      🛠️ Technical Skill Profile
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <SkillGroup
                      title="Frontend"
                      skills={
                        analysisResult.skills?.frontend || []
                      }
                    />

                    <SkillGroup
                      title="Backend"
                      skills={
                        analysisResult.skills?.backend || []
                      }
                    />

                    <SkillGroup
                      title="Databases"
                      skills={
                        analysisResult.skills?.databases || []
                      }
                    />

                    <SkillGroup
                      title="Tools & Technologies"
                      skills={
                        analysisResult.skills?.tools || []
                      }
                    />

                    <SkillGroup
                      title="Technical Skills"
                      skills={
                        analysisResult.skills?.technical || []
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* =================================================
                SECTIONS
            ================================================= */}

            {activeTab === "sections" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="📑"
                  title="Section-by-Section Review"
                  description="Get detailed AI feedback on the most important parts of your resume."
                />

                <SectionReviewCard
                  title="Professional Summary"
                  icon="🎯"
                  section={
                    analysisResult.sections?.summary
                  }
                />

                <SectionReviewCard
                  title="Education"
                  icon="🎓"
                  section={
                    analysisResult.sections?.education
                  }
                />

                <SectionReviewCard
                  title="Certifications"
                  icon="🏆"
                  section={
                    analysisResult.sections?.certifications
                  }
                />

                {safeArray(
                  analysisResult.sections?.experience
                ).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        💼 Experience Analysis
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      {safeArray(
                        analysisResult.sections?.experience
                      ).map((experience, index) => (
                        <ExperienceCard
                          key={index}
                          experience={experience}
                        />
                      ))}
                    </CardContent>
                  </Card>
                )}

                {safeArray(
                  analysisResult.sections?.projects
                ).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        🚀 Project Analysis
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      {safeArray(
                        analysisResult.sections?.projects
                      ).map((project, index) => (
                        <ProjectCard
                          key={index}
                          project={project}
                        />
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* =================================================
                RECOMMENDATIONS
            ================================================= */}

            {activeTab === "recommendations" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="✨"
                  title="AI Improvement Plan"
                  description="Focus on the changes that can have the biggest impact on your resume."
                />

                {/* CTA */}

                <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5">
                  <CardContent className="p-7 sm:p-8">
                    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                      <div className="max-w-2xl">
                        <Tag type="warning">
                          ✨ AI Optimization Available
                        </Tag>

                        <h2 className="mt-4 text-2xl font-black">
                          Turn recommendations into a better
                          resume.
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          Use AI to improve your resume while
                          keeping your actual experience, skills
                          and achievements accurate.
                        </p>
                      </div>

                      <Button
                        size="lg"
                        className="shrink-0"
                        onClick={() => {
                          alert(
                            "Next step: connect this button to your AI Resume Builder."
                          );
                        }}
                      >
                        ✨ Build Better Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Priority */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      🎯 Priority Improvements
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {safeArray(
                      analysisResult.optimizationPlan
                    ).length > 0 ? (
                      <div className="space-y-4">
                        {safeArray(
                          analysisResult.optimizationPlan
                        ).map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 rounded-2xl border bg-background p-5 transition hover:shadow-sm"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
                              {index + 1}
                            </div>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                                Priority {index + 1}
                              </p>

                              <p className="mt-1 text-sm leading-6">
                                {item}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState text="No optimization plan was returned." />
                    )}
                  </CardContent>
                </Card>

                {/* Recommendations */}

                <Card>
                  <CardHeader>
                    <CardTitle>
                      💡 AI Recommendations
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {safeArray(
                      analysisResult.improvements
                    ).length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {safeArray(
                          analysisResult.improvements
                        ).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border bg-muted/30 p-5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                                {index + 1}
                              </div>

                              <strong className="text-sm">
                                Recommendation
                              </strong>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState text="No additional recommendations were returned." />
                    )}
                  </CardContent>
                </Card>

                {/* AI Summary */}

                {analysisResult.aiRewrites?.summary && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        ✍️ AI-Improved Professional Summary
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="rounded-2xl border bg-muted/40 p-5 text-sm leading-7">
                        {analysisResult.aiRewrites.summary}
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() =>
                            copyText(
                              analysisResult.aiRewrites
                                ?.summary || ""
                            )
                          }
                        >
                          📋 Copy Summary
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* =================================================
                INTERVIEW
            ================================================= */}

            {activeTab === "interview" && (
              <div className="space-y-8">
                <SectionTitle
                  icon="🎤"
                  title="AI Interview Preparation"
                  description="Prepare for questions based on your actual resume."
                />

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 sm:p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl text-primary-foreground">
                          🎤
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            Interview Focus
                          </h3>

                          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                            These questions are generated from
                            the skills, projects, experience and
                            technologies detected in your resume.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 p-6 sm:p-8">
                      {safeArray(
                        analysisResult.interviewQuestions
                      ).length > 0 ? (
                        safeArray(
                          analysisResult.interviewQuestions
                        ).map((question, index) => (
                          <div
                            key={index}
                            className="group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                          >
                            <div className="flex gap-4">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary">
                                {index + 1}
                              </div>

                              <div>
                                <p className="font-semibold leading-6">
                                  {question}
                                </p>

                                <p className="mt-2 text-xs text-muted-foreground">
                                  Think about your real project,
                                  experience or technical
                                  knowledge before answering.
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <EmptyState text="Interview questions will appear here after the AI backend returns them." />
                      )}

                      <div className="border-t pt-7">
                        <Button
                          size="lg"
                          onClick={() => {
                            alert(
                              "Next step: connect this button to your AI Mock Interview feature."
                            );
                          }}
                        >
                          🎤 Start AI Mock Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <Card className="overflow-hidden border-primary/20">
              <CardContent className="relative p-8 text-center sm:p-12">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

                <div className="relative mx-auto max-w-2xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                    🚀
                  </div>

                  <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                    Ready to improve your resume?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Use your AI analysis to create a stronger,
                    more targeted resume for your desired role.
                  </p>

                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Button
                      size="lg"
                      onClick={() => {
                        alert(
                          "Connect this button to your AI Resume Builder."
                        );
                      }}
                    >
                      ✨ Optimize My Resume
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        setAnalysisResult(null);
                        setResumeFile(null);
                        setJobRole("");
                        setJobDescription("");
                        setActiveTab("overview");

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      ↻ Analyze Another Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

/* =========================================================
   HERO FEATURES
========================================================= */

function HeroFeature({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur">
      <span>{icon}</span>
      {text}
    </div>
  );
}

/* =========================================================
   MINI SCORE
========================================================= */

function MiniScore({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium">{label}</span>

        <span className="font-bold">{score}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function AnalysisLoading() {
  const steps = [
    ["📄", "Extracting resume information"],
    ["🤖", "Analyzing resume structure"],
    ["🎯", "Comparing with target role"],
    ["🧠", "Identifying skill gaps"],
    ["✨", "Generating recommendations"],
  ];

  return (
    <div className="rounded-2xl border bg-muted/30 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-bold">
            AI Resume Analysis in progress
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            This may take a few moments.
          </p>
        </div>

        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>

      <div className="mt-6 space-y-3">
        {steps.map(([icon, text], index) => (
          <div
            key={text}
            className="flex items-center gap-3 rounded-xl border bg-background p-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm">
              {icon}
            </div>

            <span className="text-sm font-medium">
              {text}
            </span>

            {index < 3 ? (
              <span className="ml-auto text-xs text-primary">
                ✓
              </span>
            ) : (
              <span className="ml-auto text-xs text-muted-foreground">
                Processing
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   INSIGHT CARD
========================================================= */

function InsightCard({
  title,
  icon,
  type,
  items,
  emptyText,
}: {
  title: string;
  icon: string;
  type: "success" | "danger";
  items?: string[];
  emptyText: string;
}) {
  const styles =
    type === "success"
      ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/10"
      : "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/10";

  return (
    <Card className={styles}>
      <CardHeader>
        <CardTitle>
          {icon} {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {Array.isArray(items) && items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm leading-6"
              >
                <span className="mt-0.5 shrink-0 font-bold">
                  {type === "success" ? "✓" : "⚠"}
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            {emptyText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================
   SCORE INSIGHT
========================================================= */

function ScoreInsightCard({
  score,
  title,
  icon,
  description,
}: {
  score: number;
  title: string;
  icon: string;
  description: string;
}) {
  
  function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Needs Improvement";
  return "Needs Attention";
}

  return (
    <Card>
      <CardContent className="p-7">
        <div className="flex flex-col items-center">
          <ScoreCircle
            score={score}
            label={`${icon} ${title}`}
          />

          <p className="mt-4 max-w-md text-center text-sm leading-6 text-muted-foreground">
            {description}
          </p>

          <div className="mt-5 rounded-xl bg-primary/5 px-4 py-3 text-center text-xs font-semibold">
            {getScoreLabel(score)} • {score}/100
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* =========================================================
   KEYWORD GROUP
========================================================= */

function KeywordGroup({
  title,
  icon,
  items,
  type,
}: {
  title: string;
  icon: string;
  items?: string[];
  type: "success" | "warning" | "danger";
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span>{icon}</span>

        <h3 className="font-bold">{title}</h3>

        <span className="rounded-full bg-muted px-2 py-1 text-xs font-bold">
          {Array.isArray(items) ? items.length : 0}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <Tag key={index} type={type}>
              {item}
            </Tag>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No data available.
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold">
        {value || "Not detected"}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed bg-muted/30 p-6 text-center text-sm text-muted-foreground">
      <div className="mb-2 text-2xl">📭</div>

      {text}
    </div>
  );
}

/* =========================================================
   STAT BOX
========================================================= */

function StatBox({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-primary">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SKILL CARD
========================================================= */

function SkillCard({
  title,
  icon,
  type,
  skills,
}: {
  title: string;
  icon: string;
  type: "success" | "warning" | "danger";
  skills?: string[];
}) {
  const styles = {
    success:
      "border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/20",
    warning:
      "border-yellow-200 bg-yellow-50/60 dark:border-yellow-900 dark:bg-yellow-950/20",
    danger:
      "border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/20",
  };

  return (
    <Card
      className={`${styles[type]} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background text-lg font-black shadow-sm">
            {icon}
          </div>

          <div>
            <h3 className="font-bold">{title}</h3>

            <p className="text-xs text-muted-foreground">
              {Array.isArray(skills) ? skills.length : 0} skills
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-background px-3 py-1.5 text-xs font-semibold shadow-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No data available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* =========================================================
   SKILL GROUP
========================================================= */

function SkillGroup({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>

        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">
          {skills.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-xl border bg-background px-3 py-2 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/5"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">
            No skills detected in this category.
          </span>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION REVIEW CARD
========================================================= */

function SectionReviewCard({
  title,
  icon,
  section,
}: {
  title: string;
  icon: string;
  section?: SectionAnalysis;
}) {
  if (!section) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              {icon}
            </div>

            {title}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No detailed AI analysis was returned for this
            section.
          </p>
        </CardContent>
      </Card>
    );
  }

  const score =
    typeof section.score === "number"
      ? Math.max(0, Math.min(100, Math.round(section.score)))
      : null;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle>
            {icon} {title}
          </CardTitle>

          {score !== null && (
            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
              {score}/100
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {score !== null && (
          <div>
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Section Quality</span>

              <span className="font-bold">
                {getScoreLabel(score)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />
            </div>
          </div>
        )}

        {section.feedback && (
          <div className="rounded-2xl bg-muted/40 p-5">
            <h4 className="mb-2 text-sm font-bold">
              AI Feedback
            </h4>

            <p className="text-sm leading-7 text-muted-foreground">
              {section.feedback}
            </p>
          </div>
        )}

        {Array.isArray(section.issues) &&
          section.issues.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-bold">
                ⚠ Issues
              </h4>

              <ul className="space-y-2">
                {section.issues.map((issue, index) => (
                  <li
                    key={index}
                    className="rounded-xl border border-red-200 bg-red-50/50 p-3 text-sm dark:border-red-900 dark:bg-red-950/20"
                  >
                    • {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {Array.isArray(section.suggestions) &&
          section.suggestions.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-bold">
                💡 Suggestions
              </h4>

              <ul className="space-y-2">
                {section.suggestions.map(
                  (suggestion, index) => (
                    <li
                      key={index}
                      className="rounded-xl border bg-muted/30 p-3 text-sm"
                    >
                      • {suggestion}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

        {section.improvedVersion && (
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-sm font-bold">
                ✨ AI Improved Version
              </h4>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    section.improvedVersion || ""
                  )
                }
              >
                📋 Copy
              </Button>
            </div>

            <div className="rounded-2xl border bg-muted/40 p-5 text-sm leading-7">
              {section.improvedVersion}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* =========================================================
   EXPERIENCE CARD
========================================================= */

function ExperienceCard({
  experience,
}: {
  experience: ExperienceItem;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 transition hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="text-lg font-bold">
            {experience.role || "Experience"}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {experience.company ||
              "Company not detected"}

            {experience.duration
              ? ` • ${experience.duration}`
              : ""}
          </p>
        </div>

        {typeof experience.score === "number" && (
          <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
            {experience.score}/100
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <ListBlock
          title="Strengths"
          items={experience.strengths}
        />

        <ListBlock
          title="Areas to Improve"
          items={experience.weaknesses}
        />
      </div>

      {Array.isArray(experience.suggestions) &&
        experience.suggestions.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-3 font-bold">
              💡 Suggestions
            </h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {experience.suggestions.map(
                (item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-muted/40 p-3"
                  >
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

      {Array.isArray(experience.improvedBullets) &&
        experience.improvedBullets.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-bold">
                ✨ AI Improved Bullets
              </h4>
            </div>

            <div className="rounded-2xl bg-muted/40 p-5">
              <ul className="space-y-3 text-sm leading-6">
                {experience.improvedBullets.map(
                  (item, index) => (
                    <li key={index}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
}: {
  project: ProjectItem;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 transition hover:shadow-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="text-lg font-bold">
            {project.name || "Project"}
          </h3>
        </div>

        {typeof project.score === "number" && (
          <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">
            {project.score}/100
          </div>
        )}
      </div>

      {Array.isArray(project.technologies) &&
        project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map(
              (tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <ListBlock
          title="Strengths"
          items={project.strengths}
        />

        <ListBlock
          title="Areas to Improve"
          items={project.weaknesses}
        />
      </div>

      {Array.isArray(project.suggestions) &&
        project.suggestions.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-3 font-bold">
              💡 Suggestions
            </h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.suggestions.map(
                (item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-muted/40 p-3"
                  >
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

      {project.improvedDescription && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-bold">
              ✨ AI Improved Description
            </h4>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigator.clipboard?.writeText(
                  project.improvedDescription || ""
                )
              }
            >
              📋 Copy
            </Button>
          </div>

          <div className="rounded-2xl bg-muted/40 p-5 text-sm leading-7">
            {project.improvedDescription}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   LIST BLOCK
========================================================= */

function ListBlock({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold">
        {title}
      </h4>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li
              key={index}
              className="rounded-xl bg-muted/40 p-3"
            >
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl bg-muted/30 p-3 text-sm text-muted-foreground">
          No data available.
        </p>
      )}
    </div>
  );
}

export default ResumeAnalyzerPage;