;require(['anole', 'zepto','TweenLite','TimelineLite'], function(anole, Scene){
    
	var scene = new anole.Scene(21, anole.canvas, false);
	scene.createDom = function() {
		this.tag = $("<div></div>").addClass("lung-tag").appendTo(this.container);
		this.plate = $("<div></div>").addClass("lung-plate").appendTo(this.tag);
		this.text_lung = $("<div></div>").addClass("lung-text").appendTo(this.tag);
		this.lungm = $("<div></div>").addClass("lung-m").appendTo(this.plate);
		this.lungf = $("<div></div>").addClass("lung-f").appendTo(this.plate);
	}
	
	scene.animation = function() {
		var dt = 0.6;
		this.tl.to(this.tag,dt,{y:"0%",opacity:1})
				.to(this.text_lung,dt/2,{opacity:1})
				.to(this.lungm,dt/2,{y:"0%", ease: Elastic.easeInOut,delay:-dt/2})
				.to(this.lungf,dt/2,{y:"0%", ease: Elastic.easeInOut,delay:dt})
	}
	anole.addScene(scene);
})
