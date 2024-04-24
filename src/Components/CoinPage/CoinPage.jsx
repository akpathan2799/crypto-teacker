import { getLinearProgressUtilityClass } from "@mui/material";
import React, { lazy, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CircularProgress from '@mui/material/CircularProgress';
import { CurrencyContext } from "../../Context/context.js";
import Chart from "../Chart/Chart.jsx";
// const Chart = lazy(()=>{import("../Chart/Chart.jsx")})
function CoinPage() {
  const { coinId } = useParams();
  const { currency, symbol } = useContext(CurrencyContext);
  const [coinInfo, setCoinInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCoinInfo = async () => {
    try {
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-kBCH9xZMVatz7MP7WtD2kx4M	" },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const result = await response.json();
      console.log(result);
      setCoinInfo(result);
      setLoading(false);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getCoinInfo();
  }, [currency]);

  return (
    <div className="max-w-[1400px] m-auto py-4 flex gap-2 max-[1024px]:w-full max-[1024px]:flex-wrap-reverse">
      <div className=" w-5/12 p-4 h-full flex flex-col justify-center items-center border-r-2 border-[#3067F0] max-[1024px]:w-full">
        {loading ? (
          <CircularProgress  />
        ) : (
          <>
            <img src={coinInfo?.image.large} className=" h-40 object-cover" />

            <h1 className="text-4xl font-bold py-6 text-center">
              {coinInfo?.localization.en}
            </h1>

            <p className="text-left py-3 text-center font-semibold">
              {" "}
              {parse(coinInfo?.description.en.split(". ")[0])}.
            </p>

            <p className="text-2xl font-bold py-3">
              Rank : {coinInfo?.market_cap_rank}
            </p>

            <p className=" text-xl font-bold py-3">
              Current Price : {symbol}
              {coinInfo?.market_data.current_price[currency.toLowerCase()]}
              {currency}
            </p>

            <p className="text-xl font-bold py-3">
              Market Cap : {symbol}
              {coinInfo?.market_data.market_cap[currency.toLowerCase()]}
              {currency}
            </p>
          </>
        )}
      </div>

      <Chart className="w-full" />
    </div>
  );
}

export default CoinPage;
