import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/content";
import sparkText from "@/assets/sparkText.png";
//import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--color-brand-black)] text-white">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
  {/* <img
    src={logo}
    alt="Logo"
    className="h-8 w-8 object-contain"
  /> */}

  <img
    src={sparkText}
    alt="Placement Spark"
    className="h-8 w-auto object-contain"
  />
</div>
          <p className="mt-3 text-sm text-white/70 max-w-xs">
            Structured mentorship for Chemical engineering and fresh graduates. Built in Mumbai, delivered everywhere.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-[color:var(--color-brand-yellow)]">About</Link></li>
            <li><Link to="/programs" className="hover:text-[color:var(--color-brand-yellow)]">Programs</Link></li>
            <li><Link to="/pricing" className="hover:text-[color:var(--color-brand-yellow)]">Pricing</Link></li>
            <li><Link to="/resources" className="hover:text-[color:var(--color-brand-yellow)]">Resources</Link></li>
            <li><Link to="/faq" className="hover:text-[color:var(--color-brand-yellow)]">FAQ</Link></li>
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
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-3">Follow</h4>
          <div className="flex gap-2">
            <a href={BUSINESS.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Linkedin size={18} /></a>
            <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-[color:var(--color-brand-yellow)] hover:text-black transition"><Instagram size={18} /></a>
          </div>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noreferrer" className="btn-whatsapp mt-4 text-sm">Chat on WhatsApp</a>
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
