import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import products from "../Data/products";
import Rating from '@mui/material/Rating';

const HomePage = () => {
  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section with Carousel */}
        <section className="relative bg-slate-700 text-white ">
          <div className="absolute inset-0">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="relative w-full h-96">
                  <img
                    src={product.banner}
                    alt={`Banner for ${product.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[20rem] py-12 px-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              Welcome to Our BoldSpark E-Commerce Store
            </h1>
            <p className="mt-4 text-sm md:text-lg">
              Discover the best products and deals.
            </p>
            <Link
              to="/products"
              className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Shop Now
            </Link>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section className="py-12 bg-gray-100 mt-12">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg relative"
                >
                  {product.discount && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-br-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-1 font-bold">
                      ₹{product.price}
                    </p>
                    <p className="text-gray-400 mb-1 text-sm font-bold line-through">
                      M.R.P :{product.actualRate}
                    </p>
                    <p className="text-gray-600 mb-4 font-serif font-semibold">
                      {product.category}
                    </p>
                    <div className="-mt-3">
                      <Rating name="size-small" defaultValue={2.5} precision={0.5} size="small" />
                    </div>
                    <Link
                      to={`/products`}
                      className="mt-4 px-3 py-2 bg-blue-600 flex justify-center
                       text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link> 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

