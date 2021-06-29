import { View, Text, ImageBackground, Dimensions, StyleSheet } from "react-native";
import React from "react";

export default function About() {
    return (
        <View style={style.wrapper}>
            {/* HEADER */}
            <View style={style.header}>
                <Text style={style.headerText}>Привилегия Дружить!</Text>
            </View>
            {/* MAIN */}
            <View style={style.mainWrapper}>
                {/* IMAGE */}
                <View style={{ width: "33%" }}>
                    <ImageBackground
                        style={{
                            flex: 1,
                            // height: 200,
                            padding: 10,
                            resizeMode: "cover",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        imageStyle={{
                            borderRadius: 6,
                        }}
                        source={{ uri: "https://privilegiaflower.ru/wp-content/uploads/2020/03/slide-img2z.jpg" }}
                    />
                </View>
                <View style={{ width: "65%", flexDirection: "row", flexWrap: "wrap" }}>
                    <View>
                        <Text style={{ fontSize: 15 }}>
                            <Text style={{ fontWeight: "600", fontSize: 15 }}>Privilegia Flowers Decor </Text>
                            <Text>
                                - флористическая компания, которая за 1,5 года стала одной из ведущих в Санкт-Петербурге
                                за счёт высочайшего качества работы и особенного внимания к своим клиентам.
                            </Text>
                        </Text>
                        <Text style={{ marginTop: 10 }}>
                            На Крестовском Острове в ЖК «Привилегия», где мы расположились, для вас ежедневно создают
                            красоту лучшие флористы города.
                        </Text>
                    </View>
                </View>
                {/* CARDS */}
                <View style={style.cardsWrapper}>
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Творческий подход</Text>
                        <Text style={style.cardText}>
                            У нас работают креативные и профессиональные флористы, любящие творить и обожающие цветы!
                        </Text>
                    </View>
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Оформление мероприятий</Text>
                        <Text style={style.cardText}>
                            Ваши мероприятия превратятся в высокую поэзию живых цветов и будут выглядеть на уровне
                            мировых стандартов!
                        </Text>
                    </View>
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Свежие цветы</Text>
                        <Text style={style.cardText}>
                            Работаем напрямую с поставщиками, поэтому у нас в наличии всегда только свежие цветы
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: "white",
        height: "100%",
        flex: 1,
    },
    header: {
        width: "100%",
        borderBottomColor: "#f7f7f7",
        borderBottomWidth: 1,
        paddingVertical: 5,
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
    },
    mainWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 21,
    },
    cardsWrapper: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: Dimensions.get("window").width < 500 ? "100%" : "30%",
        marginRight: 20,
        backgroundColor: "#f7f7f7",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    cardTitle: {
        textAlign: "center",
        fontSize:14,
        fontWeight:'600',
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        marginBottom:7,
    },
    cardText: {
        color: "#939393",
        textAlign:'center'
    },
});
