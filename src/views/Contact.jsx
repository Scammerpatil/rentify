import Header from "../components/Header";

export default function Contact() {
  return (
    <div className="h-screen bg-base-200 text-base-content px-24 pt-24">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-6 text-center">
          Have questions, feedback, or partnership ideas? We'd love to hear from
          you!
        </p>

        <form className="grid grid-cols-1 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input type="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
