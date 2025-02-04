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
    <div className="hero h-[calc(100vh-5rem)] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse px-10">
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
    </div>
  );
};

export default Hero;
