import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "../../src/styles/tokens";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.accent,
        tabBarStyle: { paddingBottom: 5, height: 60 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: () => <></> }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: "Favorit", tabBarIcon: () => <></> }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: "Tambah", tabBarIcon: () => <></> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Pengaturan", tabBarIcon: () => <></> }}
      />
    </Tabs>
  );
}
