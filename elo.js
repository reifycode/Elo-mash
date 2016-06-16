var k_factor = 32;

exports.defineKFactor = function(k) {
	k_factor = k;
}

exports.competition = function(photoA, photoB, scoreA) { 
	function expectedScore(Ra, Rb) {
		return 1 / (1 + Math.pow(10, (Ra - Rb)/400));
	}
	// scoreA = If a wins: 1, loss: 0
	var scoreB = 1 - scoreA;

	Ra = photoA.rating + k_factor * (scoreA - expectedScore(photoA.rating, photoB.rating));
	Rb = photoB.rating + k_factor * (scoreB - expectedScore(photoB.rating, photoA.rating));

	photoA.rating = Ra;
	photoB.rating = Rb;
}
