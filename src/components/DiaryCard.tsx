import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS, SPACE, RADIUS, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.main} onPress={onPress}>
        <Text style={styles.mood}>{mood}</Text>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>
      <Pressable style={styles.likeButton} onPress={onToggleLike}>
        <Text style={styles.like}>{liked ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.m,
    gap: SPACE.m,
  },
  mood: { fontSize: 34 },
  content: { flex: 1 },
  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 4 },
  preview: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  likeButton: { padding: SPACE.l },
  like: { fontSize: 26, color: COLORS.danger },
});
