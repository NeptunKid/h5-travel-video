;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part1",'<div id = "part1" class = "scene"></div>',{},anole.canvas);
      this.places = anole.getOrCreate('.places','<div class="places"></div>',{},this.scene);
      if (this.places.find(".block-building").length <1){
        this.places.append($('<div class = "block-building"><div class = "up"><div class = "building"><img src="./resource/bridge.png"></div></div><div class = "down color1"></div></div>'));
        this.places.append($('<div class = "block-building"><div class = "up color1"><div class = "building"><img src="./resource/gate.png"></div></div><div class = "down color2"></div></div>'));
        $("#part1 .down.color1").append($('<div class="marco center"></div><div class = "boat center"></div>'));
      }
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl1.add(TweenLite.to(this.places, 0.5, {top:"-100%", ease:Linear.easeNone,delay:0.5,onComplete:finish()}));
    },
    onEnd: function (){
      console.log(this.tl1.progress());
      this.tl1.progress(1);
    }
  })
});