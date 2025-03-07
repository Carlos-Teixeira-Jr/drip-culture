import { useEffect, useState } from "react";
import { EmptyChartContainer } from "../chart/emptyChartContainer/EmptyChartContainer";
import { ChartProductsContainer } from "../chart/chartProductsContainer/ChartProductsContainer";
import { IChart } from "../../../interfaces/chart.interface";


export function OrdersContainer() {

  const [chart, setChart] = useState<IChart | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/charts?userEmail=I0zTt@example.com`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setChart(data[0]);
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
      {!chart ? <EmptyChartContainer/> : <ChartProductsContainer chart={chart}/>}
    </main>
  )
}