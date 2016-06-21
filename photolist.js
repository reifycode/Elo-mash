// will (should) be replaced by a proper database

photosBasePath = '/images/'

var photolist = [
	{
		name: 'abc.jpg'
	},
	{
		name: 'def.jpg'
	},
	{
		name: 'efg.jpg'
	},
	{
		name: 'jkl.jpg'
	},
	{
		name: 'mno.jpg'
	}
];

photolist.forEach(function(photo, index) {
	photo.rating = 1400;
	photo.id = index;
	if(photo.name) photo.url = photosBasePath + photo.name;
});

exports.getRandomPhoto = function() {
	return photolist[Math.floor(Math.random() * photolist.length)];
}

exports.getPhotoByID = function(id) {
	return photolist[id];
}
