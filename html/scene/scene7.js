;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(7, anole.canvas, true);
    scene.name = 'scene7.js';
	scene.createDom = function() {
		var pageCtn = this.container.find('.page-ctn');
		pageCtn.remove(); // TODO: Use tween.
			var shade = this.container.find('.shade');
		shade.remove();
	    this.comments = this.container.find('.comments');
		var heads = this.comments.find('.comment-head');
		this.bubbles = [];
		for (i=0; i<4; i++) {
			var bubble= $('<div></div>').addClass('worry-bubble').addClass('worry'+(i+1))
			    .css('opacity','0');
			bubble.insertBefore(heads[i]);
			this.bubbles.push(bubble);
		}
		this.texts = this.comments.find('.comment-content');
        this.newTexts = [];
		var words = ['饮食 61%',
			'厕所 51%',
		    '欺诈 35%',
			'人多 33%'];
	    for (i=0; i<4 ;i++) {
			var node = $('<div></div>').addClass('worry-text').text(words[i])
			            .css('opacity', '0');
			node.prependTo(this.texts[i]);
			this.newTexts.push(node);
		}
    }	
	scene.animation = function() {
	  var all = this.comments.find('.comment');
	  var pgroup = []; // Ancenster elements to be background removed. 
	  var group = []; // Elements to be set invisible
	  for (i=4; i<all.length; i++) {
		group.push(all[i]);
	  }
	  
	  var p = this.comments;
	  while (!p.hasClass('scene')) {
		 var others = p.siblings();
		 if (others.length) {
			 group.push(others);
		 }
		 pgroup.push(p);
		 p = p.parent();
	  }
	  
	  this.tl.set(pgroup, {backgroundSize: '0'})  // Cannot tween background-size :(.
		     .to(group, 1.5, {opacity: 0})
			 .to(pgroup, 1.5, {backgroundColor:'transparent'}, '-=1.5')
		     .to(this.container.find('.ctn-browser'), 1, {scale:0.68, top:'+=25'}, '-=1')
		     .to(this.comments.find('.comment-head'), 1, {opacity:0})
		     .to(this.comments.find('.comment-content'), 1, {left:120}, '-=1')
			 .to(this.texts.find('.dash'), 0.2, {scale:0, opacity:0}, '-=1')
		     .fromTo(this.bubbles, 1, {scale: 0, opacity: 0}, {scale:1, opacity:1, ease: Bounce.easeOut})
			 .to(this.newTexts, 1, {opacity:1, ease: Bounce.easeOut}, '-=0.5');
	}
	anole.addScene(scene);
})
