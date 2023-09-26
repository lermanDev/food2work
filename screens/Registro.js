import React, { Component, useEffect, useState } from "react";
import {
    View,
    Button,
    Alert,
    TextInput,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
} from "react-native";
import Logo from "../components/Logo";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import BotonInput from "../components/BotonInput";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/autenticacionActions";
import config from "../constants/Config";

export default function Registro({ navigation }) {
    // nombre: '', password: '', email: '', phone_number: '', id_empresa: ''
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [id_empresa, setIdEmpresa] = useState("");

    const signUp = async () => {
        try {
            let formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("apellido", apellido);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("id_empresa", id_empresa);

            const response = await fetch(config.API_HOST + "/api/registro/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
                /*JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    password: password,
                    email: email,
                    id_empresa: id_empresa,
                }),*/
            });
            if (response.status !== 201) {
                const data = await response.json();

                if (Platform.OS === "web") {
                    alert(data.error);
                } else {
                    Alert.alert(
                        "Error",
                        data.error,
                        [
                            {
                                text: "Aceptar",
                                onPress: () => console.log("OK Pressed"),
                            },
                        ],
                        { cancelable: false }
                    );
                }

                console.log("Error en registro: ", data.error);
            } else {
                const data = await response.json();

                if (Platform.OS === "web") {
                    alert(data.success);
                } else {
                    Alert.alert(
                        "COMPLETADO",
                        data.success,
                        [
                            {
                                text: "Aceptar",
                                onPress: () => navigation.goBack(),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            }
        } catch (err) {
            if (Platform.OS === "web") {
                alert("error signing up: ", err);
            } else {
                Alert.alert(
                    "Error",
                    String(err),
                    [
                        {
                            text: "Aceptar",
                            onPress: () => console.log("OK Pressed"),
                        },
                    ],
                    { cancelable: false }
                );
            }
            console.log("error signing up: ", err);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ed6f37" }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Logo />
                <View style={styles.cajon}>
                    <BotonInput
                        icon={"md-contact"}
                        placeholer={"Nombre*"}
                        textContentType={"name"}
                        autoCompleteType={"name"}
                        autocapitalize={"words"}
                        onNameChange={(val) => {
                            setNombre(val);
                        }}
                    />
                    <BotonInput
                        icon={"md-contact"}
                        placeholer={"Apellido*"}
                        textContentType={"familyName"}
                        autoCompleteType={"familyName"}
                        autocapitalize={"words"}
                        onNameChange={(val) => {
                            setApellido(val);
                        }}
                    />
                    <BotonInput
                        icon={"md-mail"}
                        placeholer={"Email*"}
                        textContentType={"emailAddress"}
                        autoCompleteType={"email"}
                        autocapitalize={"none"}
                        onNameChange={(val) => {
                            setEmail(val);
                        }}
                    />
                    <BotonInput
                        icon={"md-key"}
                        placeholer={"Contraseña*"}
                        textContentType={"newPassword"}
                        autoCompleteType={"password"}
                        secureTextEntry={true}
                        autocapitalize={"none"}
                        onNameChange={(val) => {
                            setPassword(val);
                        }}
                    />
                    <BotonInput
                        icon={"md-briefcase"}
                        placeholer={"ID empresa"}
                        autocapitalize={"none"}
                        onNameChange={(val) => {
                            setIdEmpresa(val);
                        }}
                    />

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_iniciar]}
                        onPress={() => {
                            signUp();
                        }}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.iniciar_text}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cajon: {
        flex: 1,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "rgb(104, 92, 70)",
    },
    boton: {
        marginTop: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 55,
        alignSelf: "stretch",
    },
    boton_registro: {
        backgroundColor: "rgb(255,255,255)",
    },
    boton_iniciar: {
        backgroundColor: "#ed6f37",
    },
    boton_clave: {
        marginTop: 0,
    },
    iniciar_text: {
        color: "#fff",
        textAlign: "center",
        paddingLeft: 10,
        fontSize: 18,
        paddingRight: 10,
    },
    registro_text: {
        color: "rgb(104, 92, 70)",
        textAlign: "center",
        paddingLeft: 10,
        fontSize: 18,
        paddingRight: 10,
    },
    clave_text: {
        color: "white",
    },
    contentContainer: {
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});
