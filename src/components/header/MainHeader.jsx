import React, { useEffect, useState, useRef } from "react";
import Container from "../layouts/Container";
import Logo from "../../assets/images/Logo.png";
import { FiSearch, FiLoader } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useNavigate } from "react-router"; 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, removeCartItem } from "../../services/cartService";
import { getWishlist } from "../../services/wishlistService";
import { getSearchSuggestions } from "../../services/productService"; 
import CartSidebar from "../CartSidebar";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useCurrency } from "../../context/CurrencyContext"; // <-- Currency Context Import

const MainHeader = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency(); // <-- formatPrice Hook
    
    // --- States ---
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Search States
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);

    // --- Debounce Effect for Search ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300); // 300ms delay for smooth typing experience
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // --- Click Outside to Close Dropdown ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- Queries ---
    const { data: cartData } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    });

    const { data: wishlistData } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
    });

    // Live Search Query
    const { data: searchResults = [], isFetching: isSearching } = useQuery({
        queryKey: ["search", debouncedTerm],
        queryFn: () => getSearchSuggestions(debouncedTerm),
        enabled: !!debouncedTerm,
        staleTime: 5 * 60 * 1000,
    });

    // --- Data Variables ---
    const cartItems = cartData?.items || [];
    const totalItems = cartData?.totalItems || 0;
    const totalPrice = cartData?.total || 0;
    const totalWishlistItems = wishlistData?.data?.totalItems || 0;

    // --- Mutations ---
    const removeMutation = useMutation({
        mutationFn: removeCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Item removed from cart");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to remove item");
        },
    });

    const handleRemoveItem = (productId) => {
        removeMutation.mutate(productId);
    };

    // --- Event Listeners ---
    useEffect(() => {
        const openSidebar = () => setIsCartOpen(true);
        window.addEventListener("open-cart-sidebar", openSidebar);
        return () => window.removeEventListener("open-cart-sidebar", openSidebar);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setIsDropdownOpen(false);
            navigate(`/shop?q=${encodeURIComponent(searchTerm.trim())}`); 
        }
    };

    return (
        <>
            <Container>
                <div className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <Link to="/">
                        <img src={Logo} alt="Logo" />
                    </Link>

                    {/* Search Bar Container */}
                    <div className="flex relative w-full max-w-xl mx-8" ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="flex w-full">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder={t('mainheader.search_placeholder')}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    className="w-full border border-brdr focus:border-primary border-r-0 font-pop text-[15px] text-black placeholder:text-gray-400 font-normal leading-5.5 ps-11 py-3.5 rounded-l-md outline-none transition-colors"
                                />
                                {isSearching ? (
                                    <FiLoader className="absolute top-4 left-4 size-5 text-gray-400 animate-spin" />
                                ) : (
                                    <FiSearch className="absolute top-4 left-4 size-5 text-logoc" />
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-primary text-white text-sm font-semibold font-pop leading-[120%] px-6 py-4 rounded-r-md hover:bg-opacity-90 transition cursor-pointer"
                            >
                                {t('mainheader.search_btn')}
                            </button>
                        </form>

                        {/* Search Dropdown Results */}
                        {isDropdownOpen && searchTerm.trim() !== "" && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden font-pop">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">{t('mainheader.searching')}</div>
                                ) : searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map((product) => {
                                            const productTitle = typeof product.title === 'object' ? (product.title[i18n.language] || product.title.en) : product.title;

                                            return (
                                            <li key={product._id}>
                                                <Link
                                                    to={`/product-details/${product.slug}`}
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setSearchTerm(""); 
                                                    }}
                                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="w-12 h-12 shrink-0 bg-gray-100 rounded overflow-hidden">
                                                        <img
                                                            src={product.thumbnail?.url || "/placeholder-image.jpg"}
                                                            alt={productTitle}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-800 truncate">
                                                            {productTitle}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {/* --- Updated Pricing with formatPrice --- */}
                                                            <span className="text-xs font-medium text-primary">
                                                                {formatPrice(product.price)}
                                                            </span>
                                                            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">
                                                                {product.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )})}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 text-sm">
                                        {t('mainheader.no_products_found')} "{searchTerm}"
                                    </div>
                                )}

                                {/* Bottom Action Bar */}
                                {searchResults.length > 0 && (
                                    <div
                                        onClick={handleSearchSubmit}
                                        className="bg-gray-50 p-3 text-center border-t border-gray-100 cursor-pointer hover:text-primary transition"
                                    >
                                        <span className="text-sm font-medium">{t('mainheader.view_all_results')} "{searchTerm}"</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-x-8">
                        <div>
                            <Link to="/wishlist" className="relative block">
                                <AiOutlineHeart className="size-8 text-logoc cursor-pointer hover:text-primary transition" />
                                <span className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-5 h-5 bg-[#2C742F] text-white text-[11px] font-semibold font-pop rounded-full border-2 border-white px-1 shadow-sm">
                                    {totalWishlistItems}
                                </span>
                            </Link>
                        </div>

                        <div
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-x-3 cursor-pointer relative after:w-px after:h-6 after:bg-brdr after:content-[''] after:absolute after:top-1 after:-left-4 group"
                        >
                            <div className="relative">
                                <HiOutlineShoppingBag className="size-8 text-logoc group-hover:text-primary transition" />

                                <span className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-5 h-5 bg-[#2C742F] text-white text-[11px] font-semibold font-pop rounded-full border-2 border-white px-1 shadow-sm">
                                    {totalItems}
                                </span>
                            </div>
                            <div>
                                <p className="font-pop font-normal text-sm text-[#4D4D4D] leading-[120%] group-hover:text-primary transition">
                                    {t('mainheader.shopping_cart')}
                                </p>
                                {/* --- Updated Cart Total with formatPrice --- */}
                                <p className="font-pop font-medium text-sm text-logoc leading-[100%]">
                                    {formatPrice(totalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
            />
        </>
    );
};

export default MainHeader;