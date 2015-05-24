;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part3",'<div id = "part3" class = "scene"></div>',anole.canvas);
      this.ctn_browser = anole.getOrCreate("#ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.scene);
      this.browser = anole.getOrCreate("#browser",'<div id = "browser" class = "browser"></div>',this.browser_block);
      this.br_left = anole.getOrCreate("#browser-left",'<div id = "browser-left" class = "browser-left half"></div>',this.browser);
      this.br_right = anole.getOrCreate("#browser-right",'<div id = "browser-right" class = "browser-right half"></div>',this.browser);
      this.youtube = anole.getOrCreate("#youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
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
      this.tl1.add(TweenLite.to([this.br_left,this.br_right],1,{y:"-30%",ease:Linear.easeNone,delay: 0.5}));
    },
    onBack: function (finish){
      $("#part3").remove();
      finish();
    },
    onEnd: function (){
      console.log("scene3 onEnd");
      this.scene.css("display","none");
    }
  })
});
