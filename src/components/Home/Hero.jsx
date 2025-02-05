import TypeWriter from "../Typewriter";

const Hero = () => {
  const text = [
    "Rent Anything, Anytime, Anywhere...",
    "Smart Rentals for Smart Living...",
    "Why Buy? Just Rent It!",
    "Your One-Stop Rental Marketplace...",
    "Affordable Rentals, Hassle-Free...",
    "Find, Rent, and Enjoy...",
    "Rent Smarter, Live Better...",
    "Unlock Convenience, Rent with Ease...",
    "Experience More, Own Less...",
    "Rentify - Making Renting Effortless...",
  ];

  return (
    <div
      className="hero h-[calc(100vh-5rem)] bg-center bg-no-repeat lg:bg-cover"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundPosition: "center", // Keeps the image centered
      }}
    >
      {/* Content Section for Small Screens (Mobile & Below Tablet) */}
      <div className="lg:hidden hero-content flex-col px-10">
        <div className="mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
          <h1 className="mb-5 text-3xl font-bold leading-tight text-base-content sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            <TypeWriter text={text} />
          </h1>
          <p className="mb-6 text-base !leading-relaxed font-extralight text-base-content sm:text-lg md:text-xl">
            🏠 Need a place to stay? 🚗 Looking for a ride? 🎭 Want an outfit
            for a special occasion? <strong>Rentify</strong> makes renting
            seamless and hassle-free!
          </p>
          <ul className="list-none pl-5 space-y-2 text-base-content text-left">
            <li className="text-base">
              ✅ <strong>Wide Range of Categories</strong> - Rent cars, clothes,
              rooms, toys, and more.
            </li>
            <li className="text-base">
              ✅ <strong>Easy & Secure Bookings</strong> - Simple booking
              process with secure payments.
            </li>
            <li className="text-base">
              ✅ <strong>Flexible Rental Durations</strong> - Choose hourly,
              daily, or weekly rentals.
            </li>
            <li className="text-base">
              ✅ <strong>Verified Users & Listings</strong> - Trustworthy
              rentals with user ratings and reviews.
            </li>
            <li className="text-base">
              ✅ <strong>Real-Time Tracking & Support</strong> - Stay updated
              with live tracking and 24/7 support.
            </li>
          </ul>
          <p className="mt-4 text-base !leading-relaxed font-extralight text-base-content sm:text-lg md:text-xl">
            Start renting today with <strong>Rentify</strong> and experience
            convenience like never before! 🚀🔑
          </p>
        </div>
      </div>

      {/* For Large Screens: Show Background Image */}
      <div className="hidden lg:block hero-content flex-col px-10">
        {/* You can add extra content here if needed, but no text should be visible */}
      </div>
    </div>
  );
};

export default Hero;
