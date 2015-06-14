;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(17, anole.canvas, true);
    scene.name = 'scene17.js';
	scene.createDom = function() {
		this.browser = this.container.find(".g-browser");
		this.phone = $("<div></div>").addClass("phone").appendTo(this.container);
		$("<div></div>").addClass("home").appendTo(this.phone);
		var ctn = $("<div></div>").addClass("progress-ctn").appendTo(this.phone);
		this.count_ctn = $("<div>16%</div>").addClass("count delta").appendTo(this.phone);
		this.count = {num:16};
		this.progress = $("<div></div>").addClass("progress p16").appendTo(ctn);
		this.pshade = $("<div></div>").addClass("progress-shade").appendTo(ctn);
		this.tl.set(this.phone,{x:"-100%"});
		return this.container;
	}
	
	scene.animation = function() {
		var dt = 2.5;
		this.tl.to(this.browser,dt,{"opacity":0,x:"100%"})
				.to(this.phone,dt,{"opacity":1,x:"0%",delay:-dt})
				.to(this.pshade,dt*3,{"width":"52%",ease:Linear.easeNone})
				.to(this.count,dt*2,{num:48,onUpdate:this.update_count.bind(this),ease:Linear.easeNone,delay:-dt*3})
				;
	}
	scene.update_count = function(){
		this.count_ctn.text(parseInt(this.count.num)+"%");
	}
	anole.addScene(scene);
})
