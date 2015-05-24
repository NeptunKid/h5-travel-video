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
      this.scene = anole.getOrCreate("#part2",'<div id = "part2" class = "scene"></div>',anole.canvas);
      this.marco = anole.getOrCreate("#marco-scene4","<div id='marco-scene4' class='marco center'></div>",this.scene,{top:"55%"});
      this.marco.css({top:"50%",left:"",width:"",height:""});
      this.sublgate = $("#subway-left");
      this.subrgate = $("#subway-right");
      TweenLite.to(this.sublgate,0,{x:"100%"});
      TweenLite.to(this.subrgate,0,{x:"-100%"});
      $(".paperman.marco").css("display","none");
      this.marco.css("display","block");
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl2 = new TimelineLite();
      this.tl1.add(TweenLite.to($("#subway-left"), 0.5, {x:"50%", ease:Linear.easeNone, onComplete:this.marco_go_out.bind(this)}));
      this.tl2.add(TweenLite.to($("#subway-right"), 0.5, {x:"-50%", ease:Linear.easeNone}));
      var new_w = 1080 * 0.36;
      var new_h = 1.5*new_w;
      console.log(new_w);
      console.log(new_h);
      this.tl1.add(TweenLite.to(this.marco,1,{delay:0.2,left:"18%",top:"62%",width:new_w,height:new_h,ease:Linear.easeNone,}));
    },
    onBack: function(finish){
      this.marco.remove();
      TweenLite.to($("#subway"),0,{scaleX:1,scaleY:1,y:"0%"});
      finish();
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