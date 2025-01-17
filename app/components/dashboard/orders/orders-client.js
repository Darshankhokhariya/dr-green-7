"use client";

import { useEffect, useRef, useState } from "react";
import OrdersListItem from "./orders-list-item";

export default function OrdersClient(props) {
    const [take, setTake] = useState(props.take);
    const [orders, setOrders] = useState(props.orders.slice(0, take));
    const loadMore = useRef(null);

    const setTakeHandler = () => {
        if (take >= props.orders.length) return;
        setTake((prev) => prev + 10);
    };

    useEffect(() => {
        setOrders(props.orders.slice(0, take));
    }, [take, props.orders]);

    return orders.length ? (
        <div>
            <p className="font-normal mb-8 text-base">
                {props.orders.length} Orders
            </p>
            {orders.map((ord, i) => (
                <OrdersListItem
                    key={i}
                    orderId={ord.id}
                    orderNumber={props.orders.length - i}
                    orderDate={new Date(ord.createdAt).toDateString()}
                    paymentStatus={ord.paymentStatus}
                    orderStatus={ord.orderStatus}
                    totalAmount={ord.totalAmount.toFixed(2)}
                />
            ))}
            <div className="text-center mt-6">
                <button
                    className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                    title={
                        take >= props.orders.length
                            ? "NO MORE TO SHOW"
                            : "LOAD MORE"
                    }
                    onClick={setTakeHandler}
                    ref={loadMore}
                >
                    {take >= props.orders.length
                        ? "NO MORE TO SHOW"
                        : "LOAD MORE"}
                </button>
            </div>
        </div>
    ) : (
        <p className="text-white">No previous orders.</p>
    );
}
