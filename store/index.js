import { createStore, applyMiddleware } from "redux";
//import rootReduceers from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import AutenticacionReducer from "../reducers/AutenticacionReducer";
import CuentaReducer from "../reducers/CuentaReducer";
import PedidoReducer from "../reducers/PedidoReducer";
import { combineReducers } from "redux";

//import storage from "redux-persist/lib/storage";
import { AsyncStorage } from "react-native";
//import AsyncStorage from "@react-native-community/async-storage";
// import rootReducers from "../reducers";

import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const pReducer = persistReducer(
    persistConfig,
    combineReducers({
        AutenticacionReducer,
        CuentaReducer,
        PedidoReducer,
    })
);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
