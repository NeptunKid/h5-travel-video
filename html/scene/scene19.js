;require(['anole', 'zepto','TweenLite','TimelineLite','EasePack','CSSPlugin'], function(anole, Scene){
    
	var scene = new anole.Scene(19, anole.canvas, false);
    scene.name = 'scene19.js';
	scene.createDom = function() {
		this.container = $("<div id='scene19' class='scene'></div>")
		this.west = $("<div></div>").addClass("west-food").appendTo(this.container);
		this.chn = $("<div></div>").addClass("chn-food").appendTo(this.container);
		//this.line = $("<div></div>").addClass("mid-line").appendTo(this.chn);
		return this.container;
	}
	
	scene.animation = function() {
		var dt = 0.6;
		console.log(this.chn);
		this.tl.to(this.chn,dt,{x:"-15%", ease: Elastic.easeIn})
				.to(this.west,dt/3,{x:"-110%", ease: Elastic.easeOut,delay: -dt/30})
	}
	anole.addScene(scene);
})
