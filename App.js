import React from "react";
import { StyleSheet, Text, View, Dimensions, Platform, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons} from "@expo/vector-icons";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";

import { colorSchema } from "./settings";

const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");

console.log(height, width, Platform.__constants.Model);
export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" backgroundColor={colorSchema.mainDarkColor} />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name == "Главная") {
                            return <Ionicons name={focused ? "ios-flower" : "ios-flower-outline"} size={size} color={color} />;
                        }
                        if (route.name == "Категории") {
                            return <Ionicons name={focused ? "md-list-circle" : "md-list-circle-outline"} size={size} color={color} />;
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colorSchema.mainLightColor,
                }}
            >
                <Tab.Screen name="Главная" component={Home}></Tab.Screen>
                <Tab.Screen name="Категории" component={Category}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
