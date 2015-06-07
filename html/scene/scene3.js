console.log("Scene3.js running...");
;require(['anole', 'zepto'], function (anole){
	var data = {year:1271,popu:123456789}
	var data_final = {year:2014,popu:128498301}
	var subway_text_create = function(){
		var ctn = $("<div></div>").addClass("subway-text-ctn");
		var year = $("<div></div>").addClass("subway-year").appendTo(ctn);
		var title = $("<div></div>").addClass("subway-title").text("中国入境旅游统计").appendTo(ctn);
		var popu = $("<div></div>").addClass("subway-popu").appendTo(ctn);
		return ctn;
	}
	var convert = function(s){
		var l = s.length;
		var head = (l+2) % 3 +1;
		var res = s.substr(0,head);
		for (;head<l;head+=3){
			res += "," + s.substr(head,3);
		}
		return res;
	}
	var update_text = function(){
		$(".subway-year").text(parseInt(data.year));
		var popu = String(parseInt(parseInt(data.popu)));
		popu = convert(popu);
		$(".subway-popu").text(popu);
	}
	anole.addScene({
		name: "scene3.js",
		onInit: function (){
			this.scene = anole.$$("#scene3",'<div id = "scene3" class = "scene"></div>',anole.canvas);
			this.subway_paperman = anole.$$("#subway-paperman","<div id = 'subway-paperman' class='papermans'></div>",this.scene);
			this.subway_paperman.html($("#papermans").html());
			this.subway = anole.$$("#subway",'<div id = "subway" class = "subway"></div>',this.scene);
			this.subup = anole.$$("#subway-up","<div id='subway-up' class='subway-up'>",this.subway);
			this.subtext = anole.$$(".subway-text",subway_text_create,this.subup);
			this.subhead = anole.$$("#subway-head","<div id='subway-head' class='subway-head'>",this.subup);
			this.subdown = anole.$$("#subway-down","<div id='subway-down' class='subway-down'>",this.subway);
			this.sublblock = anole.$$("#subway-left-block","<div id = 'subway-left-block' class='left subway-block'></div>",this.subdown);
			this.subrblock = anole.$$("#subway-right-block","<div id = 'subway-right-block' class='right subway-block'></div>",this.subdown);
			this.sublgate = anole.$$("#subway-left","<div id = 'subway-left' class='subway-left'></div>",this.subdown);
			this.subrgate = anole.$$("#subway-right","<div id = 'subway-right' class='subway-right'></div>",this.subdown);
			data = {year:1271,popu:123456789};
			update_text();
		},
		onStart: function (finish){
			//console.log(">>> scene3.js onStart");
			this.tl1 = new TimelineLite();
			this.tl1.to($("#subway-left"), 0.5, {x:"100%", ease:Linear.easeNone})
							.call(function(){$("#papermans").css("display","none");})
							.to($("#subway-right"), 0.5, {x:"-100%", ease:Linear.easeNone},"-=0.5")
							.to(this.subway,0.5,{delay:0.2,scaleX:"0.5",scaleY:"0.5",y:"5%"})
							.to(data,2,{year:data_final.year,popu:data_final.popu,onUpdate:update_text,ease:Linear.easeNone});
			if (finish) {
				this.tl1.call(finish);
			}
		},
		onBack: function(finish){
			$("#scene3").remove();
			$("#scene2").remove();
			$("#scene1").show();
			finish();
		},
		onEnd: function (){
			this.tl1.progress(1);
			$("#scene2").hide();
		},
	})
});
