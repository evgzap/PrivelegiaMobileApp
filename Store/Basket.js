import { Alert } from "react-native";
var list = [];

function haveItem(item) {
    var have = false;
    list.forEach((element) => {
        console.log(Number(element.id) == Number(item.id), Number(element.id), Number(item.id), element.id, item.id)
        if (Number(element.id) == Number(item.id)) {
            have = true;
        }
    });
    return have;
}

function addToProduct(item, count) {
    list.forEach((element) => {
        if (element.id == item.id) {
            element.count += count;
        }
    });
}


export function deleteAll(){
    list=[]
}
export function AddToBasket(item, count = 1) {
    if (haveItem(item)) {
        addToProduct(item, count);
        Alert.alert(
            "Privilegia flower",
            `${item.name} добавлен ещё ${count}` + (count == 1 ? " раз" : count > 4 ? " раз" : " раза")
        );
    } else {
        item["count"] = count;
        Alert.alert(
            "Privilegia flower",
            `${item.name} добавлен впервые ${count}` + (count == 1 ? " раз" : count > 4 ? " раз" : " раза")
        );
        list.push(item);
    }
}


export function getAllItemBasket() {
    return list;
}

export function deleteItem(i) {
    console.log(i);
}
