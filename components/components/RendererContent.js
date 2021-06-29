import React from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import RenderImages from "./RenderImages";
import { HtmlText } from "react-native-html-to-text";
import { Button } from "react-native-elements";

export default function RendererContent({ selectedProduct, colors, navigation }) {
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
