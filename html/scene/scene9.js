;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(9, anole.canvas, true);
    scene.name = 'scene9.js';

	scene.createDom = function() {
		this.marco = this.container.find('.marco-nomouth');
		this.money = $('<div></div>').addClass('money');
		this.money.appendTo(this.container);
	}	
	scene.animation = function() {
		var circle= this.container.find('.circle-ctn');
		this.tl.addLabel('begin')
			   .set(this.money, {scale:1.5})  //TODO: remove this and resize money svg.
			   .set(this.container.find('.marco-shadow'), {background:'transparent'})
			   .to([this.marco, circle], 2, {opacity:0, ease:Power2.easeOut}, 'begin')
			   .call(function() {circle.remove()})
			   .to(this.money, 2, {opacity:1, ease:Power2.easeIn}, 'begin-=1')
			   .to(this.money, 1.5, {height: '+=100', width: '+=100'});
	}
	scene.cleanup = function() { // Called before entering next scene.
	}
	anole.addScene(scene);
})
