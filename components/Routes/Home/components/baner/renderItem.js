import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";

export default function renderItem({ item, index, separators, changeUpdate, length}) {
    const product = {
        images: item.images,
        name: item.name,
        price: item.price,
        regular_price: item.regular_price,
        description: item.description,
        short_description: item.short_description,
        categories: item.categories,
        attributes: item.attributes,
        sale_price:item.sale_price,
        id:item.id
    };
    
    return (
        <TouchableOpacity
            style={{
                width: 160,
                marginRight: length-1 != index ? 10 : 0,
                backgroundColor: "whitesmoke",
                padding: 6,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
            onPress={() => {
                changeUpdate(product);
            }}
        >
            <View
                style={{
                    height: 140,
                    width: 140,
                }}
            >
                <Image
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: 5,
                    }}
                    source={{
                        uri: item.images[0].src,
                    }}
                />
            </View>
            <View
                style={{
                    paddingTop: 3,
                }}
            >
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}
