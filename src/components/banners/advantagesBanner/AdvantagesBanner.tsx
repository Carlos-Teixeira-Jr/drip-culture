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
    <main className="md:w-[1092px] md:px-[11rem] px-5 py-[4.5rem] flex md:flex-row flex-col justify-between items-center gap-14 mx-auto">
      {advantages.map((advantage) => (
        <div key={advantage.id} className="flex flex-col gap-3 md:pt-[8.5rem] md:pb-12">
          <div className="bg-offWhite rounded-full w-20 h-20 mx-auto md:mx-0 md:w-10 md:h-10 flex justify-center items-center p-[5px] shrink-0">
            <img src={advantage.icon} alt="logo" className="md:w-5 md:h-5 w-10 h-10" />
          </div>
          <h3 className="text-center md:text-start">{advantage.title}</h3>
          <h6 className="text-center md:text-start">
            {advantage.description}
          </h6>
        </div>
      ))}     
    </main>    
  );
}