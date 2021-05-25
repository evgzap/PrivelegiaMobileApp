import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import React, { useState, useEffect, useRef } from "react";
import { settings, colorSchema } from "../../settings";
import axios from "axios";
import Animated from "react-native-reanimated";
import HtmlText from "react-native-html-to-text";

import Baner from "./components/baner/Baner";

export default function Home({ navigation }) {
    const [mainBanner, setMainBanner] = useState([]);
    const [secondBanner, setSecondBanner] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const sheetRef = useRef(null);

    useEffect(() => {
        axios
            .get("https://privilegiaflower.ru/wp-json/wc/v3/products", {
                params: {
                    consumer_secret: settings.cs,
                    consumer_key: settings.ck,
                    category: 104,
                    per_page: 6,
                },
            })
            .then((res) => {
                setMainBanner(res.data);
            });
        axios
            .get("https://privilegiaflower.ru/wp-json/wc/v3/products", {
                params: {
                    consumer_secret: settings.cs,
                    consumer_key: settings.ck,
                    category: 306,
                    per_page: 6,
                },
            })
            .then((res) => {
                setSecondBanner(res.data);
            });
    }, []);

    const renderImages = ({ item }) => {
        return (
            <View
                style={{
                    width: 177,
                    height: 180,
                    marginRight: 2,
                    borderRadius: 5,
                }}
            >
                <Image
                    style={{
                        height: "100%",
                        borderRadius: 10,
                    }}
                    source={{
                        uri: item.src,
                    }}
                />
            </View>
        );
    };

    const renderContent = () => {
        if (selectedProduct.length != 0)
            return (
                <View
                    style={{
                        backgroundColor: "silver",
                        borderTopColor: colorSchema.mainDarkColor,
                        borderTopWidth: 1,
                        padding: 16,
                        height: 600,
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <View style={style.headerBaner}>
                        <Text
                            style={{
                                fontSize: 17,
                            }}
                        >
                            {selectedProduct.name}
                        </Text>
                    </View>
                    <View style={style.wrapperBanner}>
                        <ScrollView>
                            <View>
                                <FlatList
                                    data={selectedProduct.images}
                                    renderItem={renderImages}
                                    horizontal={true}
                                    keyExtractor={(item, index) => String(item.id + index + item.name)}
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={style.wrapperBanner}>
                        <HtmlText html={selectedProduct.description}></HtmlText>
                    </View>
                    <View style={style.wrapperBanner}>
                        <HtmlText html={selectedProduct.short_description}></HtmlText>
                    </View>
                </View>
            );
    };
    const changeUpdate = (product) => {
        sheetRef.current.snapTo(1);
        setSelectedProduct(product);
    };
    const renderHeader = () => <View style={style.header} />;
    const fall = new Animated.Value(1);

    return (
        <View style={style.wrapper}>
            
            <View style={style.headerWrapper}>
                <Image
                    style={style.headerImage}
                    source={{
                        uri: "https://privilegiaflower.ru/wp-content/uploads/2020/03/logoMX.png",
                    }}
                ></Image>
            </View>
            <View style={style.wrapperContent}>
                {mainBanner.length == 0 ? (
                    <Text>Не загружено</Text>
                ) : (
                    <Baner
                        name={"Летняя колеекция"}
                        baner={mainBanner}
                        changeUpdate={(product) => {
                            changeUpdate(product);
                        }}
                    />
                )}

                {secondBanner.length == 0 ? (
                    <Text>Не загружено</Text>
                ) : (
                    <Baner
                        name={"Розы"}
                        baner={secondBanner}
                        changeUpdate={(product) => {
                            changeUpdate(product);
                        }}
                    />
                )}
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[600, 230, 0]}
                borderRadius={10}
                initialSnap={2}
                renderHeader={renderHeader}
                renderContent={renderContent}
                enabledInnerScrolling={false}
                callbackNode={fall}
            />

        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        flex: 1,
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
    wrapperContent: {
        flex: 1,
        // backgroundColor: "red",
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
    },
});
