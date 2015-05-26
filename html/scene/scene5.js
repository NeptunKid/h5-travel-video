;require(['anole', 'zepto'], function (anole){
	
	anole.addScene({
		onInit: function (){
			this.scene = anole.getOrCreate("#part3",'<div id = "part3" class = "scene"></div>',anole.canvas);
			this.ctn_browser = anole.getOrCreate("#ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.scene);
			this.browser = anole.getOrCreate("#browser",'<div id = "browser" class = "browser"></div>',this.ctn_browser);
			this.br_left = anole.getOrCreate("#browser-left",'<div id = "browser-left" class = "browser-left"></div>',this.browser);
			this.br_right = anole.getOrCreate("#browser-right",'<div id = "browser-right" class = "browser-right"></div>',this.browser);
			this.youtube = anole.getOrCreate("#youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
			this.ctn_browser.removeAttr("style");
			var items = $("#part2").clone();
			this.youtube.html(items[0].innerHTML);
			this.shade = anole.getOrCreate("#shade-youtube",'<div id = "shade-youtube" class = "shade-youtube"><img src="./resource/replay.png"></div>',this.youtube,{opacity:0});
			this.shade.css("opacity","0");
			if (this.br_left.find(".comment").length == 0)
			{
				var comments = $('<div class = "comments"></div>');
				this.br_left.append(comments);
				for (var i=0;i<5;i++){
					comments.append($('<div class = "comment"></div>'));
				}
			}
			if (this.br_right.find(".video").length == 0)
			for (var i=0;i<5;i++){
				var ctn = $("<div></div>").addClass("ctn-video");
				var video = $("<div></div>").addClass("video").append("<div class = 'board' ></div><div class = 'img v"+i%3+"'></div>").appendTo(ctn);
				var dashes = $("<div></div>").addClass("dashes").appendTo(ctn);
				this.br_right.append(ctn);
			}
			$("#part3")[0].className = "scene";
		},
		onStart: function (finish){
			$("#part2")[0].className = "scene hidden";
			this.tl1 = new TimelineLite();
			this.tl1.to(this.shade,0.5,{opacity:0.9, ease:Linear.easeNone})
							.to(this.ctn_browser,0.5,{delay:0.1,scaleX:0.4,scaleY:0.4,x:"-14%",y:"-26%",ease:Linear.easeNone});
		},
		onBack: function (finish){
			$("#part2")[0].className = "scene";
			$("#part3").remove();
			finish();
		},
		onEnd: function (){
		}
	})
});
