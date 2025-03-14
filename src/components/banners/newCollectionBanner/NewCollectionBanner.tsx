import { useNavigate } from 'react-router-dom';
import heroImage from '../../../assets/heroImages/hero-image.png';

export function NewCollectionBanner() {
  const navigate = useNavigate();
  return (
    <main className="w-full h-[27.5rem] bg-offWhite px-[11rem] flex justify-between">
      <div>
        <div className="flex flex-col gap-3 pt-[8.5rem] pb-12">
          <h3 className="text-neutral-800">Fresh Arrivals Online</h3>
          <h6 className="text-neutral-800">
            Discover Our Newest Collection Today.
          </h6>
        </div>
        <button onClick={() => navigate('/shop')}>View Collection</button>
      </div>
      <div className="mt-auto relative">
        <div className="rounded-full w-[21rem] h-[21rem] bg-lightBlue"/>
        <img src={heroImage} alt="hero" className="absolute bottom-0  right-0 w-3xs h-96" />
      </div>
    </main>
  );
}
