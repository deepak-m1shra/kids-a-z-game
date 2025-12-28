# A-Z Kids Learning App 🎨

A fun, interactive, and colorful iOS/Android application designed to help children learn the alphabet! Built with **React Native** and **Expo**.

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue" alt="Platform" />
  <img src="https://img.shields.io/badge/Made%20with-Expo-black" alt="Expo" />
</p>

## ✨ Features

### 🅰️ **Learn Mode**
- **Interactive Grid**: Colorful A-Z cards that children can tap.
- **Visual & Audio Learning**: 
  - Tapping a letter plays its natural sound (e.g., "a" instead of "Capital A").
  - Each letter features 3 associated words (e.g., A for Apple 🍎, Ant 🐜, Airplane ✈️).
  - Kids can tap images to hear the words pronounced.
- **Easy Navigation**: 
  - Large "Next" and "Previous" arrows for continuous learning.
  - "Home" button to quickly return to the main grid.

### 🎮 **Play Mode (Quiz)**
- **10-Question Game**: A focused quiz session to test knowledge.
- **"What starts with...?"**: Randomly generates questions asking the child to pick the correct emoji.
- **Score Tracking**: Live score updates (e.g., "Question 4/10").
- **Game Over Celebration**: 
  - Fun applause and "Yaaaaay!" voice feedback for good scores (>5).
  - Encouraging "Good try!" for lower scores.
  - "Play Again" button for endless fun.
- **Kid-Proof Logic**: 
  - Prevents double-tapping answers (no accidental score inflation).
  - Clean, un-cluttered interface.

### ⚙️ **Settings**
- **Parental Section**: Accessible via the gear icon on the home screen.
- **About**: Simple info about the app.

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) via [Expo SDK 52](https://expo.dev/)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Audio**: `expo-speech` (Text-to-Speech), `expo-av`
- **Haptics**: `expo-haptics` for tactile feedback
- **Fonts**: `Bubblegum Sans` (via `@expo-google-fonts`) for that playful kid-feel.
- **Icons**: Ionicons (`@expo/vector-icons`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd a-z-kids
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Run on Device**
   - **iOS**: Scan the QR code with CAMERA app (if using Expo Go) or run `npm run ios` for simulator.
   - **Android**: Scan with Expo Go app or run `npm run android`.
   - **Web**: Press `w` in the terminal to run in browser.

---

## 📂 Project Structure

- `app/`: Contains all screens and navigation (File-based routing).
  - `(tabs)/`: Main tab navigation (`index.tsx` for Learn, `explore.tsx` for Quiz).
  - `letter/[id].tsx`: Dynamic route for Letter Details.
  - `modal.tsx`: Settings screen.
- `components/`: Reusable UI components.
- `constants/`: App data.
  - `AlphabetData.ts`: Central source of truth for Letters, Words, Emojis, and Colors.
- `assets/`: Images and fonts.

---

## 🎨 Design

- **Font**: Bubblegum Sans (Playful, rounded)
- **Colors**: Vibrant, high-contrast palette assigned to each letter for visual distinction.
- **UI**: Rounded corners, soft shadows, and large touch targets suitable for children's fingers.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
