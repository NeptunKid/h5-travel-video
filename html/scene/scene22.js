;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(21, anole.canvas, false);
    scene.name = 'scene21.js';
	scene.createDom = function() {
		this.video = $('<video controls="controls" autoplay="autoplay">' +
					   '<source src="resource/toilet.webm" type="video/webm">' +
		               '<source src="resource/toilet.mp4" type="video/mp4">' +
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
