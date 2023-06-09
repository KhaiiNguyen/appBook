import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { background_login } from "../constants/icons";
import axios from "axios";
import authAPI from "../services/AuthApi";

export default function Signup({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const animationHeightValue = useRef(new Animated.Value(0.74)).current;
  const animationTitleFontValue = useRef(new Animated.Value(25)).current;
  const animationTitleMarginTopValue = useRef(new Animated.Value(30)).current;

  const passwordRef = useRef();
  const emailRef = useRef();
  const lastNamedRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onHandleRegister = async () => {
    if (email !== "" && password !== "") {
      try {
        const dt = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        };
        const { data } = await authAPI.register(dt);

        if (data.err === 1) {
          throw new Error(data.mes);
        }
        navigation.navigate("Login");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    Animated.timing(animationHeightValue, {
      toValue: isFocused ? 0.9 : 0.74,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(animationTitleFontValue, {
      toValue: isFocused ? 23 : 25,
      duration: 600,
      useNativeDriver: false,
    }).start();
    Animated.timing(animationTitleMarginTopValue, {
      toValue: isFocused ? 10 : 30,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const inputHeight = animationHeightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Image source={background_login} style={styles.backImage} />
      <Animated.ScrollView
        style={{ ...styles.whiteSheet, height: inputHeight }}
      >
        <SafeAreaView style={styles.form}>
          <Animated.Text
            style={[
              styles.title,
              {
                fontSize: animationTitleFontValue,
                marginTop: animationTitleMarginTopValue,
              },
            ]}
          >
            Register!
          </Animated.Text>

          <TextInput
            style={styles.input}
            placeholder="FirstName"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="firstName"
            value={firstName}
            onSubmitEditing={() => lastNamedRef.current.focus()}
            onChangeText={(text) => setFirstName(text)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />

          <TextInput
            ref={lastNamedRef}
            style={styles.input}
            placeholder="LastName"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="lastName"
            value={lastName}
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={(text) => setLastName(text)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />

          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          <TextInput
            ref={passwordRef}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />

          <TouchableOpacity style={styles.button} onPress={onHandleRegister}>
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              {" "}
              Sign in with Email
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
              You have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "600", fontSize: 14 }}> Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#3D46EF",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonWithGoogle: {
    backgroundColor: "#fff",
    height: 58,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  containerLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#000",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
});
