const initialState = {
    authToken: "",
    loginando: false,
    desloginando: false,
    authError: "",
};

const AutenticacionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGINANDO":
            return {
                ...state,
                loginando: true,
            };
        case "LOGIN":
            return {
                ...state,
                authToken: action.authToken,
                authError: action.authError,
                loginando: false,
            };
        case "DESLOGINANDO":
            return {
                ...state,
                desloginando: true,
            };
        case "LOGOUT":
            return {
                ...state,
                authToken: action.status,
                desloginando: false,
            };
        case "CLEAR_AUTHERROR":
            return {
                ...state,
                authError: "",
            };
        default:
            return state;
    }
};

export default AutenticacionReducer;
