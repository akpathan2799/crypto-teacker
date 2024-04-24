import React, { Suspense, lazy } from 'react';
// import Banner from '../Banner/Banner';
// import CoinList from '../CoinList/CoinList';

const Banner = lazy(()=> import('../Banner/Banner'))

const CoinList = lazy(()=> import('../CoinList/CoinList'))

function HomePage() {
  return (
    <div className='max-w-[1400px] m-auto py-4'>
    <Suspense>

      <Banner/>
    </Suspense>

      <h2 className=' text-center text-4xl font-semibold py-6'>Cryptocurrency Prices by Market Cap</h2>
      <Suspense>

      <CoinList/>
      </Suspense>
    </div>
  );
}

export default HomePage;
