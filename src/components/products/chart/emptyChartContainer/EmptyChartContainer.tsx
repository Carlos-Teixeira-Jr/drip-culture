import EmptyChartImage from "../../../../assets/icons/empty-chart-icon.png";
import ArrowImage from "../../../../assets/icons/arrow-icon.png";

export function EmptyChartContainer() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 pl-72 pt-48">
      <img src={EmptyChartImage} alt="empty chart" />
      <h6>Your order history is waiting to be filled.</h6>
      <button className="flex gap-1.5 justify-center items-center">Start Shopping<img src={ArrowImage} alt="arrow" className="w-5 h-4"/></button>
    </div>
  )
}