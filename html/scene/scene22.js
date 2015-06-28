;require(['anole', 'zepto','TimelineLite'], function(anole, Scene){
    
	var scene = new anole.Scene(22, anole.canvas, false);
    scene.name = 'scene22.js';
	scene.createDom = function() {
		this.container = $("<div id='scene22' class='scene'></div>")
		this.count = 15;
		this.people = [];
		for (var i=0;i<this.count;i++)
			this.people.push($("<div></div>").addClass("person-ctn").appendTo(this.container)
				.append($("<div></div>").addClass("person p"+i)));
		this.g_ctn = $("<div></div>").addClass("g-ctn").appendTo(this.container).append('<div class="g-half"></div>');
		this.g0 = $("<div></div>").addClass("g-layer l0").appendTo(this.g_ctn);
		this.g1 = $("<div></div>").addClass("g-layer l1").appendTo(this.g_ctn);
		this.gtext = $("<p>g</p>").appendTo(this.g_ctn);
		return this.container;
	}
	
	scene.animation = function() {
		var delta = 0.3;
		console.log(this.people);
		var people = $(".person");
		console.log(people);
		this.tl.delay(delta);
		$(".person-ctn").each(function(idx,elm){
			this.tl.to(elm,delta,{opacity:1,delay:-delta/2});
			this.tl.to(people[idx],delta,{top:"0%"});
		}.bind(this));
		this.tl.to(this.g0,delta*3,{rotationY:90,ease:Linear.easeNone})
			.to(this.g1,delta*3,{rotationY:180,ease:Linear.easeNone})
	}
	scene.cleanup = function() {
	}
	anole.addScene(scene);
})
