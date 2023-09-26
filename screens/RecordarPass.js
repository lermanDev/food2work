import React, { Component, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";
import Logo from "../components/Logo";
import BotonInput from "../components/BotonInput";
import config from "../constants/Config";

export default function RecordarPass({ navigation }) {
    const [email, setEmail] = useState("");

    const recuerdaPass = async () => {
        try {
            let formData = new FormData();
            formData.append("email", email);

            const response = await fetch(
                config.API_HOST + "/api/recordar_contrasena/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );
            if (response.status !== 202) {
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

                console.log("Error: ", data.error);
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
                alert("error: ", err);
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
            console.log("error: ", err);
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
                        icon={"md-mail"}
                        placeholer={"Email*"}
                        textContentType={"emailAddress"}
                        autoCompleteType={"email"}
                        autocapitalize={"none"}
                        onNameChange={(val) => setEmail(val)}
                    />

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_iniciar]}
                        onPress={() => {
                            recuerdaPass();
                        }}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.iniciar_text}>
                            Solicitar Contraseña
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/*export default class RecordarPass extends Component {

    render() {
        //console.log(this.props);

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Logo/>
                <View style={styles.cajon}>
                    <BotonInput icon={'md-mail'}
                                placeholer={'Email*'}
                                textContentType={'emailAddress'}
                                autoCompleteType={'email'}
                                autocapitalize={'none'}
                                onNameChange={val => {}}
                    />

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_iniciar]}
                        onPress={() => this.signUp}
                        underlayColor='#ed6f37'>
                        <Text style={styles.iniciar_text}>Solicitar Contraseña</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }

}*/

const styles = StyleSheet.create({
    cajon: {
        flex: 1,
        marginTop: 30,
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
