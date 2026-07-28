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
import { useCurrency } from "../../context/CurrencyContext"; 

const MainHeader = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { t, i18n } = useTranslation();
    const { formatPrice } = useCurrency(); 
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300); 
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { data: cartData } = useQuery({ queryKey: ["cart"], queryFn: getCart });
    const { data: wishlistData } = useQuery({ queryKey: ["wishlist"], queryFn: getWishlist });

    const { data: searchResults = [], isFetching: isSearching } = useQuery({
        queryKey: ["search", debouncedTerm],
        queryFn: () => getSearchSuggestions(debouncedTerm),
        enabled: !!debouncedTerm,
        staleTime: 5 * 60 * 1000,
    });

    const cartItems = cartData?.items || [];
    const totalItems = cartData?.totalItems || 0;
    const totalPrice = cartData?.total || 0;
    const totalWishlistItems = wishlistData?.data?.totalItems || 0;

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

    const handleRemoveItem = (productId) => { removeMutation.mutate(productId); };

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
        <div className="bg-white sticky top-0 z-40 lg:static">
            <Container>
                {/* Desktop layout untouched (lg:flex-nowrap, lg:py-6). Mobile wrapped and padded. */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-between py-3 lg:py-6 gap-y-3 lg:gap-y-0">
                    {/* Logo */}
                    <Link to="/" className="shrink-0 w-1/2 lg:w-auto">
                        <img src={Logo} alt="Logo" className="w-28 sm:w-32 lg:w-auto" />
                    </Link>

                    {/* Desktop Right Side Actions / Mobile Icons on Right */}
                    <div className="flex items-center justify-end w-1/2 lg:w-auto gap-x-4 lg:gap-x-8 shrink-0 order-2 lg:order-last">
                        <div>
                            <Link to="/wishlist" className="relative block p-1 lg:p-0">
                                <AiOutlineHeart className="size-6 lg:size-8 text-logoc cursor-pointer hover:text-primary transition" />
                                <span className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-4 lg:min-w-5 h-4 lg:h-5 bg-[#2C742F] text-white text-[9px] lg:text-[11px] font-semibold font-pop rounded-full border-[1.5px] lg:border-2 border-white px-1 shadow-sm">
                                    {totalWishlistItems}
                                </span>
                            </Link>
                        </div>

                        <div
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-x-3 cursor-pointer relative after:hidden lg:after:block after:w-px after:h-6 after:bg-brdr after:content-[''] after:absolute after:top-1 after:-left-4 group p-1 lg:p-0"
                        >
                            <div className="relative">
                                <HiOutlineShoppingBag className="size-6 lg:size-8 text-logoc group-hover:text-primary transition" />
                                <span className="absolute -top-1 -right-1.5 flex items-center justify-center min-w-4 lg:min-w-5 h-4 lg:h-5 bg-[#2C742F] text-white text-[9px] lg:text-[11px] font-semibold font-pop rounded-full border-[1.5px] lg:border-2 border-white px-1 shadow-sm">
                                    {totalItems}
                                </span>
                            </div>
                            {/* Text Hidden on Mobile, preserved on Desktop */}
                            <div className="hidden lg:block">
                                <p className="font-pop font-normal text-sm text-[#4D4D4D] leading-[120%] group-hover:text-primary transition">
                                    {t('mainheader.shopping_cart')}
                                </p>
                                <p className="font-pop font-medium text-sm text-logoc leading-[100%]">
                                    {formatPrice(totalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Full width on Mobile, Original width/margin on Desktop */}
                    <div className="flex relative w-full lg:max-w-xl mx-0 lg:mx-8 order-last lg:order-none" ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="flex w-full shadow-sm lg:shadow-none rounded-full lg:rounded-none">
                            <div className="relative w-full">
                                {/* Pill shape on Mobile (rounded-l-full), Untouched on Desktop (lg:rounded-l-md) */}
                                <input
                                    type="text"
                                    placeholder={t('mainheader.search_placeholder')}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    className="w-full border border-gray-200 lg:border-brdr lg:focus:border-primary border-r-0 font-pop text-[13px] lg:text-[15px] text-black placeholder:text-gray-400 font-normal leading-5.5 ps-10 lg:ps-11 py-2.5 lg:py-3.5 rounded-l-full lg:rounded-none lg:rounded-l-md outline-none transition-colors"
                                />
                                {isSearching ? (
                                    <FiLoader className="absolute top-1/2 -translate-y-1/2 left-3 lg:left-4 size-4 lg:size-5 text-gray-400 animate-spin" />
                                ) : (
                                    <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 lg:left-4 size-4 lg:size-5 text-gray-400 lg:text-logoc" />
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-primary text-white text-[13px] lg:text-sm font-semibold font-pop leading-[120%] px-5 lg:px-6 py-2.5 lg:py-4 rounded-r-full lg:rounded-none lg:rounded-r-md hover:bg-opacity-90 transition cursor-pointer shrink-0"
                            >
                                {t('mainheader.search_btn')}
                            </button>
                        </form>

                        {/* Search Dropdown Results */}
                        {isDropdownOpen && searchTerm.trim() !== "" && (
                            <div className="absolute top-full left-0 w-full mt-2 lg:mt-1 bg-white border border-gray-100 lg:border-gray-100 rounded-2xl lg:rounded-lg shadow-xl z-50 overflow-hidden font-pop max-h-[60vh] lg:max-h-none overflow-y-auto">
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
                                                    className="flex items-center gap-3 lg:gap-4 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="w-12 h-12 shrink-0 bg-gray-100 rounded overflow-hidden">
                                                        <img
                                                            src={product.thumbnail?.url || "/placeholder-image.jpg"}
                                                            alt={productTitle}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-[13px] lg:text-sm font-medium text-gray-800 truncate">
                                                            {productTitle}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[12px] lg:text-xs font-medium text-primary">
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
                                        <span className="text-[13px] lg:text-sm font-medium">{t('mainheader.view_all_results')} "{searchTerm}"</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </Container>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

export default MainHeader;