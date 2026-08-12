import { useState } from "react";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function DownloadRegistrations() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("contact_submissions")
        .select(
          "full_name, email, phone, college, year, course, interests, message, source, created_at"
        )
        .eq("source", "registration")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        alert("Failed to fetch registrations.");
        return;
      }

      if (!data || data.length === 0) {
        alert("No registrations found.");
        return;
      }

      const excelData = data.map((user, index) => ({
        "Sr. No.": index + 1,
        "Full Name": user.full_name || "",
        Email: user.email || "",
        Phone: user.phone || "",
        College: user.college || "",
        Year: user.year || "",
        Course: user.course || "",
        Interests: Array.isArray(user.interests)
          ? user.interests.join(", ")
          : user.interests || "",
        Message: user.message || "",
        Source: user.source || "",
        "Registration Date": user.created_at
          ? new Date(user.created_at).toLocaleString("en-IN")
          : "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);

      worksheet["!cols"] = [
        { wch: 8 },
        { wch: 25 },
        { wch: 32 },
        { wch: 16 },
        { wch: 30 },
        { wch: 12 },
        { wch: 20 },
        { wch: 35 },
        { wch: 40 },
        { wch: 18 },
        { wch: 25 },
      ];

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Registrations"
      );

      const date = new Date().toISOString().split("T")[0];

      XLSX.writeFile(
        workbook,
        `PlacementSpark-Registrations-${date}.xlsx`
      );
    } catch (error) {
      console.error("Excel download error:", error);
      alert("Something went wrong while creating the Excel file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={17} />

      {loading
        ? "Preparing Excel..."
        : "Download Registrations Excel"}
    </button>
  );
}