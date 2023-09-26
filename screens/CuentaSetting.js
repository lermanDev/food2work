import * as React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Button,
    Alert,
    ScrollView,
    Platform,
} from "react-native";
import BotonInput from "../components/BotonInput";
import config from "../constants/Config";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Separator, Right } from "native-base";
import {
    updateNombreAction,
    load_perfil,
    updateNombre,
    updatePassword,
    update_perfil,
    add_direccion,
    delete_direccion,
} from "../actions/CuentaActions";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Container } from "native-base";

export function CuentaSetting({ navigation }) {
    /*navigation.setOptions({
        headerShown: false,
    });*/

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const nombre = useSelector((state) => state.CuentaReducer.nombre);
    const apellido = useSelector((state) => state.CuentaReducer.apellido);

    const dispatch = useDispatch();

    const [nombre_local, setNombre] = useState("");
    const [apellido_local, setApellido] = useState("");

    const actualizando_usuario = useSelector(
        (state) => state.CuentaReducer.actualizando_usuario
    );
    const error_log = useSelector((state) => state.CuentaReducer.error_log);

    return (
        <View style={(styles.container, { marginTop: 20, padding: 10 })}>
            <View style={styles.input_view}>
                <Text style={styles.subtitulo_text}>Nombre*</Text>
                <TextInput
                    placeholder={nombre}
                    placeholderTextColor="#1c1c1c"
                    style={styles.input}
                    onChangeText={(value) => {
                        setNombre(value);
                    }}
                />
            </View>
            <View style={styles.input_view}>
                <Text style={styles.subtitulo_text}>Apellido*</Text>
                <TextInput
                    placeholder={apellido}
                    placeholderTextColor="#1c1c1c"
                    style={styles.input}
                    onChangeText={(value) => {
                        setApellido(value);
                    }}
                />
            </View>
            <TouchableOpacity
                style={[styles.boton]}
                onPress={() => {
                    dispatch(
                        updateNombre(nombre_local, apellido_local, authToken)
                    );
                }}
                underlayColor="#ed6f37"
            >
                <Text style={styles.clave_text}>GUARDAR</Text>
                {!!actualizando_usuario && alert("Se ha borrado su direccion")}
            </TouchableOpacity>
        </View>
    );
}

export function CuentaPassword({ navigation }) {
    /*navigation.setOptions({
        headerShown: false,
    });*/

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const usuario = useSelector((state) => state.CuentaReducer.usuario);

    const dispatch = useDispatch();

    const actualizando_usuario = useSelector(
        (state) => state.CuentaReducer.actualizando_usuario
    );

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <View style={(styles.container, { marginTop: 20, padding: 10 })}>
            <View style={styles.input_view}>
                <Text style={styles.subtitulo_text}>Contraseña nueva*</Text>
                <TextInput
                    placeholder={"Contraseña nueva*"}
                    placeholderTextColor="#1c1c1c"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        setNewPassword(value);
                    }}
                />
            </View>
            <View style={styles.input_view}>
                <Text style={styles.subtitulo_text}>Contraseña antigua*</Text>
                <TextInput
                    placeholder={"Contraseña antigua*"}
                    placeholderTextColor="#1c1c1c"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        setOldPassword(value);
                    }}
                />
            </View>
            <TouchableOpacity
                style={[styles.boton]}
                onPress={() => {
                    dispatch(
                        updatePassword(
                            usuario,
                            oldPassword,
                            newPassword,
                            authToken
                        )
                    );
                }}
                underlayColor="#ed6f37"
            >
                <Text style={styles.clave_text}>GUARDAR</Text>
                {actualizando_usuario && <Text>Actualizando ...</Text>}
            </TouchableOpacity>
        </View>
    );
}

export function CuentaEmpresa({ navigation }) {
    /*navigation.setOptions({
        headerShown: false,
    });*/

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const usuario = useSelector((state) => state.CuentaReducer.usuario);
    const id_empresa = useSelector((state) => state.CuentaReducer.id_empresa);
    const empresa_info = useSelector(
        (state) => state.CuentaReducer.empresa_info
    );

    const dispatch = useDispatch();

    const actualizando_usuario = useSelector(
        (state) => state.CuentaReducer.actualizando_usuario
    );

    const [localIdEmpresa, setLocalIdEmpresa] = useState("");

    return (
        <View style={styles.container}>
            {!!id_empresa && empresa_info[0] && (
                <View style={styles.card_direccion}>
                    <View style={styles.titulo_direccion}>
                        <Ionicons
                            style={{ color: "#ed6f37", marginRight: 10 }}
                            size={25}
                            name="ios-pin"
                        />
                        <Text style={{ color: "#ed6f37", fontWeight: "600" }}>
                            Direccion Empresa
                        </Text>
                        <Right>
                            <Text style={{ color: "#ed6f37" }}>
                                ID: {id_empresa}
                            </Text>
                        </Right>
                    </View>
                    <View style={styles.direccion_info}>
                        <Text style={styles.estilo_direccion}>
                            {empresa_info[0].direccion}
                        </Text>
                        <Text style={styles.estilo_direccion}>
                            {empresa_info[0].anotaciones}
                        </Text>
                        <Text style={styles.estilo_direccion}>
                            {empresa_info[0].telefono}
                        </Text>
                        <Text style={styles.estilo_direccion}>
                            {empresa_info[0].codigo_postal}{" "}
                            {empresa_info[0].ciudad}
                        </Text>
                    </View>
                </View>
            )}

            <View style={(styles.card, styles.card_2)}>
                <Separator bordered>
                    <Text>Cambiar ID empresa actual </Text>
                </Separator>

                <View style={(styles.input_view, styles.input_view2)}>
                    <TextInput
                        placeholder={"Nuevo ID empresa*"}
                        placeholderTextColor="#1c1c1c"
                        style={styles.input}
                        onChangeText={(value) => {
                            setLocalIdEmpresa(value);
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.boton]}
                    onPress={() => {
                        dispatch(
                            update_perfil(
                                "",
                                "",
                                localIdEmpresa,
                                "",
                                "",
                                "",
                                authToken
                            )
                        );
                    }}
                    underlayColor="#ed6f37"
                >
                    <Text style={styles.clave_text}>GUARDAR</Text>
                    {actualizando_usuario && <Text>Actualizando ...</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export function CuentaDirecciones({ navigation }) {
    /*navigation.setOptions({
        headerShown: false,
    });*/

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const usuario = useSelector((state) => state.CuentaReducer.usuario);

    const direcciones = useSelector((state) => state.CuentaReducer.direcciones);

    const dispatch = useDispatch();

    const actualizando_usuario = useSelector(
        (state) => state.CuentaReducer.actualizando_usuario
    );

    const [idDireccion, setIdDireccion] = useState("");
    const [nombreDireccion, setNombreDireccion] = useState("");
    const [telefonoDireccion, setTelefonoDireccion] = useState("");
    const [ciudadDireccion, setCiudadDireccion] = useState("");
    const [direccionDireccion, setDireccionDireccion] = useState("");
    const [anotacionDireccion, setAnotacionDireccion] = useState("");
    const [codigoPostalDireccion, setCodigoPostalDireccion] = useState("");

    const modalizeRef = useRef(null);

    const [direccionMod, setDireccionMod] = useState({});

    const [didMount, setDidMount] = useState(false);
    useEffect(() => setDidMount(true), []);

    useEffect(() => {
        if (direccionMod && didMount) {
            cargaDireccion(direccionMod);
            abrirModal();
        }
    }, [direccionMod]);

    const cargaDireccion = (direccionMod) => {
        setIdDireccion(direccionMod.id);
        setNombreDireccion(direccionMod.nombre_direccion);
        setTelefonoDireccion(direccionMod.telefono);
        setCiudadDireccion(direccionMod.ciudad);
        setDireccionDireccion(direccionMod.direccion);
        setAnotacionDireccion(direccionMod.anotaciones);
        setCodigoPostalDireccion(direccionMod.codigo_postal);
    };

    const abrirModal = () => {
        console.log(direccionMod);
        if (modalizeRef.current) {
            modalizeRef.current.open();
        }
    };

    const cierraModal = () => {
        console.log(direccionMod);
        if (modalizeRef.current) {
            modalizeRef.current.close();
            setIdDireccion("");
            setNombreDireccion("");
            setTelefonoDireccion("");
            setCiudadDireccion("");
            setDireccionDireccion("");
            setAnotacionDireccion("");
            setCodigoPostalDireccion("");
        }
    };

    //console.log(direcciones);

    return (
        <Container style={styles.container}>
            <Modalize ref={modalizeRef} snapPoint={600}>
                <View style={styles.panel}>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>Nombre*</Text>
                        <TextInput
                            placeholder={
                                nombreDireccion
                                    ? nombreDireccion
                                    : "Nombre dirección"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={nombreDireccion ? nombreDireccion : ""}
                            onChangeText={(value) => {
                                setNombreDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>Teléfono*</Text>
                        <TextInput
                            placeholder={
                                telefonoDireccion
                                    ? telefonoDireccion
                                    : "Teléfono"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={telefonoDireccion ? telefonoDireccion : ""}
                            onChangeText={(value) => {
                                setTelefonoDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>Ciudad*</Text>
                        <TextInput
                            placeholder={
                                ciudadDireccion ? ciudadDireccion : "Ciudad"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={ciudadDireccion ? ciudadDireccion : ""}
                            onChangeText={(value) => {
                                setCiudadDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>Dirección*</Text>
                        <TextInput
                            placeholder={
                                direccionDireccion
                                    ? direccionDireccion
                                    : "Dirección"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={direccionDireccion ? direccionDireccion : ""}
                            onChangeText={(value) => {
                                setDireccionDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>
                            Dirección adicional*
                        </Text>
                        <TextInput
                            placeholder={
                                anotacionDireccion
                                    ? anotacionDireccion
                                    : "Dirección adicional"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={anotacionDireccion ? anotacionDireccion : ""}
                            onChangeText={(value) => {
                                setAnotacionDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.input_view}>
                        <Text style={styles.subtitulo_text}>
                            Código Postal*
                        </Text>
                        <TextInput
                            placeholder={
                                codigoPostalDireccion
                                    ? codigoPostalDireccion
                                    : "Código Postal"
                            }
                            placeholderTextColor="#1c1c1c"
                            style={styles.input}
                            value={
                                codigoPostalDireccion
                                    ? codigoPostalDireccion
                                    : ""
                            }
                            onChangeText={(value) => {
                                setCodigoPostalDireccion(value);
                            }}
                        />
                    </View>
                    <View style={styles.boton_anadir}>
                        <TouchableOpacity
                            style={[styles.boton]}
                            onPress={() => {
                                dispatch(
                                    add_direccion(
                                        idDireccion,
                                        nombreDireccion,
                                        telefonoDireccion,
                                        ciudadDireccion,
                                        direccionDireccion,
                                        anotacionDireccion,
                                        codigoPostalDireccion,
                                        authToken
                                    )
                                );
                                cierraModal();
                            }}
                            underlayColor="#ed6f37"
                        >
                            <Text style={styles.clave_text}>
                                {idDireccion ? "Modificar" : "Añadir"}
                            </Text>
                            {/*actualizando_usuario && (
                                <Text>Actualizando ...</Text>
                            )*/}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
            <ScrollView
                style={styles.container_scroll}
                keyboardShouldPersistTaps="handled"
            >
                {!!direcciones && (
                    <View>
                        {direcciones.map((valor, clave) => {
                            return (
                                <View
                                    style={styles.card_direccion}
                                    key={valor.id}
                                >
                                    <View style={styles.titulo_direccion}>
                                        <Ionicons
                                            style={{
                                                color: "#ed6f37",
                                                marginRight: 10,
                                            }}
                                            size={25}
                                            name="ios-pin"
                                        />
                                        <Text
                                            style={{
                                                color: "#ed6f37",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {valor.nombre_direccion}
                                        </Text>
                                        <Right
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={[styles.icono_direccion]}
                                                onPress={() => {
                                                    setDireccionMod(
                                                        (prevValor) => valor
                                                    );
                                                }}
                                                underlayColor="#ed6f37"
                                            >
                                                <MaterialCommunityIcons
                                                    name="pencil"
                                                    size={20}
                                                    color="#696969"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.icono_direccion]}
                                                onPress={(e) => {
                                                    e.preventDefault();
                                                    if (Platform.OS === "web") {
                                                        alert(
                                                            "Se ha borrado su direccion"
                                                        );
                                                        dispatch(
                                                            delete_direccion(
                                                                valor.id,
                                                                authToken
                                                            )
                                                        );
                                                    } else {
                                                        Alert.alert(
                                                            "Atención",
                                                            "¿Está seguro que quiere borrar esta dirección?",
                                                            [
                                                                {
                                                                    text:
                                                                        "Cancelar",
                                                                    onPress: () =>
                                                                        console.log(
                                                                            "Cancel Pressed"
                                                                        ),
                                                                    style:
                                                                        "cancel",
                                                                },
                                                                {
                                                                    text:
                                                                        "Borrar",
                                                                    onPress: () => {
                                                                        console.log(
                                                                            "OK Pressed"
                                                                        );
                                                                        dispatch(
                                                                            delete_direccion(
                                                                                valor.id,
                                                                                authToken
                                                                            )
                                                                        );
                                                                    },
                                                                },
                                                            ],
                                                            {
                                                                cancelable: false,
                                                            }
                                                        );
                                                    }
                                                }}
                                                underlayColor="#ed6f37"
                                            >
                                                <Ionicons
                                                    style={{
                                                        color: "red",
                                                    }}
                                                    size={20}
                                                    name="ios-trash"
                                                />
                                            </TouchableOpacity>
                                        </Right>
                                    </View>
                                    <View style={styles.direccion_info}>
                                        <Text
                                            style={
                                                (styles.estilo_direccion,
                                                { fontSize: 14 })
                                            }
                                        >
                                            {valor.direccion}
                                        </Text>
                                        <Text style={styles.estilo_direccion}>
                                            {valor.anotaciones}
                                        </Text>
                                        <Text style={styles.estilo_direccion}>
                                            {valor.telefono}
                                        </Text>
                                        <Text style={styles.estilo_direccion}>
                                            {valor.codigo_postal} {valor.ciudad}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}

                <View style={styles.boton_anadir}>
                    <TouchableOpacity
                        style={[styles.boton]}
                        onPress={() => {
                            setDireccionMod((prevValor) => ({}));
                        }}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.clave_text}>Añadir nueva</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Container>
    );
}

export function CuentaDireccionDefecto({ navigation }) {
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
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

    return (
        <ScrollView style={styles.container_scroll}>
            {!!id_empresa && empresa_info[0] && (
                <View>
                    <View>
                        <TouchableOpacity
                            style={[
                                styles.childRow,
                                styles.button,
                                0 == direccion_defecto
                                    ? styles.btnActive
                                    : styles.btnInActive,
                            ]}
                            onPress={() => {
                                dispatch(
                                    update_perfil(
                                        "",
                                        "",
                                        "",
                                        "",
                                        "",
                                        0,
                                        authToken
                                    )
                                );
                            }}
                        >
                            <Text style={[styles.font, styles.itemInActive]}>
                                {empresa_info[0].nombre_direccion}
                            </Text>
                            <Ionicons
                                size={25}
                                name="ios-checkmark-circle"
                                color={
                                    0 == direccion_defecto
                                        ? "green"
                                        : "lightgray"
                                }
                            />
                        </TouchableOpacity>
                        <View style={styles.childHr} />
                    </View>
                </View>
            )}
            {!!direcciones && (
                <View>
                    {direcciones.map((valor, clave) => {
                        return (
                            <View key={valor.id}>
                                <TouchableOpacity
                                    style={[
                                        styles.childRow,
                                        styles.button,
                                        valor.id == direccion_defecto
                                            ? styles.btnActive
                                            : styles.btnInActive,
                                    ]}
                                    onPress={() => {
                                        dispatch(
                                            update_perfil(
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                valor.id,
                                                authToken
                                            )
                                        );
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.font,
                                            styles.itemInActive,
                                        ]}
                                    >
                                        {valor.nombre_direccion}
                                    </Text>
                                    <Ionicons
                                        size={25}
                                        name="ios-checkmark-circle"
                                        color={
                                            valor.id == direccion_defecto
                                                ? "green"
                                                : "lightgray"
                                        }
                                    />
                                </TouchableOpacity>
                                <View style={styles.childHr} />
                            </View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
}

export function CuentaPagoDefecto({ navigation }) {
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );
    const metodo_pago = useSelector((state) => state.CuentaReducer.metodo_pago);

    const metodo_pago_posibles = useSelector(
        (state) => state.CuentaReducer.metodo_pago_posibles
    );

    console.log(metodo_pago_posibles);
    console.log(metodo_pago);

    const dispatch = useDispatch();

    return (
        <ScrollView style={styles.container_scroll}>
            {!!metodo_pago_posibles && (
                <View>
                    {metodo_pago_posibles.map((valor, clave) => {
                        return (
                            <View key={valor[0]}>
                                <TouchableOpacity
                                    style={[
                                        styles.childRow,
                                        styles.button,
                                        valor[0] == metodo_pago[0]
                                            ? styles.btnActive
                                            : styles.btnInActive,
                                    ]}
                                    onPress={() => {
                                        dispatch(
                                            update_perfil(
                                                "",
                                                "",
                                                "",
                                                "",
                                                valor,
                                                "",
                                                authToken
                                            )
                                        );
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.font,
                                            styles.itemInActive,
                                        ]}
                                    >
                                        {valor[1]}
                                    </Text>
                                    <Ionicons
                                        size={25}
                                        name="ios-checkmark-circle"
                                        color={
                                            valor[0] == metodo_pago[0]
                                                ? "green"
                                                : "lightgray"
                                        }
                                    />
                                </TouchableOpacity>
                                <View style={styles.childHr} />
                            </View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding: 5,
    },
    container_scroll: {
        flex: 1,
        backgroundColor: "#fafafa",
        padding: 5,
        paddingBottom: 30,
    },
    input: {
        padding: 10,
        color: "#1c1c1c",
    },
    boton: {
        marginTop: 10,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        alignSelf: "stretch",
        backgroundColor: "#ed6f37",
    },
    clave_text: {
        fontSize: 16,
        fontWeight: "400",
        color: "white",
    },
    subtitulo_text: {
        fontSize: 10,
    },
    input_view: {
        borderBottomColor: "#abababab",
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    input_view2: {
        borderColor: "#abababab",
        borderWidth: 1,
        marginTop: 10,
    },
    card: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#abababab",
    },
    card_2: {
        marginTop: 30,
        borderWidth: 1,
        borderColor: "#abababab",
        padding: 5,
    },
    estilo_direccion: {
        paddingBottom: 2,
        paddingTop: 2,
    },
    titulo_direccion: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 5,
        borderBottomColor: "#abababab",
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    card_direccion: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#abababab",
        marginBottom: 10,
    },
    direccion_info: {
        padding: 5,
    },
    boton_anadir: {
        marginTop: 20,
    },
    icono_direccion: {
        marginRight: 5,
        marginLeft: 5,
    },
    panel: {
        marginTop: 20,
        padding: 5,
    },
    childRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
    },
    button: {
        width: "100%",
        height: 54,
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    btnActive: {
        borderColor: "green",
    },
    btnInActive: {
        borderColor: "darkgray",
    },
    childHr: {
        height: 1,
        backgroundColor: "lightgray",
        width: "100%",
    },
});
