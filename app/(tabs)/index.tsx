import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

const MOODS = ["😄", "😌", "😐", "😔"];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    resetFilters,
    filteredEntries,
    resultCount,
  } = useDiarySearch(entries);

  const searchRef = useRef<any>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
    },
    [router],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          style={styles.search}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari catatan..."
          placeholderTextColor={COLORS.muted}
        />
        {(query.length > 0 || moodFilter !== "") && (
          <Pressable style={styles.clearButton} onPress={resetFilters}>
            <Text style={{ color: COLORS.danger, fontWeight: "600" }}>
              Reset Filter
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.moodRow}>
        {MOODS.map((m) => (
          <Pressable
            key={m}
            style={[styles.moodBtn, moodFilter === m && styles.moodBtnActive]}
            onPress={() => setMoodFilter(moodFilter === m ? "" : m)}
          >
            <Text style={styles.moodText}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada catatan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  searchRow: { flexDirection: "row", gap: SPACE.s, marginBottom: SPACE.m },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  clearButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  moodRow: { flexDirection: "row", gap: SPACE.s, marginBottom: SPACE.s },
  moodBtn: {
    padding: SPACE.s,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  moodBtnActive: {
    borderColor: COLORS.accent,
    borderWidth: 2,
    backgroundColor: "#EFF6FF",
  },
  moodText: { fontSize: 20 },
  counter: { color: COLORS.muted, marginBottom: SPACE.s, fontWeight: "500" },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl },
  empty: { textAlign: "center", color: COLORS.muted, paddingTop: 40 },
});
