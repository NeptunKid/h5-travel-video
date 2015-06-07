;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(12, anole.canvas, true);
    scene.name = 'scene12.js';
	scene.createDom = function() {
		this.video = $('<video src = "./resource/test.ogg" controls="controls" autoplay="autoplay">Your browser does not support the video tag.</video>').appendTo(this.container);
		return this.container;
	}
	
	scene.animation = function() {
		this.tl.to(this.container.find(".bg11"),1,{"opacity":0})
				.call(function(){ this.video[0].autoplay = "autoplay";}.bind(this));
	}
	anole.addScene(scene);
})