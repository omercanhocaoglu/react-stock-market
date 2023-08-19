import React, { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import "./style.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { WatchlistContext } from './Context';
import { useNavigate } from 'react-router-dom';

function StockList() {
    const [stock, setStock] = useState([]);
    // console.log(stock);
    const { watchList, deleteStock } = useContext(WatchlistContext);
    // console.log(watchList);
    const navigate = useNavigate();
    const changeColor = (change) => {
        return change > 0 ? "text-success" : "text-danger"
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }));
                // console.log(responses);
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                });
                // console.log(data);
                if (isMounted) {
                    setStock(data);
                }
            }
            catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
        return () => (isMounted = false);
    }, [watchList]);

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    };

    return (
        <div>
            <div>
                <table className='table hover mt-5'>
                    <thead>
                        <tr>
                            <th scope='col'> Name </th>
                            <th scope='col'> Last </th>
                            <th scope='col'> Chg </th>
                            <th scope='col'> Chg% </th>
                            <th scope='col'> High </th>
                            <th scope='col'> Low </th>
                            <th scope='col'> Open </th>
                            <th scope='col'> Pclose </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {stock.map((stockData) => (
                          <tr onClick={() => handleStockSelect(stockData.symbol)} 
                                className='table-row cursor-pointer' key={stockData.symbol}>
                                <th scope='row'> {stockData.symbol} </th>
                                <td> {stockData.data.c} </td>
                                <td className={stockData.data.d > 0 ? "text-success" : "text-danger"}>
                                    {stockData.data.d} {stockData.data.d > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                </td>
                                <td className={changeColor(stockData.data.dp)}>
                                    {stockData.data.dp} {stockData.data.dp > 0 ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                </td>
                                <td> {stockData.data.h} </td>
                                <td> {stockData.data.l} </td>
                                <td> {stockData.data.o} </td>
                                <td> 
                                    {stockData.data.pc}
                                </td>
                                <td>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    deleteStock(stockData.symbol)}} 
                                    className='btn btn-danger btn-sm d-inline-block delete-button'> 
                                        remove 
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StockList;