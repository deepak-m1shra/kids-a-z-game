import { ThemedView } from '@/components/themed-view';
import { ALPHABET_DATA } from '@/constants/AlphabetData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LearnScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Learn ABC</Text>
        <TouchableOpacity onPress={() => router.push('/modal')} style={styles.settingsButton}>
          <Ionicons name="settings-sharp" size={28} color="#2D3436" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ALPHABET_DATA}
        numColumns={3}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.letter}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => router.push(`/letter/${item.letter}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.letter}>{item.letter}</Text>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 48,
    fontFamily: 'BubblegumSans_400Regular',
    color: '#2D3436',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderWidth: 4,
    borderColor: 'white',
  },
  letter: {
    fontSize: 64,
    fontFamily: 'BubblegumSans_400Regular',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
