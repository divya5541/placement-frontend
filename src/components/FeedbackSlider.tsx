
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

import Fb1 from "@/assets/Feedback/fb1.jpeg";
import Fb2 from "@/assets/Feedback/fb2.jpeg";
import Fb3 from "@/assets/Feedback/fb3.jpeg";
import Fb4 from "@/assets/Feedback/fb4.jpeg";
import Fb5 from "@/assets/Feedback/fb5.jpeg";
import Fb6 from "@/assets/Feedback/fb6.jpeg";
import Fb7 from "@/assets/Feedback/fb7.jpeg";
import Fb8 from "@/assets/Feedback/fb8.jpeg";
import Fb9 from "@/assets/Feedback/fb9.jpeg";
import Fb10 from "@/assets/Feedback/fb10.jpeg";
import Fb11 from "@/assets/Feedback/fb11.jpeg";
import Fb12 from "@/assets/Feedback/fb12.jpeg";

const feedbackImages = [
  Fb1,
  Fb2,
  Fb3,
  Fb4,
  Fb5,
  Fb6,
  Fb7,
  Fb8,
  Fb9,
  Fb10,
  Fb11,
  Fb12,
];

export function FeedbackSlider() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === 0
        ? feedbackImages.length - 1
        : selectedImage - 1
    );
  };

  const showNext = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === feedbackImages.length - 1
        ? 0
        : selectedImage + 1
    );
  };

  return (
    <>
      {/* =========================================================
          FEEDBACK SECTION
      ========================================================== */}
      <section className="overflow-hidden py-16">
        {/* Heading */}
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              What Our Students Say
            </h2>

            <p className="mt-3 text-black/70">
              Real feedback from students who achieved their placement goals.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            FEEDBACK SLIDER
        ====================================================== */}
        <div
          className="
            relative
            mt-10
            overflow-hidden
          "
        >
          <div
  className={`flex animate-logo-scroll ${
    selectedImage !== null ? "feedback-modal-open" : ""
  }`}
>
            {[...feedbackImages, ...feedbackImages].map(
              (image, index) => {
                const actualIndex =
                  index % feedbackImages.length;

                return (
                  <div
                    key={index}
                    className="
                      group
                      mx-2
                      flex
                      h-[320px]
                      w-[210px]
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-black/5
                      bg-white
                      p-2
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                    onClick={() =>
                      openImage(actualIndex)
                    }
                  >
                    {/* Image container */}
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-gray-50
                      "
                    >
                      <img
                        src={image}
                        alt={`Student placement feedback ${
                          actualIndex + 1
                        }`}
                        className="
                          max-h-full
                          max-w-full
                          object-contain
                          rounded-lg
                          transition-transform
                          duration-300
                          group-hover:scale-[1.03]
                        "
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Small instruction */}
        <p className="mt-5 text-center text-sm text-black/50">
        </p>
      </section>

      {/* =========================================================
          FULLSCREEN IMAGE MODAL
      ========================================================== */}
      {selectedImage !== null && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            backdrop-blur-sm
          "
          onClick={closeImage}
        >
          {/* =====================================================
              CLOSE BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={closeImage}
            className="
              absolute
              right-4
              top-4
              z-30
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-white/20
              md:right-6
              md:top-6
            "
            aria-label="Close image"
          >
            <X size={25} />
          </button>

          {/* =====================================================
              PREVIOUS BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            className="
              absolute
              left-3
              top-1/2
              z-30
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-white/20
              md:left-6
              md:h-12
              md:w-12
            "
            aria-label="Previous feedback"
          >
            <ChevronLeft size={28} />
          </button>

          {/* =====================================================
              IMAGE
          ====================================================== */}
          <div
            className="
              flex
              max-h-[90vh]
              max-w-[85vw]
              items-center
              justify-center
              rounded-2xl
              bg-white
              p-2
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={feedbackImages[selectedImage]}
              alt={`Student placement feedback ${
                selectedImage + 1
              }`}
              className="
                max-h-[86vh]
                max-w-[82vw]
                rounded-xl
                object-contain
              "
            />
          </div>

          {/* =====================================================
              NEXT BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="
              absolute
              right-3
              top-1/2
              z-30
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition-all
              hover:bg-white/20
              md:right-6
              md:h-12
              md:w-12
            "
            aria-label="Next feedback"
          >
            <ChevronRight size={28} />
          </button>

          {/* =====================================================
              IMAGE COUNTER
          ====================================================== */}
          <div
            className="
              absolute
              bottom-5
              left-1/2
              -translate-x-1/2
              rounded-full
              bg-black/50
              px-4
              py-2
              text-sm
              font-medium
              text-white
              backdrop-blur-md
            "
          >
            {selectedImage + 1} / {feedbackImages.length}
          </div>
        </div>
      )}
    </>
  );
}

