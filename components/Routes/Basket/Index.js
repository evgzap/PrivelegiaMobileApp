import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Router/Home";
import Decoration from "./Router/Decoration";
const BasketStack = createStackNavigator();

export default function HomeScreen({ navigation, paramsSend }) {
    const [updates, setUpdate] = useState(1);
    const read = () => {
        return updates;
    };
    return (
        <BasketStack.Navigator>
            <BasketStack.Screen
                name="Basket"
                options={{
                    header: () => {
                        return;
                    },
                }}
                children={(props) => {
                    return <Home {...props} key={updates} paramsSend={paramsSend} />;
                }}
                listeners={() => {
                    setUpdate((p) => {
                        return Number(updates + 1);
                    });
                }}
            />
            <BasketStack.Screen
                name="Decoration"
                options={{
                    header: () => {
                        return;
                    },
                }}
                children={(props) => {
                    return <Decoration {...props} key={updates} paramsSend={paramsSend} />;
                }}
                listeners={() => {
                    setUpdate((p) => {
                        return Number(updates + 1);
                    });
                }}
            />
        </BasketStack.Navigator>
    );
}
