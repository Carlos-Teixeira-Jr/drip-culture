import EmptyCartImage from "../../../../assets/icons/empty-cart-icon.png";
import ArrowImage from "../../../../assets/icons/arrow-icon.png";
import { useNavigate } from "react-router-dom";

export function EmptyCartContainer() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-6 pt-48">
      <img src={EmptyCartImage} alt="empty cart" />
      <h6 className="text-vividBlack">Your order history is waiting to be filled.</h6>
      <button className="flex gap-1.5 justify-center items-center" onClick={() => navigate("/shop")}>Start Shopping<img src={ArrowImage} alt="arrow" className="w-5 h-4"/></button>
    </div>
  )
}