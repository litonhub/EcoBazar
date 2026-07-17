import React, { useEffect, useState } from 'react'
import Container from '../layouts/Container';
import Logo from '../../assets/images/Logo.png'
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, removeCartItem } from "../../services/cartService";
import { getWishlist } from "../../services/wishlistService";
import CartSidebar from '../CartSidebar';
import { toast } from "react-toastify";

const MainHeader = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: cartData } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    });

    const cartItems = cartData?.items || [];
    const totalItems = cartData?.totalItems || 0;
    const totalPrice = cartData?.total || 0;

    const { data: wishlistData } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlist,
    });

    const wishlistItems = wishlistData?.data?.items || [];
    const totalWishlistItems = wishlistData?.data?.totalItems || 0;

    const removeMutation = useMutation({
        mutationFn: removeCartItem,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            toast.success("Item removed from cart");
        },

        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                "Failed to remove item"
            );
        },
    });

    const handleRemoveItem = (productId) => {
        removeMutation.mutate(productId);
    };

    useEffect(() => {
        const openSidebar = () => {
            setIsCartOpen(true);
        };

        window.addEventListener(
            "open-cart-sidebar",
            openSidebar
        );

        return () => {
            window.removeEventListener(
                "open-cart-sidebar",
                openSidebar
            );
        };
    }, []);

    return (
        <>
            <Container>
                <div className="flex items-center justify-between py-6">

                    <Link to="/"><img src={Logo} alt="" /></Link>

                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-100 border border-brdr focus:border-primary border-r-0 font-pop text-[15px] text-black placeholder:text-gryd font-normal leading-5.5 ps-11 py-3.5 rounded-l-md outline-none"
                        />
                        <FiSearch className='absolute top-4 left-4 size-5 text-logoc' />
                        <button className="bg-primary text-white text-sm font-semibold font-pop leading-[120%] px-6 py-4.25 rounded-r-md">Search</button>
                    </div>

                    <div className="flex items-center gap-x-8">
                        <div>
                            <Link
                                to="/wishlist"
                                className="relative"
                            >
                                <AiOutlineHeart className="size-8 text-logoc cursor-pointer" />

                                <div className="w-4.5 h-4.5 rounded-full leading-4.5 text-center bg-[#2C742F] text-white font-pop font-medium text-sm absolute -top-0.5 -right-0.5">
                                    {totalWishlistItems}
                                </div>
                            </Link>
                        </div>

                        {/* এই div-এ onClick ইভেন্ট বসানো হয়েছে */}
                        <div
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-x-3 cursor-pointer relative after:w-px after:h-6 after:bg-brdr after:content-[] after:absolute after:top-1 after:-left-4"
                        >
                            <div className='relative'>
                                <HiOutlineShoppingBag className='size-8 text-logoc' />
                                <div className='w-4.5 h-4.5 rounded-full leading-4.5 text-center bg-[#2C742F] text-white font-pop font-medium text-sm absolute -top-0.5 -right-0.5'>
                                    {totalItems}
                                </div>
                            </div>
                            <div>
                                <p className="font-pop font-normal text-sm text-[#4D4D4D] leading-[120%]">Shopping cart:</p>
                                <p className="font-pop font-medium text-sm text-logoc leading-[100%]">
                                    ${Number(totalPrice).toFixed(2)}
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
    )
}

export default MainHeader;