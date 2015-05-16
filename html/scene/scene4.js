;require(['anole', 'zepto'], function (anole){
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part2",'<div id = "part2" class = "scene"></div>',{},anole.canvas);
      this.subway = anole.getOrCreate("#subway",'<div id = "subway" class = "subway"></div>',{},this.scene);
      this.subup = anole.getOrCreate("#subway-up","<div id='subway-up' class='subway-up'>",{},this.subway);
      this.subhead = anole.getOrCreate("#subway-head","<div id='subway-head' class='subway-head'>",{},this.subup);
      this.subdown = anole.getOrCreate("#subway-down","<div id='subway-down' class='subway-down'>",{},this.subway);
      this.subway_paperman = anole.getOrCreate("#subway-paperman","<div id = 'subway-paperman' class='subway-paperman'></div>",{},this.subdown);
      this.subway_paperman.html($("#papermans").html());
      this.marco = anole.getOrCreate("#marco-scene4","<div id='marco-scene4' class='marco center'></div>",{top:"55%",display:"none"},this.subdown);
      this.sublblock = anole.getOrCreate("#subway-left-block","<div id = 'subway-left-block' class='left subway-block'></div>",{},this.subdown);
      this.subrblock = anole.getOrCreate("#subway-right-block","<div id = 'subway-right-block' class='right subway-block'></div>",{},this.subdown);
      this.sublgate = anole.getOrCreate("#subway-left","<div id = 'subway-left' class='subway-left'></div>",{},this.subdown);
      this.subrgate = anole.getOrCreate("#subway-right","<div id = 'subway-right' class='subway-right'></div>",{},this.subdown);
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl2 = new TimelineLite();
      this.tl1.add(TweenLite.to($("#subway-left"), 0.5, {x:"100%", ease:Linear.easeNone, onComplete:function(){
        $("#papermans").css("display","none");
      }}));
      this.tl2.add(TweenLite.to($("#subway-right"), 0.5, {x:"-100%", ease:Linear.easeNone}));
      this.tl1.add(TweenLite.to(this.subway,0.5,{delay:0.2,scaleX:"0.625",scaleY:"0.625",y:"18.75%"}));
    },
    onBack: function(finish){
    },
    onEnd: function (){
    },
  })
});