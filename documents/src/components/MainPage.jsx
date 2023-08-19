import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import StockOverviewPage from './StockOverviewPage';
import StockDetailPage from './StockDetailPage';
import Header from './Header';
import NotFound from './NotFound';
import { WatchListContextProvider } from './Context';

function MainPage () {
  return (
    <div>
        <div className='container text-center'>
          <WatchListContextProvider>
            <Router>
            <Header />
                <Routes>
                    <Route path='/' element={ <StockOverviewPage /> } />
                    <Route path='/detail/:symbol' element={ <StockDetailPage /> } />
                    <Route path='*' element={ <NotFound /> }/>
                </Routes>
            </Router>
          </WatchListContextProvider>
        </div>
    </div>
  )
}

export default MainPage;