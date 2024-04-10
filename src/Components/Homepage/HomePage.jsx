import React from 'react';
import Banner from '../Banner/Banner';
import CoinList from '../CoinList/CoinList';
function HomePage() {
  return (
    <div className='max-w-[1400px] m-auto py-4'>
      <Banner/>

      <h2 className=' text-center text-4xl font-semibold py-6'>Cryptocurrency Prices by Market Cap</h2>
      <CoinList/>
    </div>
  );
}

export default HomePage;
