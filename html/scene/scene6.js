;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part3",'<div id = "part3" class = "scene"></div>',{},anole.canvas);
      this.browser_block = anole.getOrCreate("#browser-block",'<div id = "browser-block" class = "browser-block anime"></div>',{},this.scene);
      this.browser = anole.getOrCreate("#browser",'<div id = "browser" class = "browser"></div>',{},this.browser_block);
      this.br_left = anole.getOrCreate("#browser-left",'<div id = "browser-left" class = "browser-left half"></div>',{},this.browser);
      this.br_right = anole.getOrCreate("#browser-right",'<div id = "browser-right" class = "browser-right half"></div>',{},this.browser);
      this.youtube = anole.getOrCreate("#youtube",'<div id = "youtube" class = "youtube anime"></div>',{},this.br_left);
      var items = $("#part2").clone();
      this.youtube.html(items[0].innerHTML);
      this.shade = anole.getOrCreate("#shade-youtube",'<div id = "shade-youtube" class = "shade-youtube"><img src="./resource/replay.png"></div>',{opacity:0},this.youtube);
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
      $("#part2")[0].className = "scene hidden";
      this.tl1 = new TimelineLite();
      this.tl1.add(TweenLite.to(this.shade,0.5,{opacity:0.9, ease:Linear.easeNone}));
      this.tl1.add(TweenLite.to(this.browser_block,0.5,{delay:0.1,scaleX:0.25,scaleY:0.25,x:"-12.5%",y:"-12.5%",ease:Linear.easeNone}));
    },
    onBack: function (finish){
    },
    onEnd: function (){
    }
  })
});
