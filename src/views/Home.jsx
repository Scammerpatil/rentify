import { Star } from "lucide-react";
import Header from "../components/Header";
// Import images
import switchImage from "../Images/switch.png";
import XboxImgae from "../Images/Xbox.png";
import ps5Image from "../Images/ps5.png";
import laptopImage from "../Images/laptop.png";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";

export default function Home() {
  const bestDeals = [
    {
      name: "Xbox Series X",
      image: XboxImgae,
      price: "$45/month",
    },
    {
      name: "PlayStation 5",
      image: ps5Image,
      price: "$50/month",
    },
    {
      name: "Gaming Laptop",
      image: laptopImage,
      price: "$70/month",
    },
    {
      name: "Nintendo Switch",
      image: switchImage,
      price: "$35/month",
    },
  ];

  return (
    <>
      <Header />
      <Hero />
      <section className="py-12">
        <h2 className="text-5xl font-bold my-8 text-center">Best Deals</h2>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestDeals.map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <figure>
                  <img
                    src={item.image} // Use the image URL from the bestDeals array
                    alt={item.name} // Use the product name for the alt text
                    width={200}
                    height={200}
                    className="w-full object-cover h-48 rounded-t-lg"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-lg font-semibold">
                    {item.name}
                    <div className="badge badge-secondary ml-2">NEW</div>
                  </h3>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-lg font-semibold mt-2">{item.price}</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary w-full">Rent Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Categories />

      {/* Newsletter Section */}
      <section className="py-12 bg-primary text-primary-content">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to our newsletter
          </h2>
          <p className="mb-6">
            Get the latest updates on new products and upcoming deals
          </p>
          <div className="flex justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-secondary">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
