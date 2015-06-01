;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var display_delta = 5;
	var display_ppm = function(){
	 var hides = $("#part2 .paperman.hide");
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
		var ph = 0.12*h;
		var pw = 0.16*h;
		var n = h/ph;
		var m = w/pw;
		console.log(n);
		console.log(m);
		for (var i=0;i<=n;i++){
				var line = $("<div class = 'paperman-line l"+ (i%2)+ "'></div>");
				for (var j=0;j<=m;j++)
				{
						var elm = $("<div class = 'paperman greyman hide'></div>");
						if (i == parseInt(n/2)+2 && j==parseInt(m/2)+1)
							line.append("<div class = 'paperman marco tourist'></div>");
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
		onInit: function (){
			//console.log(">>> scene2.js onInit");
			this.scene = anole.getOrCreate("#part2",'<div id="part2" class="scene"></div>',anole.canvas);
			this.scene[0].className = "scene";
			this.shade = anole.getOrCreate("#shade-part2",'<div id="shade-part2" class="shade-part2"></div>', this.scene, {opacity:0});
			this.places = anole.getOrCreate('.places','<div class="places"></div>',this.scene);
		},
		onStart: function (finish){
			//console.log(">>> scene2.js onStart");
			this.tl1 = new TimelineLite();
			this.tl1.add(TweenLite.to(this.shade, 0.5, {opacity:1, ease:Linear.easeNone, onComplete:function(){
				$("#scene1")[0].className = "hidden";
				anole.getOrCreate("#part2 #papermans","<div id='papermans' class='papermans'></div>",this.scene);
				paperman_init();
				setTimeout(display_ppm,500);
			}.bind(this)}));

			if (finish) {
				this.tl1.call(finish);
			}
		},
		onBack: function(finish){
			//console.log(">>> scene2.js onBack");
			$("#scene1")[0].className = "scene";
			$("#part2").remove();
			$("#part2 #papermans").remove();
			finish();
		},
		onEnd: function (){
			//console.log(">>> scene2.js onEnd");
			var hides = $("#part2 .paperman.hide");
			hides.each(function(idx,elm){
				elm.classList.toggle("hide");
				elm.classList.toggle("open");
			});
		}
	})
});
