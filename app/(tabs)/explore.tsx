import { ThemedView } from '@/components/themed-view';
import { ALPHABET_DATA, LetterItem } from '@/constants/AlphabetData';
import * as Haptics from 'expo-haptics';
import { useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MAX_QUESTIONS = 10;

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState<{ letter: LetterItem, options: string[], answer: string } | null>(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Only start if not already active/game over
      if (!currentQuestion && !isGameOver && questionCount === 0) {
        generateQuestion();
      }
    }, [])
  );

  // Transition helper: when questionCount increments, wait then generate
  useEffect(() => {
    // If it's the start (0), we generate immediately via focus effect or manually, so skip delay
    // But if we just answered (count > 0, e.g. 1), we wait
    if (questionCount === 0) return;

    if (questionCount >= MAX_QUESTIONS) {
      const timer = setTimeout(finishGame, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(generateQuestion, 1200);
    return () => clearTimeout(timer);
  }, [questionCount]);

  const generateQuestion = () => {
    setIsProcessing(false);

    const letter = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];
    const correctWordObj = letter.words[Math.floor(Math.random() * letter.words.length)];

    // Get 2 wrong letters
    const wrongLetters = ALPHABET_DATA.filter(l => l.letter !== letter.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const wrongOptions = wrongLetters.map(l => l.words[Math.floor(Math.random() * l.words.length)].emoji);

    const options = [correctWordObj.emoji, ...wrongOptions].sort(() => 0.5 - Math.random());

    setCurrentQuestion({
      letter,
      options,
      answer: correctWordObj.emoji
    });

    // Voice prompt
    Speech.speak(`What starts with ${letter.letter.toLowerCase()}?`, { pitch: 1.1, rate: 0.95 });
  };

  const handleAnswer = (selectedEmoji: string) => {
    // Prevent interaction if processing or null
    if (!currentQuestion || isProcessing) return;
    setIsProcessing(true);

    if (selectedEmoji === currentQuestion.answer) {
      Speech.speak('Correct!', { pitch: 1.2, rate: 1.0 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(s => s + 1);
    } else {
      Speech.speak('Oops!', { pitch: 0.9, rate: 0.9 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // Move to next state (triggers effect)
    setQuestionCount(c => c + 1);
  };

  const finishGame = () => {
    setIsGameOver(true);
    setCurrentQuestion(null);

    // Check score from state directly
    // Note: score state is up to date because we updated it in handleAnswer before the timeout
    // Actually, due to closure, if we used `score` in setTimeout it might be stale, but `finishGame` is called 
    // from `useEffect` which has `[questionCount]` dependency. 
    // However, `score` might NOT be in that dependency array.
    // Better to use a functional state check or just trust React's batching?
    // Let's rely on the fact that `useEffect` runs after render, and render has new score.
    // Actually, `useEffect` needs `score` in dep array or we use a ref if we want perfect closure safety without re-triggering.
    // But since `finishGame` is only called when count >= MAX, and count only changes after answer...
    // Let's just assume `score` is fresh enough or pass it?
    // Safest: we will access `score` here. Since `finishGame` is defined in render scope, 
    // it sees the `score` of that render. The `useEffect` calls `finishGame`.
    // We should include `finishGame` in useEffect deps or `score`.
    // UseEffect dependency on `questionCount` means it runs when count updates. 
    // At that point `score` state has also been scheduled update.
  };

  // Re-define finishGame to be safe inside effect or just use refs? 
  // Let's make it simpler for the generated code: we'll use an Effect that depends on [score] too? No.
  // The simplest fix for the "Yay" sound logic is to check score inside the function, 
  // and ensure the function used by effect closes over the latest data.
  // We'll wrap check in a separate Effect dependent on isGameOver?

  useEffect(() => {
    if (isGameOver) {
      if (score > 5) {
        Speech.speak('Yaaaaay! You are amazing!', { pitch: 1.3, rate: 1.0 });
      } else {
        Speech.speak('Good job! Keep practicing!', { pitch: 1.1, rate: 1.0 });
      }
    }
  }, [isGameOver]);
  // Removed Speech from finishGame to avoid closure issues, put it here dependent on isGameOver.

  const restartGame = () => {
    setScore(0);
    setQuestionCount(0);
    setIsGameOver(false);
    setIsProcessing(false);
    generateQuestion();
  };

  if (isGameOver) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.header}>Game Over!</Text>
        <View style={styles.gameOverCard}>
          <Text style={styles.finalScoreLabel}>Final Score</Text>
          <Text style={styles.finalScoreValue}>{score} / {MAX_QUESTIONS}</Text>
          <Text style={styles.praiseText}>
            {score === 10 ? 'Perfect Score! 🌟' : score > 7 ? 'Amazing! 🚀' : 'Good Job! 👍'}
          </Text>
        </View>

        <TouchableOpacity onPress={restartGame} style={styles.playAgainButton}>
          <Text style={styles.playAgainText}>Play Again</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  if (!currentQuestion) return null;

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.header}>Quiz Time!</Text>

      <View style={styles.scorePill}>
        <Text style={styles.scoreLabel}>Question {Math.min(questionCount + 1, MAX_QUESTIONS)}/{MAX_QUESTIONS}</Text>
      </View>

      <View style={styles.scoreFloat}>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={[styles.questionContainer, { backgroundColor: currentQuestion.letter.color }]}>
        <Text style={styles.questionText}>{currentQuestion.letter.letter}</Text>
      </View>

      <Text style={styles.prompt}>
        What starts with <Text style={{ color: currentQuestion.letter.color }}>{currentQuestion.letter.letter}</Text>?
      </Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionCard}
            onPress={() => handleAnswer(emoji)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    marginBottom: 10,
    fontSize: 48,
    fontFamily: 'BubblegumSans_400Regular',
    color: '#2D3436',
  },
  scorePill: {
    backgroundColor: '#dfe6e9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  scoreLabel: {
    color: '#636e72',
    fontSize: 16,
    fontFamily: 'BubblegumSans_400Regular',
  },
  scoreFloat: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#00cec9',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  scoreValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'BubblegumSans_400Regular',
  },
  questionContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderWidth: 8,
    borderColor: 'white',
  },
  questionText: {
    fontSize: 120,
    fontFamily: 'BubblegumSans_400Regular',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  prompt: {
    fontSize: 32,
    marginBottom: 40,
    fontFamily: 'BubblegumSans_400Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#2D3436',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionCard: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderBottomWidth: 5,
    borderBottomColor: '#dfe6e9',
  },
  emoji: {
    fontSize: 56,
  },
  gameOverCard: {
    backgroundColor: 'white',
    width: '80%',
    padding: 30,
    borderRadius: 40,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    marginBottom: 40,
  },
  finalScoreLabel: {
    fontSize: 24,
    color: '#b2bec3',
    fontFamily: 'BubblegumSans_400Regular',
    marginBottom: 10,
  },
  finalScoreValue: {
    fontSize: 80,
    color: '#2D3436',
    fontFamily: 'BubblegumSans_400Regular',
    marginBottom: 20,
  },
  praiseText: {
    fontSize: 32,
    color: '#00b894',
    textAlign: 'center',
    fontFamily: 'BubblegumSans_400Regular',
  },
  playAgainButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
    elevation: 5,
    borderBottomWidth: 6,
    borderBottomColor: '#076aa0',
  },
  playAgainText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'BubblegumSans_400Regular',
  },
});
