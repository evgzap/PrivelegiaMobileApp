import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { Button } from "react-native-elements";
import HtmlText from "react-native-html-to-text";
import RenderImages from "../../../components/RenderImages";


export default function Categories({ route, navigation, paramsSend }) {
    const sheetRef = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [size, setSize] = useState(400);
    const renderContent = () => {
        if (selectedProduct.length != 0)
            return (
                <View
                    style={{
                        width: "100%",
                        height: 600,
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "whitesmoke",
                            borderColor: paramsSend.color.mainDarkColor,
                            borderWidth: 1,
                            width: Dimensions.get("window").width < 500 ? "100%" : 540,
                            padding: 16,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            height: 600,
                            paddingVertical: 8,
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <View
                            style={[
                                style.headerBaner,
                                {
                                    borderBottomColor: paramsSend.color.mainDarkColor,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontSize: 17,
                                }}
                            >
                                {selectedProduct.name}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: 5,
                                padding: 2,
                                width: "100%",
                            }}
                        >
                            {selectedProduct.images.length == 1 ? (
                                <Image
                                    style={{ width: "100%", height: 180, borderRadius: 8 }}
                                    source={{ uri: selectedProduct.images[0].src }}
                                />
                            ) : (
                                <View>
                                    <FlatList
                                        data={selectedProduct.images}
                                        renderItem={(item) => {
                                            return <RenderImages item={item}></RenderImages>;
                                        }}
                                        horizontal={true}
                                        keyExtractor={(item, index) => String(item.id + index + item.name)}
                                    />
                                </View>
                            )}
                        </View>
                        <View
                            style={{
                                width: "100%",
                            }}
                        >
                            <Button
                                title="Подробнее"
                                onPress={(e) => {
                                    navigation.navigate("Product", { product: selectedProduct });
                                }}
                            />
                        </View>
                        <View style={style.wrapperBanner}>
                            <HtmlText html={selectedProduct.description}></HtmlText>
                        </View>
                        <View style={style.wrapperBanner}>
                            <HtmlText html={selectedProduct.short_description}></HtmlText>
                        </View>
                    </View>
                </View>
            );
    };

    const fall = new Animated.Value(1);

    useEffect(() => {
        setProducts([]);
        axios
            .get(paramsSend.mainPage.pathToApi, {
                params: {
                    category: route.params.id,
                    per_page: 100,
                    consumer_secret: paramsSend.keys.cs,
                    consumer_key: paramsSend.keys.ck,
                },
            })
            .then((r) => {
                setProducts(r.data);
            });
    }, [route.params.name]);

    return (
        <View
            style={styles.wrapper}
            onLayout={(event) => {
                setSize(
                    event.nativeEvent.layout.width / 6 < 100
                        ? event.nativeEvent.layout.width / 3
                        : event.nativeEvent.layout.width / 6
                );
            }}
        >
            <ScrollView
                style={{
                    width: "100%",
                }}
            >
                <View style={styles.wrapperContent}>
                    {products.map((e, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={{ width: size - 14, margin: 5 }}
                                onPress={(event) => {
                                    setSelectedProduct(e);
                                    sheetRef.current.snapTo(1);
                                }}
                            >
                                <View
                                    style={{
                                        borderRadius: 4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        backgroundColor: "whitesmoke",
                                        paddingBottom: 6,
                                    }}
                                >
                                    <View
                                        style={{
                                            padding: 5,
                                            marginTop: 10,
                                            width: size - 14,
                                            height: size - 14,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                borderRadius: 4,
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "silver",
                                            }}
                                            source={{
                                                uri: e.images[0].src,
                                            }}
                                        />
                                    </View>
                                    <Text>{e.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[600, 265, 0]}
                borderRadius={20}
                initialSnap={2}
                renderContent={renderContent}
                enabledContentTapInteraction={false}
                // enabledGestureInteraction={false}
                callbackNode={fall}
            />
        </View>
    );
}
const style = StyleSheet.create({
    wrapper: {
        backgroundColor: "gray",
        flex: 1,
    },
    headerBaner: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 2,
    },
    headerWrapper: {
        padding: 10,
        alignItems: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 0.5,
    },
    headerImage: {
        aspectRatio: 3,
        width: 300,
        resizeMode: "cover",
        justifyContent: "center",
        alignContent: "center",
    },
    header: {
        width: "100%",
        height: 50,
    },
    wrapperBanner: {
        marginTop: 5,
        padding: 2,
    },
    wrapperContent: {
        flex: 1,
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
    },
});

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
        // justifyContent: "space-around",
        padding: 5,
    },
    imagesFlatList: {
        width: "100%",
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
