;require(['anole', 'zepto'], function (anole){
	var mcount = 10;
	var move_delta = 200;
	var marco_run = function(){
		console.log($("#marco-scene4"));
		$("#marco-scene4")[0].classList.toggle("rot-10");
		mcount--;
		if (mcount)
			setTimeout(marco_run,move_delta);
	}
	var marco_init = function(){
		return $('<div id="marco-scene4" class="marco shadow tourist center"></div>')
				.append($('<div class="marco tourist body"></div>'));
	}
	anole.addScene({
		name: "scene4.js",
		onInit: function (){
			this.scene = anole.$$("#scene4",'<div id = "scene4" class = "scene"></div>',anole.canvas);
			this.scene.html($("#scene3").html());
			$("#scene3").hide();
			this.marco = anole.$$("#marco-scene4",marco_init,this.scene,{top:"55%"});
			this.marco.hide();
			this.sublgate = $("#scene4 #subway-left");
			this.subrgate = $("#scene4 #subway-right");
			this.shadowl = $("<div></div>").addClass("subway-shadow").css("opacity",0).appendTo(this.sublgate);
			this.shadowr = $("<div></div>").addClass("subway-shadow").css("opacity",0).appendTo(this.subrgate);
			$("#scene4 .paperman.marco").hide();
		},
		onStart: function (finish){
			var new_w = 1080 * 0.24;
			var new_h = 1.5*new_w;
			this.tl1 = new TimelineLite();
			this.tl1.to(this.sublgate, 0.1, {y:"-5%", ease:Linear.easeNone, onComplete:function(){this.marco.show()}.bind(this)})
					.to(this.subrgate, 0.1 , {y:"-5%", ease:Linear.easeNone},"-=0.2")
					.to([this.shadowl,this.shadowr],0.1,{opacity:1},"-=0.2")
					.to(this.sublgate , 0.5, {x:"50%", ease:Linear.easeNone, onComplete:this.marco_go_out.bind(this)})
					.to(this.subrgate, 0.5, {x:"-50%", ease:Linear.easeNone},"-=0.5")
					.to(this.marco,1,{delay:0.2,left:"18%",top:"58%",width:new_w,height:new_h,ease:Linear.easeNone,});
		},
		onBack: function(finish){
			$("#scene4").remove();
			$("#scene3").remove();
			finish();
		},
		onEnd: function (){
			this.tl1.progress(1);
		},
		marco_go_out:function(){
			var duration = 1;
			var delay = 0.2;
			mcount = duration*1000/move_delta;
			setTimeout(marco_run,delay*1000);
		},
	})
});