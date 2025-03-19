import { EmptyCartContainer } from "../chart/emptyChartContainer/EmptyCartContainer";
import { useEffect, useState } from "react";
import { OrdersProductsContainer } from "../chart/chartProductsContainer/ChartProductsContainer";
import { useUser } from "@clerk/clerk-react";


export function OrdersContainer() {

  const [orders, setOrders] = useState();
  const {user} = useUser()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3001/checkout?userEmail=${user?.emailAddresses[0].emailAddress}`);
        const data = await response.json();
        setOrders(data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders()
  },[user])

  return (
    <main className="md:pl-12 md:w-2/3 px-5 md:px-0">
      {!orders ? <EmptyCartContainer/> : <OrdersProductsContainer orders={orders}/>}
    </main>
  )
}