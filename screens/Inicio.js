import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useRef } from "react";
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
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Logo from "../components/Logo";
import Registro from "./Registro";
import Login from "./Login";
import { Platform } from "react-native";
import { login, logout } from "../actions/autenticacionActions";
import {
    updateFechasAction,
    carga_menus,
    busca_menus,
} from "../actions/PedidoActions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect, useDispatch, useSelector } from "react-redux";
import ListadoProductos from "../components/ListadoProductos";
import ListaProductos from "../components/ListaProductos";
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
import { useEffect, useState } from "react";
import BotonInput from "../components/BotonInput";
import { Modalize } from "react-native-modalize";
import { load_perfil, update_perfil } from "../actions/CuentaActions";
import { createStackNavigator } from "@react-navigation/stack";

export default function Inicio({ navigation, route }) {
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

    const dispatch = useDispatch();

    const menus_disponibles_buscar = useSelector(
        (state) => state.PedidoReducer.menus_disponibles_buscar
    );

    const actualizando_menus = useSelector(
        (state) => state.PedidoReducer.actualizando_menus
    );

    // console.log(direccion_defecto);
    // console.log(direcciones);

    var nombre_direccion = direcciones.filter(function (itm) {
        if (itm.id == direccion_defecto) {
            return itm;
        }
        //return empIds.indexOf(itm.id) == direccion_defecto;
    });

    // console.log(direccion_defecto);
    // console.log(id_empresa);

    navigation.setOptions({
        headerTitle: (props) => (
            <TouchableOpacity onPress={() => openModal()}>
                {(direccion_defecto == 0 && id_empresa) ||
                direccion_defecto != 0 ? (
                    <View>
                        <Text style={{ fontSize: 16 }}>
                            {String(fecha_pedido_formateada)}
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                            {direccion_defecto == 0 &&
                                typeof empresa_info[0] !== "undefined" &&
                                empresa_info[0].nombre_direccion}
                            {direccion_defecto != 0 &&
                                typeof nombre_direccion[0] !== "undefined" &&
                                nombre_direccion[0].nombre_direccion}
                        </Text>
                    </View>
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
        ),

        headerRight: () => (
            <TouchableOpacity onPress={() => openModal()}>
                {(direccion_defecto == 0 && id_empresa) ||
                direccion_defecto != 0 ? (
                    <Ionicons
                        style={{ color: "#ed6f37", marginRight: 20 }}
                        size={30}
                        name="ios-arrow-down"
                    />
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
        ),

        headerLeft: () => (
            <TouchableOpacity onPress={() => openModal()}>
                {(direccion_defecto == 0 && id_empresa) ||
                direccion_defecto != 0 ? (
                    <Ionicons
                        style={{ color: "#ed6f37", marginLeft: 20 }}
                        size={40}
                        name="md-calendar"
                    />
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
        ),
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const modalizeRef = useRef(null);

    const openModal = () => {
        if (modalizeRef.current) {
            modalizeRef.current.open();
        }
    };

    const closeModal = () => {
        if (modalizeRef.current) {
            modalizeRef.current.close();
        }
    };

    const bs = React.createRef();

    useEffect(() => {
        // console.log(direccion_defecto);
    });
    const fecha_hoy = new Date();
    const fecha_manana = new Date();
    const fecha_max = new Date();
    fecha_max.setDate(fecha_hoy.getDate() + 30);

    const setFechas = () => {
        // Actualiza el título del documento usando la API del navegador

        fecha_manana.setDate(fecha_hoy.getDate());

        dispatch(updateFechasAction(fecha_manana, fecha_max));

        dispatch(carga_menus(fecha_pedido, direccion_defecto, authToken));

        //console.log(fecha_manana);
    };

    const [textoBuscar, setTextoBuscar] = useState("");

    useEffect(() => {
        // Necesitamos al montar el screen obtener la información del usuario
        dispatch(load_perfil(authToken));
    }, []);

    useEffect(() => {
        // Necesitamos al montar el screen obtener la información del usuario
        dispatch(load_perfil(authToken));
        if (!fecha_pedido) {
            fecha_manana.setDate(fecha_hoy.getDate());
            dispatch(carga_menus(fecha_manana, direccion_defecto, authToken));
        } else {
            dispatch(carga_menus(fecha_pedido, direccion_defecto, authToken));
        }
    }, [fecha_pedido, direccion_defecto, authToken]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ");
        dispatch(updateFechasAction(date, fecha_max));
        hideDatePicker();
    };

    useEffect(() => {
        if (textoBuscar == "") {
            dispatch(carga_menus(fecha_pedido, direccion_defecto, authToken));
        } else {
            //console.log("TENEMOS TEXTO " + textoBuscar);
        }
    }, [textoBuscar]);

    useEffect(() => {
        // console.log(Object.keys(menus_disponibles_buscar).length, textoBuscar);
    }, [menus_disponibles_buscar, actualizando_menus]);

    // console.log(direccion_defecto);
    // console.log(id_empresa);

    return (
        <Container style={styles.container}>
            {(direccion_defecto == 0 && id_empresa) ||
            direccion_defecto != 0 ? (
                <Container style={styles.container}>
                    <Modalize ref={modalizeRef} snapPoint={300}>
                        <View style={styles.panel}>
                            <TouchableOpacity
                                style={[styles.boton, styles.boton_registro]}
                                onPress={() => {
                                    if (
                                        Platform.OS === "android" ||
                                        Platform.OS === "ios"
                                    ) {
                                        showDatePicker();
                                    } else {
                                        setFechas();
                                    }
                                }}
                                underlayColor="#ed6f37"
                            >
                                <Text style={styles.registro_text}>
                                    Cambiar fecha
                                </Text>
                            </TouchableOpacity>
                            {!!(
                                Platform.OS === "android" ||
                                Platform.OS === "ios"
                            ) && (
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    date={fecha_manana}
                                    minimumDate={fecha_manana}
                                    maximumDate={fecha_max}
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            )}
                        </View>
                    </Modalize>
                    <Header
                        searchBar
                        style={{
                            paddingTop: 0,
                            height: 45,
                            backgroundColor: "white",
                        }}
                    >
                        <Item
                            style={{
                                borderRadius: 5,
                                backgroundColor: "#d6d6d6",
                            }}
                        >
                            <Icon name="ios-search" />
                            <Input
                                placeholder="Platos, Ingredientes ..."
                                value={textoBuscar ? textoBuscar : ""}
                                onChangeText={(value) => setTextoBuscar(value)}
                            />
                            {typeof menus_disponibles_buscar != "undefined" &&
                            Object.keys(menus_disponibles_buscar).length > 0 &&
                            textoBuscar != "" ? (
                                <Button
                                    transparent
                                    style={{ paddingRight: 10 }}
                                    onPress={() =>
                                        setTextoBuscar("") &&
                                        dispatch(
                                            carga_menus(
                                                fecha_pedido,
                                                direccion_defecto,
                                                authToken
                                            )
                                        )
                                    }
                                >
                                    <Text>Limpiar</Text>
                                </Button>
                            ) : (
                                <Button
                                    transparent
                                    style={{ paddingRight: 10 }}
                                    onPress={() =>
                                        dispatch(
                                            busca_menus(
                                                fecha_pedido,
                                                direccion_defecto,
                                                textoBuscar,
                                                authToken
                                            )
                                        )
                                    }
                                >
                                    <Text>Buscar</Text>
                                </Button>
                            )}
                        </Item>
                    </Header>
                    {typeof menus_disponibles_buscar != "undefined" &&
                    textoBuscar != "" &&
                    Object.keys(menus_disponibles_buscar).length > 0 ? (
                        <ListaProductos productos={menus_disponibles_buscar} />
                    ) : (
                        <ListadoProductos />
                    )}
                </Container>
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        padding: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>
                        Vaya, parece que no tienes ninguna dirección ni empresa,
                        puedes crear una dirección o añadir una empresa desde
                        ajustes, no olvides seleccionarla por defecto.
                    </Text>
                    <TouchableOpacity
                        style={[styles.boton, styles.boton_registro]}
                        onPress={() => navigation.navigate("Cuenta")}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.registro_text}>Ir a ajustes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8e8e8",
    },
    cabecera: {
        height: 80,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    boton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        alignSelf: "stretch",
    },
    registro_text: {
        color: "rgb(255,255,255)",
        textAlign: "center",
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        paddingRight: 10,
    },
    boton_registro: {
        backgroundColor: "#ed6f37",
    },
});
