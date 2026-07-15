import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, 
  FaFacebookF, FaTwitter, FaPinterestP, FaInstagram,
  FaCheckCircle, FaPlay } from "react-icons/fa";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiMinus, FiPlus } from "react-icons/fi";
import Container from "../components/layouts/Container";
import PageBanner from '../components/common/PageBanner';
import Pdv from '../assets/images/pdv.png'


import { getSingleProduct } from "../api/productApi";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descriptions");

  useEffect(() => {
    if (slug) {
      loadProductDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadProductDetails = async () => {
    try {
      setLoading(true);

      const res = await getSingleProduct(slug); 
      
      const productData = res.data.data.product;
      const relatedData = res.data.data.relatedProducts || [];

      setProduct(productData);
      setRelatedProducts(relatedData);
      
      setMainImage(productData.thumbnail?.url || productData.images?.[0]?.url);
      setQuantity(1);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantity = (type) => {
    if (type === 'inc' && quantity < (product?.stock || 1)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FF8A00] text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FF8A00] text-sm" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-[#FF8A00] text-sm" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00B207] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-[#00B207] text-white rounded-md">Return to Shop</button>
      </div>
    );
  }

  return (

    <>
      <PageBanner
        items={[
          "Product",
        ]}
      />

    <Container className="pt-8 bg-white font-pop text-logoc">
      
      {/* --- Top Section: Product Details --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Image Gallery */}
        <div className="flex gap-3 h-139">

          <div className="flex flex-col items-center gap-13 w-20 shrink-0">
            <button className="text-grynine hover:text-[#00B207] transition">
              <GoChevronUp size={24} />
            </button>
            <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar flex-1 py-1">
              {[product.thumbnail, ...(product.images || [])].filter(Boolean).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setMainImage(img.url)}
                  className={`rounded-sm border cursor-pointer h-22.5 transition-all ${mainImage === img.url ? 'border-primary' : 'border-transparent hover:border-grynine'}`}
                >
                  <img src={img.url} alt="thumbnail" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
            <button className="text-grynine hover:text-[#00B207] transition">
              <GoChevronDown size={24} />
            </button>
          </div>
          
          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center bg-white">
            <img src={mainImage} alt={product.title} className="max-w-full min-h-full lg:min-w-139 lg:min-h-139 object-contain" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            {product.stock > 0 ? (
              <span className="bg-[#e6f7e6] text-[#00B207] text-xs font-medium px-2 py-1 rounded">In Stock</span>
            ) : (
              <span className="bg-[#f5e1e1] text-badgered text-xs font-medium px-2 py-1 rounded">Out of Stock</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
            <div className="flex items-center gap-1">
              {renderStars(product.rating || product.averageRating)}
              <span className="ml-1 text-logoc">{product.totalRatings || 0} Review</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div><span className="font-medium text-logoc">SKU:</span> {product.sku || "N/A"}</div>
          </div>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            {product.discountPercentage > 0 && (
              <span className="text-xl text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-semibold text-[#00B207]">${Number(product.price).toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="bg-[#f5e1e1] text-[#ea4b48] text-xs font-semibold px-2.5 py-1 rounded-full">
                {product.discountPercentage}% Off
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Brand:</span>
              <div className="px-3 h-8 border border-gray-200 rounded flex items-center justify-center">
                <span className="text-[#00B207] font-semibold text-xs capitalize">{product.brand || "Local"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Share item:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#00B207] text-white flex items-center justify-center hover:bg-[#009206] transition"><FaFacebookF size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-[#00B207] text-white flex items-center justify-center hover:bg-[#009206] transition"><FaTwitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-[#00B207] text-white flex items-center justify-center hover:bg-[#009206] transition"><FaPinterestP size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-[#00B207] text-white flex items-center justify-center hover:bg-[#009206] transition"><FaInstagram size={14} /></button>
              </div>
            </div>
          </div>

          <p className="text-[#666666] text-[15px] leading-relaxed mb-8">
            {product.description || "No description available for this product."}
          </p>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-200 rounded-full h-12 w-32 px-4 justify-between">
              <button onClick={() => handleQuantity('dec')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50"><FiMinus /></button>
              <span className="font-medium">{quantity}</span>
              <button onClick={() => handleQuantity('inc')} disabled={product.stock < 1} className="text-gray-500 hover:text-black p-1 disabled:opacity-50"><FiPlus /></button>
            </div>
            
            {/* Add to Cart */}
            <button 
              disabled={product.stock < 1}
              className="flex-1 h-12 bg-[#00B207] text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#009206] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart <HiOutlineShoppingBag size={20} />
            </button>

            {/* Wishlist */}
            <button className="h-12 w-12 bg-[#e6f7e6] text-[#00B207] rounded-full flex items-center justify-center hover:bg-[#00B207] hover:text-white transition">
              <AiOutlineHeart size={22} />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">Category:</span> <span className="text-gray-500 capitalize">{product.category}</span></p>
            {product.tags && product.tags.length > 0 && (
              <p className="text-sm"><span className="font-medium">Tag:</span> <span className="text-gray-500 capitalize">{product.tags.join(", ")}</span></p>
            )}
          </div>

        </div>
      </div>

      {/* --- Middle Section: Tabs & Extra Info --- */}
      <div className="mb-20">
        <div className="flex justify-center border-b border-gray-200 mb-8">
          {['Descriptions', 'Additional Information', 'Customer Feedback'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
              className={`px-8 py-4 font-medium transition-colors relative ${activeTab === tab.toLowerCase().split(' ')[0] ? 'text-[#1a1a1a]' : 'text-gray-500 hover:text-black'}`}
            >
              {tab}
              {activeTab === tab.toLowerCase().split(' ')[0] && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00B207]"></div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12">
          {/* Tab Content */}
          <div className="text-[#666666] text-[15px] leading-relaxed space-y-6">
            {activeTab === 'descriptions' && (
              <>
                <p>{product.description}</p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#00B207]" /> 100% Organic & Fresh Product.</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#00B207]" /> Best quality guaranteed for you.</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#00B207]" /> Fast and reliable delivery system.</li>
                </ul>
              </>
            )}
            {activeTab === 'additional' && (
               <p>Weight: {product.weight || "N/A"} <br/> Unit: {product.unit || "pcs"}</p>
            )}
            {activeTab === 'customer' && (
               <p>No reviews yet for this product. Be the first to review!</p>
            )}
          </div>

          {/* Promo Area */}
          <div>
            <div className="w-full h-75 bg-gray-100 rounded-md overflow-hidden relative mb-6">
              <img src={Pdv} alt="Promo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <button className="w-14 h-14 bg-[#00B207] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <FaPlay size={20} className="ml-1" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border border-gray-100 rounded-lg p-6 bg-white shadow-sm">
              <div className="flex items-start gap-3">
                <div className="text-[#00B207] text-2xl mt-1">🏷️</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Big Discount</h4>
                  <p className="text-xs text-gray-500">Save your money with us</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-[#00B207] text-2xl mt-1">🌿</div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">100% Organic</h4>
                  <p className="text-xs text-gray-500">100% Organic Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Related Products --- */}
      {relatedProducts?.length > 0 && (
        <div className="py-20">
          <h2 className="text-hsize font-semibold text-center mb-8 leading-[120%] text-logoc">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product-details/${item.slug}`)}
                className="group relative border border-brdr rounded-lg bg-white p-4 flex flex-col transition-all duration-300 hover:border-[#00B207] hover:shadow-[0_8px_20px_rgba(0,178,7,0.15)] hover:z-10 cursor-pointer overflow-hidden"
              >
                {item.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-badgered text-white text-xs font-semibold px-2.5 py-1 rounded z-10">
                    Sale {item.discountPercentage}%
                  </span>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                  <button onClick={(e) => { e.stopPropagation(); }} className="w-10 h-10 rounded-full bg-white border border-[#f2f2f2] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-colors">
                    <AiOutlineHeart size={20} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="w-10 h-10 rounded-full bg-white border border-[#f2f2f2] flex items-center justify-center hover:bg-[#00B207] hover:text-white transition-colors">
                    <AiOutlineEye size={20} />
                  </button>
                </div>

                <div className="w-full h-75.5 flex items-center justify-center p-1.25 relative">
                  <img
                    src={item.thumbnail?.url}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="mt-auto flex flex-col pt-2">
                  <h3 className="text-sm font-medium text-gray-700 group-hover:text-[#00B207] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-semibold text-base text-logoc">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    {item.discountPercentage > 0 && (
                      <span className="line-through text-sm font-medium text-gray-400">
                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-0.5">
                    {renderStars(item.rating || item.averageRating)}
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); }} 
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-gray-700 flex items-center justify-center transition-all duration-300 group-hover:bg-[#00B207] group-hover:text-white z-10"
                  >
                    <HiOutlineShoppingBag size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hide Scrollbar Style for Thumbnails */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </Container>

    </>
  );
};

export default ProductDetails;