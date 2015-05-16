;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
  var display_delta = 5;
  var display_ppm = function(){
   var hides = $("#part2 .paperman.hide");
   if (hides.length<1)
    return;
   var idx = parseInt(hides.length * Math.random());
   hides[idx].classList.toggle("hide");
   hides[idx].classList.toggle("open");
   setTimeout(display_ppm,display_delta);
  }
  var paperman_init = function(){
    var ppdiv = $("#papermans");
    if (ppdiv.find(".paperman").length>0)
      return;
    var h = ppdiv.height();
    var w = ppdiv.width();
    console.log(h);
    var ph = 45;
    var pw = 60;
    var n = h/ph;
    var m = w/pw;
    for (var i=0;i<=n;i++){
        var line = $("<div class = 'paperman-line l"+ (i%2)+ "'></div>");
        for (var j=0;j<=m;j++)
        {
            var elm = $("<div class = 'paperman greyman hide'></div>");
            if (i == parseInt(n/2)+1 && j==parseInt(m/2)+1)
              line.append("<div class = 'paperman marco'></div>");
            line.append(elm);
        }
        ppdiv.append(line[0]);
    }
    return n*m;
  }
  var papermans = function(delta,callback){
    display_ppm();
    if (callback)
    setTimeout(callback,delta);
  }
  anole.addScene({
    onInit: function (){
      this.scene = anole.getOrCreate("#part2",'<div id = "part2" class = "scene"></div>',{},anole.canvas);
      this.shade = anole.getOrCreate("#shade-part2",'<div id = "shade-part2" class = "shade-part2 color2"></div>',{opacity:0},this.scene);
      //this.marco = anole.getOrCreate("#marco-scene3","<div id = 'marco-scene3' class = 'marco center'></div>",{top:"55%"},this.scene);
      this.places = anole.getOrCreate('.places','<div class="places"></div>',{},this.scene);
    },
    onStart: function (finish){
      this.tl1 = new TimelineLite();
      this.tl1.add(TweenLite.to(this.shade, 0.5, {opacity:1, ease:Linear.easeNone, onComplete:function(){
        $("#part1")[0].className = "hidden";
        //this.marco.css("display","none");
        anole.getOrCreate("#papermans","<div id='papermans' class='papermans'></div>",{},this.scene);
        paperman_init();
        setTimeout(display_ppm,500);
      }.bind(this)}));
    },
    onEnd: function (){
    }
  })
});