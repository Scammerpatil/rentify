import axios from "axios";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Rent from "../../../components/Dialogs/Rent";

const Product = () => {
  const { productId } = useParams();
  return (
    <Layout>
      <Component productId={productId} />
    </Layout>
  );
};

export default Product;

const Component = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${productId}`
      );
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="px-10 py-8">
      {/* Product Images */}
      <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <img
          src={product.images || "/Images/placeholder.png"}
          alt={product.title}
          className="h-80 w-full object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="mt-6 p-6 bg-base-100 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-primary">{product.title}</h1>
        <p className="text-lg text-base-content/70 mt-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-secondary">
            &#8377; {product.pricePerDay}/day
          </p>
          <span className="badge badge-success">Available</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 mt-4 text-base-content">
          📍 <span>{product.location}</span>
        </div>
      </div>

      {/* Owner Info */}
      <div className="p-6 mt-6 bg-base-200 rounded-lg shadow-md flex items-center space-x-4">
        <img
          src={product.owner?.profileImage || "/Images/placeholder.png"}
          alt="Owner"
          className="h-16 w-16 rounded-full border-2 border-primary object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{product.owner?.name}</h3>
          <p className="text-base-content">{product.owner?.email}</p>
        </div>
        <Link
          to={`/user/${product.owner?._id}`}
          className="ml-auto btn btn-primary"
        >
          View Owner Profile
        </Link>
      </div>

      {/* Rent Button */}
      <div className="flex justify-center mt-6">
        <button
          className="btn btn-secondary text-lg"
          onClick={() => {
            document.getElementById("rentProduct").showModal();
          }}
        >
          Rent Now
        </button>
      </div>
      <Rent product={product} />
    </div>
  );
};
