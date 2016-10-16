const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const emotional = require('emotional');
const processor = require('./processor');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/emojify', (req, res) => {
	translate
		.post('api', {
			jezyk_s:'en',
			jezyk_na:'en-x-emoji',
			emoji_options:'-emoji_s_0-',
			emoji_slova: req.body.sentence,
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
});

app.post('/analyze', (req, res) => {
	const url = req.body.img
	processor
		.robart(req.body.img)
		.then(category => {
			return processor.general(url)
					.then(tags => Object.assign({}, category, {tags}));
		})
		.then(catTags => {
			return processor.color(url)
				.then(colors => Object.assign({url}, catTags, {colors}))
		})
		.then(data => {
			const critique =  processor.sentencer(data.tags);
			return Object.assign({data}, {critique});
		})
		.then(data => res.json(data));
});

app.listen(PORT, () => console.log(`App running on port: ${PORT}`));