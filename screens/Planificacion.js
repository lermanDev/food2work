import * as React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { connect, useDispatch, useSelector } from "react-redux";
import { LocaleConfig } from "react-native-calendars";
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
import { Container, Left, Right } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { get_pedidos, borra_pedido } from "../actions/PedidoActions";

export default function Planificacion({ navigation, route }) {
    const authToken = useSelector(
        (state) => state.AutenticacionReducer.authToken
    );

    const actualizando_pedidos = useSelector(
        (state) => state.PedidoReducer.actualizando_pedidos
    );

    const pedidos = useSelector((state) => state.PedidoReducer.pedidos);

    LocaleConfig.locales["es"] = {
        monthNames: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        monthNamesShort: [
            "Ene.",
            "Feb.",
            "Mar.",
            "Abr.",
            "May.",
            "Jun.",
            "Jul.",
            "Ago.",
            "Sep.",
            "Oct.",
            "Nov.",
            "Dic.",
        ],
        dayNames: [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ],
        dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
    };

    LocaleConfig.defaultLocale = "es";

    const [index, setIndex] = React.useState(0);

    const dispatch = useDispatch();

    navigation.setOptions({
        headerShown: false,
    });

    /*signUp = async () => {
        const {nombre, password, email, phone_number} = this.state
        try {
            // here place your signup logic
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }*/

    const [items, setItems] = React.useState({});
    const fecha_hoy = new Date();

    const testIDs = {
        menu: {
            CONTAINER: "menu",
            CALENDARS: "calendars_btn",
            CALENDAR_LIST: "calendar_list_btn",
            HORIZONTAL_LIST: "horizontal_list_btn",
            AGENDA: "agenda_btn",
            EXPANDABLE_CALENDAR: "expandable_calendar_btn",
            WEEK_CALENDAR: "week_calendar_btn",
        },
        calendars: {
            CONTAINER: "calendars",
            FIRST: "first_calendar",
            LAST: "last_calendar",
        },
        calendarList: { CONTAINER: "calendarList" },
        horizontalList: { CONTAINER: "horizontalList" },
        agenda: {
            CONTAINER: "agenda",
            ITEM: "item",
        },
        expandableCalendar: { CONTAINER: "expandableCalendar" },
        weekCalendar: { CONTAINER: "weekCalendar" },
    };

    const loadItems = (day) => {
        //console.log(day);
        dispatch(get_pedidos(day, authToken));

        /*setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!item_aux[strTime]) {
                    item_aux[strTime] = [];

                    /* Solo debemos añadir un día y dentro del día todos los componentes 
                    item_aux[strTime].push({
                        name: "Item for " + strTime + " #",
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                    });
                    if (Math.random() * (1 - 0) + 0) {
                        item_aux[strTime].push({
                            name: "Item for " + strTime + " #",
                            height: Math.max(
                                50,
                                Math.floor(Math.random() * 150)
                            ),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(item_aux).forEach((key) => {
                newItems[key] = item_aux[key];
            });
            item_aux = newItems;
            console.log(item_aux);
            setItems(item_aux);
        }, 1000);*/
    };

    const renderItem = (item) => {
        let cantidad = item.raciones;
        return (
            <View style={{ flexDirection: "row" }}>
                <Left
                    testID={testIDs.agenda.ITEM}
                    style={[
                        styles.item,
                        {
                            flex: 0.7,
                        },
                    ]}
                >
                    <View style={styles.estilo_titulo}>
                        <Text style={styles.nombre_plato}>
                            {item.nombre_plato} ({item.raciones}){"  "}{" "}
                            {item.raciones * item.precio}€{"  "}
                        </Text>
                        {item.facturado && (
                            <Ionicons
                                style={{ color: "green", marginRight: 10 }}
                                size={20}
                                name="ios-cash"
                            />
                        )}
                    </View>
                    <View style={styles.estilo_titulo}>
                        <Ionicons
                            style={{ color: "#ed6f37" }}
                            size={15}
                            name="ios-pin"
                        />

                        <Text style={styles.item_text}> {item.direccion}</Text>
                    </View>
                </Left>
                <Right style={(styles.boton_borrar, { flex: 0.3 })}>
                    {!item.facturado && (
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(
                                    borra_pedido(
                                        item.id_linea_pedido,
                                        authToken
                                    )
                                );
                            }}
                        >
                            <Ionicons
                                style={{ color: "#ea3b2d", marginRight: 20 }}
                                size={25}
                                name="ios-trash"
                            />
                        </TouchableOpacity>
                    )}
                </Right>
            </View>
        );
    };

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text></Text>
            </View>
        );
    };

    const rowHasChanged = (r1, r2) => {
        return (
            r1.id_linea_pedido !== r2.id_linea_pedido ||
            r1.raciones !== r2.raciones
        );
    };

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split("T")[0];
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            const fecha = new Date();
            var fecha_filtro = fecha.toISOString().split("T")[0];
            console.log(fecha_filtro);
            dispatch(get_pedidos(fecha_filtro, authToken));
        });
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ed6f37" }}>
            <Container style={styles.container}>
                <Agenda
                    testID={testIDs.agenda.CONTAINER}
                    items={pedidos}
                    loadItemsForMonth={loadItems.bind(this)}
                    selected={fecha_hoy}
                    renderItem={renderItem.bind(this)}
                    renderEmptyDate={renderEmptyDate.bind(this)}
                    rowHasChanged={rowHasChanged.bind(this)}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#43515c'},
                    //    '2017-05-09': {textColor: '#43515c'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    firstDay={1}
                    displayLoadingIndicator={!actualizando_pedidos}
                    theme={{
                        backgroundColor: "#ffffff",
                        calendarBackground: "#f8f5f0",
                        selectedDayBackgroundColor: "#ed6f37",
                        selectedDayTextColor: "#ffffff",
                        todayTextColor: "#ed6f37",
                        textDisabledColor: "#888888",
                        agendaTodayColor: "#ed6f37",
                        dayTextColor: "#000000",
                        agendaKnobColor: "#ed6f37",
                        //dotColor: COLORS.GREEN,
                        //selectedDotColor: COLORS.PRIMARY,
                        "stylesheet.calendar.header": {
                            week: {
                                marginTop: Platform.OS == "ios" ? 6 : 2,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        },
                        "stylesheet.agenda.list": {
                            dayNum: {
                                width: "100%",
                                fontSize: 28,
                                fontWeight: "200",
                                textAlign: "center",
                                color: "#43515c",
                            },
                            day: {
                                width: 63,
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginTop: 10,
                                marginBottom: 10,
                            },
                            container: {
                                flexDirection: "row",
                                justifyContent: "center", //Centered vertically
                                alignItems: "center", // Centered horizontally
                                flex: 1,
                                borderBottomWidth: 1,
                                borderBottomColor: "#dbdbdbff",
                                marginRight: 3,
                                justifyContent: "center",
                                marginLeft: 3,
                            },
                        },
                        /* "stylesheet.calendar.header"?: CalendarThemeIdStyle;
                        "stylesheet.calendar.main"?: CalendarThemeIdStyle;
                        "stylesheet.calendar-list.main"?: CalendarThemeIdStyle;
                        "stylesheet.agenda.main"?: CalendarThemeIdStyle;
                        "stylesheet.agenda.list"?: CalendarThemeIdStyle;
                        "stylesheet.day.basic"?: CalendarThemeIdStyle;
                        "stylesheet.day.single"?: CalendarThemeIdStyle;
                        "stylesheet.day.multiDot"?: CalendarThemeIdStyle;
                        "stylesheet.day.period"?: CalendarThemeIdStyle; */
                    }}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                    // hideExtraDays={false}
                />
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8e8e8",
    },
    item: {
        marginBottom: 5,
        marginTop: 5,
    },
    item_text: {
        fontSize: 12,
    },
    nombre_plato: {
        flexShrink: 1,
        fontSize: 15,
        fontWeight: "500",
        color: "#695d47",
    },
    estilo_titulo: {
        flexDirection: "row",
        alignItems: "center",
    },
    boton_borrar: {
        flex: 1,
        paddingRight: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
