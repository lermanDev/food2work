import React from "react";
import Registro from "../screens/Registro";
import RecordarPass from "../screens/RecordarPass";
import Login from "../screens/Login";
import BottomTabNavigator from "./BottomTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "../actions/autenticacionActions";
import { connect } from "react-redux";

const Stack = createStackNavigator();
/*class Principal extends React.Component {

    render() {
        const authToken = useSelector(state => state.autenticacionReducer.authToken)
        const loginando = useSelector(state => state.autenticacionReducer.loginando)
        const desloginando = useSelector(state => state.autenticacionReducer.desloginando)

        return (
            <Stack.Navigator screenOptions={screenOptions}>
                {!authToken ? (
                    <>
                        <Stack.Screen name="Login"
                                      options={{
                                          headerShown: false,
                                      }}
                                      component={Login}/>
                        <Stack.Screen name="Registro" component={Registro} options={{title: 'Registro'}}/>
                        <Stack.Screen name="RecordarPass" component={RecordarPass} options={{title: 'Reestablecer Contraseña'}}/>
                    </>
                ) : (
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>
                )}
            </Stack.Navigator>
        )
    }
}*/

export default function Principal({ navigation }) {
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );
    const loginando = useSelector(
        (state) => state.AutenticacionReducer.loginando
    );
    const desloginando = useSelector(
        (state) => state.AutenticacionReducer.desloginando
    );

    /*useEffect(() => {
        dispatch(loadPosts())
    },[])*/

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            {!authToken ? (
                <>
                    <Stack.Screen
                        name="Login"
                        options={{
                            headerShown: false,
                        }}
                        component={Login}
                    />
                    <Stack.Screen
                        name="Registro"
                        component={Registro}
                        options={{ title: "Registro" }}
                    />
                    <Stack.Screen
                        name="RecordarPass"
                        component={RecordarPass}
                        options={{ title: "Reestablecer Contraseña" }}
                    />
                </>
            ) : (
                <Stack.Screen name="Root" component={BottomTabNavigator} />
            )}
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: "#ed6f37",
    },
    headerTintColor: "#ffff",
};

// export default Principal;
