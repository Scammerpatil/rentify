import { useEffect, useState } from "react";

const Hero = () => {
  const totalSlides = 15;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const element = document.getElementById(`item${currentIndex + 1}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [currentIndex]);

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <div className="carousel w-full h-full flex snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              id={`item${i + 1}`}
              className="carousel-item relative w-full h-full flex-shrink-0 snap-start"
            >
              <img
                src={`/images/images/${i + 1}.jpg`}
                alt={`Nature ${i}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />

              <div className="absolute inset-0 flex items-center justify-center z-20 text-center px-4">
                <div className="text-white animate-fade-in-up">
                  <h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-md">
                    Rentify
                  </h2>
                  <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Discover the best products at unbeatable prices!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute flex justify-center gap-2 bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          {Array.from({ length: totalSlides }, (_, i) => (
            <a
              key={i}
              href={`#item${i + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === i ? "bg-white" : "bg-white/50 hover:bg-white"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
