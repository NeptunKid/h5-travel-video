;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(11, anole.canvas, false);
    scene.name = 'scene11.js';
	scene.createDom = function() {
		this.container = $("<div id='scene11' class='scene'></div>")
		var bg = $("<div></div>").addClass("bg11").appendTo(this.container);
		this.c00 = $("<div id='cana00'></div>").addClass("canadian").appendTo(bg);
		this.c10 = $("<div id='cana10'></div>").addClass("canadian").appendTo(bg);
		this.c22 = $("<div id='cana20'></div>").addClass("canadian").appendTo(bg);
		this.c01 = $("<div id='cana01'></div>").addClass("canadian umbrella").appendTo(bg);
		this.c11 = $("<div id='cana11'></div>").addClass("canadian umbrella").appendTo(bg);
		this.c21 = $("<div id='cana21'></div>").addClass("canadian lovechina").appendTo(bg);
		return this.container;
	}
	
	scene.animation = function() {
		var timedelta = 0.5*2;
		this.tl.to($("#cana00"),timedelta,{rotationY:90,delay:2.5})
				.to($("#cana01"),timedelta,{rotationY:0})
				.to($("#cana10"),timedelta,{rotationY:90})
				.to($("#cana11"),timedelta,{rotationY:0})
				.to($("#cana20"),timedelta,{rotationY:90})
				.to($("#cana21"),timedelta,{rotationY:0})
	}
	anole.addScene(scene);
})
