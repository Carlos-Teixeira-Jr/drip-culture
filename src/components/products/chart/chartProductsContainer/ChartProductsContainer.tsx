import { IChart } from "../../../../interfaces/chart.interface";

interface IChartProductsContainer {
  chart: IChart;
}

export function ChartProductsContainer({ chart }: IChartProductsContainer) {
  return (
    <main>
      <h3 className="pb-14">Orders</h3>

      {chart.products.map((product, idx) => (
        <div key={product.id} className="flex flex-col">
          <div className="flex gap-5 w-full items-center">
            <div className="flex w-full gap-8">
              <img src={product.image} alt={product.title} className="w-20 h-20" />
              <div className="flex flex-col justify-between">
                <h5>{product.title}</h5>
                <div className="flex">
                  <p>Ordered On: {product.orderDate}</p>
                </div>
                <p>$ {product.price}.00</p>
              </div>
            </div>
            <button className="bg-white text-black border border-neutral h-fit text-nowrap">View item</button>
          </div>
          {idx !== chart.products.length - 1 && (
            <hr className="border border-borderColor my-8" />
          )}
        </div>
      ))}
    </main>
  );
}
