;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var scene = new anole.Scene(16, anole.canvas, false);
	scene.createDom = function() {
		if (!this.main){
			this.container.find(".scene16").remove();
			this.scene = anole.$$('.scene16','<div class="scene16"></div>', this.container);
      var html = 
                  '<div class="map"></div>'+
                  '<div class="left-number">0%</div>'+
                  '<div class="number">75%</div>'+
                  '<div class="cir-div">'+
                   '<div class="bg-cir"></div>'+
                   '<div class="goo-cir"></div>'+
                   '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">'+ 
                    '<defs>'+
                    '<clipPath id="flood">'+
                      '<rect id="J_Flood_anime" width="800" height="600" style="fill:#000;stroke-width:1;stroke:rgb(0,0,0)" y="600">'+
                       // '<animate id="J_Flood_anime" attributeName="y" from="600" to="0" begin="0s" dur="3s" repeatCount="1" />'+
                      '</rect>'+
                    '</clipPath>'+
                    '</defs>'+
                   '</svg>'+
                   
                   '<div class="pie-pin"></div>' +
                   '<svg class="cir"  xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">'+ 
                    '<defs>'+
                    '<clipPath id="theSVGPath">'+
                      '<circle stroke="#000000" stroke-miterlimit="10" cx="400" cy="400" r="300" />'+
                    '</clipPath>'+
                    '</defs>'+
                   '</svg>'+
                 '</div>';
                 
      this.scene.html(html);
	  anole.canvas.addClass('strips-16-22');
	  anole.canvas.removeClass('strips-11-15');
		}
	}
	scene.animation = function() {

    var video = anole.getVideo("video");
    
    var that = this;
    var tl = new TimelineLite();
    //TODO 半圆动画
    tl
    .to('.map', 1, {width:144,height:104,left:370,top:222})
    .call(function(){
       $(".map").html('<div class="perc">2013</div>');
       $(".cir").show();
       $(".number").show();
     }.bind(this))
    .to('.cir', 0.3, {rotation:-15})
    .to('.cir', 0.3, {rotation:0})
    .call(function(){
      $(".goo-cir").show();
      $(".number").show().html("84%");
    })
    .to('.pie-pin', 0.3, {width:80,height:140,top:10,right:17,display:'block',})
	  .to('.pie-pin', 0.1, {width:45.5,height:87.5,top:53,right:53,})
    .to('.number', 0.4, {scale:2,delay:-0.4})
    .to('.number', 0.2, {scale:1,delay:-0.3})
    .call(function(){
      $(".perc").html('2014');
      $(".goo-cir").show();
    })
    .call(function(){
      setTimeout(function (){
        var left = $(".left-number");
        left.show();
        var start = 0
        var han = setInterval(function (){
         if(start++ <43){
           left.html(start + "%");
         }else{
           clearInterval(han);
         }
        },50)
      },1500)
    })
    .to('.goo-cir', 1.8, {top:0,"background-position":"0 0",delay:1.2})
	};
	scene.cleanup = function() {
    $(".number").remove();
    $(".left-number").remove();
	}
	anole.addScene(scene);
});
