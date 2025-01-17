"use client";

import Link from "next/link";

export default function OrdersListItem(props) {
    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "text-[#30e5f3]";
            case "PAID":
                return "text-[#30e5f3]";
            case "DELIVERED":
                return "text-[#fc69f8]";
            default:
                return "text-[#30e5f3]";
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Number
                    </p>
                    <p className="text-[12px]">{props.orderId}</p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Date
                    </p>
                    <p className="text-base">{props.orderDate}</p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Payment Status
                    </p>
                    <p
                        className={`text-base ${getStatusColor(
                            props.paymentStatus
                        )}`}
                    >
                        {props.paymentStatus}
                    </p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Status
                    </p>
                    <p
                        className={`text-base ${getStatusColor(
                            props.orderStatus
                        )}`}
                    >
                        {props.orderStatus}
                    </p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Total
                    </p>
                    <p className="text-base">${props.totalAmount}</p>
                </div>
                <div>
                    <Link href={`/dashboard/orders/${props.orderId}`}>
                        <button
                            className="w-full secondary-font uppercase py-3 px-6 rounded-[7px] border border-[#fc69f8] border-2 text-[#fc69f8] text-2xl leading-none shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                            title="ORDER DETAILS"
                        >
                            ORDER DETAILS
                        </button>
                    </Link>
                </div>
            </div>
            <hr className="border-none h-[2px] bg-[#30e5f3] mb-8 mt-8" />
        </div>
    );
}
