import deliveryIcon from '../../../assets/icons/delivery-icon.png';
import badgeIcon from '../../../assets/icons/badge-icon.png';
import shieldIcon from '../../../assets/icons/shield-icon.png';

export function AdvantagesBanner() {

  const advantages = [
    {
      id: 1,
      title: "Free Shipping",
      description: "Upgrade your style today and get FREE shipping on all orders! Don't miss out.",
      icon: deliveryIcon,
    },
    {
      id: 2,
      title: "Satisfaction Guarantee",
      description: "Shop confidently with our Satisfaction Guarantee: Love it or get a refund.",
      icon: badgeIcon,
    },
    {
      id: 3,
      title: "Secure Payment",
      description: "Your security is our priority. Your payments are secure with us.",
      icon: shieldIcon,
    }
  ]

  return (
    <main className="w-[1092px] px-[11rem] py-[4.5rem] flex justify-between items-center gap-14 mx-auto">
      {advantages.map((advantage) => (
        <div key={advantage.id} className="flex flex-col gap-3 pt-[8.5rem] pb-12">
          <div className="bg-offWhite rounded-full w-10 h-10 flex justify-center items-center p-[5px] shrink-0">
            <img src={advantage.icon} alt="logo" className="w-5 h-5" />
          </div>
          <h3 className="text-neutral-800">{advantage.title}</h3>
          <h6 className="text-neutral-800">
            {advantage.description}
          </h6>
        </div>
      ))}     
    </main>    
  );
}