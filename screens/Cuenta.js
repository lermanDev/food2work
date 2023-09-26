import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { login, logout } from "../actions/autenticacionActions";
import { load_perfil, update_perfil } from "../actions/CuentaActions";

import { connect, useDispatch, useSelector } from "react-redux";

import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    ListItem,
    List,
    Badge,
    Left,
    Right,
    Body,
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
import config from "../constants/Config";

export default function Cuenta({ navigation }) {
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );
    const estados = useSelector((state) => state.AutenticacionReducer);

    const dispatch = useDispatch();

    const usuario = useSelector((state) => state.CuentaReducer.usuario);

    const nombre = useSelector((state) => state.CuentaReducer.nombre);

    const apellido = useSelector((state) => state.CuentaReducer.apellido);

    const id_empresa = useSelector((state) => state.CuentaReducer.id_empresa);

    const notificaciones = useSelector(
        (state) => state.CuentaReducer.notificaciones
    );

    const metodo_pago = useSelector((state) => state.CuentaReducer.metodo_pago);
    const metodo_pago_posibles = useSelector(
        (state) => state.CuentaReducer.metodo_pago_posibles
    );

    const direccion_defecto = useSelector(
        (state) => state.CuentaReducer.direccion_defecto
    );

    const direcciones = useSelector((state) => state.CuentaReducer.direcciones);

    const [contrasena, setContrasena] = useState("");

    const click_notificacion = (value) => {
        dispatch(
            update_perfil(
                nombre,
                apellido,
                id_empresa,
                value,
                metodo_pago,
                direccion_defecto,
                authToken
            )
        );
        console.log(
            "Clic en notificaciones " +
                String(value) +
                " " +
                String(notificaciones)
        );

        console.log(estados.metodo_pago);
    };

    useEffect(() => {
        // Necesitamos al montar el screen obtener la información del usuario
        dispatch(load_perfil(authToken));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ed6f37" }}>
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem avatar first>
                            <Thumbnail
                                small
                                source={{
                                    uri:
                                        "https://i.ibb.co/ZfYDk5G/logo-pequeno.png",
                                }}
                            />
                            <Body style={{ marginRight: 10 }}>
                                <Text style={{ fontSize: 15 }}>
                                    {nombre} {apellido}
                                </Text>
                                <Text style={{ fontSize: 13 }}>{usuario}</Text>
                            </Body>
                        </ListItem>
                        <Separator bordered>
                            <Text>SOBRE MI</Text>
                        </Separator>
                        <ListItem
                            icon
                            button={true}
                            onPress={() => navigation.navigate("Informacion")}
                        >
                            <Left>
                                <Ionicons
                                    style={{ color: "#007AFF" }}
                                    size={25}
                                    name="ios-contact"
                                />
                            </Left>
                            <Body>
                                <Text>Cuenta</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            icon
                            button={true}
                            onPress={() => navigation.navigate("Password")}
                        >
                            <Left>
                                <Ionicons
                                    style={{ color: "#98989a" }}
                                    size={25}
                                    name="md-key"
                                />
                            </Left>
                            <Body>
                                <Text>Contraseña</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            icon
                            button={true}
                            onPress={() => navigation.navigate("Empresa")}
                        >
                            <Left>
                                <Ionicons
                                    style={{ color: "#584dd4" }}
                                    size={25}
                                    name="ios-briefcase"
                                />
                            </Left>
                            <Body>
                                <Text>Empresa</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            icon
                            button={true}
                            onPress={() => navigation.navigate("Direcciones")}
                        >
                            <Left>
                                <Button style={{ backgroundColor: "white" }}>
                                    <Ionicons
                                        style={{ color: "#ea3b2d" }}
                                        size={25}
                                        name="ios-pin"
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Direcciones</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text>NOTIFICACIONES</Text>
                        </Separator>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "white" }}>
                                    <Ionicons
                                        style={{ color: "#FF9501" }}
                                        size={25}
                                        name="md-notifications"
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Notificaciones</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={notificaciones}
                                    trackColor="#50B948"
                                    button={true}
                                    onValueChange={(value) => {
                                        click_notificacion(value);
                                    }}
                                />
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text>ENVÍO</Text>
                        </Separator>
                        <ListItem
                            icon
                            button={true}
                            onPress={() =>
                                navigation.navigate("DireccionDefecto")
                            }
                        >
                            <Left>
                                <Button style={{ backgroundColor: "white" }}>
                                    <Ionicons
                                        style={{ color: "#4eacd1" }}
                                        size={25}
                                        name="ios-navigate"
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Dirección por defecto</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                            icon
                            button={true}
                            onPress={() => navigation.navigate("PagoDefecto")}
                        >
                            <Left>
                                <Button style={{ backgroundColor: "white" }}>
                                    <Ionicons
                                        style={{ color: "#2e8033" }}
                                        size={25}
                                        name="ios-card"
                                    />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Método de pago</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator bordered>
                            <Text></Text>
                        </Separator>
                        <ListItem
                            last
                            button={true}
                            onPress={() => dispatch(logout(authToken))}
                        >
                            <Body
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <Ionicons
                                    style={{ color: "red", marginRight: 10 }}
                                    size={25}
                                    name="ios-power"
                                />
                                <Text style={{ color: "red" }}>
                                    Cerrar sesión
                                </Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    contentContainer: {
        padding: 15,
        justifyContent: "center",
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: "#fdfdfd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: "#ededed",
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: "flex-start",
        marginTop: 1,
    },
    boton_iniciar: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ed6f37",
        borderRadius: 10,
        width: 350,
        justifyContent: "center",
        alignItems: "center",
        height: 55,
    },
});
