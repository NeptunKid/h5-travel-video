console.log("scene1.js running");
;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
console.log("scene1.js required. add scene");
	anole.addScene({
		name: "scene1.js",
		id:1,
		musicName: 'vo1',
		onInit: function (){
			console.log(">>> scene1.js onInit");
			this.music = anole.getMedia(this.musicName);
			this.scene = anole.getOrCreate("#scene1",'<div id="scene1" class="scene"></div>', anole.canvas);
			this.tl1 = new TimelineLite();
			if (!this.places){
				this.places = anole.$$('.places','<div class="places"></div>', this.scene);
				var bridgeCtn = $('<div></div>').addClass('building-ctn bridge-ctn');
				var up = $('<div></div>').addClass('up');
				var year_1 = $('<img src="./resource/s1_1271.png"></img>').addClass('year').appendTo(up);
				var bridge = $('<div class ="building"><img src="./resource/bridge.png"></div>').appendTo(up);
				var down = $('<div></div>').addClass('down');
				this.marco = $('<div class="marco shadow center"></div>').appendTo(down);
				this.marco_body = $('<div class="marco body"></div>').appendTo(this.marco);
				this.boat = $('<div class="boat shadow center"></div>').appendTo(down);
				this.marco_body = $('<div class="boat body"></div>').appendTo(this.boat);

				up.appendTo(bridgeCtn);
				down.appendTo(bridgeCtn);
				bridgeCtn.appendTo(this.places);

				var gateCtn = $('<div></div>').addClass('building-ctn gate-ctn');
				var up2 = $('<div></div>').addClass('up');
				var year_2 = $('<img src="./resource/s2_1271.png"></img>').addClass('year').appendTo(up2);
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
			console.log(">>> scene1.js onStart");
			anole.playMedia(this.music);

			this.tl1.to(this.places, 0.5, {top:"-100%", ease:Linear.easeNone,delay:5.5})
			        .to(this.marco, 0, {"z-index":501})
			        .call(function() {
						if (!this.music.ended) {
							$(this.music).on('ended', finish);
						} else {
							finish();
						}
					}.bind(this));
			
		},
		onEnd: function (){
			this.tl1.progress(1);
		}
	})
});
