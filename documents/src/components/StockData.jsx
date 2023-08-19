import React, {useState, useEffect} from 'react';
import finnHub from "../apis/finnHub";

function StockData({symbol}) {

    const [stockData, setStockData] = useState();
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params:{symbol}
                });
                // 
                if (isMounted) {
                    setStockData(response.data);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
        return () => (isMounted = false);
    },[symbol])
    // console.log(stockData);
  
    return (
    <div> 
        <div>
            {stockData && (
                <div className='row border bg-white rounded shadow-sm p-4 mt-5'>
                    <div className="col">
                        <div>
                            <div>
                                <span className='fw-bold'>Name: </span>
                                 <span> {stockData.name} </span>
                            </div>
                            <div>
                                <span className="fw-bold">Country: </span>
                                <span> {stockData.country} </span>
                            </div>
                            <div>
                                <span className="fw-bold">Ticker: </span>
                                <span> {stockData.ticker} </span>

                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div>
                            <span className="fw-bold">Exchange: </span>
                            <span> {stockData.exchange} </span>
                        </div>
                        <div>
                            <span className="fw-bold">Industry: </span>
                            <span> {stockData.finnhubIndustry} </span>
                        </div>
                        <div>
                            <span className="fw-bold">IPO: </span>
                            <span> {stockData.ipo} </span>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div>
                            <span className="fw-bold">Market Cap: </span>
                            <span> { stockData.marketCapitalization } </span>
                        </div>
                        <div>
                            <span className="fw-bold"> Shares Outstanding: </span>
                            <span> {stockData.shareOutstanding} </span>
                        </div>
                        <div>
                            <span className='fw-bold'>URL: </span>
                            <span> <a target='blank' href={stockData.weburl}> {stockData.weburl} </a> </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    
    </div>
  )
};

export default StockData;