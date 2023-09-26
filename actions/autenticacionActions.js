import config from "../constants/Config";
import { Buffer } from "buffer";

export const loginAction = (authToken, authError) => {
    return {
        type: "LOGIN",
        authToken,
        authError,
    };
};

export function login(username, password) {
    return async (dispatch) => {
        //console.log(process.env.NODE_ENV);
        const authError = "";

        dispatch({ type: "LOGINANDO" });
        const response = await fetch(config.API_HOST + "/api/auth/login/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Basic " +
                    new Buffer(username + ":" + password).toString("base64"),
            },
        }).catch((error) => {
            console.log(error);
            dispatch(loginAction("", String(error)));
        });
        if (response.status !== 200) {
            const data = await response.json();
            // console.log(data.detail);
            dispatch(loginAction("", String(data.detail)));
        } else {
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            dispatch(loginAction(data["token"], ""));
        }
    };
}

export const logoutAction = (status) => {
    return {
        type: "LOGOUT",
        status,
    };
};

export function logout(token) {
    return async (dispatch) => {
        dispatch({ type: "DESLOGINANDO" });
        try {
            const response = await fetch(
                config.API_HOST + "/api/auth/logout/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "token " + token,
                    },
                }
            );
            if (response.status == 401) {
                dispatch(logoutAction(""));
            }

            if (response.status !== 204) {
                dispatch(logoutAction(""));
            } else {
                dispatch(logoutAction(""));
            }
        } catch (error) {
            dispatch(logoutAction(""));
        }
    };
}

export function checktoken(token) {
    return async (dispatch) => {
        const response = await fetch(config.API_HOST + "/api/auth/login/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    "Basic " +
                    new Buffer(username + ":" + password).toString("base64"),
            },
        });
        if (response.status !== 200) {
            // dispatch(loginAction("Error"));
            console.log(response.json());
        } else {
            console.log(response);
            const data = await response.json();
            dispatch(loginAction(data["token"]));
        }
    };
}

export function clear_autherror() {
    return async (dispatch) => {
        dispatch({ type: "CLEAR_AUTHERROR" });
    };
}
