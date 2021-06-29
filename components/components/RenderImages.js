import { Image, TouchableOpacity, Modal, Alert, Pressable, Text, View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

export default function RenderImages({ item, index }) {
    const isBig = Math.floor(Math.random() * 2);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableOpacity
                style={{
                    width: item.index % 2 !== 0 ? 177 : 300,
                    height: 180,
                    marginRight: 2,
                    borderRadius: 5,
                }}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Image
                    style={{
                        height: "100%",
                        borderRadius: 10,
                    }}
                    source={{
                        uri: item.item.src,
                    }}
                />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalView}>
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Image
                                style={{
                                    height: "100%",
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri: item.item.src,
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#000000ba'
    },
    modalView: {
        width: Dimensions.get("window").width < 500 ? "95%" : 540,
        height: "65%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
