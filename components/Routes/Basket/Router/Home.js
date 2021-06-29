import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getAllItemBasket } from "../../../../Store/Basket";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { Button } from "react-native-elements";

// import basketClean from "../../../../assets/shopping-basket.svg";

export default function Home({ navigation }) {
    const [items, setItems] = useState(getAllItemBasket());
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const totalPrice = () => {
        var total = 0;

        items.forEach((e) => {
            total += Number(e.price * e.count);
        });
        return total;
    };

    return (
        <View
            style={{
                padding: 10,
                backgroundColor: "white",
                height: "100%",
                justifyContent: "center",
                flexDirection: "row",
            }}
        >
            <View
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <View
                    style={{
                        width: Dimensions.get("window").width < 500 ? "100%" : 540,
                        margin: 10,
                    }}
                >
                    {items.length == 0 && (
                        <View
                            style={{
                                width: Dimensions.get("window").width < 500 ? "100%" : 540,
                                height: Dimensions.get("window").width < 500 ? "100%" : 540,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                style={{
                                    width: Dimensions.get("window").width < 500 ? "100%" : 300,
                                    height: Dimensions.get("window").width < 500 ? 200 : 300,
                                }}
                                source={{
                                    uri: "https://privilegiaflower.ru/wp-content/uploads/2021/06/526736-1.png",
                                }}
                            />
                            <Text style={{ fontSize: 20, color: "gray", fontWeight: "600" }}>Ваша корзина пуста</Text>
                        </View>
                    )}
                    {items.map((e, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    marginBottom: 10,
                                    borderWidth: 1,
                                    borderColor: "#f0f0f0",
                                    padding: 5,
                                    borderRadius: 5,
                                }}
                                onPress={() => {
                                    navigation.navigate("Product", { product: e });
                                }}
                            >
                                <View
                                    style={{
                                        width: 120,
                                        height: 120,
                                        marginRight: 15,
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 10,
                                        }}
                                        source={{
                                            uri: e.images[0].src,
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ color: "#404040", marginBottom: 5 }}>{e.name}</Text>
                                    <Text style={{ color: "#404040", marginBottom: 5 }}>
                                        <Text style={{ fontSize: 13 }}>Цена:</Text> {e.price}{" "}
                                        <FontAwesome name="rub" size={14} color="black" />
                                    </Text>
                                    <View style={styles.addToBasket}>
                                        <Text style={{ fontSize: 13 }}>Кол-во:</Text>
                                        <View style={styles.changeCount}>
                                            <AntDesign
                                                name="minus"
                                                size={28}
                                                color="black"
                                                onPress={() => {
                                                    if (e.count > 1) {
                                                        e.count -= 1;
                                                        forceUpdate();
                                                    } else {
                                                        Alert.alert(
                                                            "Privilegia flower",
                                                            "К сожалению меншьше 1 указать нельзя"
                                                        );
                                                    }
                                                }}
                                            />
                                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>{e.count}</Text>
                                            <AntDesign
                                                name="plus"
                                                size={28}
                                                color="black"
                                                onPress={() => {
                                                    e.count += 1;
                                                    forceUpdate();
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <Text style={{ color: "#404040", marginBottom: 5 }}>
                                        <Text style={{ fontSize: 13 }}>Итого:</Text> {e.count * e.price}
                                    </Text>
                                    {/* {e.attributes.map((attributes, item) => {
                                        console.log(attributes.name, attributes.options);
                                        if (attributes.name == "Состав букета") {
                                            return (
                                                <Text style={{ color: "#2b2b2b", marginBottom: 5 }} key={item}>
                                                    Состав: 
                                                </Text>
                                            );
                                        }
                                    })} */}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View
                    style={{
                        alignItems: "flex-end",
                        width: "100%",
                    }}
                >
                    {items.length != 0 && (
                        <>
                            <Button
                                title="Оформить заказ"
                                onPress={() => {
                                    navigation.navigate("Decoration");
                                }}
                            />

                            <Text style={{ fontSize: 18 }}>
                                Итого: {totalPrice()} <FontAwesome name="rub" size={14} color="black" />
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addToBasket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    changeCount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        fontSize: 30,
    },
});
