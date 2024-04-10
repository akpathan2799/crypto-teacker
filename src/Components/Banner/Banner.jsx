import React from 'react';
import Carousal from '../Carousal/Carousal';

function Banner() {
  return (
    <>
      <div className=' w-full py-2 h-96 flex justify-center items-center flex-col gap-5'>

      <h1 className=' text-6xl font-extrabold text-black text-center'>Crypto Trendz</h1>
      <p className='text-xl font-thin text-gray-600 text-center'>Get All The Info Regarding Your Favorite Crypto Currency</p>
      <Carousal/>
      </div>
    </>
  );
}

export default Banner;
