import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, SPACE, RADIUS, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();
  const entry = getById(id);

  if (!entry)
    return (
      <View style={styles.center}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );
  const liked = likedIds.has(entry.id);

  return (
    <>
      <Stack.Screen options={{ title: entry.date }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mood}>{entry.mood}</Text>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.date}>{entry.date}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.body}>{entry.body}</Text>
        </View>
        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={[styles.likeButton, liked && styles.likedButton]}
        >
          <Text style={[styles.likeText, liked && styles.likedText]}>
            {liked ? "♥ Disukai" : "♡ Tambahkan ke Favorit"}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: { padding: SPACE.l, gap: SPACE.l },
  header: { alignItems: "center", gap: SPACE.s },
  mood: { fontSize: 72 },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  date: { fontSize: TYPO.body, color: COLORS.muted },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  body: { fontSize: 16, lineHeight: 26, color: COLORS.text },
  likeButton: {
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.card,
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  likedButton: { backgroundColor: "#FEF2F2" },
  likeText: { fontWeight: "700", color: COLORS.danger, fontSize: 16 },
  likedText: { color: COLORS.danger },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
