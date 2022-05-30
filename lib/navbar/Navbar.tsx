import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PlanningsScreen from "../planning/Planning";
import IngredientsScreen from "../ingredients/Ingredient";
import RecipiesScreen from "../recipe/recipe";

function IngredientScreen() {
  return <IngredientsScreen />;
}

function RecipeScreen() {
  return <RecipiesScreen />;
}

function PlanningScreen() {
  return <PlanningsScreen />;
}

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Ingredients") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Recipies") {
              iconName = focused ? "ios-list-outline" : "ios-list";
            } else if (route.name === "Planning") {
              iconName = focused ? "ios-calendar-outline" : "ios-calendar";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Ingredients" component={IngredientScreen} />
        <Tab.Screen name="Recipies" component={RecipeScreen} />
        <Tab.Screen name="Planning" component={PlanningScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
