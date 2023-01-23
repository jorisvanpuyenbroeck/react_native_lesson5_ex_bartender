import { View, Text, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import BeveragesScreen from "./components/beverages_screen";
import OrderScreen from "./components/order_screen";
import { RecoilRoot } from "recoil";
import configData from "./config/graphql.json";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createTheme, ThemeProvider } from "@rneui/themed";
import './config/firebase';
import { useAuthentication } from './hooks/use_authentication';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/authentication/home_screen";
import SignInScreen from "./components/authentication/signin_screen";
import SignUpScreen from "./components/authentication/signup_screen";

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);


const client = new ApolloClient({
  uri: configData.qlendpoint,
  headers: {
    "x-hasura-admin-secret": configData.qlkey,
  },
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const { user } = useAuthentication();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
            <NavigationContainer>
              {user ? (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      switch (route.name) {
                        case "Beverages":
                          iconName = focused ? "md-beer" : "md-beer-outline";
                          break;
                        case "Order a drink":
                          iconName = focused
                            ? "hand-right-sharp"
                            : "hand-right-outline";
                          break;
                      }

                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    tabBarActiveTintColor: "firebrick",
                    tabBarInactiveTintColor: "gray",
                  })}
                >
                  <Tab.Screen name="Beverages" component={BeveragesScreen} />
                  <Tab.Screen name="Order a drink" component={OrderScreen} />
                </Tab.Navigator>
              ) : (
                 <Stack.Navigator initialRouteName="Home">
                   <Stack.Screen name="Home" component={HomeScreen} />
                   <Stack.Screen name="Sign In" component={SignInScreen} />
                   <Stack.Screen name="Sign Up" component={SignUpScreen} />
                 </Stack.Navigator>
               )}
            </NavigationContainer>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

const theme = createTheme({
  lightColors: {
    primary: "firebrick",
  },
  darkColors: {
    primary: "#000",
  },
});