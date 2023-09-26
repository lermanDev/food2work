import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import TabBarIcon from "./TabBarIcon";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ListaProductos from "./ListaProductos";
import { useEffect } from "react";
import { updateMenusDisponiblesFechaAction } from "../actions/PedidoActions";

export default function ListadoProductos({ navigation }) {
    const dispatch = useDispatch();

    const [index, setIndex] = React.useState(0);

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const fecha_pedido = useSelector(
        (state) => state.PedidoReducer.fecha_pedido
    );

    const fecha_pedido_formateada = useSelector(
        (state) => state.PedidoReducer.fecha_pedido_formateada
    );

    const id_empresa = useSelector((state) => state.CuentaReducer.id_empresa);

    const empresa_info = useSelector(
        (state) => state.CuentaReducer.empresa_info
    );

    const direccion_defecto = useSelector(
        (state) => state.CuentaReducer.direccion_defecto
    );

    const direcciones = useSelector((state) => state.CuentaReducer.direcciones);

    const menus_disponibles_fecha = useSelector(
        (state) => state.PedidoReducer.menus_disponibles_fecha
    );

    const [routes, setRoutes] = React.useState([
        { key: "platos", title: "Platos" },
        { key: "ensaladas", title: "Ensaladas" },
        { key: "tapas", title: "Tapas" },
        { key: "bebidas", title: "Bebidas" },
        { key: "postres", title: "Postres" },
    ]);

    /*useEffect(() => {
        dispatch(updateMenusDisponiblesFechaAction([], []));
    });*/

    /*useEffect(() => {
        dispatch(
            updateMenusDisponiblesFechaAction(menus_disponibles_fecha_2, [])
        );
        console.log(menus_disponibles_fecha);
    });*/

    // console.log(menus_disponibles_fecha);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "platos":
                return (
                    <ListaProductos
                        productos={menus_disponibles_fecha["PLATOS"]}
                    />
                );
            case "ensaladas":
                return (
                    <ListaProductos
                        productos={menus_disponibles_fecha["ENSALADAS"]}
                    />
                );
            case "tapas":
                return (
                    <ListaProductos
                        productos={menus_disponibles_fecha["TAPAS"]}
                    />
                );
            case "bebidas":
                return (
                    <ListaProductos
                        productos={menus_disponibles_fecha["BEBIDAS"]}
                    />
                );
            case "postres":
                return (
                    <ListaProductos
                        productos={menus_disponibles_fecha["POSTRES"]}
                    />
                );
            default:
                return null;
        }
    };

    /*renderScene = SceneMap({
        platos: ListaProductos,
        ensaladas: ListaProductos,
        tapas: ListaProductos,
        bebidas: ListaProductos,
        postres: ListaProductos,
    });*/

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            sceneContainerStyle={{ backgroundColor: "white", padding: 5 }}
            renderTabBar={(props) => {
                return (
                    <TabBar
                        {...props}
                        onTabPress={({ route }) => {
                            // console.log(route)
                        }}
                        activeColor={"#ed6f37"}
                        inactiveColor={"#999999"}
                        labelStyle={{ fontSize: 12 }}
                        tabStyle={{ padding: 0 }}
                        indicatorStyle={{ backgroundColor: "#ed6f37" }}
                        style={{ backgroundColor: "#ffffff" }}
                    />
                );
            }}
        />
    );
}
