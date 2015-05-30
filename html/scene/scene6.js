;require(['anole', 'zepto'], function (anole){
	
	anole.addScene({
		onInit: function (){
			this.scene = anole.getOrCreate("#scene6",'<div id = "scene6" class = "scene"></div>',anole.canvas);
			this.scene.html($("#scene5").html());
			$("#scene5").hide();
			this.ctn_browser = anole.getOrCreate("#scene6 #ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.scene);
			this.browser = anole.getOrCreate("#scene6 #browser",'<div id = "browser" class = "browser"></div>',this.browser_block);
			this.br_left = anole.getOrCreate("#scene6 #browser-left",'<div id = "browser-left" class = "browser-left half"></div>',this.browser);
			this.br_right = anole.getOrCreate("#scene6 #browser-right",'<div id = "browser-right" class = "browser-right half"></div>',this.browser);
			this.youtube = anole.getOrCreate("#scene6 #youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
			var comment_count = 5;
			if (this.br_left.find(".comments").length == 0)
			{
				var comments = $('<div></div>').addClass("comments").appendTo(this.br_left);
				for (var i=0;i<comment_count;i++){
					var comment = $('<div></div>').addClass("comment").appendTo(comments);
					var head = $("<div></div>").addClass("comment-head").appendTo(comment);
					var content = $("<div></div>").addClass("comment-content").appendTo(comment);
					for (var j=0;j<3;j++)
						$("<div></div>").addClass("dash").appendTo(content);
				}
			}
			this.scene.css("display","block");
		},
		onStart: function (finish){
			this.tl1 = new TimelineLite();
			this.tl1.to([this.br_left,this.br_right],1,{y:"-30%",ease:Linear.easeNone,delay: 0.5});
		},
		onBack: function (finish){
			$("#scene6").remove();
			$("#scene5").remove();
			finish();
		},
		onEnd: function (){
			this.tl1.progress(1);
		}
	})
});
