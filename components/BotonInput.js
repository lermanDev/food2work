import React, { memo } from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default class BotonInput extends React.Component {

    constructor(props) {
        super(props);
    }

    handleInputChange = val => {
        this.props.onNameChange(val)
    }



    render() {

        return (
            <View style={styles.inputView}>
                <Ionicons
                    name={this.props.icon}
                    size={40}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholer}
                    autoCapitalize={this.props.autocapitalize}
                    placeholderTextColor='black'
                    textContentType={this.props.textContentType}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.handleInputChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 55,
        borderRadius: 6,
        marginBottom:10,
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        padding: 8,
        color: 'black',
        fontSize: 18,
    },
})