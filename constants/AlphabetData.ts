export interface WordItem {
    word: string;
    emoji: string;
}

export interface LetterItem {
    letter: string;
    color: string;
    words: WordItem[];
}

export const ALPHABET_DATA: LetterItem[] = [
    { letter: 'A', color: '#FF6B6B', words: [{ word: 'Apple', emoji: '🍎' }, { word: 'Ant', emoji: '🐜' }, { word: 'Airplane', emoji: '✈️' }] },
    { letter: 'B', color: '#4ECDC4', words: [{ word: 'Ball', emoji: '⚽' }, { word: 'Bear', emoji: '🐻' }, { word: 'Banana', emoji: '🍌' }] },
    { letter: 'C', color: '#FF9F43', words: [{ word: 'Cat', emoji: '🐱' }, { word: 'Car', emoji: '🚗' }, { word: 'Cake', emoji: '🎂' }] },
    { letter: 'D', color: '#54A0FF', words: [{ word: 'Dog', emoji: '🐶' }, { word: 'Duck', emoji: '🦆' }, { word: 'Drum', emoji: '🥁' }] },
    { letter: 'E', color: '#5F27CD', words: [{ word: 'Elephant', emoji: '🐘' }, { word: 'Egg', emoji: '🥚' }, { word: 'Earth', emoji: '🌍' }] },
    { letter: 'F', color: '#C4E538', words: [{ word: 'Fish', emoji: '🐟' }, { word: 'Frog', emoji: '🐸' }, { word: 'Flower', emoji: '🌺' }] },
    { letter: 'G', color: '#EE5253', words: [{ word: 'Grapes', emoji: '🍇' }, { word: 'Giraffe', emoji: '🦒' }, { word: 'Guitar', emoji: '🎸' }] },
    { letter: 'H', color: '#0ABDE3', words: [{ word: 'House', emoji: '🏠' }, { word: 'Horse', emoji: '🐴' }, { word: 'Hat', emoji: '🎩' }] },
    { letter: 'I', color: '#10AC84', words: [{ word: 'Ice Cream', emoji: '🍦' }, { word: 'Igloo', emoji: '🧊' }, { word: 'Insect', emoji: '🐞' }] },
    { letter: 'J', color: '#F368E0', words: [{ word: 'Jellyfish', emoji: '🪼' }, { word: 'Juice', emoji: '🧃' }, { word: 'Jacket', emoji: '🧥' }] },
    { letter: 'K', color: '#FF9FF3', words: [{ word: 'Kite', emoji: '🪁' }, { word: 'Key', emoji: '🔑' }, { word: 'Kangaroo', emoji: '🦘' }] },
    { letter: 'L', color: '#00D2D3', words: [{ word: 'Lion', emoji: '🦁' }, { word: 'Lemon', emoji: '🍋' }, { word: 'Leaf', emoji: '🍃' }] },
    { letter: 'M', color: '#54A0FF', words: [{ word: 'Monkey', emoji: '🐵' }, { word: 'Moon', emoji: '🌙' }, { word: 'Mouse', emoji: '🐭' }] },
    { letter: 'N', color: '#FFC312', words: [{ word: 'Nest', emoji: '🪺' }, { word: 'Nose', emoji: '👃' }, { word: 'Night', emoji: '🌌' }] },
    { letter: 'O', color: '#EA2027', words: [{ word: 'Orange', emoji: '🍊' }, { word: 'Owl', emoji: '🦉' }, { word: 'Octopus', emoji: '🐙' }] },
    { letter: 'P', color: '#A3CB38', words: [{ word: 'Pig', emoji: '🐷' }, { word: 'Pizza', emoji: '🍕' }, { word: 'Penguin', emoji: '🐧' }] },
    { letter: 'Q', color: '#ED4C67', words: [{ word: 'Queen', emoji: '👑' }, { word: 'Question', emoji: '❓' }, { word: 'Quiet', emoji: '🤫' }] },
    { letter: 'R', color: '#B53471', words: [{ word: 'Rabbit', emoji: '🐰' }, { word: 'Rainbow', emoji: '🌈' }, { word: 'Robot', emoji: '🤖' }] },
    { letter: 'S', color: '#833471', words: [{ word: 'Sun', emoji: '☀️' }, { word: 'Star', emoji: '⭐' }, { word: 'Snake', emoji: '🐍' }] },
    { letter: 'T', color: '#1289A7', words: [{ word: 'Tiger', emoji: '🐯' }, { word: 'Tree', emoji: '🌳' }, { word: 'Train', emoji: '🚂' }] },
    { letter: 'U', color: '#D980FA', words: [{ word: 'Umbrella', emoji: '☔' }, { word: 'Unicorn', emoji: '🦄' }, { word: 'Up', emoji: '⬆️' }] },
    { letter: 'V', color: '#9980FA', words: [{ word: 'Van', emoji: '🚐' }, { word: 'Violin', emoji: '🎻' }, { word: 'Volcano', emoji: '🌋' }] },
    { letter: 'W', color: '#5758BB', words: [{ word: 'Whale', emoji: '🐳' }, { word: 'Watermelon', emoji: '🍉' }, { word: 'Watch', emoji: '⌚' }] },
    { letter: 'X', color: '#FD7272', words: [{ word: 'Xylophone', emoji: '🎼' }, { word: 'X-Ray', emoji: '🩻' }, { word: 'Xmas Tree', emoji: '🎄' }] },
    { letter: 'Y', color: '#1B1464', words: [{ word: 'Yellow', emoji: '🟡' }, { word: 'Yo-yo', emoji: '🪀' }, { word: 'Yak', emoji: '🐂' }] },
    { letter: 'Z', color: '#6D214F', words: [{ word: 'Zebra', emoji: '🦓' }, { word: 'Zoo', emoji: '🦁' }, { word: 'Zipper', emoji: '🤐' }] },
];
