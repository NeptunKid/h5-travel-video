;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){

	var scene = new anole.Scene(1, anole.canvas, false);
	scene.createDom = function() {

		this.places = $('<div class="places"></div>').appendTo(this.container);
		this.bridgeCtn = $('<div></div>').addClass('building-ctn bridge-ctn');
		this.up = $('<div></div>').addClass('up');
		this.down = $('<div></div>').addClass('down');
		this.year = $('<div class="year">1271</div>').appendTo(this.up);
		this.bridge = $('<div class="building shadow"></div>').appendTo(this.up);
		this.bridge_body = $('<div class="building body"></div>').appendTo(this.bridge);
		this.marco = $('<div class="marco shadow center"></div>').appendTo(this.down);
		this.marco_body = $('<div class="marco body"></div>').appendTo(this.marco);
		this.boat = $('<div class="boat shadow center"></div>').appendTo(this.down);
		this.boat_body = $('<div class="boat body"></div>').appendTo(this.boat);
		this.river1 = $('<div class="river river1 center"></div>').appendTo(this.bridge);
		this.river2 = $('<div class="river river2 center"></div>').appendTo(this.bridge);
		this.marco_nohat = $('<div class="marco_nohat center"></div>').appendTo(this.down);
		this.hat = $('<div class="hat shadow center"></div>').appendTo(this.marco_nohat);
		this.hat_body = $('<div class="hat body"></div>').appendTo(this.hat);
		this.up.appendTo(this.bridgeCtn);
		this.down.appendTo(this.bridgeCtn);
		this.bridgeCtn.appendTo(this.places);
		this.gate = $('<div class="gate shadow"></div>').appendTo(this.up);
		this.gate_body = $('<div class="gate body"></div>').appendTo(this.gate);
		this.ditch = $('<div class="ditch"></div>').appendTo(this.up);
		anole.canvas.addClass('strips');
	}
	scene.animation = function() {
    var dt_comein = 0.3;
	var dt_gap = 0.5;
		this.tl = this.tl.to(this.year,dt_comein, {left:"50%",ease:Power4.easeIn,delay:0})
		.to(this.bridge,dt_comein, {left:"50%",ease:Power4.easeIn,delay:dt_gap})
		.to(this.down,dt_comein, {right:"0", left:"0", width: "100%", ease:Power4.easeIn,delay:dt_gap});
		var height = 1.3;
	    for (var i=0;i<6;i++){
		  this.tl = this.tl.to(this.river1,0.2,{x:height,y:height,ease:Power4.easeNone})
		  .to(this.river2,0.2,{x:height,y:height,ease:Power4.easeNone});
		  height =-height;
		}
		this.tl.set(this.marco, {display:"none",delay:0})
		.set(this.marco_nohat, {display:"block","top":"-10%",delay:0})
		.to(this.up, 0.3, {top:"-100%", ease:Power4.easeNone,delay:0})
		var deg = -10;
	    for (var i=0;i<5;i++){
		  this.tl = this.tl.to(this.boat,0.1,{rotation:deg,ease:Power4.easeIn});
		  deg = -deg;
		}
	  this.tl.set(this.up,{top:"100%"})
	        .to(this.up,0.3,{top:0, ease:Power4.easeIn})
			.set(this.marco_nohat, {display:"none"})
			.set(this.boat,{top:"10%",rotation:0})
			.set(this.marco,{display:"block"})
			.set([this.marco,this.boat], {rotation:-20,delay:0.4})
	}
	scene.cleanup = function() {
		this.container.find('.building').remove();
		this.container.find('.river').remove();
		this.container.find('.marco_nohat').remove();
	}
	anole.addScene(scene);
});
