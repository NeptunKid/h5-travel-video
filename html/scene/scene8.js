;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(8, anole.canvas, true);
    scene.name = 'scene8.js';

	scene.createDom = function() {
		this.marco = $('<div></div>').addClass('marco-shadow')
    	              .append($('<div><img id="mouth" src="./resource/mouth.png"></img></div>').addClass('marco-nomouth'));
		this.pplCtn = $('<div></div>').addClass('ppl-ctn');
		this.marco.appendTo(this.container);
		this.pplCtn.appendTo(this.container);
		for (i=0; i<3; i++) {
			var chinese = $('<div></div>').addClass('chinese');
			chinese.appendTo(this.pplCtn);
		}
		this.commentList = this.container.find('.comment');
		this.disbubbles = [];
		this.bubbles = this.commentList.find('.worry-bubble');
		for (i=0; i<4; i++) {
			var disbubble = $('<div></div>').addClass('bubble-disappear').css('opacity', 0);
			disbubble.prependTo(this.commentList[i]);
			this.disbubbles.push(disbubble);
		}
	}	
	scene.animation = function() {
	    this.tl.staggerFrom([this.marco, this.pplCtn], 1.5, {right: -10}, 0)
			   .staggerTo(this.bubbles, 0.1, {opacity:0, ease: Power4.eastIn}, 0.35)
			   .staggerFromTo(this.disbubbles, 0.25, {opacity:1, scale:0.6},
							  {opacity:0, scale:2, ease: Back.easeIn}, 0.35, '-=1.05')
			   .to(this.marco.find('#mouth'), 0.8, {rotation: 180}, '-=1.5');
	}
	scene.cleanup = function() { // Called before entering next scene.
	}
	anole.addScene(scene);
})
