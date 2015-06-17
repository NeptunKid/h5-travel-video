;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(18, anole.canvas, false);
    scene.name = 'scene18.js';
	scene.createDom = function() {
		this.video = $('<video>' +
					   '<source src="resource/food1.webm" type="video/webm">' +
		               '<source src="resource/food1.mp4" type="video/mp4">' +
					   'Your browser does not support the video tag.</video>')
		              .appendTo(this.container);
		this.s1_ctn = $('<div class="shade-ctn s1"></div>').appendTo(this.container);
		this.s2_ctn = $('<div class="shade-ctn s2"></div>').appendTo(this.container);
		this.shade1 = $('<div class="shade-s18"></div>').appendTo(this.s1_ctn);
		this.shade2 = $('<div class="shade-s18"></div>').appendTo(this.s2_ctn);
		return this.container;
	}
	
	scene.animation = function() {
		this.tl.call(function(){ anole.playMedia(this.video[0]); }.bind(this));
	}
	scene.cleanup = function() {
		this.video[0].pause();
	}
	anole.addScene(scene);
})
