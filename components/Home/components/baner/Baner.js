import React from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { colorSchema } from "../../../../settings";
import RenderItem from "./renderItem";

export default function Baner({ baner, name, changeUpdate }) {
    return (
        <View style={style.baner}>
            <View style={style.headerBaner}>
                <View style={style.halfHeader}>
                    <Text>{name}</Text>
                </View>
            </View>
            <View style={style.wrapperBanner}>
                <ScrollView>
                    <View>
                        <FlatList
                            data={baner}
                            horizontal={true}
                            renderItem={({ item, index, separators }) => {
                                return (
                                    <RenderItem
                                        key={String(item.id + index + item.name)}
                                        item={item}
                                        separators={separators}
                                        changeUpdate={(e) => {
                                            changeUpdate(e);
                                        }}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => {
                                return String(item.id + index + item.name);
                            }}
                        ></FlatList>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    baner: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 5,
        backgroundColor: "white",
        borderRadius: 7,
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
