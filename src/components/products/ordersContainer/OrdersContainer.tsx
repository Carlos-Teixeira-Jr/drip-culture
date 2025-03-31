import { EmptyCartContainer } from "../chart/emptyChartContainer/EmptyCartContainer";
import { useEffect, useState } from "react";
import { OrdersProductsContainer } from "../chart/chartProductsContainer/ChartProductsContainer";
import { useUser } from "@clerk/clerk-react";
import { API_URL } from "../../../api/api";


export function OrdersContainer() {

  const [orders, setOrders] = useState();
  const {user} = useUser()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/checkout?userEmail=${user?.emailAddresses[0].emailAddress}`);
        const data = await response.json();
        setOrders(data[data.length - 1]);
      } catch (error) {
        console.error(error);
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