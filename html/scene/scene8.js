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
	    this.tl.addLabel('float')
		       .to(this.commentList[0], 1, {left: "-=220", top:'-=30', scale:1.2}, 'float')
		       .to(this.commentList[1], 1, {left: "+=170", top:'-=12', scale:1.2}, 'float')
		       .to(this.commentList[2], 1, {left: "-=170", top:'+=12', scale:1.2}, 'float')
		       .to(this.commentList[3], 1, {left: "+=200", top:'+=30', scale:1.2}, 'float')
	           .from(this.marco, 1.5, {right:-10, ease:Power3.easeIn}, 'float+=0.5')
		       .staggerTo(this.container.find('.chinese'), 1, {opacity:1}, 0.35)
			   .addLabel('dissolve', '-=0.5')
			   .staggerTo(this.commentList.find('.comment-content'), 0.5, {scale:0}, 0.35, 'dissolve')
			   .staggerTo(this.bubbles, 0.1, {opacity:0, ease: Power4.eastIn}, 0.35, 'dissolve')
			   .staggerFromTo(this.disbubbles, 0.1, {opacity:0}, {opacity:1, ease: Power4.easeOut}, 0.35, 'dissolve')
			   .staggerFromTo(this.disbubbles, 0.5, {scale:1, opacity:1}, {scale:2, ease: Back.easeIn, opacity:0}, 0.35, 'dissolve+=0.1')
			   .to(this.marco.find('#mouth'), 1, {rotation: 180, ease: Elastic.easeIn}, 'dissolve+=0.1');
	}
	scene.cleanup = function() { // Called before entering next scene.
	}
	anole.addScene(scene);
})
