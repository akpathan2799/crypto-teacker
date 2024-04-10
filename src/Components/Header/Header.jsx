
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../../Context/context";
function Header() {

    const {currency ,setCurrency} = useContext(CurrencyContext)
    const handleChange = (e) => {
        setCurrency(e.target.value);
       
     

    }
  return (
    <>
      <header className=" w-full bg-[#3067F0] py-2  shadow-lg">
        <nav className="max-w-[1400px]   m-auto flex justify-between items-center py-1 px-2">
          <Link to="/">
            <h3 className=" text-xl font-bold text-white">Crypto Trendz</h3>
          </Link>

          <div className=" w-28 focus-within:ring-2 focus-within:ring-white ">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              aria-label="Currency"
              className="block w-full text-white pb-1 bg-transparent outline-none border-2 border-white"
              value={currency}
              onChange={(e)=>handleChange(e)}
              placeholder="Currency"
            >
             
              <option className="bg-[#3067F0] text-white" value='INR'>INR</option>
              <option className="bg-[#3067F0] text-white" value='USD'>USD</option>
            </select>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
