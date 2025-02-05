import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: "Computers", image: "/Images/Computer.png" },
    { name: "Smartphones", image: "/Images/SmartPhone.png" },
    { name: "Car", image: "/Images/car.png" },
    { name: "Cameras", image: "/Images/Camera.png" },
    { name: "Audio", image: "/Images/headphone.png" },
    { name: "Television", image: "/Images/TV.png" },
    { name: "Bicycles", image: "/Images/Bicycle.png" },
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
    <section className="py-12 bg-base-200">
      <h2 className="text-5xl py-5 text-center font-bold mb-8">
        Things you can Rent
      </h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-10">
          {categories.map((category) => (
            <div
              key={category.name}
              className="card bg-base-100 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <Link
                to={`/category/${category.name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
                className="card-body items-center text-center"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  width={74}
                  height={74}
                  className="mb-2"
                  onError={(e) => (e.target.src = "/Images/placeholder.png")}
                />
                <h3 className="card-title text-sm">{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
