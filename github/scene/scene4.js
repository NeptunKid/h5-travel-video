;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	
	var scene = new anole.Scene(4, anole.canvas, true);
	scene.createDom = function() {
		this.people_num = 70;
		this.marco = this.container.find(".marco.shadow");
    	this.gate = this.container.find(".gate");
    	this.ditch = this.container.find(".ditch");
    	this.surfboard = this.container.find(".surfboard.shadow");
    	this.text_marco = this.container.find(".text_marco");
		this.up = this.container.find(".up");
		this.down = this.container.find(".down");
		this.marco2 = this.container.find('.marco2.shadow').appendTo(this.down);
		this.year = this.container.find('.year').appendTo(this.up);
		this.popu = this.container.find('#scene4 .travel-popu').appendTo(this.up);
		this.travel_title = $('<div class="travel-title">| 中国入境旅游人数</div>').appendTo(this.up);
		this.marco_scream = $('<div class="marco2_scream center"></div>').appendTo(this.down);
		this.marco_eye = $('<div class="marco_eye center"></div>').appendTo(this.marco_scream);
		this.mouth_scream = $('<div class="marco_mouth_scream center"></div>').appendTo(this.marco_scream);
		this.papers_container = $('<div class="papers">'+
			creatPeople('<div class="paperpeople paperpeople1" style="left:0"></div>'+
				'<div class="paperpeople paperpeople2" style="left:0"></div>', this.people_num/2)+
			'</div>').appendTo(this.container);
		this.peoples = this.papers_container.find('.paperpeople');
		anole.canvas.removeClass('strips');
		anole.canvas.addClass('strips-3-4');
	}
	var data = {year:1271,popu:2.0};
	var data_final = {year:2014,popu:128498301};
	var convert = function(s){
		var l = s.length;
		var head = (l+2) % 3 +1;
		var res = s.substr(0,head);
		for (;head<l;head+=3){
			res += "," + s.substr(head,3);
		}
		return res;
	}
	var revertData = function() {
		data = {year:1271,popu:2.0};
	}
	var update_text = function(){
		$("#scene4 .year").text(parseInt(data.year));
		var popu = String(parseInt(parseInt(data.popu)));
		popu = convert(popu);
		$("#scene4 .travel-popu").text(popu);
	}
	var creatPeople = function(html, number) {
		var source ='';
		for (n=0;n<number;n++){source += html;}
		return source;
	}
	var calPeopleOriginPosition = function(index, total) {
		var position = {};
        var dotLeft = (anole.getSceneW())/2;
        var dotTop = (anole.getSceneH())/2;
        var stard = 0;
        var radius = 10*dotLeft;
        var avd = 360/total;
        var ahd = avd*Math.PI/180;
        position["top"] = Math.cos((ahd*index))*radius+dotTop;
		position["left"] = Math.sin((ahd*index))*radius+dotLeft;
		return position;
    }
	var calPaperPosition = function() {
		var position = {};
		var top = getNumberInNormalDistribution(45,20);
		var left = getNumberInNormalDistribution(47,20);
		if (top>45){
			if (left>41&&left<50) {
				top = 52 + Math.random()*10;
			} 
			position["z-index"] = top*3;
		} else {
			position["z-index"] = top;
		}
		position["top"] = String(top)+"%";
		position["left"] = String(left)+"%";
		position["z-index"] = parseInt(position["z-index"]);
		return position;
	}
	var getNumberInNormalDistribution = function(mean,std_dev){
		return mean+(randomNormalDistribution()*std_dev);
	}

    var randomNormalDistribution = function(){
	    var u=0.0, v=0.0, w=0.0, c=0.0;
	    do{
	        u=Math.random()*2-1.0;
	        v=Math.random()*2-1.0;
	        w=u*u+v*v;
	    }while(w==0.0||w>=1.0)
	    c=Math.sqrt((-2*Math.log(w))/w);
	    return u*c;
	}
	scene.animation = function() {
		this.tl.addLabel('horizontal')
			   .to($('.phone'), 0.5, {rotation:-90, scale:1.5, left:'50.9%', top:'49%'})
               .to($('.container'), 0.5, {width:771,height:512}, 'horizontal');
		this.tl.staggerTo([this.text_marco,this.gate,this.ditch,this.surfboard],0.4,{
			opacity:0,
			delay:0})
		.to(this.marco2,0.2,{
			rotation:0,
			y:-50,
			ease:Power4.easeIn,delay:0})
		.to(this.popu,1,{
			bottom:"40%",
			left:"30%",
		    ease:Power4.easeIn,delay:-0.2})
		.to(data,2,{
			year:data_final.year,
			popu:data_final.popu,
			onUpdate:update_text,
			onComplete:revertData,
			ease:Linear.easeNone,delay:-0.5})
		.to(this.year,0.3,{
			left:"35%",
			ease:Power4.easeIn,delay:-2.5})
		.to(this.travel_title,0.3,{
			display:"block",
		    ease:Power4.easeIn,delay:-2.5})
		.set(this.container,{"overflow":"visible"})
		.set(this.up,{display:"none",delay:0.5});

		for(i=0;i<this.people_num;i++) {
			this.tl = this.tl.fromTo(this.peoples[i],0.2,calPeopleOriginPosition(i,this.people_num),calPaperPosition(),"play+=3.5");
		};

		this.tl = this.tl.set(this.marco2,{display:"none"})
		.set(this.marco_scream,{display:"block"});
	}
	scene.cleanup = function() {
		this.container.find(".marco.shadow").remove();
    	this.container.find(".gate").remove();
    	this.container.find(".ditch").remove();
    	this.container.find(".surfboard.shadow").remove();
    	this.container.find(".text_marco").remove();
    }
    anole.addScene(scene);
});
