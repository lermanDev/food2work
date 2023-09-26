import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo = () => (
    <View>
        <Image
            source={{ uri: "https://i.ibb.co/74fwCLZ/logo-grande.png" }}
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        backgroundColor: "white",
        marginBottom: 12,
        borderRadius: 200 / 2,
    },
});

export default memo(Logo);
