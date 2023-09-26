import React, { useEffect, useState } from "react";
import {
    View,
    Button,
    Alert,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
    Platform,
} from "react-native";
import Logo from "../components/Logo";

import BotonInput from "../components/BotonInput";
import Registro from "./Registro";

import { login, logout } from "../actions/autenticacionActions";
import { connect, useSelector, useDispatch } from "react-redux";
import RecordarPass from "./RecordarPass";

export default function Login({ navigation }) {
    //password, email, phone_number, id_empresa
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );
    const loginando = useSelector(
        (state) => state.AutenticacionReducer.loginando
    );
    const desloginando = useSelector(
        (state) => state.AutenticacionReducer.desloginando
    );
    const authError = useSelector(
        (state) => state.AutenticacionReducer.authError
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (authError) {
            if (Platform.OS === "web") {
                alert(authError);
            } else {
                Alert.alert(authError);
            }

            dispatch({ type: "CLEAR_AUTHERROR" });
        }
        console.log("did update: ", authError);
    }, [authError]);

    useEffect(() => {
        // lo que se ejecuta cuando se carga un elemento.
        console.log("did mount: ", authError);
    }, []);

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
                        placeholer={"Email"}
                        textContentType={"emailAddress"}
                        autoCompleteType={"email"}
                        autocapitalize={"none"}
                        onNameChange={(val) => {
                            setEmail(val);
                        }}
                    />
                    <BotonInput
                        icon={"md-key"}
                        placeholer={"Contraseña"}
                        autoCompleteType={"password"}
                        secureTextEntry={true}
                        autocapitalize={"none"}
                        onNameChange={(val) => {
                            setPassword(val);
                        }}
                    />

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_iniciar]}
                        onPress={() => dispatch(login(email, password))}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.iniciar_text}>Iniciar Sesion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_registro]}
                        onPress={() => navigation.navigate("Registro")}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.registro_text}>
                            Regístrate ahora
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_clave]}
                        onPress={() => navigation.navigate("RecordarPass")}
                        underlayColor="#ed6f37"
                    >
                        <Text style={styles.clave_text}>
                            ¿Olvidaste la contraseña?
                        </Text>
                    </TouchableOpacity>

                    <Text>{authToken}</Text>

                    {/*<Button
                        style={styles.boton_iniciar}
                        title='Iniciar Sesion'
                        accessibilityLabel="Inície sesion en food2work"
                        onPress={this.signUp}
                    />*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/*class Login extends React.Component {

    state = {
        nombre: '', password: '', email: '', phone_number: '', id_empresa: ''
    }
    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }

    registro = () => {
        console.log("REGISTRO");
    }

    iniciarSesion = () => {
        this.props.login('', this.state.password.val);
        console.log(this.props.authToken);
    }

    recuperarClave = () => {
        console.log("recuperarClave");
    }

    signUp = async () => {
        const {nombre, password, email, phone_number} = this.state
        try {
            // here place your signup logic
            console.log('user successfully signed up!: ')
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Logo/>
                <View style={styles.cajon}>
                    <BotonInput icon={'md-mail'}
                                placeholer={'Email'}
                                textContentType={'emailAddress'}
                                autoCompleteType={'email'}
                                autocapitalize={'none'}
                                onNameChange={val => {
                                    this.onChangeText('email', {val})
                                }}
                    />
                    <BotonInput icon={'md-key'}
                                placeholer={'Contraseña'}
                                autoCompleteType={'password'}
                                secureTextEntry={true}
                                autocapitalize={'none'}
                                onNameChange={val => {
                                    this.onChangeText('password', {val})
                                }}
                    />

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_iniciar]}
                        onPress={() => this.iniciarSesion()}
                        underlayColor='#ed6f37'>
                        <Text style={styles.iniciar_text}>Iniciar Sesion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_registro]}
                        onPress={() => this.props.navigation.navigate('Registro')}
                        underlayColor='#ed6f37'>
                        <Text style={styles.registro_text}>Regístrate ahora</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.boton, styles.boton_clave]}
                        onPress={() => this.props.navigation.navigate('RecordarPass')}
                        underlayColor='#ed6f37'>
                        <Text style={styles.clave_text}>¿Olvidaste la contraseña?</Text>
                    </TouchableOpacity>

                    <Text>{this.props.authToken}</Text>

                    {/*<Button
                        style={styles.boton_iniciar}
                        title='Iniciar Sesion'
                        accessibilityLabel="Inície sesion en food2work"
                        onPress={this.signUp}
                    />
                </View>
            </ScrollView>
        )
    }
}*/

const styles = StyleSheet.create({
    cajon: {
        flex: 1,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: "rgb(104, 92, 70)",
    },
    contentContainer: {
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center",
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
});

/*const mapStateToProps = state => {  // son las variables
    console.log(state);
    return {
        authToken: state.autenticacionReducer.authToken,
        loginando: state.autenticacionReducer.loginando,
        saliendo: state.autenticacionReducer.saliendo
    }
}

const mapDispatchToProps = {  // son las funciones
    login,
    logout
}

export default Login;*/
