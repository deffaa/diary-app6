import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { useLikedEntries } from "../../src/hooks/useLikedEntries";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const favoriteEntries = useLikedEntries(entries, likedIds);

  const openDetail = useCallback(
    (id: number) => {
      router.push({ pathname: "/detail/[id]", params: { id: String(id) } });
    },
    [router],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={true}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada catatan yang disukai.</Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACE.l, backgroundColor: COLORS.background },
  list: { gap: SPACE.m, paddingBottom: SPACE.xl, paddingTop: SPACE.m },
  empty: { textAlign: "center", color: COLORS.muted, paddingTop: 40 },
});
