;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resourceUrl;

  var resource = {
	  "bridge": "venezia_bridge.png",
	  "bridge_shadow": "venezia_bridge_shadow.png",
	  "river": "river.png",
	  "gate": "desert_gate.png",
	  "gate_shadow": "desert_gate_shadow.png",
	  "ribbon01": "ribbon_01.png",
	  "ribbon02": "ribbon_02.png",
	  "ribbon03": "ribbon_03.png",
	  "ribbon04": "ribbon_04.png",
	  "ribbon05": "ribbon_05.png",
	  "boat": "boatwithoar.png",
	  "boat_shadow": "boatwithoar_shadow.png",
	  "oar": "oar.png",
    "camelwithshadowrevision": "camelwithshadowrevision.png",
    "camelslegwithshadow": "camelslegwithshadow.png",
	  "marco1": "marco1.png",
	  "marco1_shadow": "marco1_shadow.png",
	  "marco_nohat": "marco_1.0_nohat.png",
	  "hat": "marco1.0_hat.png",
	  "hat_shadow": "marco1.0_hat_shadow.png",
	  "ditch": "ditch.png",
	  "text_marcopolo": "text_marcopolo.png",
    "text_sichouzhilu": "text_sichouzhilu.png",
	  "marco2": "marco2.0.png",
	  "marco2_shadow": "marco2.0_shadow.png",
	  "surfboard": "surfboard.png",
	  "surfboard_shadow": "surfboard_shadow.png",
	  "paperpeople01": "paperpeople01.png",
	  "paperpeople02": "paperpeople02.png",
	  "marco2.0_noface": "marco2.0_noface.png",
	  "marco_eyes": "marco_eyes.png",
	  "marco_mouth_scream": "marco_mouth_scream.png",
	  "font":"SansGBW3_min.ttf",
	  "sub-block": "subway.png",
	  "sub-left-gate": "subwayl.png",
	  "sub-right-gate": "subwayr.png",
	  "tag": "tag.png",
	  "youtube-logo": "youtube-logo.png",
	  "profile": "profile.png",
	  "board_video": "board_video.png",
	  "worry1": "worry1.png",
	  "worry2": "worry2.png",
	  "worry3": "worry3.png",
	  "worry4": "worry4.png",
	  "chinese1": "friendlychinese1.png",
	  "chinese2": "friendlychinese2.png",
	  "chinese3": "friendlychinese3.png",
	  "bubble_disappear": "bubble_disappear.png",
	  "marco_nomouth": "marco_nomouth.png",
	  "mouth": "mouth.png",
	  "dollar": "dollar.png",
	  "dollar_big": "dollar_big.png",
	  "dollar_top": "dollar_top.png",
	  "dollar_mid": "dollar_mid.png",
	  "dollar_bottom": "dollar_bottom.png",
	  "dollar_outer": "dollar_outer.png",
	  "dollar_outer_big": "dollar_outer_big.png",
	  "shoppingbag1": "shoppingbag1.png",
	  "shoppingbag2": "shoppingbag2.png",
	  "satisfaction_happy": "satisfaction_happy.png",
	  "satisfaction_sad": "satisfaction_sad.png",
	  "canadian0":"canadian0.png",
	  "canadian1":"canadian1.png",
	  "canadian2":"canadian2.png",
	  "KoreanG":"KoreanG.png",
	  "KoreanR":"KoreanR.png",
	  "koreanLetter1":"korean_letter01.png",
	  "koreanLetter2":"korean_letter02.png",
	  "koreanLetter3":"korean_letter03.png",
	  "koreanLetter4":"korean_letter04.png",
	  "koreanLetter5":"korean_letter05.png",
	  "koreanLetter6":"korean_letter06.png",
	  "koreanLetter7":"korean_letter07.png",
	  "koreanLetter8":"korean_letter08.png",
	  "koreanLetter9":"korean_letter09.png",
	  "koreanLetter10":"korean_letter10.png",
	  "map":"map.png",
	  "mark1":"mark1.png",
	  "mark2":"mark2.png",
	  "mark3":"mark3.png",
	  "mark0":"mark0.png",
    "textset":"s14_textset.png",
	  "map_mark_pin":"map_mark_pin.png",
	  "map_mark_pin_shadow":"map_mark_pin_shadow.png",
	  "text_sichouzhilu":"text_sichouzhilu.png",
	  "text_lvyounian":"text_lvyounian.png",
	  "browsertab":"browstab.png",
	  "glogo":"googlelogowithshadow.png",
	  "searchbar":"searchbarwithshadow.png",
	  "progbar":"progressbar.png",
	  "nexus":"nexuswithshadow.png",
	  "tag_blue": "tag_blue.png",
	  "tag_red": "tag_red.png",
	  "tag_yellow": "tag_yellow.png",
	  "steak":"steak.png",
	  "churro":"churro.png",
	  "lung_tag":"lung_tag.png",
    "lung_text":"text_lung.png",
	  "plate":"plate.png",
	  "lung_m":"lung_m.png",
	  "lung_f":"lung_f.png",
	  "gsvg":"g.svg",
	  "thinkwithgoogle": "thinkwithgoogle.png",
	  //scene5
	  "youtube": "youtube.png",
	  "replaywithbuttonshadow": "replaywithbuttonshadow.png",
    "boardinfowithshadow": "boardinfowithshadow.png",
	  "profileimagewithshadow": "profileimagewithshadow.png",
	  "replaywithbutton": "replaywithbutton.png",
    "boardinfo_button4": "boardinfo_button4.png",
	  //scene6
    "videolist_image1_focus": "videolist_image1_focus.png",
    "videolist_image2_focus": "videolist_image2_focus.png",
    "videolist_image3_focus": "videolist_image3_focus.png",
    "videolist_image4_focus": "videolist_image4_focus.png",
    "videolist_image5_focus": "videolist_image5_focus.png",
    "searchbar1": "searchbar1.png",
    "search_1googlelogo": "search_1googlelogo.png",
    "search_2restaurant": "search_2restaurant.png",
    "search_3hotel": "search_3hotel.png",
    "search_4attractions": "search_4attractions.png",
    "search_5airplane": "search_5airplane.png",
    "search_6airplane_green": "search_6airplane_green.png",
    "scale_magnifier": "scale_magnifier.png",
    "scale_wafer+": "scale_wafer+.png",
    "wafer": "wafer.png",
    "wafer+": "wafer+.png",
    "waferx": "waferx.png",

    //scene x
	  "text":"text_pay.png",
	  "star0":"star0.png",
	  "star1":"star1.png",
	  'pie_blackloop':'pie_blackloop.png',
	  'pie':'pie.png',
	  'pie_focus':'pie_focus.png',
	  'pie_pin':'pie_pin.png',
	  'map':'map.png',
	  'android':'android.png',
	  'phone':'phone.png',
	  'toilet': 'toilet.png',
	  /* Videos */
	  "french":"french.video",
	  "food":"food.video",
	  "toilet":"toilet.video",
      "text_bailian":"text_bailian.png"
  }

  //videolist images in scene 5 and 6
  $(function(){
    var videolistFileNamePrefix = "videolist_image";
    var videolistFileNameShadowSuffix = "withshadow";
    var videolistFocusFileName = "_focus";
    var videolistShadowFileName = "_shadow";
    for(var i = 1; i < 6; i++) {
      resource[videolistFileNamePrefix + i] = videolistFileNamePrefix + i + ".png";
      resource[videolistFileNamePrefix + i + videolistFileNameShadowSuffix] = videolistFileNamePrefix + i + videolistFileNameShadowSuffix + ".png";
      resource[videolistFileNamePrefix + i + videolistFocusFileName] = videolistFileNamePrefix + i + videolistFocusFileName + ".png";
      resource[videolistFileNamePrefix + i + videolistShadowFileName] = videolistFileNamePrefix + i + videolistShadowFileName + ".png";
    }
  });

  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: ["vo1","bridge","bridge_shadow","boat","boat_shadow","oar","marco1","marco1_shadow","marco_nohat","hat","hat_shadow","gate","gate_shadow","ditch","ribbon01"] //depend resources.
      },
      /*{
        fileName:'scene2.js',
        res: ["text_marcopolo","gate","gate_shadow","boat","oar","marco1","marco1_shadow","marco_nohat","hat","hat_shadow","ditch","ribbon01"]
      },*/
      {
        fileName:'scene3.js',
        res: ["vo2","marco1","marco1_shadow","marco2","marco2_shadow","surfboard","surfboard_shadow","font","ribbon02"]
      },
      {
        fileName:'scene4.js',
        res: ["vo3","marco1","font","paperpeople01","paperpeople02","marco2.0_noface","marco_eyes","marco_mouth_scream","ribbon02"]
      },
      {
        fileName:'scene5.js',
        res: ["vo4","youtube", "replaywithbuttonshadow", "profileimagewithshadow",
        "videolist_image1withshadow", "videolist_image2withshadow", "videolist_image3withshadow", "videolist_image4withshadow", "videolist_image5withshadow",
        "boardinfowithshadow", "boardinfo_button4",
        "marco1","font","paperpeople01","paperpeople02","marco2.0_noface","marco_eyes","marco_mouth_scream"]
      },
      {
        fileName:'scene6.js',
        res: ["vo5","youtube", "replaywithbuttonshadow", "profileimagewithshadow",
        "videolist_image1withshadow", "videolist_image2withshadow", "videolist_image3withshadow", "videolist_image4withshadow", "videolist_image5withshadow",
        "boardinfowithshadow", "boardinfo_button4",
        "marco1","font","paperpeople01","paperpeople02","marco2.0_noface","marco_eyes","marco_mouth_scream",
        "videolist_image1_focus","videolist_image2_focus","videolist_image3_focus","videolist_image4_focus","videolist_image5_focus",
        "searchbar1","search_1googlelogo","search_2restaurant","search_3hotel","search_4attractions","search_5airplane","search_6airplane_green",
        "scale_magnifier","scale_wafer+","wafer","wafer+","waferx"
        ]
      },
      {
        fileName:'scene7.js',
          res: ["vo6","youtube", "replaywithbuttonshadow", "profileimagewithshadow",
        "videolist_image1withshadow", "videolist_image2withshadow", "videolist_image3withshadow", "videolist_image4withshadow", "videolist_image5withshadow",
        "boardinfowithshadow", "boardinfo_button4",
        "marco1","font","paperpeople01","paperpeople02","marco2.0_noface","marco_eyes","marco_mouth_scream",
          "worry1", "worry2", "worry3", "worry4", "star0", "star1"]
      },
      {
        fileName:'scene8.js',
          res: ["vo7","ribbon05", "bubble_disappear", "marco_nomouth", "mouth", "chinese1", "chinese2", "chinese3", "star0", "star1"]
      },
      {
        fileName:'scene9.js',
        res: ["vo8","dollar", "dollar_big", "dollar_top", "dollar_mid", "dollar_bottom", "dollar_outer", "dollar_outer_big", "satisfaction_happy", "satisfaction_sad"]
      },
      {
        fileName:'scene10.js',
        res: ["vo9","shoppingbag1", "shoppingbag2", "text", "canadian0"]
      },
      {
        fileName:'scene11.js',
          res: ["vo10","canadian0", "canadian1", "canadian2", "KoreanR", "KoreanG", "koreanLetter1", "koreanLetter2", "koreanLetter3", "koreanLetter4", "koreanLetter5", "koreanLetter6", "koreanLetter7", "koreanLetter8", "koreanLetter9", "koreanLetter10", "text_bailian"]
      },
      {
        fileName: 'scene12.js',
        res: ["vo11",'french']
      },
      {
        fileName:'scene13.js',
        res: ["vo12","gate","gate_shadow","boat","boat_shadow","marco2","marco2_shadow","camelwithshadowrevision","camelslegwithshadow","text_sichouzhilu"]
      },
      {
        fileName:'scene14.js',
        res: ["vo13","map","mark1","mark2","mark3","mark0","map_mark_pin","map_mark_pin_shadow","textset"]
      },
      {
        fileName:'scene15.js',
        res: ["vo14","map","marco2","text_sichouzhilu","text_lvyounian"]
      },
      {
        fileName:'scene16.js',
        res: ['vo15','pie_blackloop','pie','pie_focus','pie_pin','map']
      },
      {
        fileName:'scene17.js',
        res: ['vo16','android','phone']
      },
      {
        fileName:'scene18.js',
        res: ['vo17']
      },
      {
        fileName: 'scene19.js',
        res: ["vo18","food","tag_blue","tag_yellow","tag_red"]
      },
      {
        fileName:'scene20.js',
        res: ["vo19","churro","steak"]
      },
      {
        fileName:'scene21.js',
        res: ["vo20","lung_f","lung_m","lung_tag","plate","lung_text"]
      },
      {
        fileName: 'scene22.js',
        res: ['vo21','toilet','youtube-logo']
      },
      {
        fileName: 'scene23.js',
        res: ['vo22',"gsvg", "thinkwithgoogle"]
      },
    ]
    // baseUrl = 'http://gtravel.b0.upaiyun.com/scene/';
    baseUrl = '/scene/';
    // resourceUrl = "http://gtravel.b0.upaiyun.com/resource/";
    resourceUrl = "/resource/";
  //}

  $(function (){
	  // Push voiceover files to sceneQueue.
	  // This is a hacking method. 
	  // Should scenes be in different order than 1-n
	  // Change it or add the vo file explicitly.
	for (i=1; i<=sceneQueue.length; i++) {
		
		resource['vo'+i] = 'SoundMe/' + i + '.mp3';
		// (sceneQueue[i].res).push('vo'+i);
	}
	var config = {
      baseUrl:baseUrl,// root url
      resourceUrl: resourceUrl,// resource url like jpg/mp3
      resource: resource,//resource
      maxQueueLength: 18,//TODO load serval scenes at first time.
      sceneQueue: sceneQueue,//anime scene queue
      autoPlay: false,//auto play with no event
      flipType: 'click',//flip type eg:click, swipe, wheel
      containerTemplate: '<div class="container"><div class="canvas scene-wrapper"></div></div>',//scene root container, it will be appended to body.
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>',//next button dom
      startBtnTemplate: '<div class="start-btn btn J_StartBtn">start</div>', //start button dom
	  showLoading: function (){
        $(".mask").show();
        console.log("loading resource, show loading message.");
      },
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide loading message.")
      },
	  showFirstLoading: function() {
        $(".opening").show();
        console.log("loading first several scenes, show opening animation.");
	  },
      hideFirstLoading: function (){
        $(".opening").hide();
        console.log("First batch of scencs loaded, hide opening animations.")
      },
      showError: function (msg){ console.log(msg); }
    };

    if(anole.isMobile()) {
		config.flipType = 'swipe';
		config.autoPlay = false;
	}
	anole.config(config);
    anole.start();
    var window_w = document.body.clientWidth;
    var window_h = document.body.clientHeight;
	var container = anole.container;
    var canvas_w = container.width();
    var canvas_h = container.height();
	var loading = $('.mask');
	var opening = $('.opening');
	var phone = $('<div></div>').addClass('phone').appendTo('body');
	loading.appendTo(container);
	opening.appendTo(container);
	var container_w;
	var container_h;
	var ratio = 0.75;
	var scale = 1;
	if (anole.isMobile()) {
		container_w = window_w;
		container_h = window_w/ratio;
		scale = 1;
	} else {
		if (window_h / window_w < ratio) {
			container_h = window_h;
			container_w = ratio * window_h;
			scale = window_h / canvas_h + "";
		} else {
			container_w = window_w;
			container_h = window_w / ratio;
			scale = window_w / canvas_w + "";
		}
	}
	// if (scale >0.8 && scale < 1.1) {
		scale = 1;
	// }
    function getSupportedPropertyName() {
      var properties = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
      for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
          return properties[i];
        }
      }
      return null;
    }
    var transformProperty = getSupportedPropertyName();
	if (anole.isMobile()) {
		container.css(transformProperty,"translate3d(-50%, -50%,0) scale("+scale+")");
	} else {
		// container.css(transformProperty,"translate3d(-50%,"+((scale-1)*canvas_h/2)+"px,0)");
		// container.css(transformProperty,"translate3d(-50%,"+((scale-1)*canvas_h/2)+"px,0) scale("+scale+","+scale+")");
		container.css(transformProperty,"translate3d(-50%, -50%,0) scale("+scale+")");
	}
  })
});
