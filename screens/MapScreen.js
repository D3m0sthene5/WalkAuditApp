import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function MapScreen() {
  const [auditLocations, setAuditLocations] = useState([]);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "audits"));
        const locations = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            if (data.latitude && data.longitude) {
              return {
                id: doc.id,
                latitude: data.latitude,
                longitude: data.longitude,
              };
            }
            return null;
          })
          .filter((loc) => loc !== null);
        setAuditLocations(locations);
      } catch (error) {
        console.error("Error fetching audits:", error);
      }
    };

    fetchAudits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walkability Map</Text>

      <MapView
        provider={PROVIDER_GOOGLE} // Ensuring Google Maps is used
        style={styles.map}
        initialRegion={{
          latitude: 41.8781,     // Chicago lat
          longitude: -87.6298,   // Chicago lng
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {auditLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Audit Location"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: "90%",
    marginTop: 10,
  },
});

