var photolist = [
	{
		name: "abc.jpg"
	},
	{
		name: "def.jpg"
	}
];

function expectedScore(Ra, Rb) {
	return 1 / (1 + Math.pow(10, (Ra - Rb)/400));
}

