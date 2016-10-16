const emotionsMap  = require('./emotions-map');
const colorRemap = {
	"color1": "#2773B1",
	"color2": "#26AEBB",
	"color3": "#198F5E",
	"color4": "#F0E535",
	"color5": "#6C3C8A",
	"color6": "#C1227E",
	"color7": "#E2282F",
	"color8": "#E76130",
	"color9": "#966939",
	"color10": "#EFC99E",
	"color11": "#C99B38",
	"color12": "#99989D",
	"color13": "#FFFFFF",
	"color14": "#4D4B4C",
	"color15": "#000000"
}
const nearestColor = require('nearest-color').from(colorRemap);


const getEmotions = function(inColors) {
  let colorEmotions = []
  inColors.forEach((inColor) => {
  	
  	var moodColor = nearestColor(inColor);

    var index = Math.floor(Math.random() * emotionsMap[moodColor.name].length);
    var index2 = (Math.floor(Math.random() * emotionsMap[moodColor.name].length + 1) % emotionsMap[moodColor.name].length);
    colorEmotions.push(emotionsMap[moodColor.name][index]);
    colorEmotions.push(emotionsMap[moodColor.name][index2]);
  });

  return colorEmotions;
}

module.exports = getEmotions;
