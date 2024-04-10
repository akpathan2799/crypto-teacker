import React, { useContext, useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { CurrencyContext } from "../../Context/context";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
function Carousal() {
  const [trending, setTrending] = useState([]);
  const { currency ,symbol } = useContext(CurrencyContext);
  
  const getTrendingCoins = async () => {
    try {
      const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-kBCH9xZMVatz7MP7WtD2kx4M	'}};
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,options
      );
      const result = await response.json();
      setTrending(result);
    } catch {
      console.error();
    }
  };

  useEffect(()=>{
    getTrendingCoins();
  },[currency])

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (

      <Link to={`/coin/${coin.id}`}>

        <div className=" flex flex-col items-center justify-center gap-2">

            <img src={coin?.image} alt={coin?.id} className=" h-24"/>
            <p>{coin?.name}  {profit?<span className=" text-green-500">+{coin?.price_change_percentage_24h}</span>:<span className=" text-red-600">{coin?.price_change_percentage_24h}</span>}</p>
            <p className="text-black font-bold text-xl">{symbol}{coin?.current_price}{currency}</p>
        </div>


      </Link>

    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="w-full flex justify-center h-[50%]">
       <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={900}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
}

export default Carousal;
