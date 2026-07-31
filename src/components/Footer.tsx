import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/content";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--color-brand-black)] text-white">
      <div className="container-x pt-14 pb-8 text-center border-b border-white/10">
        <p className="text-lg md:text-xl italic text-[color:var(--color-brand-yellow)] max-w-2xl mx-auto">
          "Your degree gets you shortlisted. Your preparation gets you selected."
        </p>
      </div>
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <img src={logo} alt="Placement Spark" className="h-9 w-9 rounded-md" />
            Placement Spark
          </div>
          <p className="mt-3 text-sm font-semibold text-[color:var(--color-brand-yellow)]">
            Discover Reality, Explore Infinity.
          </p>
          <p className="mt-3 text-sm text-white/70 max-w-xs">
            Preparing Careers, Not Just Placements. Talent deserves opportunity — we help students bridge the gap between campus learning and industry expectations.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-[color:var(--color-brand-yellow)]">About</Link></li>
            <li><Link to="/programs" className="hover:text-[color:var(--color-brand-yellow)]">Programs</Link></li>
            <li><Link to="/pricing" className="hover:text-[color:var(--color-brand-yellow)]">Pricing</Link></li>
            <li><Link to="/resources" className="hover:text-[color:var(--color-brand-yellow)]">Resources</Link></li>
            <li><Link to="/faq" className="hover:text-[color:var(--color-brand-yellow)]">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--color-brand-yellow)]">Contact</Link></li>
            <li><a href={BUSINESS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-yellow)]">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${BUSINESS.email}`} className="hover:text-white break-all">{BUSINESS.email}</a></li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:${BUSINESS.phone.replace(/\s/g,"")}`} className="hover:text-white">{BUSINESS.phone}</a></li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><span>{BUSINESS.location}</span></li>
            <li className="text-xs text-white/50 pt-1">{BUSINESS.hours}</li>
          </ul>
          <h4 className="text-sm font-semibold text-white/90 mt-5 mb-2">Legal</h4>
          <ul className="space-y-1.5 text-sm text-white/70">
            <li><Link to="/privacy-policy" className="hover:text-[color:var(--color-brand-yellow)] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-[color:var(--color-brand-yellow)] transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-[color:var(--color-brand-yellow)] transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3">Follow</h4>
          <div className="flex gap-2">
            <a href={BUSINESS.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Linkedin size={18} /></a>
            {/* <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Instagram size={18} /></a> */}
          </div>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4 text-sm">Chat on WhatsApp</a>
          <p className="mt-6 text-xs italic text-white/60">
            "Confidence isn't built in the interview room. It's built during preparation."
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/50 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Placement Spark. All rights reserved.</span>
          <span>Mumbai · Made for students</span>
        </div>
      </div>
    </footer>
  );
}
