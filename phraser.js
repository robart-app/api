const pos = require('pos');//require('wordpos');
const sentencer = require('sentencer');
const templates = require('./templates');
const emotion = require('./emotions');

module.exports = (words, type = 'descriptions') => {
	const tagger = new pos.Tagger();
	const tags = tagger.tag(words);

	var nounList = tags.filter(t => t[1] === 'NN').map(t => t[0]);
	var adjectiveList = tags.filter(t => t[1] === 'JJ').map(t => t[0]);
	var template_size = templates[type].length;
    sentencer.configure({nounList, adjectiveList});

    console.log('configured parser', template_size)
    let random = Math.floor(Math.random() * template_size);
    console.log('random x of y: ', random, template_size);
    let sentence = templates[type][random];
	
	console.log(`parsing ${sentence}`);
    sentence = sentence.includes('{{') && sentencer.make(templates[type][random]) || sentence;
    console.log(sentence);
    return {
    	title: `${adjectiveList[0]} ${nounList[0]}`,
    	sentence
    };
}