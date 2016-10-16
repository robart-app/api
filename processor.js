const clarifai = require('clarifai');
const MODEL_ID = 'b4424598a08543b181c0393e697e8fd6';
const CLIENT_ID = 'XXOigcQo38GxmHDtL9cuebNF7bMUd0lvest6UA3d';
const CLIENT_SECRET = 'siJKxg5bqy3HnddttByFCJxRkLBkbu_VyKYqVO_O';
const {
	GENERAL_MODEL,
	COLOR_MODEL
} = clarifai;
const ai  = new clarifai.App(CLIENT_ID, CLIENT_SECRET);

const processor = {
	robart: (url) => {  //obtains image categor
		return ai.models.predict(MODEL_ID, url)
			.then(response => {
				const {concepts} = response.data.outputs[0].data;
				// const tags = concepts.map(x => [x.name, x.value]);
				return {category: concepts[0]};
			}, err => []);
	},
	general: (url) => {
		return ai.models
			.predict(GENERAL_MODEL, url)
			.then(response => {
				const {concepts} = response.data.outputs[0].data;
				const tags = concepts.map(x => x.name);
				return tags;
			}, err => [])
	},
	color: (url) => {
		return ai.models.predict(COLOR_MODEL, url)
			.then(response => {
				const {colors} = response.data.outputs[0].data;
				return colors.map(c => c.w3c);
			}, err => [])
	}
};

module.exports = processor;