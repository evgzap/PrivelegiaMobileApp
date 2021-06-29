import React, { useState } from "react";
import { Button } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView, Image, FlatList, Dimensions } from "react-native";
import RenderImages from "../../components/RenderImages";

import { colorSchema } from "../../../settings";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { AddToBasket } from "../../../Store/Basket";
import { Alert } from "react-native";
const { height, width } = Dimensions.get("window");

export default function CurrentGoods({ navigation, route, paramsSend }) {
    const product = route.params.product;
    const [count, setCount] = useState(1);
    Object.keys(product.attributes).map((i) => {
        Object.values(i);
    });

    return (
        <View style={styles.wrapper}>
            <View style={(styles.wrapperContent, { padding: 10 })}>
                <View style={styles.imagesFlatList}>
                    {product.images.length == 1 ? (
                        <Image
                            style={{ width: "100%", height: 200, borderRadius: 10 }}
                            source={{ uri: product.images[0].src }}
                        />
                    ) : (
                        <ScrollView>
                            <FlatList
                                data={product.images}
                                renderItem={(item) => {
                                    return <RenderImages item={item}></RenderImages>;
                                }}
                                horizontal={true}
                                keyExtractor={(item, index) => String(item.id + index + item.name)}
                            />
                        </ScrollView>
                    )}
                </View>
                <ScrollView
                    style={{
                        width: "100%",
                        height: width,
                    }}
                >
                    <View style={styles.placePrice}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {product.regular_price != product.price ? (
                                <>
                                    <Text
                                        style={{
                                            color: "red",
                                            textDecorationLine: "line-through",
                                            fontSize: 12,
                                            marginRight: 10,
                                        }}
                                    >
                                        {product.regular_price}
                                    </Text>
                                    <Text style={{ color: "green", fontWeight: "700", fontSize: 20, marginRight: 10 }}>
                                        {product.price}
                                    </Text>
                                </>
                            ) : (
                                <Text style={{ fontWeight: "700", fontSize: 20, marginRight: 10  }}>{product.regular_price}</Text>
                            )}
                            <FontAwesome name="rub" size={20} color="black" />
                        </View>
                        <View style={styles.addToBasket}>
                            <View style={styles.changeCount}>
                                <AntDesign
                                    name="minus"
                                    size={24}
                                    color="black"
                                    onPress={() => {
                                        if (count > 1) {
                                            setCount(count - 1);
                                        } else {
                                            Alert.alert("Privilegia flower", "К сожалению меншьше 1 указать нельзя");
                                        }
                                    }}
                                />
                                <Text style={{ padding: 5 }}>{count}</Text>
                                <AntDesign
                                    name="plus"
                                    size={24}
                                    color="black"
                                    onPress={() => {
                                        setCount(count + 1);
                                    }}
                                />
                            </View>

                            <Button
                                style={{
                                    margin: 10,
                                }}
                                type="outline"
                                title={"В корзину"}
                                onPress={(e) => {
                                    AddToBasket(product, count);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.placeInfo}>
                        {product.attributes.map((e, i) => {
                            if (e.name == "Цвет" || e.name == "Повод" || e.name == "Праздник" || e.name == "Состав") {
                                return;
                            }
                            return (
                                <View key={i} style={{ marginBottom: 14 }}>
                                    <Text>{e.name}</Text>
                                    <View
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            borderBottomColor: paramsSend.color.mainDarkColor,
                                            borderBottomWidth: 1,
                                            // justifyContent:'space-between',
                                        }}
                                    >
                                        {e.options.map((options, item) => {
                                            if (options.length < 25) {
                                                return (
                                                    <Text
                                                        style={{
                                                            paddingHorizontal: 7,
                                                            margin: 5,
                                                            paddingVertical: 3,
                                                            // borderWidth:1,
                                                            fontSize: 13,
                                                            borderRadius: 7,
                                                            backgroundColor: "white",
                                                        }}
                                                        key={item}
                                                    >
                                                        {options}
                                                    </Text>
                                                );
                                            }
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.placeInfo}>
                        <View>
                            <Text>Категории</Text>
                            <View style={[styles.placeItem, { borderBottomColor: paramsSend.color.mainDarkColor }]}>
                                {product.categories.map((category, item) => {
                                    return (
                                        <View key={item} style={{ margin: 5 }}>
                                            <Button
                                                style={{
                                                    margin: 10,
                                                }}
                                                type="outline"
                                                title={category.name}
                                                onPress={(e) => {
                                                    navigation.navigate("Категории", {
                                                        screen: "GoodsCategories",
                                                        params: {
                                                            name: category.name,
                                                            id: category.id,
                                                        },
                                                    });
                                                }}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            {/* <Button
                title="Назад"
                onPress={(e) => {
                    navigation.goBack();
                }}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "white",
        flex: 1,
    },
    wrapperContent: {
        flex: 1,
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
    },
    imagesFlatList: {
        width: "100%",
    },
    placePrice: {
        width: "100%",
        backgroundColor: "#fafafa",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    },
    addToBasket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    changeCount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 20,
    },

    placeInfo: {
        width: "100%",
        backgroundColor: "#fafafa",
        marginTop: 10,
        padding: 10,
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        borderRadius: 10,
    },
    placeItem: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        borderBottomWidth: 1,
        // justifyContent:'space-between',
    },
});
