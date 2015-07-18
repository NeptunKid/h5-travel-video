;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(13, anole.canvas, false);
	scene.createDom = function() {
		this.gateCtn = $('<div></div>').addClass('building-ctn gate-ctn');
		this.up = $('<div></div>').addClass('up');
		this.down = $('<div></div>').addClass('down');
		this.gate = $('<div class="gate shadow"></div>').appendTo(this.up);
		this.gate_body = $('<div class="gate body"></div>').appendTo(this.gate);
		this.boat = $('<div class="boat shadow center"></div>').appendTo(this.up);
		this.boat_body = $('<div class="boat body"></div>').appendTo(this.boat);
		this.ditch = $('<div class="ditch"></div>').appendTo(this.up);
		this.camel = $('<div class="camel"></div>').appendTo(this.down);
		this.camel_legs = $('<div class="camel_leg"></div>'+
			'<div class="camel_leg"></div>'+
			'<div class="camel_leg"></div>'+
			'<div class="camel_leg"></div>').appendTo(this.camel);
		this.legs = this.camel.find(".camel_leg");
		this.text_sichouzhilu = $('<div class="text_sichouzhilu"></div>').appendTo(this.down);

		this.up.appendTo(this.gateCtn);
		this.down.appendTo(this.gateCtn);
		this.gateCtn.appendTo(this.container);
	}
	var setLeg = function(dom){
		var left = 40;
		dom.each(function(index) {
			$(this).css('left', left+'%');
			left+=11;
		});
	}
	scene.animation = function() {
		setLeg(this.legs);
		this.tl = this.tl.set(this.up, {top:"-100%",display:"block"})
		.set(this.gate,{top:"10%"})
		.set(this.boat, {rotation:-10,top:"47%","z-index":130})
		.set(this.ditch, {bottom:0})
		.set(this.down,{right:0})
		.to(this.up,0.3,{top:"0%",ease:Elastic.easeOut.config(1, 0.6)})
		.fromTo([this.boat,this.ditch],0.5,{opacity:0},{opacity:1})
		.set(this.camel,{display:"block"});
		
		var deg = -10;
		for (i=0;i<3;i++) {
			this.tl = this.tl.staggerTo([this.legs.eq(0),this.legs.eq(2)],0.2,{rotation:deg,delay:0})
			.staggerTo([this.legs.eq(1),this.legs.eq(3)],0.2,{rotation:-deg,delay:-0.2});
			deg = -deg;
		}
		this.tl = this.tl.to(this.camel,2,{right:"30%",ease:Linear.easeNone,delay:-2})
		.set(this.text_sichouzhilu,{display:"block"});
	}
	anole.addScene(scene);
})
