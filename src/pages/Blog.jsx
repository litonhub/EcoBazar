import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiSearch } from "react-icons/fi";
import { FaUser, FaComments, FaArrowRight, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';
import api from "../api/api";
import Container from "../components/layouts/Container";
import PageBanner from '../components/common/PageBanner';

const getLangText = (field, lang) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
};

const Blog = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);

  const lang = i18n.language === 'bn' ? 'bn' : 'en';

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, sortBy]);

  const { data: sidebarRes, isLoading: sidebarLoading } = useQuery({
    queryKey: ["blogSidebar"],
    queryFn: async () => {
      const response = await api.get("/blogs/sidebar-data");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: blogsRes, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs", debouncedSearch, selectedCategory, selectedTag, sortBy, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 6,
        sort: sortBy
      });
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedTag) params.append("tag", selectedTag);

      const response = await api.get(`/blogs?${params.toString()}`);
      return response.data;
    }
  });

  const categories = sidebarRes?.categories || [];
  const popularTags = sidebarRes?.tags || [];
  const galleryImages = sidebarRes?.galleryImages || [];
  const recentPosts = sidebarRes?.recentPosts || [];

  const blogs = blogsRes?.data || [];
  const totalResults = blogsRes?.totalResults || 0;
  const totalPages = blogsRes?.totalPages || 1;

  const getCardDate = (isoDate) => {
    const d = new Date(isoDate);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  };

  const getRecentDate = (isoDate) => {
    return new Date(isoDate).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <PageBanner items={["Blog"]} />

      <Container className="py-12 font-pop text-logoc">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-[310px] shrink-0 space-y-8">
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-4 pr-10 border border-gray-200 rounded-md outline-none focus:border-[#00B207] text-sm"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-logoc">Top Categories</h3>
              {sidebarLoading ? (
                <p className="text-sm text-gray-400">Loading categories...</p>
              ) : (
                <ul className="space-y-3">
                  {categories.map((cat, idx) => {
                    const catId = cat._id || getLangText(cat.name, 'en');
                    const catName = getLangText(cat.name, lang);
                    
                    return (
                      <li 
                        key={idx}
                        onClick={() => setSelectedCategory(selectedCategory === catId ? null : catId)}
                        className={`flex justify-between items-center text-sm cursor-pointer transition-colors ${selectedCategory === catId ? 'text-[#00B207] font-semibold' : 'text-gray-600 hover:text-[#00B207]'}`}
                      >
                        <span>{catName}</span>
                        <span className="text-gray-400">({cat.count})</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-logoc">Popular Tag</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => {
                  const tagDisplay = getLangText(tag, lang);
                  const tagValue = getLangText(tag, 'en');

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTag(selectedTag === tagValue ? null : tagValue)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${selectedTag === tagValue ? 'bg-[#00B207] text-white' : 'bg-gray-100 text-gray-700 hover:bg-[#00B207] hover:text-white'}`}
                    >
                      {tagDisplay}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-logoc">Our Gallery</h3>
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="w-full h-16 rounded-md overflow-hidden border border-gray-100">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition duration-300" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-logoc">Recently Added</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => {
                  const postTitle = getLangText(post.title, lang);

                  return (
                    <div 
                      key={post._id} 
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <img src={post.image} alt={postTitle} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-800 group-hover:text-[#00B207] transition line-clamp-2 leading-relaxed">
                          {postTitle}
                        </h4>
                        <span className="text-[11px] text-gray-400 mt-1 block">📅 {getRecentDate(post.createdAt)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="flex-1 w-full">
            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 w-full sm:w-auto">
                <span className="text-gray-500">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 outline-none bg-white cursor-pointer text-sm text-gray-800"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>

              <div className="w-full sm:w-auto text-left sm:text-right text-sm text-gray-800">
                <strong className="font-semibold text-gray-900">{totalResults}</strong> Results Found
              </div>
            </div>

            {blogsLoading ? (
              <div className="py-20 text-center text-gray-500">
                <div className="w-10 h-10 border-4 border-[#00B207] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <h3 className="text-xl font-semibold mb-2">No Blog Posts Found</h3>
                <p className="text-sm">Try searching with a different keyword or removing filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((post) => {
                  const dateInfo = getCardDate(post.createdAt);
                  const postTitle = getLangText(post.title, lang);
                  const catName = getLangText(post.category?.name || post.category, lang) || "General";

                  return (
                    <div 
                      key={post._id}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#00B207] transition duration-300 flex flex-col group"
                    >
                      <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                        <img 
                          src={post.image} 
                          alt={postTitle} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        
                        <div className="absolute top-4 left-4 bg-white rounded-md px-3 py-1.5 text-center shadow-md">
                          <span className="block font-bold text-sm text-logoc leading-tight">{dateInfo.day}</span>
                          <span className="block text-[10px] text-gray-500 uppercase font-semibold">{dateInfo.month}</span>
                        </div>

                        {post.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-12 h-12 bg-white text-[#00B207] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                              <FaPlay size={16} className="ml-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#00B207]">🏷️</span>
                            <span>{catName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaUser className="text-[#00B207]" />
                            <span>By {post.author?.name || "Admin"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaComments className="text-[#00B207]" />
                            <span>{post.commentCount || 0} Comments</span>
                          </div>
                        </div>

                        <h3 className="text-base font-medium text-logoc group-hover:text-[#00B207] transition line-clamp-2 mb-4 leading-snug">
                          {postTitle}
                        </h3>

                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <button 
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            className="flex items-center gap-2 text-[#00B207] font-semibold text-sm hover:gap-3 transition-all cursor-pointer"
                          >
                            Read More <FaArrowRight size={12} />
                          </button>
                        </div>

                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                >
                  <FaChevronLeft size={12} />
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const num = idx + 1;
                  return (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`w-10 h-10 rounded-full font-medium flex items-center justify-center cursor-pointer transition ${currentPage === num ? 'bg-[#00B207] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {num}
                    </button>
                  )
                })}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            )}

          </div>

        </div>
      </Container>
    </>
  );
};

export default Blog;