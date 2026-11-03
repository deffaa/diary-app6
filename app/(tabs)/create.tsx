import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, SPACE, RADIUS } from "../../src/styles/tokens";

const MOODS = ["😄", "😌", "😐", "😔"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-11-03");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😄");

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80) + "...",
      body: body.trim(),
      mood,
    });
    setTitle("");
    setBody("");
    setMood("😄");
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Judul"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Tanggal (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Ceritakan harimu..."
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Text style={styles.label}>Pilih Mood</Text>
      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.moodSelected]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={[styles.saveButton, !canSave && styles.disabled]}
        onPress={save}
        disabled={!canSave}
      >
        <Text style={styles.saveText}>Simpan Catatan</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 14,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  bodyInput: { minHeight: 150, textAlignVertical: "top" },
  label: { fontWeight: "700", color: COLORS.text, marginTop: SPACE.s },
  moodRow: { flexDirection: "row", gap: SPACE.s },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  moodSelected: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF",
  },
  mood: { fontSize: 28 },
  saveButton: {
    padding: 16,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.card,
    alignItems: "center",
    marginTop: SPACE.xl,
  },
  disabled: { opacity: 0.5 },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
