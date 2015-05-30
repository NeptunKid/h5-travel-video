;require(['anole', 'zepto'], function (anole){
	var data = {year:1271,popu:123456789}
	var data_final = {year:2014,popu:128498301}
	var subway_text_create = function(){
		var ctn = $("<div></div>").addClass("subway-text-ctn");
		var year = $("<div></div>").addClass("subway-year").appendTo(ctn);
		var title = $("<div></div>").addClass("subway-title").text("中国出入境旅游统计").appendTo(ctn);
		var popu = $("<div></div>").addClass("subway-popu").appendTo(ctn);
		return ctn;
	}
	var update_text = function(){
		$(".subway-year").text(parseInt(data.year));
		$(".subway-popu").text(parseInt(data.popu));
	}
	anole.addScene({
		onInit: function (){
			this.scene = anole.$$("#scene3",'<div id = "scene3" class = "scene"></div>',anole.canvas);
			this.subway = anole.$$("#subway",'<div id = "subway" class = "subway"></div>',this.scene);
			this.subup = anole.$$("#subway-up","<div id='subway-up' class='subway-up'>",this.subway);
			this.subtext = anole.$$(".subway-text",subway_text_create,this.subup);
			this.subhead = anole.$$("#subway-head","<div id='subway-head' class='subway-head'>",this.subup);
			this.subdown = anole.$$("#subway-down","<div id='subway-down' class='subway-down'>",this.subway);
			this.subway_paperman = anole.$$("#subway-paperman","<div id = 'subway-paperman' class='subway-paperman'></div>",this.subdown);
			this.subway_paperman.html($("#papermans").html());
			this.sublblock = anole.$$("#subway-left-block","<div id = 'subway-left-block' class='left subway-block'></div>",this.subdown);
			this.subrblock = anole.$$("#subway-right-block","<div id = 'subway-right-block' class='right subway-block'></div>",this.subdown);
			this.sublgate = anole.$$("#subway-left","<div id = 'subway-left' class='subway-left'></div>",this.subdown);
			this.subrgate = anole.$$("#subway-right","<div id = 'subway-right' class='subway-right'></div>",this.subdown);
			data = {year:1271,popu:123456789};
			update_text();
		},
		onStart: function (finish){
			this.tl1 = new TimelineLite();
			this.tl1.to($("#subway-left"), 0.5, {x:"100%", ease:Linear.easeNone})
							.call(function(){$("#papermans").css("display","none");})
							.to($("#subway-right"), 0.5, {x:"-100%", ease:Linear.easeNone},"-=0.5")
							.to(this.subway,0.5,{delay:0.2,scaleX:"0.625",scaleY:"0.625",y:"18.75%"})
							.to(data,2,{year:data_final.year,popu:data_final.popu,onUpdate:update_text,ease:Linear.easeNone});
		},
		onBack: function(finish){
			$("#scene3").remove();
			$("#scene2").remove();
			$("#scene1").show();
			finish();
		},
		onEnd: function (){
			this.tl1.progress(1);
		},
	})
});