;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function (anole){
  var scene = new anole.Scene(5, anole.canvas, true);
  var resourceUrl = anole.getResourceUrl();
  scene.createDom = function() {
    /* right way to use the previous scene as a whole.*/
	this.container.children().wrapAll('<div class="prev-scene"></div>');
	this.prevScene = this.container.find(".prev-scene");

	this.container.css("overflow", "visible");
    this.youtube_logo = $("<div><img src=" + resourceUrl + "youtube.png></img></div>").addClass("youtube-logo").appendTo(this.container);
    this.browser = $("<div></div>").addClass("browser").appendTo(this.container);
    this.browser_l = $("<div></div>").addClass("browser-left").appendTo(this.browser);
    this.browser_r = $("<div></div>").addClass("browser-right").appendTo(this.browser);
    this.youtube = $("<div></div>").addClass("youtube").appendTo(this.browser_l);
    this.boardinfo = $("<div><img src=" + resourceUrl + "boardinfowithshadow.png></img></div>").addClass("boardinfo").appendTo(this.browser_l);
    this.comments = $("<div></div>").addClass("comments").appendTo(this.browser_l);
    for (var i = 0; i < 4; i++) {
      var profile = $("<div><img src=" + resourceUrl + "profileimagewithshadow.png></img></div>").addClass("comment c" + i);
      $("<div></div>").addClass("comment-dash").appendTo(profile);
      $("<div></div>").addClass("comment-dash").appendTo(profile);
      profile.appendTo(this.comments);
    }
    this.comments.find(".c3").hide();//hack for scene7
    for (var i = 1; i < 6; i++) {
      var video = $("<div><img src=" + resourceUrl + "videolist_image" + i + "withshadow.png></img></div>").addClass("video-list v" + (i - 1));
      $("<div></div>").addClass("video-dash").appendTo(video);
      $("<div></div>").addClass("video-dash").appendTo(video);
      $("<div></div>").addClass("video-dash").appendTo(video);
      video.appendTo(this.browser_r);
    }
    //this.youtube_fly = $("<div></div>").addClass("youtube-flyin").appendTo(this.container);
    this.prevScene.find(".marco2_scream").css("top", anole.getSceneH() * 0.4);
    this.prevScene.css("overflow", "hidden").appendTo(this.container);
    this.youtube_flyin = $("<div></div>").addClass("youtube-flyin").appendTo(this.prevScene);
    this.like = $("<div><img src=" + resourceUrl + "boardinfo_button4.png></img></div>").addClass("like").appendTo(this.browser_l);
    this.like_text = $("<div>+1</div>").addClass("like-text").appendTo(this.browser_l);
	// Put strips back.
	anole.canvas.removeClass('strips-3-4');
	anole.canvas.addClass('strips');
	// $('body').addClass('strips-3-4');
	// $('body').removeClass('strips');
  }
	scene.animation = function() {
		var duration = 0.05;
		this.tl.from(this.youtube_flyin, 0.5, {opacity:0})
		       .to(this.prevScene, 0.5, {scaleX: 0.41, scaleY: 0.32, y: -0.28 * anole.getSceneH(), x: -0.14 * anole.getSceneW()});  // let them happen one after another

			   this.tl.from(this.boardinfo, duration, {opacity: 0});
			   //iterate through profile and video
			   var profileCount = this.container.find(".comment").length;
			   var videoCount = this.container.find(".video-list").length;
			   //common variables
			   var profileDashHeight = anole.getSceneH() * 0.02;
			   var profileDashWidth = anole.getSceneW() * 0.32;
			   var videoDashHeight = anole.getSceneH() * 0.02;
			   var videoDashWidth = anole.getSceneW() * 0.1;

			   var profileDashMultiplier = [[1, 0.5], [1, 0.8], [1, 0.6], [1, 0.9]];
			   var videoDashMultiplier = [[1, 0.9, 0.5],
                               [1, 0.95, 0.6],
                               [1, 0.8, 0.4],
                               [1, 0.9, 0.3],
                               [1, 0.85, 0.2],
                               [1, 0.9, 0.8]];

	  for(var i = 0; i < profileCount; i++) {
		  var thisProfile = this.container.find(".comment.c" + i);
		  this.tl.from(thisProfile, duration, {opacity: 0});
		  var profileDash = this.container.find(".c" + i + " .comment-dash");
		  for(var j = 0; j < profileDash.length; j++) {
			  this.tl.set(profileDash[j], {top: (2 * j + 1) * profileDashHeight, width: profileDashWidth * profileDashMultiplier[i][j]})
			  .from(profileDash[j], duration, {scaleX:0, transformOrigin:"left"});
		  }
	  }
	  this.tl.addLabel("video");
	  for(var i = 0; i < videoCount; i++) {
		  var thisVideo = this.container.find(".video-list.v" + i);
		  this.tl.from(thisVideo, duration * (i + 1) * 3, {top: - anole.getSceneH() * (0.17 * i + 0.5)}, "video")
	         .to(thisVideo, duration, {rotation: 0}, '-=' + duration);
			 var videoDash = thisVideo.find(".v" + i + " .video-dash");
			 for(var j = 0; j < videoDash.length; j++) {
				 this.tl.set(videoDash[j], {top: (2 * j + 1) * videoDashHeight, width: videoDashWidth * videoDashMultiplier[i][j]}, "video")
				        .from(videoDash[j], duration, {scaleX:0, transformOrigin:"left"});
			 }
	  }
	  //like
	  this.tl.addLabel('like', '-='+duration*10)
	         .to(this.like, duration*10, {opacity: 1, ease: Power4.easeIn}, 'like')
			 .to(this.like, duration*20, {opacity: 0, scale: 2.5, y: - 0.1 * anole.getSceneH(), ease: Expo.easeOut});
			 // No +1 for now.
			 // this.tl.to(this.like_text, duration*10, {opacity: 1, ease: Power4.easeIn}, 'like')
			 //    .to(this.like_text, duration*20, {y: "-100%", opacity: 0, scale: 2.5, ease: Expo.easeOut});
	}
	scene.cleanup = function() {

  }
  anole.addScene(scene);
});
