import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { COLORS, SPACE, RADIUS } from "../../src/styles/tokens";

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Compact Mode</Text>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
          trackColor={{ true: COLORS.accent }}
        />
      </View>
      <Text style={styles.info}>
        Status: {compactMode ? "Aktif" : "Nonaktif"}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACE.l,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: { fontSize: 16, fontWeight: "600", color: COLORS.text },
  info: { marginTop: SPACE.m, color: COLORS.muted, textAlign: "center" },
});
