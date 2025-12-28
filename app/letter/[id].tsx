import { ALPHABET_DATA } from '@/constants/AlphabetData';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LetterDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const currentIndex = ALPHABET_DATA.findIndex(item => item.letter === id);
    const letterItem = ALPHABET_DATA[currentIndex];

    // Navigation logic
    const handleNext = () => {
        if (currentIndex < ALPHABET_DATA.length - 1) {
            router.replace(`/letter/${ALPHABET_DATA[currentIndex + 1].letter}`);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            router.replace(`/letter/${ALPHABET_DATA[currentIndex - 1].letter}`);
        }
    };

    useEffect(() => {
        if (letterItem) {
            // Speak lowercase to avoid "Capital A"
            speak(letterItem.letter.toLowerCase());
        }
    }, [letterItem]);

    const speak = (text: string) => {
        // Lowercase text usually sounds more natural/phonetic for single letters
        Speech.speak(text, {
            language: 'en',
            pitch: 1.0, // More natural pitch
            rate: 0.9   // Slightly slower for kids
        });
    };

    if (!letterItem) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: 'Not Found' }} />
                <Text>Letter not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: letterItem.color }]} contentContainerStyle={styles.content}>
            <Stack.Screen
                options={{
                    title: '',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: letterItem.color },
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.navigate('/')} style={styles.backButton}>
                            <Ionicons name="home" size={32} color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={styles.mainContent}>
                {/* Previous Button */}
                <TouchableOpacity
                    onPress={handlePrev}
                    disabled={currentIndex === 0}
                    style={[styles.navButton, currentIndex === 0 && styles.disabledNav]}
                >
                    <Ionicons name="chevron-back" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => speak(letterItem.letter.toLowerCase())} style={styles.heroContainer} activeOpacity={0.8}>
                    <Text style={styles.heroLetter}>{letterItem.letter}</Text>
                    <Ionicons name="volume-medium" size={32} color="rgba(255,255,255,0.9)" style={styles.volumeIcon} />
                </TouchableOpacity>

                {/* Next Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    disabled={currentIndex === ALPHABET_DATA.length - 1}
                    style={[styles.navButton, currentIndex === ALPHABET_DATA.length - 1 && styles.disabledNav]}
                >
                    <Ionicons name="chevron-forward" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={styles.instruction}>Tap the cards to hear the words!</Text>

            <View style={styles.wordsContainer}>
                {letterItem.words.map((wordItem, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.wordCard}
                        onPress={() => speak(wordItem.word)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.emojiContainer}>
                            <Text style={styles.emoji}>{wordItem.emoji}</Text>
                        </View>
                        <Text style={styles.wordText}>{wordItem.word}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },
    backButton: {
        marginLeft: -10,
    },
    mainContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    navButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 50,
    },
    disabledNav: {
        opacity: 0,
    },
    heroContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.25)',
        padding: 20,
        borderRadius: 100,
        width: 160,
        height: 160,
        justifyContent: 'center',
        borderWidth: 6,
        borderColor: 'white',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    heroLetter: {
        fontSize: 80,
        fontFamily: 'BubblegumSans_400Regular',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    volumeIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    instruction: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'BubblegumSans_400Regular',
        marginBottom: 20,
        opacity: 0.95,
        textAlign: 'center',
    },
    wordsContainer: {
        width: '100%',
        gap: 16,
    },
    wordCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderBottomWidth: 4,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    emojiContainer: {
        width: 70,
        height: 70,
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    emoji: {
        fontSize: 40,
    },
    wordText: {
        fontSize: 32,
        fontFamily: 'BubblegumSans_400Regular',
        color: '#2D3436',
        flex: 1,
    },
});
