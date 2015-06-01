;require(['zepto','TweenLite', 'CSSPlugin', 'TimelineLite'], function(){
	// Define base class Scene
	function Scene(id, canvas, inherit) {
		this.id = id;
		this.name = 'scene'+id+'.js';
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
		if (inherit) {
			var prev = this.canvas.find('#scene-' + (this.id-1));
			if (prev) {
				this.container = prev.clone(); // Not cloning events (nor data, probably).
					this.container.show();
			} else {
				if(inherit) console.log("Warning: scene" + (id-1) + "deleted unexpetedly."); 
			}
		}
		if (canvas) { // If parent dom is provided, append content html to it.
			var html = this.createDom();
		if (html) {
			canvas.append($(html));
		} else {
			canvas.append(this.container);
		}
		}
	};

	Scene.prototype.onStart = function(callback) {
		// Do animations here.
		this.animation();
		this.tl.play();
	};
	// When button NEXT clicked/swipe down/scroll down. 
	Scene.prototype.onForward = function(callback) {
		console.log(this.tl.progress());
		this.tl.progress(1);
		this.container.hide();
	};
	// When button PREV clicked/swipe up/scroll up. 
	Scene.prototype.onBack = function(callback) {
		console.log(this.tl.progress());
		// this.tl.progress(0);
		this.container.remove();
	};
	// When existing current scene.
	Scene.prototype.onEnd = function() {
		console.log(this.tl.progress());
		this.container.remove();
	};

	// Individual methods (can be made private).
	//
	// Unified entrance for dom creation.
	// Return a jQuery/Zepto object containing html.
	Scene.prototype.createDom = function() {
		// CreateDom elements, supposing that the canvas is freshly created and empty.

		// this.container.css('z-index', this.id*10); // Let css set the z-index layer.
		// Example:
		// 
		return this.container;
	}
});
