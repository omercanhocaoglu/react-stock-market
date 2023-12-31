import { createContext, useState } from "react";

export const WatchlistContext = createContext();

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["GOOGL","MSFT","AMZN"]
    );
    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    };
    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock
        }));
    };

    return (
        <WatchlistContext.Provider value={{ watchList, addStock, deleteStock }}>
            {props.children}
        </WatchlistContext.Provider>)
};