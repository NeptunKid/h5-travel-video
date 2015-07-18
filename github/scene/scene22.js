;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(22, anole.canvas, false);
	var TIME_DELTA = 0.25;
	var MOVE_LATENCY = 0.5;
	var VIDEO_LATENCY = 1;
	var SWITCH_LATENCY = 0.5;
    scene.name = 'scene22.js';	
	var background = $('<svg class="video-background" width="650" height="450"><polygon fill="grey" stroke="none" points="0,40 20,340 570,380 600,10"></polygon></path></svg>');
	
	scene.createDom = function() {
        this.toiletContainer = $("<div class='toilet-ctn'></div>").appendTo(this.container);
        this.toilet = $("<div></div>").addClass("toilet").appendTo(this.toiletContainer);
        this.flyContainer = $("<div class='fly-ctn'></div>").appendTo(this.container);
        this.fly = $("<div></div>").addClass("fly").appendTo(this.flyContainer);
        this.videoBG = background.appendTo(this.container);
        this.youtubeLogo = $('<div class="youtube-logo"></div>').appendTo(this.container);
        this.video = anole.getVideo('toilet');
        // $(this.video).hide().appendTo(this.container)
        $(this.video).appendTo(this.container);
		this.videoBG.css('opacity', 0);
		$(this.video).css('opacity', 0);
		this.youtubeLogo.css('opacity', 0);
		anole.canvas.addClass('strips-16-22');
	}
	
	scene.animation = function() {
        var centerX = this.container.offset().left;
        var centerY = this.container.offset().top - 200; // control the circle radius
        this.rotateCenter = centerX + "px " + centerY + "px";

        this.tl.fromTo([this.videoBG, this.youtubeLogo, this.video], VIDEO_LATENCY, {opacity:0}, {opacity:1})
		       /*.set(this.toiletContainer, {rotation: 0}, "rotate")
		       .to(this.toiletContainer, 0, {
				   rotation: "+=180",
				   transformOrigin: this.rotateCenter
			   })
			   .to(this.toilet, 0, {rotationY: 0})
			   .to(this.toiletContainer, TIME_DELTA * 2, {
				   rotation: "-=180",
				   transformOrigin: this.rotateCenter,
				   ease: Elastic.easeOut.config(1, 0.6)
			   }, "+=0.25")
			   // move to left bottom
			   .to(this.toilet, TIME_DELTA * 2, {
				   left: "-280",
				   top: "+=120",
				   scale: '0.8',
				   ease: Power2.easeInOut
			   }, "+=" + MOVE_LATENCY)
			   
			   .call(function() {
				   // move french div one level up to workaround the z-index issue.
				   this.toilet.appendTo(this.bg);
			   }.bind(this))
			   */
			   .call(function() {
				   this.tl.pause(); // You can only do this when no other animation are being played.
					   anole.playMedia(this.video);
				   $(this.video).on('ended', function() {
					   this.tl.resume();
				   }.bind(this))
			   }.bind(this))
			   //hide elements
			   //.to([this.videoBG, this.youtubeLogo, this.video, this.toilet], TIME_DELTA * 2, {opacity: 0, delay:1})
	}
	scene.cleanup = function() {
		if (this.video) {
			this.video.pause();
			this.video.currentTime = 0;
			anole.putbackVideo('toilet', this.video);
		}
	}
	anole.addScene(scene);
})
