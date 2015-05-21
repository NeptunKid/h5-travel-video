;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part1",'<div id="part1" class="scene"></div>', anole.canvas);
      this.places = anole.getOrCreate('.places','<div class="places"></div>', this.scene);
      if (this.places.find(".building-ctn").length < 1){
		  var container = $('<div></div>').addClass('building-ctn');
		  var container2 = container.clone();
		  var up = $('<div></div>').addClass('up');
		  var down = $('<div></div>').addClass('down');
		  var bridge = $('<div class ="building"><img src="./resource/bridge.png"></div>').appendTo(up);
		  up.appendTo(container);
		  down.addClass('color1').appendTo(container);
		  container.appendTo(this.places);
	
		  var up2 = $('<div></div>').addClass('up');
		  var down2 = $('<div></div>').addClass('down');
		  var jiayu = $('<div class="building"><img src="./resource/gate.png"></div>').appendTo(up2);
		  var marco = $('<div class="marco center"></div><div class="boat center"></div>').appendTo(jiayu);
		  up2.appendTo(container2);  
		  down2.addClass('color2').appendTo(container2);
		  container2.appendTo(this.places);
		  // $("#part1 .down.color1").append($('<div class="marco center"></div><div class="boat center"></div>'));
	  }
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl1.add(TweenLite.to(this.places, 3, {top:"-100%", ease:Linear.easeNone,delay:1,onComplete:finish()}));
    },
    onEnd: function (){
      console.log(this.tl1.progress());
      this.tl1.progress(1);
    }
  })
});
