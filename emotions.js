var colors = {
  red: '#f00',
  yellow: '#ff0',
  blue: '#00f'
};

const emotions = {
  "red": [
    "angry",
    "strong",
    "dangerous"
  ],
  "yellow": [
    "happy",
    "joyful",
    "cheery"
  ],
  "blue": [
    "sentimental",
    "moody",
    "sad"
  ]
}

var nearestColor = require('nearest-color').from(colors);

cont getEmotions = function(inColors) {
  let colorEmotions = []
  inColors.map((inColor) => {
    var moodColor = nearestColor(inColor);
    var index = Math.floor(Math.random() * emotions[moodColor].length;
    var index2 = (Math.floor(Math.random() * emotions[moodColor].length + 1) % emotions[moodColor].length;
    colorEmotions.push(emotions[moodColor][index]);
    colorEmotions.push(emotions[moodColor][index2]);
  });
  return colorEmotions;
}

export getEmotions;
