;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){

	var scene = new anole.Scene(3, anole.canvas, true);
	scene.createDom = function() {
		this.marco = this.container.find(".marco.shadow");
		this.boat = this.container.find(".boat.shadow");
		this.up = this.container.find(".up");
		this.down = this.container.find(".down");
		this.gate = this.container.find(".gate");
		this.ditch = this.container.find(".ditch");
		this.text_marco = this.container.find(".text_marco");
		this.marco2 = $('<div class="marco2 shadow center"></div>').appendTo(this.down);
		this.marco2_body = $('<div class="marco2 body"></div>').appendTo(this.marco2);
		this.surfboard = $('<div class="surfboard shadow"></div>').appendTo(this.down);
		this.surfboard_body = $('<div class="surfboard"></div>').appendTo(this.surfboard);
		this.year = this.container.find('.year').appendTo(this.up);
		this.popu = $('<div class="travel-popu">2.0</div>').appendTo(this.up);
		anole.canvas.addClass('strips-3-4');
		anole.canvas.removeClass('strips');
	}
	scene.animation = function() {
		this.tl = this.tl.set([this.marco,this.boat],{display:"none",delay:0})
		.set(this.marco2,{display:"block",rotation:-20})
		.set(this.surfboard,{display:"block",rotation:-15})
		.set(this.popu,{display:"block"})
	}
    scene.cleanup = function() {
    }
    anole.addScene(scene);
});
