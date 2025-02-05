// import { Star } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import { useEffect, useState } from "react";
import { IconCalendar, IconLocation } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/product/")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <section className="py-12">
        <h2 className="text-5xl font-bold my-8 text-center">Best Deals</h2>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
            {listings.length > 0 ? (
              listings.map((item) => (
                <div
                  key={item._id}
                  className="card bg-base-300 shadow-lg hover:shadow-2xl transition p-4 rounded-xl border border-base-300"
                >
                  {/* Product Image */}
                  <div className="relative h-48 w-full">
                    <img
                      src={item.images || "/Images/placeholder.png"}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                    <span className="absolute top-2 left-2 bg-primary text-base-content text-xs px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-base-content/80 ">
                      {item.description.slice(0, 60)}...
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xl font-bold text-secondary">
                        &#8377; {item.pricePerDay}/day
                      </p>
                      <span className="badge badge-success">Available</span>
                    </div>

                    {/* Location & Availability */}
                    <div className="flex items-center justify-between mt-3 text-base-content">
                      <div className="flex items-center space-x-1">
                        <IconLocation size={20} />
                        <span>{item.location.slice(0, 10)}...</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <IconCalendar size={20} />
                        <span>Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="p-3 bg-base-200 rounded-md">
                    <Link
                      to={`/details/${item.owner?._id}`}
                      className="flex items-center space-x-3"
                    >
                      <img
                        src={
                          item.owner?.profileImage || "/Images/placeholder.png"
                        }
                        alt="Owner"
                        className="avatar h-10 w-10 rounded-full border-2 border-primary object-cover"
                      />
                      <span className="font-medium text-base-content">
                        {item.owner?.name}
                      </span>
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-3 flex justify-between">
                    <Link
                      to={`/login`}
                      className="btn btn-primary w-1/2 mr-2 text-base"
                    >
                      Rent
                    </Link>
                    <Link
                      to={`/${item._id}`}
                      className="btn btn-secondary w-1/2 text-base"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-base-content col-span-full">
                No listings available.
              </p>
            )}
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
