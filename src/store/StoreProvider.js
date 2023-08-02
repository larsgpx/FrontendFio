import { createContext, useReducer } from "react";
import storeReducer, { initialStore } from "./StoreReducer";

const StoreContext = createContext()

//  the provider component that wraps the app

const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(storeReducer, initialStore)
    return <StoreContext.Provider value={[store, dispatch]}>{children}</StoreContext.Provider>
}

export { StoreContext }
export default StoreProvider;