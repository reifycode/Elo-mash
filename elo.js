var k_factor = 32;

exports.defineKFactor = function(k) {
	k_factor = k;
}

exports.competition = function(photoA, photoB, scoreA) { 
	function expectedScore(R1, R2) {
		return 1 / (1 + Math.pow(10, (R2 - R1)/400));
	}
	// scoreA = If a wins: 1, loss: 0
	var scoreB = 1 - scoreA;

	var Ra = photoA.rating + k_factor * (scoreA - expectedScore(photoA.rating, photoB.rating));
	var Rb = photoB.rating + k_factor * (scoreB - expectedScore(photoB.rating, photoA.rating));

	photoA.rating = Ra;
	photoB.rating = Rb;
}
