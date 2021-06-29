import React, { useState } from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
const CategoryStack = createStackNavigator();
import Home from "./routing/Categories";

import GoodsCategories from "./routing/GoodsCategories";

export default function HomeScreen({ navigation, allCategories, paramsSend }) {
    return (
        <CategoryStack.Navigator>
            <CategoryStack.Screen
                name="Категории"
                children={(props) => {
                    return <Home {...props} allCategories={allCategories} paramsSend={paramsSend} />;
                }}
            />

            <CategoryStack.Screen
                name="GoodsCategories"
                children={(props) => {
                    return <GoodsCategories {...props} allCategories={allCategories} paramsSend={paramsSend} />;
                }}
                options={({navigation, route})=>{
                    console.log(route)
                    return{
                        title:route.params.name,
                        headerLeft: (props)=>{return (<HeaderBackButton title={"Категории"} {...props} onPress={()=>{
                            navigation.navigate("Категории")
                        }}  /> )}
                    }
                }}
            />
        </CategoryStack.Navigator>
    );
}
