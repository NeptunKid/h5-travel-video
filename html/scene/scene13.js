;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(13, anole.canvas, false);
    scene.name = 'scene13.js';
	scene.createDom = function() {
		var gateCtn = $('<div></div>').addClass('building-ctn gate-ctn');
		var up2 = $('<div></div>').addClass('up');
		var down2 = $('<div></div>').addClass('down');
		up2.appendTo(gateCtn);	
		down2.appendTo(gateCtn);
		var jiayu = $('<div class="building"><img src="./resource/gate.png"></div>').appendTo(gateCtn);
		gateCtn.appendTo(this.container);

		this.boat = $('<div class="boat shadow center rot-10"></div>').appendTo(down2);
		this.boat_body = $('<div class="boat body"></div>').appendTo(this.boat);

		this.marco = $("<div></div>").addClass("marco shadow tourist").appendTo(this.container);
		$("<div></div>").addClass("marco tourist body").appendTo(this.marco);
		this.container.show();
		return this.container;
	}
	
	scene.animation = function() {
		var timedelta = 0.5;
		this.tl.set(this.marco,{rotationY:180})
			.to(this.marco,1,{x: "100%",rotation:15},"+=0.5");
	}
	anole.addScene(scene);
})
