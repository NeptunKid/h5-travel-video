;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var pada_count = 5;
	var padapada = function(){
		this.boat.toggleClass("rot-10"); 
		this.marco.toggleClass("rot-10");
		pada_count--;
		if (pada_count>0) {
			setTimeout(padapada.bind(this), 100);
		} else {
			setTimeout((function(){
				this.marco.toggleClass("rot-10", false); // Removes rot-10 if it's present.
				this.marco.addClass("anime-short z-top");
			}).bind(this), 400);
		}
	};
	anole.addScene({
		onInit: function (){
			this.scene = anole.getOrCreate("#scene1",'<div id="scene1" class="scene"></div>', anole.canvas);
			if (!this.places){
				this.places = anole.getOrCreate('.places','<div class="places"></div>', this.scene);
				var bridgeCtn = $('<div></div>').addClass('building-ctn bridge-ctn');
				var up = $('<div></div>').addClass('up');
				var bridge = $('<div class ="building"><img src="./resource/bridge.png"></div>').appendTo(up);
				var down = $('<div></div>').addClass('down');
				this.marco = $('<div class="marco center"></div>').appendTo(down);
				this.boat = $('<div class="boat center"></div>').appendTo(down);
				up.appendTo(bridgeCtn);
				down.appendTo(bridgeCtn);
				bridgeCtn.appendTo(this.places);

				var gateCtn = $('<div></div>').addClass('building-ctn gate-ctn');
				var up2 = $('<div></div>').addClass('up');
				var down2 = $('<div></div>').addClass('down');
				var jiayu = $('<div class="building"><img src="./resource/gate.png"></div>').appendTo(up2);
				up2.appendTo(gateCtn);  
				down2.appendTo(gateCtn);
				gateCtn.appendTo(this.places);
			}
		},
		onStart: function (finish){
			this.tl1 = new TimelineLite();
			this.tl1.to(this.places, 0.5, {top:"-100%", ease:Linear.easeNone})
			        .to(this.boat, 0.5, {top:"198%", ease:Linear.easeNone}, "+=2")
				    .to(this.marco, 0.5, {top:"192%", ease:Linear.easeNone}, "-=0.5") // This happens at the same time with the previous tween.
					.call(padapada.bind(this))
					.to(this.marco, 1, {top:"212%", ease:Linear.easeNone, delay:0.8, onComplete:finish});
		},
		onEnd: function (){
			console.log(this.tl1.progress());
			this.tl1.progress(1);
		}
	})
});
