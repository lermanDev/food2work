import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { Body, Card, CardItem, Left, Right } from "native-base";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import config from "../constants/Config";

export default function ListaProductos(props) {
    const navigation = useNavigation();

    const productos = props.productos;
    //console.log(productos);
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );
    const direccion_defecto = useSelector(
        (state) => state.CuentaReducer.direccion_defecto
    );

    const fecha_pedido = useSelector(
        (state) => state.PedidoReducer.fecha_pedido
    );

    return (
        <ScrollView style={styles.scroll}>
            {typeof productos !== "undefined" && productos.length ? (
                <View>
                    {productos.map((valor, clave) => {
                        let texto_calorias = "";
                        let texto_cal = "";
                        try {
                            texto_calorias =
                                typeof valor.valores_nutricionales[
                                    "Proximales"
                                ]["energía, total"] != "undefined"
                                    ? valor.valores_nutricionales["Proximales"][
                                          "energía, total"
                                      ]
                                    : "0 kJ/0 kcal";
                            texto_cal = texto_calorias.split("/").pop();
                        } catch (error) {
                            console.log(valor);
                            texto_calorias = "0 kJ/0 kcal";
                            texto_cal = texto_calorias.split("/").pop();
                        }
                        console.log(valor);
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        producto: valor,
                                        id_direccion: direccion_defecto,
                                        authToken: authToken,
                                        fecha_pedido: fecha_pedido,
                                    })
                                }
                                key={valor.id_componente_menu}
                            >
                                <View style={styles.tarjeta_receta}>
                                    <View style={styles.cajon_imagen}>
                                        <Image
                                            source={{
                                                uri:
                                                    valor.imagen_receta != ""
                                                        ? config.API_HOST +
                                                          "/" +
                                                          valor.imagen_receta
                                                        : "https://i1.wp.com/commememucho.com/wp-content/uploads/2019/11/paella-valenciana-870x580-2743106806-1558362844353.jpg",
                                            }}
                                            style={styles.imagen}
                                        />
                                    </View>
                                    <View style={styles.cajon_texto}>
                                        <Text style={styles.nombre_receta}>
                                            {valor.nombre_receta}
                                        </Text>
                                        <Text style={styles.descripcion_receta}>
                                            {valor.descripcion}
                                        </Text>
                                        <View style={styles.alergenos}>
                                            {valor.alergenos.map((alergeno) => {
                                                return (
                                                    <View
                                                        style={
                                                            styles.alergenos_icono
                                                        }
                                                        key={alergeno.nombre}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.alergeno,
                                                                {
                                                                    backgroundColor:
                                                                        alergeno.color,
                                                                },
                                                            ]}
                                                        >
                                                            {alergeno.libreria ==
                                                                "MaterialCommunityIcons" && (
                                                                <MaterialCommunityIcons
                                                                    name={
                                                                        alergeno.icono
                                                                    }
                                                                    size={13}
                                                                    color="white"
                                                                />
                                                            )}
                                                            {alergeno.libreria ==
                                                                "FontAwesome5" && (
                                                                <FontAwesome5
                                                                    name={
                                                                        alergeno.icono
                                                                    }
                                                                    size={13}
                                                                    color="white"
                                                                />
                                                            )}
                                                            {alergeno.libreria ==
                                                                "Ionicons" && (
                                                                <Ionicons
                                                                    name={
                                                                        alergeno.icono
                                                                    }
                                                                    size={13}
                                                                    color="white"
                                                                />
                                                            )}
                                                        </View>
                                                        <Text
                                                            style={
                                                                styles.alergeno_texto
                                                            }
                                                        >
                                                            {alergeno.nombre}
                                                        </Text>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                        <View style={styles.cajon_precio_cal}>
                                            <View
                                                style={styles.calorias_receta}
                                            >
                                                <Text>{texto_cal} </Text>
                                                {/*<Ionicons
                                                    name="ios-flame"
                                                    color={"red"}
                                                    size={15}
                                                />*/}
                                            </View>
                                            <Text style={styles.precio_receta}>
                                                {valor.precio} €
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ) : (
                <View>
                    <View style={styles.cajon_nada}>
                        <Text style={styles.texto_nada}>
                            Vaya, parece que no tenemos ningún producto para el
                            día y dirección seleccionada
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    cajon_nada: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
    },
    texto_nada: {
        textAlign: "center",
    },
    tarjeta_receta: {
        borderColor: "#d6d6d6",
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: "#fff",
        margin: 2,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    cajon_imagen: {
        width: 120,
        height: 120,
        padding: 5,
    },
    imagen: {
        flex: 1,
        borderRadius: 5,
    },
    cajon_texto: {
        flex: 1,
        padding: 5,
    },
    nombre_receta: {
        flexShrink: 1,
        fontSize: 15,
        fontWeight: "500",
        marginTop: 5,
        marginLeft: 5,
        color: "#695d47",
    },
    descripcion_receta: {
        flexShrink: 1,
        fontSize: 12,
        padding: 5,
    },
    cajon_precio_cal: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingBottom: 5,
    },
    calorias_receta: {
        flexDirection: "row",
        marginLeft: 10,
        flex: 1,
    },
    precio_receta: {
        flex: 1,
        fontWeight: "600",
        color: "#ed6f37",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 10,
        textAlign: "right",
    },
    alergenos: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    alergeno_texto: {
        marginTop: 2,
        fontSize: 8,
    },
    alergenos_icono: {
        alignItems: "center",
        marginLeft: 5,
    },
    alergeno: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        alignItems: "center",
        justifyContent: "center",
    },
});
