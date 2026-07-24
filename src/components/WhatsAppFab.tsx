import { BUSINESS } from "@/lib/content";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href={BUSINESS.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-whatsapp)] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
    >
      <MessageCircle size={26} />
    </a>
  );
}
