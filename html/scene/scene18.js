;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(18, anole.canvas, false);
    scene.name = 'scene18.js';
	scene.createDom = function() {
		this.video = $('<video controls="controls" autoplay="autoplay">' +
					   '<source src="resource/food1.webm" type="video/webm">' +
		               '<source src="resource/food1.mp4" type="video/mp4">' +
					   'Your browser does not support the video tag.</video>')
		              .appendTo(this.container);
		return this.container;
	}
	
	scene.animation = function() {
		this.tl.call(function(){ this.video[0].autoplay = "autoplay";}.bind(this));
	}
	scene.cleanup = function() {
		this.video[0].pause();
	}
	anole.addScene(scene);
})
