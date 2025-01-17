"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function CartAccount(props) {
    const [session, setSession] = useState(props.session);
    const { data: sessionClient, status } = useSession();

    useEffect(() => {
        if (status != "loading") setSession(sessionClient);
    }, [sessionClient, status]);

    const [menuOpen, setMenuOpen] = useState(false);

    const MenuHandler = (state) => {
        setMenuOpen(state);
    };

    if (session) {
        return (
            <nav className="flex justify-end items-center gap-6 sm:gap-10">
                <Link href="/cart" className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="19"
                        viewBox="0 0 24 19"
                        fill="none"
                    >
                        <path
                            d="M1 1H3.03999C3.60636 1 4.09842 1.36378 4.23425 1.88173L6.56383 10.8653C6.73554 11.5326 7.37111 12 8.10151 12H19.8084C20.5259 12 21.1513 11.5471 21.3383 10.8966L22.9452 5.26172C23.2143 4.31735 22.4583 3.38743 21.4152 3.38743H8.45261"
                            stroke="#fc69f8"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8 18C9.65685 18 11 16.6569 11 15C11 13.3431 9.65685 12 8 12C6.34315 12 5 13.3431 5 15C5 16.6569 6.34315 18 8 18Z"
                            stroke="#fc69f8"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M19 18C20.6569 18 22 16.6569 22 15C22 13.3431 20.6569 12 19 12C17.3431 12 16 13.3431 16 15C16 16.6569 17.3431 18 19 18Z"
                            stroke="#fc69f8"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                        />
                    </svg>
                    <span className="hidden md:inline">Cart</span>
                </Link>
                <div
                    title="Dashboard"
                    className="flex items-center gap-2 relative font-normal relative cursor-pointer"
                    onMouseOver={() => MenuHandler(true)}
                    onMouseLeave={() => MenuHandler(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="19"
                        viewBox="0 0 17 19"
                        fill="none"
                    >
                        <path
                            d="M8.49979 10.5714C11.064 10.5714 13.1426 8.49268 13.1426 5.9285C13.1426 3.36432 11.064 1.28564 8.49979 1.28564C5.93561 1.28564 3.85693 3.36432 3.85693 5.9285C3.85693 8.49268 5.93561 10.5714 8.49979 10.5714Z"
                            stroke="#fc69f8"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 17.7141C1 14.1427 3.85714 10.5713 8.5 10.5713C13.1429 10.5713 16 14.1427 16 17.7141"
                            stroke="#fc69f8"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="hidden md:inline">Dashboard</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                    >
                        <path
                            d="M1.5 1L7.5 7L13.5 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="stroke-[#fc69f8] md:stroke-white"
                        />
                    </svg>
                    <div
                        className={`pt-2 absolute top-full right-0 min-w-full ease-in-out duration-300 ${menuOpen
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div
                            className={`justify-end text-end flex flex-col items-end gap-2 p-4 rounded-[10px] border border-2 border-[#30e5f3] backdrop-blur-[44px] cursor-auto whitespace-nowrap`}
                        >
                            <Link href="/dashboard" className="block md:hidden">
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/cultivars"
                                className="hidden md:block"
                            >
                                Cultivars
                            </Link>
                            <Link
                                href="/dashboard/orders"
                                className="hidden md:block"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/dashboard/edit-account"
                                className="hidden md:block"
                            >
                                Edit
                            </Link>
                            <Link
                                href="/dashboard/account"
                                className="hidden md:block"
                            >
                                Account
                            </Link>
                            <Link
                                href="/dashboard/eligibility"
                                className="hidden md:block"
                            >
                                Eligibility
                            </Link>
                            <button
                                className="font-normal whitespace-nowrap"
                                title="Log Out"
                                onClick={signOut}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="flex justify-end items-center gap-10">
                <Link href="/cart" className="flex items-center gap-2">
                    <div className="bg-primary w-10 h-10 flex justify-center items-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="19"
                            viewBox="0 0 24 19"
                            fill="none"
                        >
                            <path
                                d="M1 1H3.03999C3.60636 1 4.09842 1.36378 4.23425 1.88173L6.56383 10.8653C6.73554 11.5326 7.37111 12 8.10151 12H19.8084C20.5259 12 21.1513 11.5471 21.3383 10.8966L22.9452 5.26172C23.2143 4.31735 22.4583 3.38743 21.4152 3.38743H8.45261"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                            />
                            <path
                                d="M8 18C9.65685 18 11 16.6569 11 15C11 13.3431 9.65685 12 8 12C6.34315 12 5 13.3431 5 15C5 16.6569 6.34315 18 8 18Z"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeMiterlimit="10"
                            />
                            <path
                                d="M19 18C20.6569 18 22 16.6569 22 15C22 13.3431 20.6569 12 19 12C17.3431 12 16 13.3431 16 15C16 16.6569 17.3431 18 19 18Z"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeMiterlimit="10"
                            />
                        </svg>
                    </div>
                    <span className="hidden md:inline font-semibold">Cart(2)</span>
                </Link>
                <Link
                    href="/login"
                    className="flex items-center gap-2 relative"
                >
                    <div className="bg-primary w-10 h-10 flex justify-center items-center rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="19"
                            viewBox="0 0 17 19"
                            fill="none"
                        >
                            <path
                                d="M8.49979 10.5714C11.064 10.5714 13.1426 8.49268 13.1426 5.9285C13.1426 3.36432 11.064 1.28564 8.49979 1.28564C5.93561 1.28564 3.85693 3.36432 3.85693 5.9285C3.85693 8.49268 5.93561 10.5714 8.49979 10.5714Z"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 17.7141C1 14.1427 3.85714 10.5713 8.5 10.5713C13.1429 10.5713 16 14.1427 16 17.7141"
                                stroke="#fff"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span className="font-semibold">Account </span>
                    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1L7.5 7L13.5 1" stroke="#2B2B2B" strokeWidth="2" strokeLinejoin="round" />
                    </svg>

                </Link>
            </nav >
        );
    }
}
