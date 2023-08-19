import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart';
import finnHub from '../apis/finnHub';
import StockData from './StockData';

const formatData = (data) => {
  return (
    data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: data.c[index]
      }
    })
  )
};

function StockDetailPage() {
  const x = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      }
      else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      };
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol: x.symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: x.symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: x.symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W"
            }
          })
        ]);
        // console.log(responses);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        });
      } catch (error) {
        console.log(error);
      };
    };

    fetchData();
  }, [x.symbol]);

  return (
    <div>
      <div>
        { chartData && (
          <div>
            <StockChart chartData={chartData} symbol={x.symbol} />
            <StockData symbol={x.symbol}/>
          </div>
        )  }
      </div>
    </div>
  )
}

export default StockDetailPage;