import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import Tabs from "./navigation/tabs";
import Login from "./screnns/Login";
import Signup from "./screnns/Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookDetail from "./screnns/BookDetail";
import { AuthContext } from "./context/context";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

function HomeStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Tabs}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator({ userToken }) {
  return (
    <NavigationContainer>
      {userToken ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: (token) => {
        setIsLoading(false);
        setUserToken(token);
      },
      signUp: () => {
        setIsLoading(false);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <RootNavigator userToken={userToken} />
    </AuthContext.Provider>
  );
}
