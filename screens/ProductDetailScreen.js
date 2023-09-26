import React, { Component } from "react";
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import { Left, Right } from "native-base";
import InputSpinner from "react-native-input-spinner";
import { useEffect, useState } from "react";
import { crea_pedido } from "../actions/PedidoActions";
import { connect } from "react-redux";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProductDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
            ),
            contador: 1,
            refreshing: false,
        };
        this.props.navigation.setOptions({
            headerShown: false,
        });
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 30 });
        const producto = this.props.route.params.producto;

        const texto_calorias =
            producto.valores_nutricionales["Proximales"]["energía, total"];
        const porc_cal = parseInt(
            (parseFloat(texto_calorias.split("/").pop().replace(" kcal", "")) /
                2100) *
                100
        );
        const texto_grasa =
            producto.valores_nutricionales["Proximales"][
                "grasa, total (lipidos totales)"
            ];
        const porc_gra = parseInt(
            (parseFloat(texto_grasa.replace(" g", "")) / 58) * 100
        );
        const texto_carbs =
            producto.valores_nutricionales["Hidratos de Carbono"][
                "carbohidratos"
            ];
        const porc_carbs = parseInt(
            (parseFloat(texto_carbs.replace(" g", "")) / 262) * 100
        );

        const texto_prot =
            producto.valores_nutricionales["Hidratos de Carbono"][
                "carbohidratos"
            ];
        const porc_prot = parseInt(
            (parseFloat(texto_prot.replace(" g", "")) / 132) * 100
        );

        console.log(this.props.route.params);

        return (
            <View style={styles.scrollViewContent}>
                {/*data.map((_, i) => (
                    <View key={i} style={styles.row}>
                        <Text>{i}</Text>
                    </View>
                ))*/}
                <View style={styles.calorias_view}>
                    <View>
                        <Text style={styles.titulo}>
                            {producto.nombre_receta}
                        </Text>
                    </View>
                </View>
                <View style={styles.descripcion_view}>
                    <Text style={styles.calorias}>{producto.descripcion}</Text>
                </View>
                <View style={styles.precio_view}>
                    <Text style={styles.precio_text}>{producto.precio}€</Text>
                </View>
                <View style={styles.cajon_contador}>
                    <Text style={styles.texto_cantidad}>Cantidad:</Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({
                                contador:
                                    this.state.contador > 1
                                        ? this.state.contador - 1
                                        : 1,
                            })
                        }
                        style={{
                            backgroundColor: "#a3e7d9",
                            borderRadius: "100%",
                            width: 30,
                            height: 30,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            style={{ color: "#fff" }}
                            size={30}
                            name="md-remove"
                        />
                    </TouchableOpacity>
                    <Text style={styles.texto_contador}>
                        {this.state.contador}
                    </Text>
                    <TouchableOpacity
                        onPress={() =>
                            this.setState({
                                contador: this.state.contador + 1,
                            })
                        }
                        style={{
                            backgroundColor: "#a3e7d9",
                            borderRadius: "100%",
                            width: 30,
                            height: 30,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            style={{ color: "#fff" }}
                            size={30}
                            name="md-add"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cuadros_info}>
                    <View style={styles.cuadro_info}>
                        <Text style={styles.cuadro_titulo}>Calorías</Text>
                        <Text style={styles.cuadro_subtitulo}>
                            {parseInt(texto_calorias.split("/").pop())} kcal
                        </Text>
                        <Text style={styles.cuadro_percent}>
                            {porc_cal}% IDR*
                        </Text>
                    </View>
                    <View style={styles.cuadro_info}>
                        <Text style={styles.cuadro_titulo}>Grasa</Text>
                        <Text style={styles.cuadro_subtitulo}>
                            {texto_grasa}
                        </Text>
                        <Text style={styles.cuadro_percent}>
                            {porc_gra}% IDR*
                        </Text>
                    </View>
                    <View style={styles.cuadro_info}>
                        <Text style={styles.cuadro_titulo}>Carbs.</Text>
                        <Text style={styles.cuadro_subtitulo}>
                            {texto_carbs}
                        </Text>
                        <Text style={styles.cuadro_percent}>
                            {porc_carbs}% IDR*
                        </Text>
                    </View>
                    <View style={styles.cuadro_info}>
                        <Text style={styles.cuadro_titulo}>Proteinas</Text>
                        <Text style={styles.cuadro_subtitulo}>
                            {texto_prot}
                        </Text>
                        <Text style={styles.cuadro_percent}>
                            {porc_prot}% IDR*
                        </Text>
                    </View>
                </View>
                <View style={styles.alergenos_container}>
                    <View style={styles.alergenos_titulo}>
                        <Text style={styles.alergenos_texto}>Ingredientes</Text>
                    </View>
                    <View style={styles.listado_ingredientes}>
                        {producto.lista_ingredientes.map((valor, clave) => {
                            //console.log(valor, clave);
                            const texto_valor = valor.split(",").join("");
                            let texto_ingrediente = "";
                            if (
                                producto.lista_ingredientes.length - 1 ==
                                clave
                            ) {
                                texto_ingrediente = texto_valor;
                            } else {
                                texto_ingrediente = texto_valor + ",";
                            }
                            return (
                                <Text style={styles.ingredientes} key={clave}>
                                    {texto_ingrediente}
                                </Text>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.alergenos_container}>
                    <View style={styles.alergenos_titulo}>
                        <Text style={styles.alergenos_texto}>Alergenos</Text>
                    </View>
                    <View style={styles.alergenos_contenedor_iconos}>
                        {producto.alergenos.map((alergeno) => {
                            return (
                                <View
                                    style={styles.alergenos_icono}
                                    key={alergeno.nombre}
                                >
                                    <View
                                        style={[
                                            styles.alergeno,
                                            {
                                                backgroundColor: alergeno.color,
                                            },
                                        ]}
                                    >
                                        {alergeno.libreria ==
                                            "MaterialCommunityIcons" && (
                                            <MaterialCommunityIcons
                                                name={alergeno.icono}
                                                size={30}
                                                color="white"
                                            />
                                        )}
                                        {alergeno.libreria ==
                                            "FontAwesome5" && (
                                            <FontAwesome5
                                                name={alergeno.icono}
                                                size={30}
                                                color="white"
                                            />
                                        )}
                                        {alergeno.libreria == "Ionicons" && (
                                            <Ionicons
                                                name={alergeno.icono}
                                                size={30}
                                                color="white"
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.alergeno_texto}>
                                        {alergeno.nombre}
                                    </Text>
                                </View>
                            );
                        })}
                        {/*<View style={styles.alergenos_icono}>
                            <View
                                style={[
                                    styles.alergeno,
                                    { backgroundColor: "#c45653" },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name="sack"
                                    size={30}
                                    color="white"
                                />
                            </View>
                            <Text style={styles.alergeno_texto}>
                                Frutos de cáscara
                            </Text>
                        </View>*/}
                    </View>
                </View>
                <View style={styles.alergenos_titulo}>
                    <Text style={styles.alergenos_texto}>
                        Datos nutricionales detallados
                    </Text>
                </View>
                <View style={styles.nutricional_container}>
                    <View style={styles.nutricional_titulo}>
                        <Text style={styles.nutricional_texto}>
                            Información Nutricional
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.valores_nutricionales}>
                        <Left>
                            <Text
                                style={[styles.clave_nutricional, styles.bold]}
                            >
                                Tamaño de la porción
                            </Text>
                        </Left>
                        <Right>
                            <Text
                                style={[styles.clave_nutricional, styles.bold]}
                            >
                                {producto.peso} g
                            </Text>
                        </Right>
                    </View>
                    <View style={styles.divider_ancho} />
                    <View style={styles.valores_nutricionales}>
                        <Left>
                            <Text
                                style={[styles.clave_nutricional, styles.bold]}
                            ></Text>
                        </Left>
                        <Right>
                            <Text
                                style={[styles.clave_nutricional, styles.bold]}
                            >
                                Por porción
                            </Text>
                        </Right>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.listado_nutricional}>
                        {Object.keys(
                            producto.valores_nutricionales["Proximales"]
                        ).map(function (key) {
                            /*console.log(
                                key,
                                producto.valores_nutricionales["Proximales"][
                                    key
                                ]
                            );*/
                            return (
                                <View
                                    style={styles.valores_nutricionales}
                                    key={key}
                                >
                                    <Left>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "energía, total" ||
                                                key ==
                                                    "grasa, total (lipidos totales)" ||
                                                key == "proteina, total"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "energía, total" ||
                                                key ==
                                                    "grasa, total (lipidos totales)" ||
                                                key == "proteina, total"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {
                                                producto.valores_nutricionales[
                                                    "Proximales"
                                                ][key]
                                            }
                                        </Text>
                                    </Right>
                                </View>
                            );
                        })}
                        <View style={styles.divider} />
                        <View style={styles.valores_nutricionales}>
                            <Left>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                >
                                    Hidratos de Carbono
                                </Text>
                            </Left>
                            <Right>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                ></Text>
                            </Right>
                        </View>
                        <View style={styles.divider} />
                        {Object.keys(
                            producto.valores_nutricionales[
                                "Hidratos de Carbono"
                            ]
                        ).map(function (key) {
                            /*console.log(
                                key,
                                producto.valores_nutricionales[
                                    "Hidratos de Carbono"
                                ][key]
                            );*/
                            return (
                                <View
                                    style={styles.valores_nutricionales}
                                    key={key}
                                >
                                    <Left>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "carbohidratos"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "Carbohidratos"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {
                                                producto.valores_nutricionales[
                                                    "Hidratos de Carbono"
                                                ][key]
                                            }
                                        </Text>
                                    </Right>
                                </View>
                            );
                        })}
                        <View style={styles.divider} />
                        <View style={styles.valores_nutricionales}>
                            <Left>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                >
                                    Grasas
                                </Text>
                            </Left>
                            <Right>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                ></Text>
                            </Right>
                        </View>
                        <View style={styles.divider} />
                        {Object.keys(
                            producto.valores_nutricionales["Grasas"]
                        ).map(function (key) {
                            /*console.log(
                                key,
                                producto.valores_nutricionales["Grasas"][key]
                            );*/
                            return (
                                <View
                                    style={styles.valores_nutricionales}
                                    key={key}
                                >
                                    <Left>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {
                                                producto.valores_nutricionales[
                                                    "Grasas"
                                                ][key]
                                            }
                                        </Text>
                                    </Right>
                                </View>
                            );
                        })}
                        <View style={styles.divider} />
                        <View style={styles.valores_nutricionales}>
                            <Left>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                >
                                    Vitaminas
                                </Text>
                            </Left>
                            <Right>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                ></Text>
                            </Right>
                        </View>
                        <View style={styles.divider} />
                        {Object.keys(
                            producto.valores_nutricionales["Vitaminas"]
                        ).map(function (key) {
                            /*console.log(
                                key,
                                producto.valores_nutricionales["Vitaminas"][key]
                            );*/
                            return (
                                <View
                                    style={styles.valores_nutricionales}
                                    key={key}
                                >
                                    <Left>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {
                                                producto.valores_nutricionales[
                                                    "Vitaminas"
                                                ][key]
                                            }
                                        </Text>
                                    </Right>
                                </View>
                            );
                        })}
                        <View style={styles.divider} />
                        <View style={styles.valores_nutricionales}>
                            <Left>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                >
                                    Minerales
                                </Text>
                            </Left>
                            <Right>
                                <Text
                                    style={[
                                        styles.clave_nutricional,
                                        styles.bold,
                                    ]}
                                ></Text>
                            </Right>
                        </View>
                        <View style={styles.divider} />
                        {Object.keys(
                            producto.valores_nutricionales["Minerales"]
                        ).map(function (key) {
                            /*console.log(
                                key,
                                producto.valores_nutricionales["Minerales"][key]
                            );*/
                            return (
                                <View
                                    style={styles.valores_nutricionales}
                                    key={key}
                                >
                                    <Left>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text
                                            style={[
                                                styles.clave_nutricional,
                                                key == "colesterol"
                                                    ? styles.bold
                                                    : styles.falso,
                                            ]}
                                        >
                                            {
                                                producto.valores_nutricionales[
                                                    "Minerales"
                                                ][key]
                                            }
                                        </Text>
                                    </Right>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.disclaimer_text}>
                    <Text>
                        Datos aproximados obtenidos de base de datos española.
                    </Text>
                    <Text>
                        * IDR Indice Diario Recomendado para una persona adulta
                        y 2100 calorías, 50% carbohidrato, 25% grasas y 25% de
                        proteinas.
                    </Text>
                </View>
            </View>
        );
    }

    componentDidUpdate() {
        if (
            this.props.success_log != "" &&
            typeof this.props.success_log != "undefined"
        ) {
            if (Platform.OS === "web") {
                alert(this.props.success_log);
                this.props.limpia_update_menu();
            } else {
                Alert.alert(
                    "Confirmación",
                    this.props.success_log,
                    [
                        {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                        {
                            text: "Borrar",
                            onPress: () => {
                                console.log("OK Pressed");
                                this.props.limpia_update_menu();
                            },
                        },
                    ],
                    {
                        cancelable: false,
                    }
                );
            }
        }
    }

    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: "clamp",
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: "clamp",
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: "clamp",
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: "clamp",
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: "clamp",
        });

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { y: this.state.scrollY },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    /*refreshControl={
                        /*<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(
                                    () => this.setState({ refreshing: false }),
                                    1000
                                );
                            }}
                            // Android offset for RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                        />
                        false
                    }*/
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{
                            uri:
                                "https://i1.wp.com/commememucho.com/wp-content/uploads/2019/11/paella-valenciana-870x580-2743106806-1558362844353.jpg",
                        }}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons
                            style={{ color: "#fff", marginLeft: 10 }}
                            size={40}
                            name="ios-arrow-back"
                        />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    style={[styles.boton, styles.boton_registro]}
                    onPress={() => {
                        console.log(
                            this.state.contador,
                            this.props.route.params.id_direccion,
                            this.props.route.params.authToken,
                            this.props.route.params.producto.id_componente_menu,
                            this.props.route.params.producto.fecha_pedido
                        );
                        this.props.crea_pedido(
                            this.state.contador,
                            this.props.route.params.id_direccion,
                            this.props.route.params.authToken,
                            this.props.route.params.producto.id_componente_menu,
                            this.props.route.params.producto.fecha_pedido
                        );
                    }}
                    underlayColor="#ed6f37"
                >
                    <Text style={styles.registro_text}>Añadir al pedido</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        success_log: state.PedidoReducer.success_log,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        crea_pedido: (
            cantidad,
            id_direccion,
            authToken,
            id_componente_menu,
            fecha_pedido
        ) =>
            dispatch(
                crea_pedido(
                    cantidad,
                    id_direccion,
                    authToken,
                    id_componente_menu,
                    fecha_pedido
                )
            ),
        limpia_update_menu: () => dispatch({ type: "MENU_UPDATE_CLEAR" }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailScreen);

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        borderRadius: 10,
    },
    content: {
        flex: 1,
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ed6f37",
        overflow: "hidden",
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: "cover",
    },
    bar: {
        backgroundColor: "transparent",
        marginTop: Platform.OS === "ios" ? 28 : 38,
        height: 32,
        position: "absolute",
    },
    title: {
        color: "white",
        fontSize: 18,
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        paddingBottom: 60,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: "#D3D3D3",
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ed6f37",
    },
    calorias: {
        fontSize: 15,
        paddingRight: 5,
        color: "#6e6e6e",
    },
    calorias_view: {
        flexDirection: "row",
        alignItems: "center",
    },
    descripcion_view: {
        marginTop: 10,
    },
    estrellas: {
        flexDirection: "row",
        alignItems: "center",
    },
    alergeno: {
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    alergenos_icono: {
        marginRight: 5,
    },
    alergeno_texto: {
        width: 50,
        fontSize: 9,
        fontWeight: "bold",
        textAlign: "center",
    },
    alergenos_iconos: {
        alignItems: "center",
        justifyContent: "center",
    },
    alergenos_contenedor_iconos: {
        flexDirection: "row",
        marginBottom: 10,
    },
    alergenos_texto: {
        fontSize: 18,
        fontWeight: "500",
        color: "#ed6f37",
    },
    alergenos_titulo: {
        marginBottom: 5,
        marginTop: 10,
    },
    listado_ingredientes: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    ingredientes: {
        marginRight: 5,
    },
    valores_nutricionales: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
    },
    bold: {
        fontWeight: "bold",
    },
    cuadros_info: {
        flexDirection: "row",
        marginTop: 10,
    },
    cuadro_info: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#BCBCBC",
        padding: 5,
        marginRight: 5,
        width: "23%",
    },
    cuadro_titulo: {
        fontWeight: "bold",
        fontSize: 16,
    },
    nutricional_container: {
        borderColor: "#BCBCBC",
        borderWidth: 2,
        padding: 5,
        width: "95%",
    },
    nutricional_texto: {
        fontSize: 18,
        fontWeight: "bold",
    },
    divider: {
        borderBottomColor: "#BCBCBC",
        borderBottomWidth: 1,
    },
    divider_ancho: {
        borderBottomColor: "#BCBCBC",
        borderBottomWidth: 3,
    },
    disclaimer_text: {
        marginTop: 10,
    },
    boton: {
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
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
    },
    cajon_contador: {
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    texto_contador: {
        padding: 10,
    },
    texto_cantidad: {
        fontSize: 16,
        fontWeight: "600",
        marginRight: 10,
    },
    precio_text: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 10,
    },
});
