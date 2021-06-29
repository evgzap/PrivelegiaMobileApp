import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
var a = 0;
export default function Categories({ route, navigation, allCategories }) {
    const length = 6;
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    padding: 10,
                }}
            >
                <View
                    style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", justifyContent: "space-between" }}
                >
                    {allCategories.map((e, i) => {
                        if (String(i / length).split(".").length == 1) {
                            a = i;
                        }
                        if (e.id !== 15) {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={{
                                        width: "45%",
                                        margin: 2,
                                        padding:20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: 6,
                                    }}
                                    onPress={() => {
                                        console.log(e.name, e.id);
                                        navigation.navigate("GoodsCategories", {
                                            name: e.name,
                                            id: e.id,
                                        });
                                    }}
                                >
                                    <Text style={{fontSize:16}}>{e.name}</Text>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>
            </View>
        </View>
    );
}
