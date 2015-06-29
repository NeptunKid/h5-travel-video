;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var display_delta = 5;
	var display_ppm = function(){
	 var hides = $("#scene2 .paperman.hide");
	 if (hides.length<1)
		return;
	 var idx = parseInt(hides.length * Math.random());
	 hides[idx].classList.toggle("hide",false);
	 hides[idx].classList.toggle("open",true);
	 setTimeout(display_ppm,display_delta);
	}
	var paperman_init = function(){
		var ppdiv = $("#papermans");
		if (ppdiv.find(".paperman").length>0)
			return;
		var h = ppdiv.height();
		var w = ppdiv.width();
		var ph = 0.135*h;
		var pw = 0.18*h;
		var n = parseInt(h/ph)-1;
		var m = parseInt(w/pw)+2;
		for (var i=0;i<n;i++){
				var line = $("<div class = 'paperman-line l"+ (i%2)+ "'></div>");
				for (var j=0;j<m;j++)
				{
						var elm = $("<div class = 'paperman greyman hide'></div>");
						if (i == parseInt(n/2)+1 && j==parseInt(m/2))
							$("<div></div>").addClass("paperman marco shadow").append("<div class = 'marco body'></div>").appendTo(line);
						line.append(elm);
				}
				ppdiv.append(line[0]);
		}
		return n*m;
	}
	var papermans = function(delta,callback){
		display_ppm();
		if (callback)
		setTimeout(callback,delta);
	}
	anole.addScene({
		name: "scene2.js",
		id: 2,
		musicName: 'vo2',
		onInit: function (){
			this.music = anole.getMedia(this.musicName);
			this.scene = $("#scene1").clone().appendTo(anole.canvas);
			this.scene.attr("id","scene2");
			$("#scene1").hide();
			this.shade = anole.$$("#shade-scene2",'<div id = "shade-scene2" class = "shade-scene2"></div>',this.scene,{opacity:0});
			this.places = anole.$$('#scene2 .places','<div class="places"></div>',this.scene);
			this.ditch = anole.$$('#scene2 .ditch','<div class="ditch"></div>',this.scene);
			this.marco = this.scene.find(".marco.shadow");
			this.boat = this.scene.find(".boat.shadow");
			this.paperman = anole.$$("#scene2 #papermans","<div id='papermans' class='papermans'></div>",this.scene);
			paperman_init();
			this.paperman.hide();
			//this.paperman.css("opacity","0");
		},
		onStart: function (finish){
			anole.playMedia(this.music);
			this.tl1 = new TimelineLite();
			this.tl1.to(this.boat, 0.5, {top:"188%", ease:Linear.easeNone})
						.to(this.marco, 0.5, {top:"185%", ease:Linear.easeNone}, "-=0.5");
			var deg = -20;
			this.tl1 = this.tl1.set(this.ditch,{"opacity":1});
			for (var i=0;i<5;i++){
				this.tl1 = this.tl1.to(this.boat,0.1,{rotation:deg,ease:Linear.easeNone})
				                   .to(this.marco,0.1,{rotation:deg,ease:Linear.easeNone},"-=0.1")	
				deg = -deg;
			}
			this.tl1 = this.tl1.to(this.marco,0.3,{rotation:0,ease:Linear.easeNone,delay:0.2})
								.to(this.marco, 0.3, {top:"198%",left:"6%", ease:Linear.easeNone, delay:0.2});

			this.tl1.add(TweenLite.to(this.shade, 0.5, {opacity:1, ease:Linear.easeNone}))
				.to([this.boat,this.ditch],0.5,{opacity:0,delay:-0.5})
				.call(function(){
					this.paperman.show();
					this.places.hide();
					if (!this.music.ended) {
						$(this.music).on('ended', finish);
					} else {
						finish();
					}
				}.bind(this));
		},
		onBack: function(finish){
			$("#scene1").show();
			$("#scene2").remove();
			finish();
		},
		onEnd: function (){
			this.tl1 && this.tl1.progress(1);
		},
		show_paperman: function(){

		}
	})
});
