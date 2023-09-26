import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen, AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import useLinking from "./navigation/useLinking";

import { Provider } from "react-redux";

import Principal from "./navigation/Principal";

/*import { persistor, autenticationStore } from "./store/autenticationStore";
import { PersistGate } from "redux-persist/integration/react";
import LoadingStoreScreen from "./screens/loading_store";*/

import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingStoreScreen from "./screens/loading_store";

// const store = autenticationStore;

//export default function App(props) {
export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(true);
    const [
        initialNavigationState,
        setInitialNavigationState,
    ] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
                    ...Ionicons.font,
                });
                /*await Font.loadAsync({
                  Roboto: require('native-base/Fonts/Roboto.ttf'),
                  Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                  ...Ionicons.font,
                });*/
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return <AppLoading />;
    } else {
        //console.log(store.getState());
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<LoadingStoreScreen />}
                    persistor={persistor}
                >
                    <View style={styles.container}>
                        {Platform.OS === "ios" && (
                            <StatusBar barStyle="default" />
                        )}
                        <NavigationContainer
                            ref={containerRef}
                            initialState={initialNavigationState}
                        >
                            <Principal />
                        </NavigationContainer>
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

const screenOptions = {
    headerStyle: {
        backgroundColor: "#ed6f37",
    },
    headerTintColor: "#ffff",
};
