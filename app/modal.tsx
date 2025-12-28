import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About A-Z Kids</Text>
        <Text style={styles.infoText}>
          This app is designed to help kids learn the alphabet through interactive visuals and sounds.
        </Text>
        <Text style={styles.infoText}>
          - Learn: Tap letters to hear them.
          - Play: Take a 10-question quiz!
        </Text>
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the modal translucency */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontFamily: 'BubblegumSans_400Regular',
    color: '#2D3436',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  infoContainer: {
    marginBottom: 40,
    width: '90%',
  },
  infoTitle: {
    fontSize: 24,
    fontFamily: 'BubblegumSans_400Regular',
    marginBottom: 10,
    color: '#2D3436',
  },
  infoText: {
    fontSize: 18,
    color: '#636e72',
    lineHeight: 26,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'BubblegumSans_400Regular',
  },
});
