;require(['anole', 'zepto','TweenLite','TimelineLite','EasePack','CSSPlugin'], function(anole, Scene){
    
	var scene = new anole.Scene(20, anole.canvas, false);
	scene.createDom = function() {
		this.west = $("<div></div>").addClass("west-food").appendTo(this.container);
		this.chn = $("<div></div>").addClass("chn-food").appendTo(this.container);
		//this.line = $("<div></div>").addClass("mid-line").appendTo(this.chn);
	}
	
	scene.animation = function() {
		var dt = 0.3;
		this.tl.to(this.chn,dt,{x:"-11%", ease: Elastic.easeIn,delay:1.6})
				.to(this.west,dt/3,{x:"-115%", ease: Elastic.easeOut,delay: -dt/30})
	}
	anole.addScene(scene);
})
