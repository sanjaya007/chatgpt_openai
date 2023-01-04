let SERVER_URL = "https://aiaskanything.onrender.com/";
let LOCAL_SERVER_URL = "http://127.0.0.1:7000/";

let customQuestions = [
  "who are you",
  "who are you?",
  "who are you ?",
  "who you",
  "who you?",
  "who you ?",
  "you",
  "you?",
  "you ?",
  "what is your name",
  "what is your name?",
  "what is your name ?",
  "what's your name",
  "what's your name?",
  "what's your name ?",
  "what your name",
  "what your name?",
  "what your name ?",
  "whats your name",
  "whats your name?",
  "whats your name ?",
  "your name",
  "your name?",
  "your name ?",
];

let customAnswers = [
  "I am Sanjaya Paudel as an AI.",
  "My name is Sanjaya Paudel. I am here as an AI.",
  "I am Sanjaya Paudel as an AI. I am happy you are here. 😄",
  "I am Sanjaya Paudel as an AI. Ask me anything!! 🔥",
  "I am Sanjaya Paudel as an AI. I am happy you are here. 😄",
  "I am Sanjaya Paudel as an AI. Ask me anything!! 🔥",
];

function generateUID() {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);
  const finalUID = head + tail;
  return finalUID;
}

function selectRandomFromArray(arr) {
  const arrLength = arr.length;
  const selectedItem = arr[Math.floor(Math.random() * arrLength)];
  return selectedItem;
}

export {
  SERVER_URL,
  LOCAL_SERVER_URL,
  generateUID,
  selectRandomFromArray,
  customQuestions,
  customAnswers,
};
