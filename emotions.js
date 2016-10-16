const emotionsMap = {
  "#f00": [
    "angry",
    "strong",
    "dangerous"
  ],
  "#ff0": [
    "happy",
    "joyful",
    "cheery"
  ],
  "#00f": [
    "sentimental",
    "moody",
    "sad"
  ]
};

var nearestColor = require('nearest-color').from(colors);

const getEmotions = function(inColors) {
  let colorEmotions = []
  inColors.map((inColor) => {
    var moodColor = nearestColor(inColor);
    var index = Math.floor(Math.random() * emotionsMap[moodColor].length);
    var index2 = (Math.floor(Math.random() * emotionsMap[moodColor].length + 1) % emotionsMap[moodColor].length);
    colorEmotions.push(emotionsMap[moodColor][index]);
    colorEmotions.push(emotionsMap[moodColor][index2]);
  });
  return colorEmotions;
}

module.exports = getEmotions;
