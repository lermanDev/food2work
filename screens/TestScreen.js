import React, { Component } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Agenda } from "react-native-calendars";

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

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},
        };
    }

    render() {
        return (
            <Agenda
                testID={testIDs.agenda.CONTAINER}
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={"2020-05-16"}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
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
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#f8f5f0",
                    selectedDayBackgroundColor: "#E0D2BC",
                    selectedDayTextColor: "#000000",
                    todayTextColor: "#000000",
                    textDisabledColor: "#888888",
                    dayTextColor: "#000000",
                    agendaKnobColor: "#DCDCDC",
                    //dotColor: COLORS.GREEN,
                    //selectedDotColor: COLORS.PRIMARY,
                    "stylesheet.calendar.header": {
                        week: {
                            marginTop: Platform.OS == "ios" ? 6 : 2,
                            flexDirection: "row",
                            justifyContent: "space-between",
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
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);

                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);

                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: "Item for " + strTime + " #" + j,
                            height: Math.max(
                                50,
                                Math.floor(Math.random() * 150)
                            ),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach((key) => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems,
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => Alert.alert(item.name)}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split("T")[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
});
