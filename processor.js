const pos = require('pos');//require('wordpos');
const sentencer = require('sentencer');
const clarifai = require('clarifai');
const MODEL_ID = 'b4424598a08543b181c0393e697e8fd6';
const CLIENT_ID = 'XXOigcQo38GxmHDtL9cuebNF7bMUd0lvest6UA3d';
const CLIENT_SECRET = 'siJKxg5bqy3HnddttByFCJxRkLBkbu_VyKYqVO_O';
const {GENERAL_MODEL, COLOR_MODEL} = clarifai;
const ai  = new clarifai.App(CLIENT_ID, CLIENT_SECRET);
const templates = require('./templates');
const emotion = require('./emotions');

const processor = {
	robart: (url) => {  //obtains image categor
		return ai.models.predict(MODEL_ID, url)
			.then(response => {
				const {concepts} = response.data.outputs[0].data;
				return {category: concepts[0]};
			}, err => []);
	},
	general: (url) => {
		return ai.models
			.predict(GENERAL_MODEL, url)
			.then(response => {
				const {concepts} = response.data.outputs[0].data;
				const tags = concepts.map(x => x.name);
				tags.shift();
				return tags;
			}, err => []);
	},
	color: (url) => {
		return ai.models.predict(COLOR_MODEL, url)
			.then(response => {
				const {colors} = response.data.outputs[0].data;
				return colors.map(c => c.w3c);
			}, err => []);
	},
	sentencer: (words, cb) => {
		console.log(words.length)
		const tagger = new pos.Tagger();
		const tags = tagger.tag(words);

		var nounList = tags.filter(t => t[1] === 'NN').map(t => t[0]);
		var adjectiveList = tags.filter(t => t[1] === 'JJ').map(t => t[0]);
	
        sentencer.configure({nounList, adjectiveList});
        console.log('configured parser')
        let random = Math.floor(Math.random() * templates.descriptions.length);
        console.log('random: ', random, templates.description.length)
        let sentence = templates.description[random];
    	
    	console.log(`parsing ${sentence}`);
        sentence.includes('{{') && sentencer.make(templates.descriptions[random]);
        console.log(sentence);
        return {
        	title: `${adjectiveList[0]} ${nounList[0]}`,
        	sentence
        };
	}
};

module.exports = processor;