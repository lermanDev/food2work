import AutenticacionReducer from "../reducers/AutenticacionReducer";
import CuentaReducer from "../reducers/CuentaReducer";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";

import thunk from "redux-thunk";

export const autenticationStore = compose(
    applyMiddleware(thunk)
    //applyMiddleware(logger),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(
    combineReducers({
        AutenticacionReducer,
        CuentaReducer,
    })
);

// debe ser esta por el async ×
// Error: Actions must be plain objects. Use custom middleware for async actions.
/*export default compose(applyMiddleware(thunk),applyMiddleware(logger))(createStore)(
    combineReducers(
        {
            autenticacionReducer  // VERSION ANTIGUA SIN HOOKS
        }
    )
);*/

/*
const rootReducer = combineReducers({
    autenticacionReducer: autenticacionReducer  // VERSIÓN ANTIGUA SIN HOOKS NO ASYNC
})

const configureStore = () => createStore(rootReducer);

export default configureStore;*/
