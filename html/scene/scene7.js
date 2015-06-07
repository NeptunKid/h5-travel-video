;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(7, anole.canvas, true);
    scene.name = 'scene7.js';
	scene.createDom = function() {
	}
	
	scene.animation = function() {
      var pageCtn = this.container.find('.page-ctn');
	  pageCtn.remove(); // TODO: Use tween.
	  var comments = this.container.find('.comments');
	  var all = comments.find('.comment');
	  var test = new TimelineLite();
	  var pgroup = [];
	  var group = [];
	  for (i=4; i<all.length; i++) {
		group.push(all[i]);
	  }
	  
	  var p = comments;
	  while (!p.hasClass('scene')) {
		 var others = p.siblings();
		 if (others.length) {
			 group.push(others);
			 test.to(others, 1, {opacity:0}, '-=1');
		 }
		 pgroup.push(p);
		 p = p.parent();
	  }
	  this.tl.to(group, 1.5, {opacity: 0})
			 .to(pgroup, 1.5, {backgroundColor:'transparent', backgroundSize:'0%'}, '-=1.5');
		    // .to($('.ctn-browser'), 1, {scale:1.5, clearProps:'scale', delay:1});
	}
	anole.addScene(scene);
})
