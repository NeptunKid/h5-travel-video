;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var pada_count = 5;
	var padapada = function(){
		this.boat.toggleClass("rot-10"); 
		// $("#marco-scene2")[0].classList.toggle("rot-10");
		this.marco.toggleClass("rot-10");
		pada_count--;
		if (pada_count>0) {
			setTimeout(padapada.bind(this), 100);
			// console.log("run once." + this.marco[0].className);
		} else {
			setTimeout((function(){
				console.log("???");
				this.marco.toggleClass("rot-10", false); // Removes rot-10 if it's present.
				this.marco.addClass("anime-short z-top");
			}).bind(this), 400);
		}
	};
	anole.addScene({
		onInit: function (){
			console.log(this.scene);
			this.scene = anole.getOrCreate("#scene1",'<div id="scene1" class="scene"></div>', anole.canvas);
			if (!this.places){ // Dear thy, what's this for?
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
			this.places.removeAttr("style");
			this.places.find(".boat").removeAttr("style");
			this.places.find(".marco").removeAttr("style");
		},
		onStart: function (finish){
			this.tl1 = new TimelineLite();
			this.tl1 = this.tl1.to(this.places, 0.5, {top:"-100%", ease:Linear.easeNone})
							.to(this.boat, 0.5, {top:"198%", ease:Linear.easeNone}, "+=2")
						.to(this.marco, 0.5, {top:"192%", ease:Linear.easeNone}, "-=0.5") // This happens at the same time with the previous tween.
					//.call(padapada.bind(this))
			var deg = -10;
			for (var i=0;i<5;i++){
				this.tl1 = this.tl1.to(this.boat,0.1,{rotation:deg,ease:Linear.easeNone})
									.to(this.marco,0.1,{rotation:deg,ease:Linear.easeNone},"-=0.1")	
				deg = -deg;	
			}
			this.tl1 = this.tl1.to(this.marco,0.3,{rotation:0,ease:Linear.easeNone,delay:0.2})
												.to(this.marco, 1, {top:"212%", ease:Linear.easeNone, delay:0.8});
		},
		onEnd: function (){
			console.log(this.tl1.progress());
			this.tl1.progress(1);
		}
	})
});
