import React, { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import "./style.css";
import { WatchlistContext } from './Context';


function AutoComplete() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchlistContext)

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search
          }
        });
        // console.log(response);
        if (isMounted) {
          setResults(response.data.result);
        }
        // console.log(results)
      } catch (error) {
        console.log(error.response)
      };
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([])
    }
    return () => (isMounted = false);
  }, [search])

  const showDropDown = () => {
    const dropDown = search ? "show" : "";

    return <ul className={`dropdown-menu ${dropDown}`}>
      {results.map((result) => (
        <li onClick={()=> {
          addStock(result.symbol)
          setSearch("")
        }} className='dropdown-item' key={result.symbol}>
          {result.description} ({result.symbol})
        </li>
      ))}
    </ul>
  }

  return (
    <div>
      <div className='w-50 p-5 rounded mx-auto'>
        <div className='form-floating dropdown'>
          <input type="text" id='search' className='form-control'
            placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} />
          <label htmlFor="search"> Search </label>
          {showDropDown()}
        </div>
      </div>
    </div>
  )
}


export default AutoComplete;
