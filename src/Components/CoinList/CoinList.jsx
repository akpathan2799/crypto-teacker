import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import { CurrencyContext } from "../../Context/context";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import '../../index.css'
function CoinList() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currency, symbol } = useContext(CurrencyContext);
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState('');
  const[page,setPage] = useState(1);
  console.log(page);
  const getCoinsList = async () => {
    try {
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-kBCH9xZMVatz7MP7WtD2kx4M	" },
      };
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options
      );
      const result = await response.json();
      setCoinList(result);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {

    return coinList.filter((coin) =>
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    )

  }

  useEffect(() => {
    getCoinsList();
  }, [currency]);

  return (
    <div className="w-full py-2">
      <input
        type="text"
        className="w-full border-2 outline-none border-solid border-gray-400 text-black font-medium py-3 px-2 rounded-md text-"
        placeholder="Search Cryptocurrency Here ........ "
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="py-5">
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </div>
      ) : (
        <div className="py-5">
          <TableContainer component={Paper} className="overflow-x-auto md:overflow-visible">
            <Table
              sx={{ minWidth: 650, '@media screen and (max-width: 640px)': { minWidth: 'unset' }, backgroundColor: "#3067F0" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>

                  <TableCell sx={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>
                    Coin
                  </TableCell>
                {window.innerWidth > 650 && (
                  <>
                    <TableCell align="right" sx={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>24h Change</TableCell>
                    <TableCell align="right" sx={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>Market Cap</TableCell>
                  </>
                )}
                  <TableCell align="right" sx={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>
                    Price
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin) => (
                  <TableRow key={coin?.id} onClick={() => navigate(`/coin/${coin.id}`)} className=" bg-white hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                    <TableCell sx={{ fontWeight: 600, color: 'black', fontSize: '1.1rem', textAlign: 'right', display: 'flex', gap: 1, alignItems: 'center' }} >
                      <img className=" h-8 " src={coin?.image} alt={coin?.name} />
                      {coin?.name}
                    </TableCell>
                    {window.innerWidth > 650 && (
                    <>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'black', fontSize: '1.1rem', textAlign: 'right',}}>
                        {coin?.price_change_percentage_24h >= 0
                          ? <span className="text-[#38db46]">+{coin?.price_change_percentage_24h}</span>
                          : <span className="text-[#ff2c2c]">{coin?.price_change_percentage_24h}</span>}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'black', fontSize: '1.1rem', textAlign: 'right', }}>
                        {symbol}{isNaN(coin?.market_cap) ? 0 : Number(coin?.market_cap).toFixed(2)}{currency}
                      </TableCell>
                    </>
                  )}
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'black', fontSize: '1.1rem', textAlign: 'right', }}>
                      {symbol}{isNaN(coin?.market_cap) ? 0 : Number(coin?.market_cap).toFixed(2)}{currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={parseInt((handleSearch()?.length / 10).toFixed(0))} style={{
          display:'flex',
          justifyContent:'center',
          width:'100%' ,
          padding:'14px 14px'
        }}
          onChange={(event,value)=>{setPage(value)}}
         />
        </div>

      )}
    </div>
);
  
}
export default CoinList;

