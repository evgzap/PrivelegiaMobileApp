import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, TextInput, Keyboard, Dimensions, Image, StyleSheet } from "react-native";
import { Button, Switch, Input } from "react-native-elements";
import { getAllItemBasket, deleteAll } from "../../../../Store/Basket";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { Alert } from "react-native";

export default function Decoration({ navigation }) {
    const [isLarge, setIsLarge] = useState(Dimensions.get("window").width > 850);
    const [items, setItems] = useState(getAllItemBasket());
    const [delivery, setDelivery] = useState(false);
    const [adress, setAdress] = useState("");
    const [home, setHome] = useState("");
    const [apartametns, setApartametns] = useState("");
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    useEffect(() => {
        if (getAllItemBasket().length == 0) {
            navigation.navigate("Корзина", { screen: "Basket" });
        }
    }, [items]);

    const totalPrice = () => {
        var total = 0;

        items.forEach((e) => {
            total += Number(e.price * e.count);
        });
        total += delivery ? 350 : 0;
        total += "";
        total = total.split("");
        total.reverse();
        total = total.map((e, i) => {
            return !(i % 3) ? `${e} ` : e;
        });
        total.reverse();
        total = total.join("");
        return total;
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const sendOrder = () => {
        if (delivery)
            if (!adress || !home || !apartametns || !number || !email) {
                return Alert.alert("Privilegia flower", "Заполните все поля");
            }
        if (!delivery)
            if (!number || !email) {
                return Alert.alert("Privilegia flower", "Заполните все поля");
            }
        let response = {};
        let order = [];
        items.forEach((element) => {
            order.push({ id: element.id, name: element.name, count: element.count, images: element.images[0].src });
        });
        response.total = totalPrice();
        response.number = getRandomInt(Number(totalPrice().split(" ").join("")));
        response.order = order;
        response.delivery = delivery ? "Заказ c доставкой" : "Заказ без доставки";
        response.deliveryBool = delivery;
        response.adress = delivery ? "Адрес доставки " + adress + " Дом: " + home + " Кв: " + apartametns : "";
        response.name = name;
        response.numberPhone = number;
        // console.log(response);

        let string = JSON.stringify(response);

        axios.get("https://send-mail.privilegiaflower.ru/mail.php", { params: { order: string } }).then((r) => {
            Alert.alert("Privilegia flower", "Заказ выполнен");
            deleteAll();
            setItems(getAllItemBasket);
            navigation.navigate("Главная", { screen: "Главная" });
        });
    };

    return (
        <View style={{ flexGrow: 1, flexDirection: "row", width: "100%" }}>
            <ScrollView
                contentContainerStyle={{
                    padding: 10,
                    backgroundColor: "white",
                    height: 300,
                    width: "100%",
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            position: "relative",
                        }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 17 }}>Заказ на сумму {totalPrice()}</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ paddingRight: 20, color: delivery ? "silver" : "black" }}>Самовывоз</Text>
                        <Switch
                            value={delivery}
                            color="#f593bd"
                            onTouchStart={() => {
                                setDelivery(!delivery);
                            }}
                        />
                        <Text style={{ paddingLeft: 20, color: !delivery ? "silver" : "black" }}>Доставка</Text>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            backgroundColor: "#fafafa",
                            padding: 10,
                        }}
                    >
                        {delivery && (
                            <View style={{ width: "100%" }}>
                                <View style={{ padding: 5, borderBottomWidth: 1, borderBottomColor: "gray" }}>
                                    <Text style={{ fontSize: 12, color: "gray" }}>
                                        *Доставка доступна только по Санкт-Петербургу и Ленобласти{" "}
                                    </Text>
                                </View>
                                <TextInput
                                    style={{
                                        marginTop: 10,
                                        borderRadius: 4,
                                        padding: 10,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "silver",
                                    }}
                                    placeholder="Адрес доставки"
                                    onChangeText={(value) => {
                                        setAdress(value);
                                    }}
                                />
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                        <TextInput
                                            style={{
                                                marginTop: 10,
                                                borderRadius: 4,
                                                padding: 10,
                                                backgroundColor: "white",
                                                borderWidth: 1,
                                                borderColor: "silver",
                                                marginRight: 10,
                                            }}
                                            placeholder="Дом"
                                            onChangeText={(value) => {
                                                setHome(value);
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <TextInput
                                            style={{
                                                marginTop: 10,
                                                borderRadius: 4,
                                                padding: 10,
                                                backgroundColor: "white",
                                                borderWidth: 1,
                                                borderColor: "silver",
                                            }}
                                            keyboardType="number-pad"
                                            placeholder="Квартира"
                                            onChangeText={(value) => {
                                                setApartametns(value);
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                        <TextInput
                                            style={{
                                                marginTop: 10,
                                                borderRadius: 4,
                                                padding: 10,
                                                backgroundColor: "white",
                                                borderWidth: 1,
                                                borderColor: "silver",
                                                marginRight: 10,
                                            }}
                                            placeholder="Ваше имя"
                                            onChangeText={(value) => {
                                                setName(value);
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <TextInput
                                            style={{
                                                marginTop: 10,
                                                borderRadius: 4,
                                                padding: 10,
                                                backgroundColor: "white",
                                                borderWidth: 1,
                                                borderColor: "silver",
                                            }}
                                            placeholder="Ваша почта"
                                            value={email}
                                            onChangeText={(value) => {
                                                setEmail(value);
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                        {!delivery && (
                            <TextInput
                                style={{
                                    marginTop: 10,
                                    borderRadius: 4,
                                    padding: 10,
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderColor: "silver",
                                }}
                                value={email}
                                placeholder="Ваша почта"
                                onChangeText={(value) => {
                                    setEmail(value);
                                }}
                            />
                        )}
                        <TextInput
                            style={{
                                marginTop: 10,
                                borderRadius: 4,
                                padding: 10,
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: "silver",
                                marginBottom: 10,
                            }}
                            placeholder="Ваш номер телефона"
                            keyboardType="number-pad"
                            onChangeText={(value) => {
                                setNumber(value);
                            }}
                        />
                    </View>
                </View>
                {!delivery && (
                    <View
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                padding: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 14, color: "gray" }}>
                                Ул. Вязовая, д. 8, ЖК "Привилегия", вход с лобби
                            </Text>
                        </View>
                        <MapView
                            style={{
                                height: 300,
                                borderRadius: 10,
                            }}
                            onTouchStart={() => {
                                Keyboard.dismiss();
                            }}
                            region={{
                                latitude: 59.967339,
                                longitude: 30.2762354,
                                latitudeDelta: 0.0021,
                                longitudeDelta: 0.0721,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 59.967339,
                                    longitude: 30.2762354,
                                }}
                                title={"Privilegia Flover"}
                                description={"Забрать можно тут"}
                            />
                        </MapView>
                    </View>
                )}
                {items.length != 0 && (
                    <Button
                        title="Оформить заказ"
                        onPress={() => {
                            sendOrder();
                        }}
                    />
                )}
            </ScrollView>
            {isLarge && (
                <ScrollView style={{ width: "60%", backgroundColor: "white", padding: 10 }}>
                    {items.map((e, i) => {
                        return (
                            <View key={i}>
                                <View
                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: "#f0f0f0",
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 120,
                                            height: 120,
                                            marginRight: 15,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 10,
                                            }}
                                            source={{
                                                uri: e.images[0].src,
                                            }}
                                        />
                                    </View>

                                    <View>
                                        <Text style={{ color: "#404040", marginBottom: 5 }}>{e.name}</Text>
                                        <View style={styles.addToBasket}>
                                            <Text style={{ fontSize: 13 }}>Кол-во:</Text>
                                            <View style={styles.changeCount}>
                                                <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                                    {e.count}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    addToBasket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    changeCount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        fontSize: 30,
    },
});
