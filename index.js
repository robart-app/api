const express = require('express');
const clarifai = require('clarifai');
const axios = require('axios');
const CLIENT_ID = 'XXOigcQo38GxmHDtL9cuebNF7bMUd0lvest6UA3d';
const CLIENT_SECRET = 'siJKxg5bqy3HnddttByFCJxRkLBkbu_VyKYqVO_O';

const ai  = new clarifai.App(CLIENT_ID, CLIENT_SECRET);
const app = express();
const PORT = 3000;

const emoji = axios.create({
  baseURL: 'https://www.emojidex.com/api/v1/',
  timeout: 10000
});

const translate = axios.create({
	baseURL: 'http://emojitranslate.com/',
	timeout: 10000
});

app.get('/emojify', (req, res) => {
	const sentence = '2 girls and one cup';

	translate
		.post('api', {
			jezyk_s:'en',
			jezyk_na:'en-x-emoji',
			emoji_options:'-emoji_s_0-',
			emoji_slova: sentence,
			emoji_kluc:'mryazm.ey',
			content_language:'en'
		})
		.then(message => res.json({message}))
		.catch(err => res.json({message: sentence}));
});

app.get('/moji', (req, res) => {
	var tag = 'heart';
	emoji.get(`search/emoji?code_cont=${tag}`)
	.then(data => res.json(data.data))
	.catch(err => res.json(err));
})

app.get('/analyze', (req, res) => {
	ai.models.predict(
		'artifai', 
		'https://assetcdn.500px.org/assets/home/home_cover-22d4c02977bbe00636e22f9aa653bd84.jpg'
	)
	.then(response => {
		const {concepts} = response.data.outputs[0].data;
		const tags = concepts.map(x => [x.name, x.value])
		
		return emoji.get('emoji?code_cont=heart');
	}, err => res.json(err))
	.then(data => res.json(data));

	// .then sentiment analysis on resulting tags

});

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));