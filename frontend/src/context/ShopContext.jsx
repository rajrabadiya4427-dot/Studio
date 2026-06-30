import { createContext } from "react";
import { data } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";

    const value = {
        data,
        currency
    }

    return (
        <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
    )

}

export default ShopContextProvider