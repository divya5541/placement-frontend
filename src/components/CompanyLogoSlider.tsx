import { Reveal } from "./Reveal";
import Worley from "@/assets/worley.png";
import Finepac from "@/assets/Finepac.png";
import Keve from "@/assets/Keva.png";
import GPE from "@/assets/GPE.jpeg";
import Lakshami from "@/assets/Laxmi_Organic.jpg";
import Lt from "@/assets/LT.png";
import Lubrizol from "@/assets/lubrizol.jpeg";
import Upi from "@/assets/upl.jpeg";
import Thermax from "@/assets/image.png";
import Kuber from "@/assets/kuber.jpg";

const companies = [
  { name: "Worley", logo: Worley },
  { name: "Finepac", logo: Finepac },
  { name: "Keva", logo: Keve },
  { name: "GPE", logo: GPE },
  { name: "Laxmi Organic", logo: Lakshami },
  { name: "L&T", logo: Lt },
  { name: "Lubrizol", logo: Lubrizol },
  { name: "UPL", logo: Upi },
  { name: "Thermax", logo: Thermax },
  { name: "Kuber Precision Tech LLP", logo: Kuber },
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
              className="
                group
                mx-2.5
                flex
                h-24
                w-28
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border border-black/5
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="
                  max-h-14
                  max-w-[95px]
                  w-auto
                  object-contain
                  transition-all
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}