import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

import BottomSheet from "reanimated-bottom-sheet";
import React, { useState, useEffect, useRef } from "react";

import Animated from "react-native-reanimated";
import HtmlText from "react-native-html-to-text";
import { Button } from "react-native-elements";
import RenderImages from "../../../components/RenderImages";
import Baner from "../components/baner/Baner";

export default function Home({ navigation, allCategories, paramsSend }) {
    const [keys, setKeys] = useState(paramsSend.keys);
    const [colors, setColors] = useState(paramsSend.color);
    const [path, setPath] = useState(paramsSend.mainPage.pathToApi);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const [banners, setBanners] = useState(paramsSend.mainPage.banners);
    const [imageBanner, setImageBanner] = useState(paramsSend.mainPage.imageBanner);
    const [err, setError] = useState(true);

    const sheetRef = useRef(null);

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
                            borderColor: colors.mainDarkColor,
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
                                    borderBottomColor: colors.mainDarkColor,
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
    const changeUpdate = (product) => {
        sheetRef.current.snapTo(1);
        setSelectedProduct(product);
    };

    const fall = new Animated.Value(1);
    console.log(Dimensions.get("window").width);
    return (
        <View style={style.wrapper}>
            {err && (
                <>
                    <Animated.View
                        style={{
                            height: "100%",
                            opacity: Animated.add(0.1, Animated.multiply(fall, 1)),
                            backgroundColor: "white",
                        }}
                    >
                        <View style={style.headerWrapper}>
                            <Image
                                style={style.headerImage}
                                source={{
                                    uri: "https://privilegiaflower.ru/wp-content/uploads/2020/03/logoMX.png",
                                }}
                            ></Image>
                        </View>
                        <SafeAreaView style={{ flex: 1 }}>
                            <ScrollView horizontal={false}>
                                <View style={[style.wrapperContent, { marginBottom: 20 }]}>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "column",
                                            padding: 10,
                                            shadowColor: "rgb(64 64 64)",
                                            shadowOpacity: 0.33,
                                            shadowRadius: 10,
                                            shadowOffset: { width: 0, height: 10 },
                                            elevation: 1,
                                        }}
                                    >
                                        <ImageBackground
                                            source={{ uri: imageBanner.image }}
                                            style={{
                                                flex: 1,
                                                height: 200,
                                                padding: 10,
                                                resizeMode: "cover",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            imageStyle={{
                                                borderRadius: 6,
                                            }}
                                        >
                                            <Text style={{ fontSize: 20, width: 200, textAlign: "center" }}>
                                                {imageBanner.text}
                                            </Text>
                                        </ImageBackground>
                                    </View>
                                </View>
                                <View style={style.wrapperContent}>
                                    {banners.map((e, i) => {
                                        return (
                                            <Baner
                                                key={i}
                                                keys={keys}
                                                baner={e}
                                                path={path}
                                                allCategories={allCategories}
                                                changeUpdate={(product) => {
                                                    changeUpdate(product);
                                                }}
                                            />
                                        );
                                    })}
                                </View>
                                {paramsSend.mainPage.smallBanners && (
                                    <View style={style.wrapperContent}>
                                        {paramsSend.mainPage.smallBanners.map((e, i) => {
                                            return (
                                                <TouchableOpacity
                                                    key={i}
                                                    style={{
                                                        marginBottom: 20,
                                                        width:
                                                            Dimensions.get("window").width < 400
                                                                ? paramsSend.mainPage.smallBanners.length - 1 == i
                                                                    ? "100%"
                                                                    : "48%"
                                                                : "32.333%",
                                                    }}
                                                    onPress={() => {
                                                        navigation.navigate("Категории", {
                                                            screen: "GoodsCategories",
                                                            params: { name: e.text, id: e.id },
                                                        });
                                                    }}
                                                >
                                                    <ImageBackground
                                                        source={{ uri: e.image }}
                                                        style={{
                                                            flex: 1,
                                                            height: 180,
                                                            padding: 10,
                                                            resizeMode: "cover",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                        imageStyle={{
                                                            borderRadius: 6,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: e.color,
                                                                fontSize: 20,
                                                                width: "80%",
                                                                textAlign: "left",
                                                            }}
                                                        >
                                                            {e.text}
                                                        </Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                )}
                                <View style={{
                                    padding:10
                                }}>
                                    
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </Animated.View>

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
                </>
            )}
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
        justifyContent: "space-between",
        padding: 5,
    },
});
