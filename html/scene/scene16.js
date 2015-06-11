;require(['anole', 'zepto'], function(anole, Scene){
	var init_progress = function(){
		if (!$(".progress")[0])
			return;
		var pr = $(".progress")[0].style["background-position"];
		if (pr)
			return;
		run_progress();
	}
	var run_progress = function(){
		$(".progress").each(function(idx,elm){
			var cur = elm.style["background-position"];
			var cur_val = parseInt(cur);
			if (cur_val)
				cur_val += 2;
			else
				cur_val = 2;
			elm.style["background-position"] = cur_val + "px 0px";
		});
		setTimeout(run_progress,50);
	}
	var scene = new anole.Scene(16, anole.canvas, true);
    scene.name = 'scene16.js';
	scene.createDom = function() {
		console.log(this.container);
		this.svg = this.container.find(".big-svg");
		this.svg_bg = this.container.find(".svg-bg");
		this.point = this.container.find(".point");
		this.count_ctn = this.container.find(".count");
		this.count = {num:0};
		this.circle = $('<svg viewbox="0 0 500 500">'+
			'<path fill="none" stroke="#a0a8c6" stroke-width="60" d="M250 100 A150 150 0 1 1 249 100 Z"></path>' + 
			'<path fill="none" stroke="#FF9e80" stroke-dasharray="100%" stroke-dashoffset = "100%" stroke-width="60" d="M250 100 A150 150 0 1 1 249 100 Z"></path></svg>').appendTo(this.point);
		this.path = this.circle.find("path")[1];
		this.path_len = this.path.getTotalLength();
		this.path.style["stroke-dasharray"] = this.path.style["stroke-dashoffset"] = this.path_len;
		this.wifi = Array();
		for (var i=0;i<6;i++)
			this.wifi[i] = $("<div></div>").addClass("wifi w"+i).appendTo(this.point);
		this.count_delta = $("<div>+9%</div>").addClass("count delta").appendTo(this.container);
		this.browser = $("<div></div>").addClass("g-browser").appendTo(this.container);
		$("<div></div>").addClass("logo").appendTo(this.browser);
		var bar = $("<div></div>").addClass("searchbar").appendTo(this.browser);
		this.progress = $("<div></div>").addClass("progress").appendTo(bar);
		$("<div>43%</div>").addClass("count delta").appendTo(bar);
		return this.container;
	}
	
	scene.animation = function() {
		var dt = 0.8;
		this.tl.set(this.browser,{y:"100%"});
		this.tl.to(this.count_ctn,dt,{opacity:0})
				.call(this.set_count.bind(this))
				.to(this.svg,dt*2,{scaleX:3,x:"-61.5%",delay:-dt})
				.to(this.svg_bg,dt*3,{y:"-100%",delay:-dt*2})
				.to(this.svg,dt,{y:"90%",delay:-dt})
				.to(this.point,dt*2,{left:"50%",top:"50%",x:"-50%",y:"-50%",scaleX:1,scaleY:1,width:250,height:250,delay:-3*dt})
				.to(this.point,dt,{background:"#d7ccc8"})
				.to(this.count_ctn,dt,{"opacity":1,delay:-dt})
				.to(this.wifi[0],dt/3,{"opacity":1,delay:-dt})
				.to([this.wifi[1],this.wifi[3]],dt/3,{"opacity":1,delay:-dt})
				.to([this.wifi[2],this.wifi[4]],dt/3,{"opacity":1,delay:-dt+dt/3})
				.to(this.wifi[5],dt/3,{"opacity":1,delay: -dt/3})
				;
		var cur_delay = -dt*7/3;
		for (var i=0;i<4;i++)
		{
			this.tl.to([this.wifi[4],this.wifi[5]],dt/3,{"opacity":0})
					.to(this.wifi[4],dt/3,{"opacity":1})
					.to(this.wifi[5],dt/3,{"opacity":1})
		}
		this.tl.to(this.path,dt*3,{"stroke-dashoffset":this.path_len * 0.18,ease:Linear.easeNone,delay:-dt*5})
				.to(this.count,dt*3,{num:82,onUpdate:this.update_count.bind(this),ease:Linear.easeNone,delay:-dt*5})
				.to(this.count_delta,dt,{"opacity":1,y:"-100%",delay:-2*dt})
				.to(this.point,2*dt,{"opacity":0,y:"-100%"})
				.call(init_progress)
				.to(this.browser,2*dt,{"opacity":1,y:"0%",delay:-2*dt})
				.call(this.remove_elms.bind(this));
	}
	scene.set_count = function(){
		this.count_ctn.css("left","18%");
		this.count_ctn.css("top","40%");
	}
	scene.update_count = function(){
		this.count_ctn.text(parseInt(this.count.num)+"%");
	}
	scene.remove_elms = function(){
		this.svg.remove();
		this.svg_bg.remove();
		this.point.remove();
		this.count_ctn.remove();
		this.count_delta.remove();
	}

	anole.addScene(scene);
})
