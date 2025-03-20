import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../../utils/formatters/dateFomatter";
import { IOrders } from "../../../../interfaces/orders.interface";
import { useEffect, useState } from "react";

interface IOrdersProductsContainer {
  orders: IOrders;
}

export function OrdersProductsContainer({ orders }: IOrdersProductsContainer) {
  const navigate = useNavigate();

  return (
    <main>
      <h3 className="pb-14">Orders</h3>

      {orders.cart.products.map((product, idx) => (
        <div key={product.id} className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-5 w-full items-center justify-between max-w-[6627px] min-w-[627px]">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="md:w-20 md:h-20 bg-offWhite flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="md:w-11 md:h-15"
                />
              </div>

              <div className="flex flex-col justify-between">
                <h5 className="truncate w-full">{product.title}</h5>
                <div className="flex">
                  <p className="text-vividBlack">
                    Ordered On: {dateFormatter(product.orderDate)}
                  </p>
                </div>
                <p className="">$ {product.price}.00</p>
              </div>
            </div>
            <button
              className="light-btn"
              onClick={() => {
                window.scrollTo({ top: 0 });
                navigate(`/product/${product.id}`);
              }}
            >
              View item
            </button>
          </div>
          {idx !== orders.cart.products.length - 1 && (
            <hr className="border border-borderColor my-8" />
          )}
        </div>
      ))}
    </main>
  );
}
