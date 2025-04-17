const Hero = () => {
  return (
    <div
      className="hero h-[calc(100vh-5rem)] bg-center bg-no-repeat lg:bg-cover"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundPosition: "center",
      }}
    >
      {/* For Large Screens: Show Background Image */}
      <div className="hidden lg:block hero-content flex-col px-10">
        {/* You can add extra content here if needed, but no text should be visible */}
      </div>
    </div>
  );
};

export default Hero;
