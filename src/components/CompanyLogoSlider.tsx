import { Reveal } from "./Reveal";
import Worley from "@/assets/worley.jpeg";
import Finepac from "@/assets/finepac.png";
import Keve from "@/assets/Keva.png";
import GPE from "@/assets/GPE.png";
import Lakshami from "@/assets/Laxmi_Organic.jpg";
import Lt from "@/assets/LT.png";
import Lubrizol from "@/assets/lubrizol.jpeg";
//import Lupin from "@/assets/Lupin.png";
import Relience from "@/assets/reliance.jpeg";
// import Lupin from "@/assets/Lupin.png";


const companies = [
  { name: "Company 1", logo: Worley },
  { name: "Company 2", logo: Finepac },
  { name: "Company 3", logo: Keve },
  { name: "Company 4", logo: GPE },
  { name: "Company 5", logo: Lakshami },
 // { name: "Company 6", logo: Lupin },
  { name: "Company 7", logo: Lt },
  { name: "Company 8", logo: Lubrizol },
  { name: "Company 8", logo: Relience },
  { name: "Company 8", logo: Lubrizol },
];

export function CompanyLogoSlider() {
  return (
    <section className="py-16 overflow-hidden">
      <Reveal>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Students Are Placed At
          </h2>

          <p className="mt-3 text-black/70">
            Trusted by leading companies across India.
          </p>
        </div>
      </Reveal>

      <div className="relative mt-10 overflow-hidden">
        <div className="flex animate-logo-scroll hover:[animation-play-state:paused]">

          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="mx-3 flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Replace this div with your logo image */}
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-10 max-w-[120px] object-contain transition-all duration-300 hover:scale-105"
              />

              {/* Placeholder (Delete after adding logos) */}
              {/* <span className="text-sm font-semibold text-black/60">
                {company.name}
              </span> */}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}