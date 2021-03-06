// Done:
// 1. the loadedScene index should be updated together with playScene when play scene-to-play.
// 2. fix the onStart without finish in timeline end issue.

// TODO:
// 1. for each scene: set a index for each scene to fix the multi-scene-load-order-can-be-wrong issue
// 2. for each scene: expose its timeline to make it easy to manage.

;define(['zepto', 'hammer', 'TimelineLite'], function (zepto, Hammer){
  var mediaList = {};

  var ua = navigator.userAgent;
  var device = {
    os: {
      isAndroid: ua.indexOf('Android') > 0,
      isIOS: /iP(ad|hone|od)/.test(ua)
    },
    browser: {
      QQ: ua.indexOf('MQQBrowser') > 0,
      UC: ua.indexOf('UCBrowser') > 0,
      MIUI: ua.indexOf('MiuiBrowser') > 0,
      WeiXin: ua.indexOf('MicroMessage') > 0,
      Chrome: !!window.chrome,
      Opera: /opera.([\d.]+)/i.test(ua),
      Safari: /version\/([\d.]+)/i.test(ua),
      FireFox: /firefox\/([\d.]+)/i.test(ua),
      IE: /msie ([\d.]+)/i.test(ua)
    }
  }


  var _videoListDiv = $('<div id="anoleVideo">');
  _videoListDiv.css({
    position:'absolute',
    left:-10000
  })
  $("body").append(_videoListDiv)
  var anole = window.anole = {
      _currentScene: -1,
      _loadFirstFinish: false,
      _sceneNameIndexMap: {}, // mapping from scene js name to its index in the scene queue to play.
      _playedScene:0,
      _nextSceneIndexToPlay:-1, // the scene should play once loaded (added onto anole scene)
      _config:{},
      _loadedSceneScript: 0,
      _scene:{}, // mapping from scene index to scene. If none, then the scene is not added onto the stage.
      canvas: null,
	  sceneH: 512,
	  sceneW: 768,
	  canvasH: 768,
	  canvasW: 1024,
      _resourceLoaded: {},
	  _videoList:_videoListDiv,
      _init: function (){
        this.removeCanvas();
       
		var $container = $(this._config.containerTemplate);
        $('body').append($container);
        var _container = this.container = $container;
		var _canvas = this.canvas = this.container.find('.canvas');

        var playPrev = this.throttle(this.playPrev.bind(this), 1000);
        var playNext = this.throttle(this.playNext.bind(this), 1000);
        var startAnime = this.throttle(this.startAnime.bind(this), 1000);
	    var muteBtn =  this._config.muteBtnTemplate ||
		    '<div class="mute-btn btn J_MuteBtn" value="MuteMusic">mute</div>';
		this.muteBtn = $(muteBtn);
		this.muteBtn.on('click', this.toggleMuteAll.bind(this));
		this.muteBtn.appendTo($('body'));
        var startBtn = this._startBtn =  $(this._config.startBtnTemplate);
        _container.append(startBtn);

		startBtn.on('click', startAnime);

		var autoBtn = this._autoBtn = $('<div class="btn auto-btn">Auto Play</div>').appendTo('body');
		autoBtn.on('click', function(){
			this._config.flipType = 'auto';
			this._config.autoPlay = true;
			this.startAnime();
			if (this._prevBtn) {
				this._prevBtn.hide();
			}
			if (this._nextBtn) {
				this._nextBtn.hide();
			}
		}.bind(this));

        if(this._config.flipType == 'click'){
          var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
          var nextBtn = this._nextBtn =  $(this._config.nextBtnTemplate);
          $('body').append(prevBtn).append(nextBtn);
          // Disable prev & next before playing. 
		  prevBtn.addClass('disabled');
		  nextBtn.addClass('disabled');
		  prevBtn.on('click', playPrev);
          nextBtn.on('click', playNext);
        }else if(this._config.flipType == 'swipe'){
          var hammer = new Hammer(_container[0]);
          hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
          hammer.on('swipe', function(ev) {
              var d = ev.offsetDirection;
              if(d == 2 || d == 8){
                playPrev();
              }else{
                playNext();
              }
          }.bind(this));
        }else if(this._config.flipType == 'wheel'){
          $(document).bind('mousewheel DOMMouseScroll', function(event) {
            event.preventDefault();
            var delta;
            var type = event.type;
            delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            if(delta < 0){
              playNext();
            }else{
              playPrev();
            }
          }.bind(this))
        }
		// if maxQueueLength = i, we will have scene[1...i] at one time
		//
        if(this._config.maxQueueLength > this._config.sceneQueue.length){
          this._config.maxQueueLength = this._config.sceneQueue.length
        }

        // Call showLoading at the beginning of loading.
		this.showFirstLoading();
		this._loadScene(0);
      },
	  getBaseUrl: function() {
		return this._config.baseUrl;
	  },
	  getResourceUrl: function() {
		return this._config.resourceUrl;
	  },
	  removeCanvas: function() {
		  this.canvas && this.canvas.remove();
	  },
	  clearCanvas: function() {
		  this.canvas && this.canvas.empty();
	  },
	  removeSceneDoms: function() {
		  $('.scene').remove();
	  },
      setSceneW: function(width) {
		if ( width != undefined && width >= 0)  {
			this.sceneW = width;
		}
	  },
	  setSceneH: function(height) {
		if ( height != undefined && height >= 0)  {
			this.sceneH = height;
		}
	  },
      setCanvasW: function(width) {
		if ( width != undefined && width >= 0)  {
			this.canvasW = width;
		}
	  },
	  setCanvasH: function(height) {
		if ( height != undefined && height >= 0)  {
			this.canvasH = height;
		}
	 },
	  getSceneW: function() {
		return this.sceneW;
	  },
	  getSceneH: function() {
		return this.sceneH;
	  },
	  getCanvasW: function() {
		return this.canvasW;
	  },
	  getCanvasH: function() {
		return this.canvasH;
	  },
      showFirstLoading: function (){/* abstract */}, // Triggered when waiting for the first several scenes to be ready.
      hideFirstLoading: function (){/* abstract */},// Triggered when the animation is ready to play.
      showLoading: function (){/* abstract */}, // it will be triggered when loading the resource of current scene
      hideLoading: function (){/* abstract */},// it will be triggered when resource loaded finished
      showError: function (){/* abstract */}, // it will be triggered when resource error
      fc: function (){},
      config: function (config){
        $.each(config, function (k,v){
          if($.isFunction(v)){
            this[k]=v;
          }else{
            this._config[k]=v;
          }
        }.bind(this));
      },
	  // Script is load when all resources on this scene is being loaded. (async)
      // TODO : Don't load the same script twice.
      getScript: function(src, sceneIndex, callback) {
        var script = document.createElement('script');
        script.async = "async";
        script.src = src;
        script.onload = function() {
          var thisSrc = src;

          //for debug
          if (callback) {
            callback();
            return;
          }

          console.log("GetScript onload. sceneIndex: " + sceneIndex + ". src: " + thisSrc);
          this._loadedSceneScript++;
          if (typeof this._config.maxQueueLength == 'undefined' || this._config.maxQueueLength == 0) {
            this.hideFirstLoading();
          } else {
            if (this._loadedSceneScript <= this._currentScene + this._config.maxQueueLength) {
              this._loadScene(this._loadedSceneScript);
            } else {
              this._loadFirstFinish = true;
              this.hideFirstLoading();
            }
          }

        }.bind(this);
        //Load scripts to the bottom of body.
        document.body.appendChild(script);
      },
      // attach b's key-value pairs to a as properties.
      mix: function (a,b){
        $.each(b, function (k,v){
          a[k]=v;
        })
      },
	  // Returns a jQuery object instead of a dom node.
      getOrCreate: function (query, tag, parent, style){
        var target;

        target = $(query);
        if(!target[0]){
          if($.isFunction(tag)){
            target = tag();
            if(!$.isObject(target)){
              target = $(target);
            }
          }else{
            target = $(tag);
          }
          if(parent){
            $(parent).append(target);
          }
        }
        if (style) {
          target.css(style);
        }
        return target;
      },
      start: function (){
        this._init();
      },
      addScene: function (scene){
        var addedSceneIndex = this._sceneNameIndexMap[scene.name];
        console.log("addScene: name: " + scene.name + " index: " + addedSceneIndex +
                    " Next scene to play: " + this._nextSceneIndexToPlay);
		this._scene[addedSceneIndex] = scene;

        if (this._nextSceneIndexToPlay == addedSceneIndex) {
          console.log("addScene: play nextSceneToPlay: " + addedSceneIndex);
          // be sure to put this before playscene, as playscene might playnext inside
          this._nextSceneIndexToPlay = -1;
		  this.hideLoading();
		  console.log("addScene => playScene todo" + (this._currentScene+1));
          // do {
		  //  this.triggerForward(this._currentScene++);
		  //  } while (this._currentScene!=addedSceneIndex);
		  // this.playScene(addedSceneIndex);
          this.playNext();
		  return;
        }
      },
      startAnime: function (){
		this._startBtn && this._startBtn.hide();
	    this._autoBtn && this._autoBtn.hide();
		// Never call playScene directly.
		// Because that scene may not be added yet!
		// this.playScene(0);
		this.playNext();
      },
      _loadScene: function (sceneIndex){
        console.log("loadScene, index: " + sceneIndex +
					" sceneQueueLength: " + this._config.sceneQueue.length);
        if(sceneIndex > this._config.sceneQueue.length -1) {
          return;
        }

        var nextScene = this._config.sceneQueue[sceneIndex];
        var fileName = nextScene.fileName;
        var res = nextScene.res || [];

        if(typeof this._sceneNameIndexMap[fileName] != 'undefined'){
          return;
        }

        this._sceneNameIndexMap[fileName] = sceneIndex;

        if(this._currentScene == sceneIndex){
          // Call showLoading at the beginning of loading.
		  this.showLoading();
        }

        //TODO load resource and scene at the same time;
        this._loadResource(res, function (){
          var url = this._config.baseUrl+fileName;
          this.getScript(url, sceneIndex);
        }.bind(this));
      },
      _loadResource: function (res, callback){

        if(!res.length){
          // console.log("loadResource: run callback when res.length is 0");
          callback && callback();
          return;
        }

        function loadNext(){
          this._loadOneResource(res.pop(), function (){
          if(!res.length){
              callback && callback();
            }else{
              loadNext.bind(this)();
            }
          }.bind(this))
        };

        loadNext.bind(this)();
      },
      _loadOneResource: function (res, callback){

        console.log('_loadOneResource: ' + res);
        if(this._resourceLoaded[res]){
          callback && callback();
          return;
        }
          var src = this._config.resourceUrl + this._config.resource[res];
          var error = function (){
          this.showError("Error loading "+src);
          callback && callback(); // Load the next, WHATAVER!
        }
        // TODO: add loading handler for font files.
        if (/\.mp3|\.wav|\.ogg|\.music$/.test(src)) {
          src = this.transfer2Media(src);

          var media = new Audio(src);
          media.src = src;
          media.controls = false;
          media.preload = true;
          media.load();
          this._resourceLoaded[res] = true;
          $(media).on("canplay",
          function(e) {
            mediaList[res] = media;
            callback && callback();
            $(this).unbind();
          }).on("error",
          function() {
            $(this).unbind();
            callback && callback();
          })
        }else if (/\.video$/.test(src)){
          var file = this._config.resource[res];
          if(this._videoList.find("#"+res)[0]){
            return ;
          }
          var arr =[".mp4",".webm"];
          var mp4Src = src.replace(".video",".mp4");
          var webmSrc = src.replace(".video",".webm");
          var html = '<video preload="load" webkit-playsinline="" id="'+ res +'" width="800" height="374">'+
                       '<source src="'+mp4Src+'" type="video/mp4" />'+
                       '<source src="'+webmSrc+'" type="video/webm" />'+
                     '</video>';
          var $html = $(html);
          this._videoList.append($html);
          callback && callback();
        }else {
          var obj;
          obj = document.createElement("img");
          obj.src = src;

          var load = function() {
            this._resourceLoaded[res] = true;
            callback && callback();
            $(obj).off("load", load);
            $(obj).off("error", error);
          };
          $(obj).on("load", load.bind(this));
          $(obj).on("error", error.bind(this));
        }
      },
      isMobile: function() {
        if (/(iPhone|iPod|Android|ios|SymbianOS)/i.test(navigator.userAgent)){
          return true;
        }else{
          return false
        }
      },
      playPrev: function (){
          console.log("playPrev: " + this._currentScene);
		  if(!this._currentScene){
			  return;
		  }
		  this.triggerBack(this._currentScene)
	  },
      playNext: function () {
		  console.log("---- PLAY NEXT, index: " + this._currentScene + ". Now play next");
          if(!this._scene[this._currentScene + 1]) { // If next scene is not ready yet.
              this._nextSceneIndexToPlay = this._currentScene+1;
              console.log("playNext failed: scene is not added yet: " + (this._currentScene+1) +
                          ". nextSceneIndexToPlay: " + this._nextSceneIndexToPlay);
              this.showLoading();
			  return;
          } else {
              console.log("playNext: scene is ready: " + (this._currentScene+1));
          }

        if(this._currentScene >= this._playedScene){ // Already played.
          this._playedScene = this._currentScene + 1;
        }
        this.triggerForward(this._currentScene);
		console.log("PlayNext => playScene" + (this._currentScene+1));
		++this._currentScene;
        this.playScene(this._currentScene);
      },
	  // This shouldn't be done on anole level but
	  // We need to save time and
	  // will refactor the first 6 scene's code later on.
	  /*hackBackForward: function(scene) {
		if (scene.music || scene.musicName) {
			scene.music = this.getMedia(scene.musicName);
			scene.music.pause();
			scene.music.currentTime = 0;
		}
	  },*/
      triggerBack:function (index){
		if (index == 0) return;
        var scene = this._scene[index];
		/*if (!this.animation) {
			this.hackBackForward(scene);
		}*/
        scene.onBack && scene.onBack(function (){
			this.playScene(--this._currentScene);
		}.bind(this));
      },
      triggerForward: function (index){
        if ( index < 0 || index >= this._config.sceneQueue.length - 1) return;
		var scene = this._scene[index];
		/*if (!this.animation) {
			this.hackBackForward(scene);
		}*/
        scene.onEnd && scene.onEnd(); // TODO: change all onEnd to onForward
        scene.onForward && scene.onForward();
      },
      playScene: function (index){
		this._currentScene = index;
        console.log("---- PlayScene: " + index);
        var scene = this._scene[index];
        if (!scene) return;

        if (index == 0) {// the first scene.
			this._prevBtn && this._prevBtn.addClass('disabled');
		} else {
			this._prevBtn && this._prevBtn.removeClass('disabled');
		}

        if (index == this._config.sceneQueue.length - 1) {// the last scene.
			this._nextBtn && this._nextBtn.addClass('disabled');
		} else {
			this._nextBtn && this._nextBtn.removeClass('disabled');
		}
		scene.onInit && scene.onInit();//init scene
        if(this._config.autoPlay){     //autoplay
          scene.onStart && scene.onStart(function (){
            // auto play next scene if config.autoPlay is true
            console.log("Autoplay scene.onStart");
			if (index < this._config.sceneQueue.length - 1) {// not the last scene.
				this.playNext();
			}
		  }.bind(this));
        }else{
          scene.onStart && scene.onStart(function (){});
        }

        if(this._loadFirstFinish){
          this._loadScene(index + this._config.maxQueueLength);
        }else{
          this._loadScene(index + 1);//load next scene when playing current scene
        }
      },
      isMuted: false,
      getMedia: function (res){
        var media = mediaList[res];
        if(media){
          return media
        }
      },
      getVideo: function(res){
        var video = this._videoList.find("#" + res);
        return video[0];
      },
	  putbackVideo: function(res, video) {
		if(this._videoList.find("#"+res)[0]){
		  return ;
		}
		this._videoList.append(video);
	  },
	  // mute all media.
	  muteAll: function(){
		this.isMuted = true;
		var currentMusic = this._scene[this._currenScene].music;
		currentMusic && (currentMusic.muted = true);
	  },
	  // Toggle all media that has been loaded.
	  toggleMuteAll: function(){
		this.toggleAudioMusic(this._scene[this._currentScene].music);
	  },
      playMedia: function (media){
        if(this.isMuted){
          media.muted = true;
        }
        media.play();
      },
      // toggle all music state base on one media.
	  toggleAudioMusic: function (media){
        if (!media) {
			this.isMuted = !this.isMuted;
		} else {
			if(media.muted){
				media.muted = this.isMuted = false;
			} else {
				media.muted = this.isMuted = true;
			}
		}
	  },
      throttle: function(action, delay){
        var last = 0;
        return function(){
          var curr = +new Date();
          if (curr - last > delay){
            action.apply(this, arguments);
            last = curr;
          }
        };
      },
      transfer2Media: function (name){
        if(/\.music$/.test(name)){
          var db = device.browser;
          var type;
          if(db.Chrome || db.IE || db.Safari){
            type = ".mp3";
          }else{
            type = ".wav";
          }
          return name.replace(".music", type)
        }else{
          return name;
        }
      }
    };

    // Define base class Scene
    function Scene(id, canvas, inherit) {
      this.id = id;
      this.name = 'scene' + id + '.js';
	  this.musicName = 'vo' + id; // default voiceover file name.
      /*hack*/
	  if (id>2) {
		  this.musicName = 'vo' + (id-1);
	  }
	  this.canvas = canvas;
      this.inherit = inherit;
      this.element;
	  this.container;
	  this.fadeOut = false; // Default: not fadeOut
      // List of dom elements that will be reused by other scenes afterwards.
      // Note it's DOM not jQ Objects.
      // this.export = [];

	  // All animations are trained by this main timeline.
      this.tl = new TimelineLite({paused:true});
      // Music file is registered as a resource.
	  this.music = anole.getMedia(this.musicName);
      this.animation = function (){/* abstract */}; // must be implemented by instances.
	}
    // Methods list.
    //
    // Public:
    Scene.prototype.onInit = function() {
      // Must initialize the container everytime when entering the scene.
	  // TODO: reuse scene content.
	  this.element = $("<div id='scene" + this.id + "' class='scene'></div>");
	  this.container = $("<div class='scene-content'></div>");
	  // Empty current scene div.
      var old = this.canvas.find('#scene' + this.id);
      if (old) {
        old.remove();
        // TODO: Re-use already-rendered dom and timeline.
        // Like this:
        // this.tl = old.data('timeline');
        // this.tl.replay();
      }
      console.log(this.id);
      // When inherit is set to true,
      // Current scene is initialed based on last scene.
      // Copy previous scene's dom to current scene if it's present.
      if (this.inherit) {
        var prev = this.canvas.find('#scene' + (this.id-1));
        if (prev) {
			var prev_content =  prev.find('.scene-content');
			if (prev_content && prev_content[0]) {
				this.container = prev_content.clone();
				this.container.appendTo(this.element);
			} else {
				prev.children().clone().appendTo(this.container);
				// this.container.appendTo(this.element);
				this.container.appendTo(this.element);
			}
			prev.hide();
		} else {
			console.log("Warning: scene" + (id-1) + "deleted unexpetedly.");
		}
      } else {
		  this.container.appendTo(this.element);
	  }
      this.element.show(); // container could be hidden if coming from next scene.
      if (this.canvas) { // If parent dom is provided, append content html to it.
		  this.createDom();
	      this.canvas.append(this.element);
	  }
    };

	// There must be a callback to indicate the finishing of the scene.
	Scene.prototype.onStart = function(callback) {
		// Do animations here.
		anole.playMedia(this.music);
		this.animation(); // Add animations to this.tl;
		
		var voDelay = 500;
		this.tl.call(function() {
			if (this.music && (!this.music.ended)) {
				$(this.music).on('ended', function(){
					setTimeout(callback, voDelay); 
				});
			} else {
				callback();
			}
		}.bind(this));
		this.tl.play();
	};
	// When button NEXT clicked/swipe down/scroll down.
	Scene.prototype.onForward = function() {
		if (this.music) {
			this.music.pause();
			this.music.currentTime = 0;
		}
		this.tl && this.tl.progress(1);
		var fadeOutTime = 0.5;
	    if (this.fadeOut) {
			var tl = new TimelineLite();
			tl.to(this.element, fadeOutTime, {opacity:0})
			  .set(this.element, {display: 'none'});
		} else {
			this.element && this.element.hide();
		}
		this.cleanup && this.cleanup();
	};
	// When button PREV clicked/swipe up/scroll up.
	Scene.prototype.onBack = function(callback) {
		if (this.music) {
			this.music.pause();
			this.music.currentTime = 0;
		}
		// this.tl.progress(0);
		this.cleanup && this.cleanup();
		this.element && this.element.remove();
		callback && callback();
	};
	// When existing current scene.
	Scene.prototype.onEnd = function() {
		//this.element.remove();
	};

    anole.$$ = anole.getOrCreate;
    anole.Scene = Scene;
    return anole;
});
