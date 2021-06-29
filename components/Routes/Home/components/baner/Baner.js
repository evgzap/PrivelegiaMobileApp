import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { colorSchema } from "../../../../../settings";
import RenderItem from "./renderItem";
import axios from "axios";
export default function Baner({ baner, allCategories, changeUpdate, keys, path }) {
    let originalName = "";
    allCategories.forEach((element) => {
        if (element.id == baner.id) {
            originalName = element.name;
        }
    });

    const [banner, setBanner] = useState([]);

    useEffect(() => {
        axios
            .get(path, {
                params: {
                    consumer_secret: keys.cs,
                    consumer_key: keys.ck,
                    category: baner.id,
                    per_page: baner.count,
                },
            })
            .then((res) => {
                setBanner(res.data);
            });
    }, []);

    return (
        <View style={style.baner}>
            <View style={style.headerBaner}>
                <View style={style.halfHeader}>
                    <Text>{baner.name ? baner.name : originalName}</Text>
                </View>
            </View>
            <View style={style.wrapperBanner}>
                <View>
                    <FlatList
                        data={banner}
                        horizontal={true}
                        renderItem={({ item, index, separators }) => {
                            return (
                                <RenderItem
                                    key={String(item.id + index + item.name)}
                                    item={item}
                                    length={baner.length}
                                    index={index}
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
