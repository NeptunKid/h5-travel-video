;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){

   var scene = new anole.Scene(2, anole.canvas, true);
   scene.createDom = function() {  }
  scene.animation = function() {}
  scene.cleanup = function() {
  }
   anole.addScene(scene);
});
