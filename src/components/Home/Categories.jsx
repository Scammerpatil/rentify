import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: "Laptop", image: "/Images/Computer.png" },
    { name: "Smartphones", image: "/Images/SmartPhone.png" },
    { name: "Car", image: "/Images/car.png" },
    { name: "Cameras", image: "/Images/Camera.png" },
    { name: "Bike", image: "/Images/Bicycle.png" },
    { name: "Furniture", image: "/Images/Furniture.png" },
    { name: "Camping Gear", image: "/Images/Camping.png" },
    { name: "Gaming Consoles", image: "/Images/Gaming.png" },
    { name: "Musical Instruments", image: "/Images/Music.png" },
    { name: "Sports Equipment", image: "/Images/Sports.png" },
    { name: "Books", image: "/Images/Books.png" },
    { name: "Construction Tools", image: "/Images/Tools.png" },
    { name: "Medical Equipment", image: "/Images/Medical.png" },
    { name: "Party Supplies", image: "/Images/Party.png" },
    { name: "Projectors", image: "/Images/Projector.png" },
    { name: "Costumes", image: "/Images/Costumes.png" },
    { name: "Event Venues", image: "/Images/Venue.png" },
    { name: "Drones", image: "/Images/Drone.png" },
    { name: "Toys", image: "/Images/Toys.png" },
    { name: "Other", image: "/Images/placeholder.png" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-base-200 to-base-100">
      <h2 className="text-4xl sm:text-5xl text-center font-bold text-primary mb-10 uppercase">
        Things You Can Rent
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name
                .toLowerCase()
                .split(" ")
                .join("-")}`}
              className="group"
            >
              <div className="card bg-base-100 p-5 rounded-xl border border-base-300 shadow hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 hover:border-primary">
                <div className="relative flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className="relative w-24 h-24">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain z-10 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                      onError={(e) =>
                        (e.target.src = "/Images/placeholder.png")
                      }
                    />
                    {/* Optional glow or ring effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg scale-75 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>

                  <h3 className="font-semibold text-sm text-base-content group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
