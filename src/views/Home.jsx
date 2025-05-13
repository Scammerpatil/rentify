// import { Star } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import { useEffect, useState } from "react";
import {
  IconBrandFacebookFilled,
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
  IconCalendar,
  IconLocation,
  IconMoneybag,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    fetch("http://localhost:5000/api/product/getAllProducts")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <section className="py-10 bg-base-200 text-base-content">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary uppercase">
          Best Deals
        </h2>
        <div className="flex justify-center mb-8 px-4">
          <input
            type="text"
            placeholder="Search products by name..."
            className="input input-bordered input-primary w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <div
                  key={item._id}
                  className="card bg-base-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-300 rounded-xl overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.images || "/Images/placeholder.png"}
                      alt={item.title}
                      className="h-full w-full object-contain rounded-t-xl transform group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl"></div>
                    <span className="absolute top-2 left-2 bg-primary text-primary-content capitalize text-xs font-medium px-3 py-1 rounded-full shadow">
                      {item.category}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-base-content/80 mb-3">
                        {item.description.slice(0, 60)}...
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-base mt-2">
                      <p className="text-xl font-bold text-secondary">
                        ₹{item.pricePerDay}/day
                      </p>
                      <span className="badge badge-success text-xs">
                        Available
                      </span>
                    </div>

                    {/* Location & Availability */}
                    <div className="flex items-center justify-between mt-3 text-xs text-base-content/70">
                      <div className="flex items-center gap-1">
                        <IconLocation size={18} />
                        <span>{item.address?.slice(0, 12)}...</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconCalendar size={18} />
                        <span>Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-center gap-3 p-4 bg-base-100 border-t border-base-200">
                    <img
                      src={
                        item.owner?.profileImage || "/Images/placeholder.png"
                      }
                      alt="Owner"
                      className="h-10 w-10 rounded-full object-cover border-2 border-primary"
                    />
                    <Link
                      to={`/details/${item.owner?._id}`}
                      className="font-medium hover:text-primary transition"
                    >
                      {item.owner?.name}
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 p-4 pt-2">
                    <Link to="/login" className="btn btn-primary btn-sm w-1/2">
                      Rent
                    </Link>
                    <Link
                      to={`/${item._id}`}
                      className="btn btn-secondary btn-sm w-1/2"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-12">
                <img
                  src="/Images/empty-box.png"
                  alt="No listings"
                  className="h-52 mb-4 opacity-70"
                />
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  No Listings Found
                </h3>
                <p className="text-sm text-base-content/70">
                  Try adjusting your search or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Categories />

      {/* Newsletter Section */}
      <section className="py-12 bg-base-300 text-base-content">
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

      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
        <aside>
          <Link
            to="/"
            className={`w-72 flex flex-row items-center justify-center gap-3 py-5 lg:py-2`}
          >
            <IconMoneybag size={50} className="text-primary" />
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-white font-extrabold text-xl">
                  Rentify
                </span>
              </div>
              <hr className="w-full border border-white" />
              <span className="text-sm text-white/70 italic">
                Rent Anything, Anywhere
              </span>
            </div>
          </Link>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <IconBrandTwitterFilled size={24} className="text-primary" />
            </a>
            <a>
              <IconBrandYoutubeFilled size={24} className="text-error" />
            </a>
            <a>
              <IconBrandFacebookFilled size={24} className="text-primary" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
