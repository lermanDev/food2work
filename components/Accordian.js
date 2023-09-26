import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
// import { Colors } from "./Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Body, Left, Right } from "native-base";

export default class Accordian extends Component {
    constructor(props) {
        super(props);

        let CANTIDAD_TOTAL = 0;
        let PRECIO_TOTAL = 0;

        Object.keys(props.data).some(function (k) {
            if (props.data[k]["facturado"] == true) {
                CANTIDAD_TOTAL = CANTIDAD_TOTAL + props.data[k]["raciones"];
                PRECIO_TOTAL =
                    PRECIO_TOTAL +
                    props.data[k]["precio"] * props.data[k]["raciones"];
            }
        });

        this.state = {
            data: props.data,
            CANTIDAD_TOTAL: CANTIDAD_TOTAL,
            PRECIO_TOTAL: PRECIO_TOTAL,
            expanded: false,
        };

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.toggleExpand()}
                >
                    <Text style={[styles.title]}>{this.props.title}</Text>
                    <Icon
                        name={
                            this.state.expanded
                                ? "keyboard-arrow-up"
                                : "keyboard-arrow-down"
                        }
                        size={30}
                        color={"darkgray"}
                    />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {this.state.expanded && (
                    <View style={{}}>
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "left",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PLATO
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        CANTIDAD
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "right",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        PRECIO
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.childHr} />
                        </View>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({ item, index }) =>
                                item.facturado == true && (
                                    <View key={item.id_linea_pedido}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                flex: 1,
                                                paddingBottom: 10,
                                                paddingTop: 10,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: "left",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    {item.nombre_plato}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    {item.raciones}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text
                                                    style={{
                                                        flex: 1,
                                                        textAlign: "right",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    {item.raciones *
                                                        item.precio}
                                                    €
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.childHr} />
                                    </View>
                                )
                            }
                        />
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "left",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        TOTAL
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {this.state.CANTIDAD_TOTAL}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: "right",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {this.state.PRECIO_TOTAL}€
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.childHr} />
                        </View>
                    </View>
                )}
            </View>
        );
    }

    onClick = (index) => {
        const temp = this.state.data.slice();
        temp[index].value = !temp[index].value;
        this.setState({ data: temp });
    };

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "100%",
        height: 54,
        alignItems: "center",
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#5d5d5d",
    },
    itemActive: {
        fontSize: 12,
        color: "green",
    },
    itemInActive: {
        fontSize: 12,
        color: "#717171",
    },
    btnActive: {
        borderColor: "green",
    },
    btnInActive: {
        borderColor: "darkgray",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    childRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
    },
    parentHr: {
        height: 1,
        width: "100%",
    },
    childHr: {
        height: 1,
        backgroundColor: "lightgray",
        width: "100%",
    },
    colorActive: {
        borderColor: "green",
    },
    colorInActive: {
        borderColor: "darkgray",
    },
});
