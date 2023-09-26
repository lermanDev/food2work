import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import Cuenta from "../screens/Cuenta";
import Inicio from "../screens/Inicio";
import Test from "../screens/TestScreen";
import { Text, View } from "react-native";
import ProductDetailsScreen from "../screens/ProductDetailScreen";
import Planificacion from "../screens/Planificacion";
import Pedidos from "../screens/Pedidos";

import {
    CuentaSetting,
    CuentaPassword,
    CuentaEmpresa,
    CuentaDirecciones,
    CuentaDireccionDefecto,
    CuentaPagoDefecto,
} from "../screens/CuentaSetting";

const BottomTab = createBottomTabNavigator();
const StackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = "Inicio";

const SettingsStack = createStackNavigator();

function SettingsStackScreen({ navigation, route }) {
    navigation.setOptions({
        headerShown: null,
    });
    return (
        <SettingsStack.Navigator screenOptions={screenOptions}>
            <SettingsStack.Screen
                name="Cuenta"
                component={Cuenta}
                options={{ title: "Cuenta" }}
            />
            <SettingsStack.Screen
                name="Informacion"
                component={CuentaSetting}
                options={({ route, navigation }) => ({
                    headerTitle: "Información",
                    title: "Información",
                    route: { route },
                    navigation: { navigation },
                })}
            />
            <SettingsStack.Screen
                name="Password"
                component={CuentaPassword}
                options={({ route, navigation }) => ({
                    headerTitle: "Cambiar Password",
                    title: "Cambiar Password",
                    route: { route },
                    navigation: { navigation },
                })}
            />
            <SettingsStack.Screen
                name="Empresa"
                component={CuentaEmpresa}
                options={({ route, navigation }) => ({
                    headerTitle: "Cambiar Empresa",
                    title: "Cambiar Empresa",
                    route: { route },
                    navigation: { navigation },
                })}
            />
            <SettingsStack.Screen
                name="Direcciones"
                component={CuentaDirecciones}
                options={({ route, navigation }) => ({
                    headerTitle: "Direcciones",
                    title: "Direcciones",
                    route: { route },
                    navigation: { navigation },
                })}
            />
            <SettingsStack.Screen
                name="DireccionDefecto"
                component={CuentaDireccionDefecto}
                options={({ route, navigation }) => ({
                    headerTitle: "Dirección por defecto",
                    title: "Dirección por defecto",
                    route: { route },
                    navigation: { navigation },
                })}
            />
            <SettingsStack.Screen
                name="PagoDefecto"
                component={CuentaPagoDefecto}
                options={({ route, navigation }) => ({
                    headerTitle: "Pago por defecto",
                    title: "Pago por defecto",
                    route: { route },
                    navigation: { navigation },
                })}
            />
        </SettingsStack.Navigator>
    );
}

const HomeStack = createStackNavigator();

function HomeStackStackScreen({ navigation, route }) {
    navigation.setOptions({
        headerTitle: getHeaderTitle(route),
        headerShown: getHeaderShown(route),
        headerLayoutPreset: "center",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            fontWeight: "bold",
            textAlignVertical: "center",
        },
    });
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Inicio"
                component={Inicio}
                options={{ title: "Inicio" }}
            />
            <HomeStack.Screen
                name="Details"
                component={ProductDetailsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: "Producto",
                    title: "Producto",
                    route: { route },
                    navigation: { navigation },
                })}
            />
        </HomeStack.Navigator>
    );
}

const PlanificacionStack = createStackNavigator();

function PlanificacionStackStackScreen({ navigation, route }) {
    navigation.setOptions({
        //headerTitle: getHeaderTitle(route),
        //headerShown: getHeaderShown(route),
        headerLayoutPreset: "center",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            fontWeight: "bold",
            textAlignVertical: "center",
        },
    });
    return (
        <PlanificacionStack.Navigator>
            <PlanificacionStack.Screen
                name="Planificacion"
                component={Planificacion}
                options={{ title: "Planificacion" }}
            />
            {/*<Planificacion.Screen
                name="Details"
                component={ProductDetailsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: "Producto",
                    title: "Producto",
                    route: { route },
                    navigation: { navigation },
                })}
            />*/}
        </PlanificacionStack.Navigator>
    );
}

export default function BottomTabNavigator({ navigation, route }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({
        headerTitle: getHeaderTitle(route),
        headerShown: getHeaderShown(route),
        headerLayoutPreset: "center",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 1,
            fontWeight: "bold",
            textAlignVertical: "center",
        },
    });

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Inicio"
                component={HomeStackStackScreen}
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-home" />
                    ),
                }}
            />
            {/*<BottomTab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
                    tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="md-book"/>,
                }}
            />*/}
            <BottomTab.Screen
                name="Planificacion"
                component={PlanificacionStackStackScreen}
                options={{
                    title: "Planificación",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-calendar" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Pedidos"
                component={Pedidos}
                options={{
                    title: "Pedidos",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-list-box" />
                    ),
                }}
            />
            {/*<BottomTab.Screen
                name="Test"
                component={Test}
                options={{
                    title: "Test",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-key" />
                    ),
                }}
            />*/}
            <BottomTab.Screen
                name="Cuenta"
                component={SettingsStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-contact" />
                    ),
                    headerShown: false,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName =
        route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case "Planificacion":
            return "Planificación Mensual";
        case "Inicio":
            return "Inicio";
        case "Pedidos":
            return "Últimos pedidos";
        case "Cuenta":
            return "Cuenta";
    }
}

function getHeaderShown(route) {
    const routeName =
        route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case "Planificacion":
            return false;
        case "Inicio":
            return false;
        case "Pedidos":
            return true;
        case "Cuenta":
            return false;
    }
}

const screenOptions = {
    headerStyle: {
        backgroundColor: "#ed6f37",
    },
    headerTintColor: "#ffff",
};
