import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AuditScreen from "./screens/AuditScreen";
import MapScreen from "./screens/MapScreen";
import { db } from "./firebaseConfig";  // Just to confirm Firestore is working

const Stack = createStackNavigator();

// Simple Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WalkAudit</Text>
      <Text style={styles.subtitle}>Let's make Chicago more walkable!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Audit")}>
        <Text style={styles.buttonText}>Start Audit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Map")}>
        <Text style={styles.buttonText}>View Map</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  // Log Firestore db once just for a sanity check
  console.log("Firestore DB initialized:", db);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Audit" component={AuditScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
