import React, { useEffect, useState} from "react";
import { StyleSheet, View, StatusBar, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import Home from "./components/Routes/Home/Index";
import Category from "./components/Routes/Category/Category";
import Basket from "./components/Routes/Basket/Index";
import About from "./components/Routes/About/Index";

import axios from "axios";


import { Alert } from "react-native";
import { colorSchema, settings } from "./settings";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
    const [colors, setColors] = useState(colorSchema);
    const [allCategories, setCategories] = useState([]);
    const [paramsSend, setParams] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const params = { key: "login", password: 1234 };
        axios
            .get("http://95.161.172.222:7373/api/settings/get", { params })
            .then((r) => {
                setParams(r.data);
                setColors(r.data.color);

                axios
                    .get(r.data.mainPage.getCategory, {
                        params: {
                            consumer_secret: r.data.keys.cs,
                            consumer_key: r.data.keys.ck,
                            per_page: 100,
                        },
                    })
                    .then((r) => {
                        setLoad(true);
                        setCategories(r.data);
                    });
            })
            .catch((e) => {
                Alert.alert("Privilegia flower", "Приложение может работать со сбоями");
                setParams({
                    color: {
                        mainDarkColor: colorSchema.mainDarkColor,
                        mainLightColor: colorSchema.mainLightColor,
                    },
                    forWho: {
                        __v: 0,
                        _id: "60cb3fb859da64183cb450f3",
                        dateRegistration: "1623932857084",
                        device: "Mobile App",
                        key: "login",
                        nameService: "Privilegia Flower",
                        password: "$2a$08$.myyDqK8Rn73WlodufSKoeQeqvITbrQtfW9XBox2Nhvp9Mh.JSmTK",
                        type: "get",
                    },
                    keys: {
                        ck: settings.ck,
                        cs: settings.cs,
                    },
                    mainPage: {
                        banners: [
                            {
                                count: 8,
                                id: 115,
                                name: "",
                            },
                            {
                                count: 8,
                                id: 306,
                                name: "",
                            },
                        ],
                        smallBanners: [
                            {
                                text: "Осенние",
                                id: "261",
                                color: "white",
                                image: "https://privilegiaflower.ru/wp-content/uploads/2020/10/ads-osen.jpg",
                            },
                            {
                                text: "Летние",
                                id: "104",
                                color: "white",
                                image: "https://privilegiaflower.ru/wp-content/uploads/2020/05/ads-02-1.jpg",
                            },
                            {
                                text: "Весенние",
                                id: "109",
                                color: "white",
                                image: "https://privilegiaflower.ru/wp-content/uploads/2020/09/ads-04-1NG.jpg",
                            },
                        ],
                        getCategory: "https://privilegiaflower.ru/wp-json/wc/v3/products/categories",
                        imageBanner: {
                            image: "https://mocah.org/uploads/posts/551590-bloom-blossom.jpg",
                            text: "Привелегия дружить",
                        },
                        name: "Главная страница",
                        pathToApi: "https://privilegiaflower.ru/wp-json/wc/v3/products",
                    },
                });
                axios
                    .get("https://privilegiaflower.ru/wp-json/wc/v3/products/categories", {
                        params: {
                            consumer_secret: settings.cs,
                            consumer_key: settings.ck,
                            per_page: 100,
                        },
                    })
                    .then((r) => {
                        setLoad(true);
                        setCategories(r.data);
                    });
            });
    }, []);

    const MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent={false} backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );

    const HomeScreen = ({ navigation }) => {
        return (
            <>
                {load ? (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                if (route.name == "Главная") {
                                    return (
                                        <Ionicons
                                            name={focused ? "ios-flower" : "ios-flower-outline"}
                                            size={size}
                                            color={color}
                                        />
                                    );
                                }
                                if (route.name == "Категории") {
                                    return (
                                        <Ionicons
                                            name={focused ? "md-list-circle" : "md-list-circle-outline"}
                                            size={size}
                                            color={color}
                                        />
                                    );
                                }
                                if (route.name == "Корзина") {
                                    return (
                                        <Ionicons
                                            name={focused ? "md-basket" : "md-basket-outline"}
                                            size={size}
                                            color={color}
                                        />
                                    );
                                }
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: colors.mainLightColor,
                        }}
                    >
                        <Tab.Screen
                            name="Главная"
                            children={(e) => {
                                return <Home allCategories={allCategories} paramsSend={paramsSend} />;
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name="Категории"
                            children={() => {
                                return <Category allCategories={allCategories} paramsSend={paramsSend} />;
                            }}
                        ></Tab.Screen>
                        <Tab.Screen
                            name="Корзина"
                            children={() => {
                                return <Basket paramsSend={paramsSend} />;
                            }}
                        ></Tab.Screen>
                    </Tab.Navigator>
                ):<Text></Text>}
            </>
        );
    };
    return (
        <NavigationContainer>
            <MyStatusBar backgroundColor={colors.mainDarkColor} barStyle="light-content" />
            <Drawer.Navigator initialRouteName="Цветы">
                <Drawer.Screen name="Цветы" component={HomeScreen} />
                <Drawer.Screen name="О приложении" component={About} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {},
});
