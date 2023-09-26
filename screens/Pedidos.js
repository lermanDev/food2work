import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Card,
    CardItem,
    ListItem,
    List,
    Badge,
    Left,
    Right,
    Body,
    Input,
    Switch,
    Thumbnail,
    Radio,
    Item,
    Picker,
    Form,
    Separator,
} from "native-base";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Alert,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Accordian from "../components/Accordian";
import { get_pedidos, borra_pedido } from "../actions/PedidoActions";

export default function Pedidos({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const [pedidos, setPedidos] = React.useState([
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 26/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 28/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 29/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
        {
            title: "Pedido 30/01/2020",
            data: [
                { key: "Paella Valenciana", value: true },
                { key: "Paella Mariscos", value: true },
                { key: "Paella Verduras", value: false },
                { key: "Arroz al horno", value: true },
            ],
        },
    ]);

    const dispatch = useDispatch();

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const actualizando_pedidos = useSelector(
        (state) => state.PedidoReducer.actualizando_pedidos
    );

    const pedidos_redux = useSelector((state) => state.PedidoReducer.pedidos);

    const renderAccordians = () => {
        const items = [];
        for (let item of Object.keys(pedidos_redux)) {
            if (pedidos_redux[item].length > 0) {
                var tiene_pedido = false;
                Object.keys(pedidos_redux[item]).some(function (k) {
                    if (pedidos_redux[item][k]["facturado"] === true) {
                        tiene_pedido = true;
                    }
                });
                if (tiene_pedido) {
                    items.push(
                        <Accordian
                            key={item}
                            title={"Pedido: " + String(item)}
                            data={pedidos_redux[item]}
                        />
                    );
                }
            }
        }
        return items;
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            const fecha = new Date();
            var fecha_filtro = fecha.toISOString().split("T")[0];

            dispatch(get_pedidos(fecha_filtro, authToken));
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>{renderAccordians()}</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
