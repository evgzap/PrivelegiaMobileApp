import React from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { colorSchema } from "../../settings";

export default function LoadingBaner() {
    const Item = ({ index }) => {
        return (
            <View
                style={{
                    width: 160,
                    backgroundColor: "whitesmoke",
                    marginRight: 7 - 1 != index ? 10 : 0,
                    padding: 6,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <View
                    style={{
                        height: 140,
                        width: 140,
                    }}
                >
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "silver",
                            borderRadius: 5,
                        }}
                    />
                </View>
            </View>
        );
    };
    


    return (
        <View style={style.baner}>
            <View style={style.headerBaner}>
                <Animated.View style={style.halfHeader}>
                    <View style={{ backgroundColor: "silver", borderRadius: 4, height: 20, margin: 8 }}></View>
                </Animated.View>
            </View>
            <View style={style.wrapperBanner}>
                <View>
                    <FlatList
                        data={[0, 1, 2, 3, 4, 5, 6]}
                        horizontal={true}
                        renderItem={({ item, index, separators }) => {
                            return <Item key={String(index)} item={item} index={index} separators={separators} />;
                        }}
                        keyExtractor={(item, index) => {
                            return String(index);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    baner: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 5,
        width: "100%",
        // borderColor: colorSchema.mainDarkColor,
        // borderWidth: 0.3,
    },
    headerBaner: {
        display: "flex",
        flexDirection: "row",
        borderBottomColor: colorSchema.mainDarkColor,
        borderBottomWidth: 0.3,
    },
    halfHeader: {
        width: "50%",
    },
    wrapperBanner: {
        marginTop: 5,
        padding: 2,
    },
    productCard: {
        minWidth: "45%",
        backgroundColor: "whitesmoke",
        borderRadius: 4,
    },
    productName: {},
    productImage: {
        height: 150,
        resizeMode: "center",
    },
});
