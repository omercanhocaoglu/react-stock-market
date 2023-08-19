import React from 'react';
import AutoComplete from './AutoComplete';
import StockList from './StockList';

function StockOverviewPage () {
  return (
    <div>        
        <div>
            <AutoComplete />
            <StockList />
        </div>
    </div>
  )
}

export default StockOverviewPage;