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
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part2",'<div id = "part2" class = "scene"></div>',{},anole.canvas);
      this.marco = anole.getOrCreate("#marco-scene4","<div id='marco-scene4' class='marco center'></div>",{top:"55%"},this.scene);
      this.sublgate = $("#subway-left");
      this.subrgate = $("#subway-right");
      $(".paperman.marco").css("display","none");
      this.marco.css("display","block");
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl2 = new TimelineLite();
      this.tl1.add(TweenLite.to($("#subway-left"), 0.5, {x:"0%", ease:Linear.easeNone, onComplete:this.marco_go_out.bind(this)}));
      this.tl2.add(TweenLite.to($("#subway-right"), 0.5, {x:"0%", ease:Linear.easeNone}));
      this.tl1.add(TweenLite.to(this.marco,1,{delay:0.2,left:"30%",top:"65%",width:"120px",height:"180px",ease:Linear.easeNone,}));
    },
    onBack: function(finish){
    },
    onEnd: function (){
    },
    marco_go_out:function(){
      var duration = 1;
      var delay = 0.2;
      mcount = duration*1000/move_delta;
      setTimeout(marco_run,delay*1000);
    },
  })
});