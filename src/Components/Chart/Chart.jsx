import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { CurrencyContext } from '../../Context/context';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({Coin}) {

  const { coinId } = useParams();
  console.log(Coin);

  const[chartData,setChartData] = useState([]);
  
  const[loading,setLoading] = useState(true);
  

  const {currency,symbol} = useContext(CurrencyContext);
  const[days,setDays] = useState(1);
      
  const getchartData = async() =>{
    try {

      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-kBCH9xZMVatz7MP7WtD2kx4M	" },
      };
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,options);
      const result = await response.json()
      const filteredData = result?.prices.map((value)=> 
      {
        const obj = {
          symbol:symbol,
          date:value[0],
          price:value[1]
        }
        return obj;
      }
      )
      console.log(filteredData);
      setLoading(false);
      setChartData(filteredData);


      
    } catch (error) {
      console.warn(error);
      
    }
  }


  useEffect(()=>{
    getchartData()
    
  },[currency,days])
  

  const options = {
    responsive:true,
    radius:'0',
    title:{
      display:true,
      text:coinId
    }
  }

  const data = {
    labels : chartData.map((coinData)=> (moment(coinData?.date)).format('MMM DD')),
    datasets :[
      {
        fill:true,
        label:coinId,
        data:chartData.map((coinData)=> (coinData?.price.toFixed(2))),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }

  if(loading){
    <div className='w-full flex justify-center h-full'>

    <CircularProgress/>
    </div>
  }else{

  
  return (
    <div className='w-full h-3/5 max-[450]:h-64 '>

      <Line options={options} data={data} />

      <div className='w-full flex justify-center items-center gap-2 mt-3'>
      <button onClick={(e)=>{setDays(e.target.value)}} value={1} className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">24 hrs</button>
      <button onClick={(e)=>{setDays(e.target.value)}} value={5} className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">5 days</button>
      <button onClick={(e)=>{setDays(e.target.value)}} value={10} className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">10 days</button>
      <button onClick={(e)=>{setDays(e.target.value)}} value={30} className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">30 days</button>
      </div>

 
    </div>
  );
  }
}

export default Chart;
