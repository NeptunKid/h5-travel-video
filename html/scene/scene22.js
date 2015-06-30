;require(['anole', 'zepto','TimelineLite'], function(anole, Scene){
    
	var scene = new anole.Scene(22, anole.canvas, false);
    scene.name = 'scene22.js';
	scene.createDom = function() {
		this.container = $("<div id='scene22' class='scene'></div>")
		var x_list = [39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984];
		var y_list = [46,46,46,46,46,46,46,46,181,181,181,181,181,181,181,181,316,316,316,316,316,316,316,316,451,451,451,451,451,451,451,451,586,586,586,586,586,586,586,586,721,721,721,721,721,721,721,721];
		this.count = x_list.length;
		var modu = 15;
		this.people = [];
		this.page = $("<div></div>").addClass("page").appendTo(this.container);
		for (var i=0;i<this.count;i++){
			var person = $("<div></div>").addClass("person-ctn").appendTo(this.page)
				.append($("<div></div>").addClass("person p"+i%modu));
			person.css("top",y_list[i]-45);
			person.css("left",x_list[i]-45);
			this.people[i] = person;
		}
		this.g_svg = $("<div></div>").addClass("g-svg-ctn").append("<img src='./resource/g.svg'></img>").appendTo(this.container);
		this.g_ctn = $("<div></div>").addClass("g-ctn").appendTo(this.container).append('<div class="g-half"></div>');
		this.g0 = $("<div></div>").addClass("g-layer l0").appendTo(this.g_ctn);
		this.g1 = $("<div></div>").addClass("g-layer l1").appendTo(this.g_ctn);
		this.gtext = $("<p>g</p>").appendTo(this.g_ctn);
		this.g_bg = $("<div></div>").addClass("g-bg").appendTo(this.container).append("<img src='./resource/googlelogo.png'></img>");
		return this.container;
	}
	
	scene.animation = function() {
		var delta = 0.3;
		console.log(this.people);
		var people = $(".person");
		console.log(people);
		console.log(this.page);
		this.tl.delay(delta);
		this.tl.to($(".person-ctn"),delta,{opacity:1});
		this.tl.to($(".person"),delta,{top:"0%"});
		//for (var i=0;i<15;i++)
		//	this.tl.to(".person.p"+(14-i),delta,{top:"0%"});
		/*$(".person-ctn").each(function(idx,elm){
			this.tl.to(elm,delta,{opacity:1,delay:-delta/2});
			this.tl.to(people[idx],delta,{top:"0%"});
		}.bind(this));*/
		this.tl.to(this.page,delta*2,{scaleX:1,scaleY:1,x:"-50%",y:"-50%",delay:delta,ease:Linear.easeNone})
				.to(this.page,delta,{opacity:0});
		this.tl.to(this.g_svg,delta,{opacity:1,delay:-delta})
				.to(this.g_svg,delta*10,{scaleY:0.02,scaleX:0.02,x:"-50%",y:"-50%",ease:Linear.easeNone});

		this.tl.to(this.g_ctn,delta*2,{opacity:1})
			.to(this.g0,delta*3,{rotationY:90,ease:Linear.easeNone})
			.to(this.g1,delta*3,{rotationY:180,ease:Linear.easeNone});

		this.tl.to(this.g_bg,delta*3,{opacity:1,delay:delta});
	}
	scene.cleanup = function() {
	}
	anole.addScene(scene);
})
