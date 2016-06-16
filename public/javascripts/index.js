var socket = io();
var image = {
	A: document.getElementById('photoA'),
	B: document.getElementById('photoB')
};

var heading = {
	A: document.getElementById('photoAheading'),
	B: document.getElementById('photoBheading')
};

var ids = {
	A: document.getElementById('photoAid'),
	B: document.getElementById('photoBid')
};

function setPhoto(photoName, photo) {
	image[photoName].src = photo.url;
	heading[photoName].innerHTML = photo.rating;
	ids[photoName].innerHTML = photo.id;
}

socket.on('set photo A', function(photo) {
	setPhoto('A', photo);
});

socket.on('set photo B', function(photo) {
	setPhoto('B', photo);
});

function photoWin(winner) {
	var loser = (winner == 'A') ? 'B' : 'A';
	socket.emit('clicked', {
		photoToChange: loser,
		winnerID: ids[winner].innerHTML,
		loserID: ids[loser].innerHTML
	})
}
