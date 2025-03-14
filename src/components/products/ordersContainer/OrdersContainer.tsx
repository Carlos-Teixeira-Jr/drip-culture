import { useEffect, useState } from "react";
import { ICart } from "../../../interfaces/cart.interface";
import { CartProductsContainer } from "../chart/chartProductsContainer/ChartProductsContainer";
import { EmptyCartContainer } from "../chart/emptyChartContainer/EmptyCartContainer";


export function OrdersContainer() {

  const [cart, setCart] = useState<ICart | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cart?userEmail=I0zTt@example.com`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            // setCart(data[0]);
          } else {
            console.error("Error fetching data:", response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

  return (
    <main className="pl-12 w-2/3">
      {!cart ? <EmptyCartContainer/> : <CartProductsContainer cart={cart}/>}
    </main>
  )
}