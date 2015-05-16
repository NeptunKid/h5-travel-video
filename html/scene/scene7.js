;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part3",'<div id = "part3" class = "scene"></div>',{},anole.canvas);
      this.browser_block = anole.getOrCreate("#browser-block",'<div id = "browser-block" class = "browser-block anime"></div>',{},this.scene);
      this.browser = anole.getOrCreate("#browser",'<div id = "browser" class = "browser"></div>',{},this.browser_block);
      this.br_left = anole.getOrCreate("#browser-left",'<div id = "browser-left" class = "browser-left half"></div>',{},this.browser);
      this.br_right = anole.getOrCreate("#browser-right",'<div id = "browser-right" class = "browser-right half"></div>',{},this.browser);
      this.youtube = anole.getOrCreate("#youtube",'<div id = "youtube" class = "youtube anime"></div>',{},this.br_left);
      if (this.br_left.find(".comment").length == 0)
      {
        var comments = $('<div class = "comments"></div>');
        this.br_left.append(comments);
        for (var i=0;i<5;i++){
          comments.append($('<div class = "comment"></div>'));
        }
      }
      if (this.br_right.find(".video").length == 0)
      for (var i=0;i<5;i++){
        this.br_right.append($('<div class = "video"></div>'));
      }
      this.scene.css("display","block");
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      $("#part3 .video").each(function(idx,elm){
        if (idx>3)
          return;
        this.tl1.add(TweenLite.to(elm,0.5,{scaleX:1.5,scaleY:1.5,delay:0.4,x:"-10%",onComplete:function(){
          TweenLite.to(elm,0.5,{scaleX:1,scaleY:1,x:"0%"});
        }}))
      }.bind(this));
      this.tl1.add(TweenLite.to([this.br_left,this.br_right],1,{y:"-30%",ease:Linear.easeNone,delay: 0.5}));
    },
    onBack: function (finish){
      this.scene.css("display","none");
      finish();
    },
    onEnd: function (){
      console.log("scene3 onEnd");
      this.scene.css("display","none");
    }
  })
});
