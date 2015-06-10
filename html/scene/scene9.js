;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(9, anole.canvas, false);
    scene.name = 'scene9.js';

	scene.createDom = function() {
	}	
	scene.animation = function() {
	}
	scene.cleanup = function() { // Called before entering next scene.
	}
	anole.addScene(scene);
})
