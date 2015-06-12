;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(12, anole.canvas, true);
    scene.name = 'scene12.js';
	scene.createDom = function() {
		this.video = $('<video controls="controls" autoplay="autoplay">' +
					   '<source src="./resource/french.webm" type="video/webm">' +
		               '<source src="./resource/french.mp4" type="video/mp4">' +
					   'Your browser does not support the video tag.</video>')
					.appendTo(this.container);
		return this.container;
	}
	
	scene.animation = function() {
		this.tl.to(this.container.find(".bg11"),1,{"opacity":0})
				.call(function(){ this.video[0].autoplay = "autoplay";}.bind(this));
	}
	scene.cleanup = function() {
		this.video[0].pause();
	}
	anole.addScene(scene);
})
