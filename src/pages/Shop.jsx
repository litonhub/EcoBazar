import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaChevronDown, 
  FaChevronRight, 
  FaChevronLeft 
} from "react-icons/fa";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
import Container from "../components/layouts/Container";
import PageBanner from '../components/common/PageBanner';

import { getProducts } from "../api/productApi";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  // --- Filter States ---
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedRating, setSelectedRating] = useState(null);
  
  // Price States
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [debouncedPrice, setDebouncedPrice] = useState([0, 1500]);

  // --- Sidebar Toggle States ---
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    tags: true
  });

  // --- Dynamic Category State ---
  const [categoriesData, setCategoriesData] = useState([
    { name: 'All Products', value: 'All', count: 0 },
    { name: 'Fresh Fruit', value: 'fresh fruit', count: 0 },
    { name: 'Fresh Vegetables', value: 'fresh vegetables', count: 0 },
    { name: 'Cooking', value: 'cooking', count: 0 },
    { name: 'Snacks', value: 'snacks', count: 0 },
    { name: 'Beverages', value: 'beverages', count: 0 },
    { name: 'Beauty & Health', value: 'beauty & health', count: 0 },
    { name: 'Bread & Bakery', value: 'bread & bakery', count: 0 },
  ]);

  const tags = ["Healthy", "Low fat", "Vegetarian", "Kid foods", "Vitamins", "Bread", "Meat", "Snacks", "Fruit"];
  

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category") || "All";
    setSelectedCategory(cat);
  }, [location.search]);

  // --- Debounce Price Slider ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPrice(priceRange);
    }, 500); 
    return () => clearTimeout(timer);
  }, [priceRange]);

  // --- Reset Pagination when Filters Change ---
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, selectedRating, debouncedPrice]);

  // --- Fetch Products from API ---
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage, sortBy, selectedRating, debouncedPrice]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts({
        category: selectedCategory !== "All" ? selectedCategory : undefined,
        sort: sortBy,
        page: currentPage,
        limit: 15,
        minPrice: debouncedPrice[0],
        maxPrice: debouncedPrice[1],
        rating: selectedRating || undefined,
      });

      setProducts(res.data.data.products || []);
      
      const total = res.data.data.pagination?.totalProducts || res.data.data.total || 0;
      setTotalResults(total);

      // Update "All" category count dynamically
      if (selectedCategory === "All" && !selectedRating && debouncedPrice[0] === 0 && debouncedPrice[1] === 1500) {
         setCategoriesData(prev => prev.map(c => c.value === 'All' ? { ...c, count: total } : c));
      }

    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Improved Price Change Logic to prevent locking
  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 10);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 10);
    setPriceRange([priceRange[0], value]);
  };

  // --- Render Stars ---
  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-orange-400 text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-orange-400 text-sm" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-orange-400 text-sm" />);
    }
    return stars;
  };

  return (

    <>
      <PageBanner
        items={[
          "Product",
        ]}
      />

    <Container className="py-8 bg-white font-pop text-logoc">
      
      {/* Top Utility Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button className="bg-primary hover:bg-[#246326] text-white px-6 py-2.5 rounded-full flex items-center gap-2 font-medium transition-colors cursor-pointer">
          <span>Filter</span>
          <VscSettings size={18} />
        </button>
        
        <div className="flex items-center gap-6 text-[14px]">
          <div className="flex items-center gap-2">
            <span className="text-grynine">Sort by:</span>
            <div className="relative border border-brdrtwo rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer bg-white min-w-40">
              <select 
                className="font-medium outline-none cursor-pointer bg-transparent appearance-none w-full pr-4 text-logoc"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-grynine text-xs pointer-events-none" />
            </div>
          </div>
          <div className="font-medium text-logoc">
            <span className="font-bold">{totalResults}</span> Results Found
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-78 shrink-0">
          
          {/* Categories */}
          <div className="mb-6 pb-6 border-b border-brdrtwo">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleSection('category')}
            >
              <h3 className="text-lg font-semibold text-logoc">All Categories</h3>
              <FaChevronDown className={`text-grynine text-sm transition-transform duration-300 ${openSections.category ? 'rotate-180' : ''}`} />
            </div>
            {openSections.category && (
              <ul className="space-y-3">
                {categoriesData.map((cat, idx) => {
                  const isSelected = selectedCategory === cat.value; 
                  return (
                    <li 
                      key={idx} 
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedCategory(cat.value)}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-[#2C742F]' : 'border-brdrtwo group-hover:border-[#2C742F]'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#2C742F]"></div>}
                      </div>
                      <span className={`text-[14px] ${isSelected ? 'text-logoc font-medium' : 'text-grynine group-hover:text-logoc'}`}>{cat.name}</span>
                      <span className="text-grynine text-xs ml-auto">({cat.count || 0})</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 pb-6 border-b border-brdrtwo">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <h3 className="text-lg font-semibold text-logoc">Price</h3>
              <FaChevronDown className={`text-grynine text-sm transition-transform duration-300 ${openSections.price ? 'rotate-180' : ''}`} />
            </div>
            {openSections.price && (
              <div className="px-2 pt-2 pb-4">
                <div className="relative h-1 bg-[#f2f2f2] rounded-full mb-6 mt-4">
                  
                  {/* Progress Bar */}
                  <div 
                    className="absolute h-full bg-[#2C742F] rounded-full pointer-events-none"
                    style={{
                      left: `${(priceRange[0] / 1500) * 100}%`,
                      right: `${100 - (priceRange[1] / 1500) * 100}%`
                    }}
                  ></div>
                  
                  {/* Min Input Slider */}
                  <input 
                    type="range" 
                    min="0" 
                    max="1500" 
                    value={priceRange[0]} 
                    onChange={handleMinPriceChange}
                    className="custom-slider absolute w-full -top-1.5 h-4 appearance-none bg-transparent pointer-events-none outline-none"
                    style={{ zIndex: priceRange[0] > 1400 ? 5 : 3 }}
                  />
                  {/* Max Input Slider */}
                  <input 
                    type="range" 
                    min="0" 
                    max="1500" 
                    value={priceRange[1]} 
                    onChange={handleMaxPriceChange}
                    className="custom-slider absolute w-full -top-1.5 h-4 appearance-none bg-transparent pointer-events-none outline-none"
                    style={{ zIndex: 4 }}
                  />
                </div>
                <div className="text-[14px] text-grynine">
                  Price: <span className="font-medium text-logoc">${priceRange[0]} — ${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="mb-6 pb-6 border-b border-brdrtwo">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleSection('rating')}
            >
              <h3 className="text-lg font-semibold text-logoc">Rating</h3>
              <FaChevronDown className={`text-grynine text-sm transition-transform duration-300 ${openSections.rating ? 'rotate-180' : ''}`} />
            </div>
            {openSections.rating && (
              <ul className="space-y-3">
                {[5, 4, 3, 2, 1].map((star, idx) => {
                  const isSelected = selectedRating === star;
                  return (
                    <li 
                      key={idx} 
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedRating(isSelected ? null : star)}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#2C742F] border-[#2C742F]' : 'border-brdrtwo group-hover:border-[#2C742F]'}`}>
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1">{renderStars(star)}</div>
                      <span className={`text-[14px] ${isSelected ? 'text-logoc font-medium' : 'text-grynine'}`}>{star}.0 & up</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Popular Tags */}
          <div className="mb-6 pb-6 border-b border-brdrtwo">
            <div 
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleSection('tags')}
            >
              <h3 className="text-lg font-semibold text-logoc">Popular Tag</h3>
              <FaChevronDown className={`text-grynine text-sm transition-transform duration-300 ${openSections.tags ? 'rotate-180' : ''}`} />
            </div>
            {openSections.tags && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 rounded-full text-[13px] cursor-pointer transition-colors bg-[#f2f2f2] text-logoc hover:bg-[#e6f7e6] hover:text-[#2C742F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Main Content (Product Grid) */}
        <main className="flex-1">
          {loading ? (
            <div className="w-full h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#2C742F] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="w-full h-64 flex flex-col items-center justify-center text-grynine bg-[#f9f9f9] rounded-xl">
              <HiOutlineShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium text-logoc">No products found</p>
              <p className="text-sm">Try adjusting your filters (category, price, or rating).</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setPriceRange([0,1500]); setSelectedRating(null); }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-[#246326] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product-details/${item.slug}`)} // পেজ রিডাইরেক্টের জন্য যোগ করা হলো
                  className="group relative border border-brdrtwo rounded-lg bg-white p-4 flex flex-col transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_0_12px_0_rgba(32,181,38,0.32)] hover:z-10 cursor-pointer overflow-hidden"
                >
                  {item.discountPercentage > 0 && (
                    <span className="absolute top-4 left-4 bg-[#EA4B48] text-white text-[12px] px-2 py-1 rounded z-10">
                      Sale {item.discountPercentage}%
                    </span>
                  )}

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* উইশলিস্টের লজিক */ }} 
                      className="w-9 h-9 rounded-full cursor-pointer text-logoc bg-white shadow-sm border border-[#f2f2f2] flex items-center justify-center hover:bg-primary hover:text-white"
                    >
                      <AiOutlineHeart size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* কুইক ভিউয়ের লজিক */ }} 
                      className="w-9 h-9 rounded-full cursor-pointer text-logoc bg-white border border-[#f2f2f2] shadow-sm flex items-center justify-center hover:bg-primary hover:text-white"
                    >
                      <AiOutlineEye size={18} />
                    </button>
                  </div>

                  <div className="w-full h-75.5 flex items-center justify-center pt-2 pb-2 relative">
                    <img
                      src={item.thumbnail?.url || item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="mt-4 flex flex-col grow justify-end">
                    <h3 className="text-[14px] text-[#4d4d4d] transition-colors duration-300 group-hover:text-[#2C742F]">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-[16px] text-logoc">
                        ${Number(item.price).toFixed(2)}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="line-through text-[14px] font-normal text-grynine">
                          ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {renderStars(item.rating || item.averageRating)}
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); /* কার্টে অ্যাড করার লজিক */ }} 
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#f2f2f2] text-logoc cursor-pointer flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white z-10"
                    >
                      <HiOutlineShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-brdrtwo flex items-center justify-center text-grynine hover:bg-[#f2f2f2] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              
              {[...Array(Math.min(3, Math.ceil(totalResults/15)))].map((_, i) => {
                 const pageNum = i + 1;
                 return (
                  <button 
                    key={pageNum}
                    className={`w-10 h-10 rounded-full font-medium flex items-center justify-center cursor-pointer ${currentPage === pageNum ? 'bg-primary text-white' : 'text-logoc hover:bg-[#f2f2f2]'}`} 
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                 )
              })}
              
              {Math.ceil(totalResults/15) > 3 && (
                <>
                  <span className="text-grynine mx-1">...</span>
                  <button 
                    className="w-10 h-10 rounded-full text-logoc hover:bg-[#f2f2f2] font-medium flex items-center justify-center cursor-pointer"
                    onClick={() => setCurrentPage(Math.ceil(totalResults/15))}
                  >
                    {Math.ceil(totalResults/15)}
                  </button>
                </>
              )}
              
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= Math.ceil(totalResults/15)}
                className="w-10 h-10 rounded-full border border-brdrtwo flex items-center justify-center text-grynine hover:bg-[#f2f2f2] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Global CSS for Slider to make it fully functional across all browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-slider::-webkit-slider-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          -webkit-appearance: none;
          background: white;
          border: 2px solid #2C742F;
          border-radius: 50%;
          cursor: pointer;
        }
        .custom-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          background: white;
          border: 2px solid #2C742F;
          border-radius: 50%;
          cursor: pointer;
        }
      `}} />
    </Container>

    </>
  );
};

export default Shop;