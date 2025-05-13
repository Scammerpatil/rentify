import axios from "axios";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { details } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${details}`
      );
      setProduct(response.data);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;
  return (
    <>
      <Header />
      <div className="px-10 py-8">
        <h1 className="text-4xl font-bold text-center mb-6">{product.title}</h1>
        <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <img
            src={product.images || "/Images/placeholder.png"}
            alt={product.title}
            className="h-80 w-full object-contain rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="mt-6 p-6 bg-base-200 shadow-md rounded-lg">
          <h1 className="text-4xl font-bold text-primary">{product.title}</h1>
          <p className="text-base text-base-content/70 mt-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-secondary">
              ₹ {product.pricePerDay}/day
            </p>
            {product.availability ? (
              <span className="badge badge-success">Available</span>
            ) : (
              <span className="badge badge-error">Not Available</span>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-4 text-base-content">
            📍 <span>{product.address}</span>
          </div>
        </div>

        {/* Certificates */}
        {product.certificate && (
          <div className="p-6 mt-6 bg-base-200 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Certification Documents</h3>
            {product.certificate.warrantyCard && (
              <p>
                <a
                  href={product.certificate.warrantyCard}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  View Warranty Card
                </a>
              </p>
            )}
            {product.certificate.insuranceCertificate && (
              <p>
                <a
                  href={product.certificate.insuranceCertificate}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  View Insurance Certificate
                </a>
              </p>
            )}
            {product.certificate.realTimeImages && (
              <p>
                <a
                  href={product.certificate.realTimeImages}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  View Real-Time Images
                </a>
              </p>
            )}
          </div>
        )}

        {/* Reviews */}
        <div className="mt-6 p-6 bg-base-200 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">User Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-2">
              {reviews.map((r) => (
                <div
                  className="flex justify-between items-center w-full"
                  key={r._id}
                >
                  <div className="chat chat-start w-full">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt={r.user.name}
                          src={r.user.profileImage || "/Images/placeholder.png"}
                        />
                      </div>
                    </div>
                    <div className="chat-bubble">
                      <p className="text-sm">{r.user.name}</p>
                      <p className="font-bold">{r.review}</p>
                    </div>
                  </div>
                  <div className="rating rating-md">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${r._id}`}
                        className="mask mask-star bg-primary"
                        checked={r.rating === star}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>

        {/* Owner Info */}
        <div className="p-6 mt-6 bg-base-200 rounded-lg shadow-md flex items-center justify-around gap-4">
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
            to={`/details/${product.owner?._id}`}
            className="ml-auto btn btn-primary"
          >
            View Owner Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
