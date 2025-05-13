import Header from "../components/Header";

export default function About() {
  return (
    <div className="h-screen bg-base-200 text-base-content px-24 pt-24">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">About Rentify</h1>
        <p className="text-lg mb-6 text-center">
          Empowering hassle-free rentals with trust and technology.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-base leading-relaxed">
              Rentify is a modern rental platform built to simplify the process
              of renting and listing personal and commercial items. Whether
              you're a student, traveler, or business, we provide a secure and
              efficient way to find or offer rentals.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-base leading-relaxed">
              Our mission is to create a community-driven rental ecosystem that
              values trust, affordability, and convenience. We aim to eliminate
              the complexities of traditional rentals using technology and
              identity verification features like Aadhar and image validation.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Why Choose Rentify?</h2>
          <ul className="list-disc list-inside text-base space-y-2">
            <li>Secure and verified listings</li>
            <li>Seamless booking and communication</li>
            <li>Trusted community with reviews and ratings</li>
            <li>Simple onboarding and document upload</li>
            <li>Real-time location and distance-based features</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
