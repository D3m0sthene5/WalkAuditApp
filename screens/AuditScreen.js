import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import * as Location from "expo-location";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; 

export default function AuditScreen({ navigation }) {
  const [sidewalkCondition, setSidewalkCondition] = useState(null);
  const [crosswalks, setCrosswalks] = useState(null);
  const [lighting, setLighting] = useState(null);

  const submitAudit = async () => {
    // Validate all fields
    if (!sidewalkCondition || !crosswalks || !lighting) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    // Request location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Enable location to submit an audit.");
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Attempt Firestore submission
    try {
      const auditsCollection = collection(db, "audits");
      await addDoc(auditsCollection, {
        sidewalkCondition,
        crosswalks,
        lighting,
        latitude,
        longitude,
        timestamp: new Date(),
      });
      Alert.alert("Success", "Audit submitted!");
    } catch (error) {
      console.error("Error submitting audit:", error);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pedestrian Audit Checklist</Text>

      <Text style={styles.question}>1. How is the sidewalk condition?</Text>
      <View style={styles.buttonContainer}>
        {["Good", "Fair", "Poor"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              sidewalkCondition === option && styles.selected
            ]}
            onPress={() => setSidewalkCondition(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.question}>2. Are crosswalks clearly marked?</Text>
      <View style={styles.buttonContainer}>
        {["Yes", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              crosswalks === option && styles.selected
            ]}
            onPress={() => setCrosswalks(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.question}>3. Is there adequate lighting?</Text>
      <View style={styles.buttonContainer}>
        {["Yes", "No"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              lighting === option && styles.selected
            ]}
            onPress={() => setLighting(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={submitAudit}>
        <Text style={styles.submitButtonText}>Submit Audit</Text>
      </TouchableOpacity>

      {/* Navigate to Map Screen */}
      <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate("Map")}>
        <Text style={styles.buttonText}>View Walkability Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginTop: 40
  },
  question: {
    fontSize: 18,
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#28A745",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  mapButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
