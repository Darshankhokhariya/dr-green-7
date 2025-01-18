"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

export default function ShopStrainsClient(props) {
    const [count, setCount] = useState(props.takeStrains);
    const [strains, setStrains] = useState(props.strains);
    const [total, setTotal] = useState(props.totalStrains);

    const [loading, setLoading] = useState(false);

    const getStrains = useCallback(async () => {
        setLoading(true);

        const payload = {
            countryCode: props.countryCode,
            take: count,
            order: "popularity",
        };

        const res = await fetch("/api/shop/products/get-strains", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        setStrains(data.data.strains);

        return setLoading(false);
    }, [count, total, props.countryCode]);

    useEffect(() => {
        getStrains();
    }, [getStrains, count]);

    const countHandler = () => {
        setCount((prev) => prev + 6);
        // setStrains(props.strains.slice(0, count));
        return;
    };

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {strains.map((strain, i) => (
                    <div
                        key={i}
                        className="rounded-[10px]  border-2 shadow-md backdrop-blur-[44px] p-6"
                    >
                        <div className="flex gap-2 justify-end items-start">
                            <p className="py-1 px-3 rounded-full bg-gray-200 text-gray-800 font-semibold text-[10px] uppercase">
                                {strain.flavour}
                            </p>
                            <p className="py-1 px-3 rounded-full bg-gray-200 text-gray-800 font-semibold text-[10px] uppercase">
                                {strain.type}
                            </p>
                        </div>
                        <div className="mx-auto my-6 h-0 w-full pb-[100%] relative">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.imageUrl
                                }
                                alt={strain.name}
                                fill
                                className="object-fit object-center"
                            />
                        </div>
                        <p className="text-2xl md:text-[28px] font-semibold mb-6">
                            {strain.name}
                        </p>
                        <Link href={`/product/${strain.id}`}>
                            <button
                                className="w-full secondary-font uppercase py-3 px-6 bg-[#0aba90] rounded-[7px] border-[#0aba90] border-2 text-white text-3xl shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Discover"
                            >
                                Discover
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <button
                    className={`secondary-font uppercase cursor-pointer py-3 px-6 rounded-[7px]  border-black border-2 text-[#0aba90] text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out ${count >= props.totalStrains ? "pointer-events-none" : ""
                        }
                    }`}
                    title={
                        count >= props.totalStrains
                            ? "NO MORE TO SHOW"
                            : "LOAD MORE"
                    }
                    onClick={countHandler}
                    disabled={count >= props.totalStrains ? true : false}
                >
                    {count >= props.totalStrains
                        ? "NO MORE TO SHOW"
                        : "LOAD MORE"}
                    <svg
                        className={`animate-spin ml-2 h-4 w-4 text-[#0aba90] ${loading ? "inline" : "hidden"
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
