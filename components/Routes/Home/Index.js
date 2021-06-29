import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();

import Home from "./routing/Home";
import CurrentGoods from "../Goods/CurrentGoods";

export default function HomeScreen({ navigation, allCategories, paramsSend }) {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Главная"
                children={(props)=>{
                    return <Home allCategories={allCategories} {...props} paramsSend={paramsSend} />
                }}
                options={{
                    header: () => {
                        return;
                    },
                }}
            />
            <HomeStack.Screen
                name="Product"
                children={(props)=>{
                    return <CurrentGoods {...props} paramsSend={paramsSend} />
                }}
                options={(params) => {
                    return { title: params.route.params.product.name };
                }}
            />
        </HomeStack.Navigator>
    );
}
