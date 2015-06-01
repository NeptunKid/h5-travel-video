;require(['anole', 'zepto'], function(anole, Scene){
	// Define base class Scene
	function Scene(id, canvas, inherit) {
		this.id = id;
		this.name = 'scene'+id+'.js';
		this.canvas = canvas;
		this.inherit = inherit;
		this.container = $("<div id='scene-" + this.id + "' class='scene'></div>");
		// List of dom elements that will be reused by other scenes afterwards.
		// Note it's DOM not jQ Objects.
		this.export = [];
		// All animations are trained by this main timeline.
		this.tl = new TimelineLite({paused:true});
	}
	// Methods list.
	//
	// Public:
	Scene.prototype.onInit = function() {
		// Empty current scene div.
		var old = this.canvas.find('#scene-' + this.id);
		if (old) {
			old.remove();
			// TODO: Re-use already-rendered dom and timeline.
			// Like this:
			// this.tl = old.data('timeline');
			// this.tl.replay();
		}
		// When inherit is set to true,
		// Current scene is initialed based on last scene.
		// Copy previous scene's dom to current scene if it's present.
		if (this.inherit) {
			var prev = this.canvas.find('#scene-' + (this.id-1));
			if (prev) {
				this.container = prev.clone(); // Not cloning events (nor data, probably).
				this.container.show();
			} else {
			    console.log("Warning: scene" + (id-1) + "deleted unexpetedly."); 
			}
		}
		if (this.canvas) { // If parent dom is provided, append content html to it.
			var html = this.createDom();
		    if (html) {
		        this.canvas.append($(html));
		    } else {
			    this.canvas.append(this.container);
		    }
		}
	};

	Scene.prototype.onStart = function(callback) {
		// Do animations here.
		this.animation();
		this.tl.call(callback);
		this.tl.play();
	};
	// When button NEXT clicked/swipe down/scroll down. 
	Scene.prototype.onForward = function(callback) {
		console.log(this.tl.progress());
		this.tl.progress(1);
		this.container.hide();
		callback();
	};
	// When button PREV clicked/swipe up/scroll up. 
	Scene.prototype.onBack = function(callback) {
		console.log(this.tl.progress());
		// this.tl.progress(0);
		this.container.remove();
		callback();
	};
	// When existing current scene.
	Scene.prototype.onEnd = function() {
		console.log(this.tl.progress());
		this.container.remove();
	};

    
	var scene = new Scene(7, anole.canvas, false);
    scene.name = 'scene7.js';
	scene.createDom = function() {
	  var browser = $("<div class='browser browser-sm'></div>");
	  var tag = $("<div class='browser-tag'></div>").appendTo(browser);
	  // var bbody = $("<div class='bbody'></div>").appendTo(browser);
	  var youtube = $("<div class='youtube'></div>").appendTo(browser); 
	  var nav = $("<div class='youtube-nav'><img src='./resource/youtube-logo.png'></img></div>").appendTo(youtube);
	  var comments = $("<div class='comments-ctn'></div>").appendTo(youtube);
	  var cmList = $("<ul class='comments-list'></ul>").appendTo(comments);
	  for (var i=0; i<4; i++ ) {
		  var comment = $("<li class='comment-"+i+"'></li>")
		      .append($("<div class='profile-photo'></div>"))
			  .append($("<div class='comment-words'></div>"));
		  comment.appendTo(cmList);
	  }
	  var videoList = $("<ul class='video-list'></ul>").appendTo(youtube);
	  for (var i=0; i<5; i++) {
		  var snapshot = $("<div class='video-snapshot'><img src='./resource/v" + (i%3) + ".png'></img></div>");
		  var video = $("<li class='video video-"+i+"'></li>")
	  	      .append(snapshot)
			  .append($("<div class='video-desc'></div>"));
		  video.appendTo(videoList);
	  }
	  this.container.append(browser);
	}
	
	scene.animation = function() {
		this.tl.to(this.container, 0.3, {background: "red"});
	}
	anole.addScene(scene);
})
