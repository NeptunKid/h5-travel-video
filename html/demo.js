;require(['anole','js/TweenLite.min'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resoureUrl;
  
  var resource = {
    "bridge": "bridge.png",
    "gate": "gate.png",
    "boat": "boat.png",
    "oar": "oar.png",
    "marco1": "marco1.png",
    "marco2": "marco2.png",
    "paperman": "paperman.png",
    "sub-block": "subway.png",
    "sub-left-gate": "subwayl.png",
    "sub-right-gate": "subwayr.png",
    "replay": "replay.png",
	"tag": "tag.png",
	"youtube-logo": "youtube-logo.png",
	"profile": "profile.png",
	"board_video": "board_video.png",
	"v0": "v0.png",
	"v1": "v1.png",
	"v2": "v2.png",
	"worry1": "worry1.png",
	"worry2": "worry2.png",
	"worry3": "worry3.png",
	"worry4": "worry4.png",
	"bubble_disappear": "bubble_disappear.png",
	"marco_nomouth": "marco_nomouth.png",
	"mouth": "mouth.png"
}
  
  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: ["bridge","gate","boat","oar","marco1"] //depend resources.
      },
      {
        fileName:'scene2.js',
        res: ["gate","boat","oar","marco1","paperman"]
      },
      {
        fileName:'scene3.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate"]
      },
      {
        fileName:'scene4.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate"]
      },
      {
        fileName:'scene5.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay"]
      },
      {
        fileName:'scene6.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay"]
      },
      {
        fileName:'scene7.js',
        res: ["profile","youtube-logo","tag","board_video","v0","v1","v2","worry1", "worry2", "worry3", "worry4"]
      },
      {
        fileName:'scene8.js',
        res: ["bubble_disappear", "marco_nomouth", "mouth"]
      },
    ]
    baseUrl = './scene/';
    resoureUrl = "./resource/";
  //}
  
  $(function (){
    anole.config({
      baseUrl:baseUrl,// root url 
      resoureUrl: resoureUrl,// resoure url like jpg/mp3
      resource: resource,// resource
      maxQueueLength: 4,// load serval scenes at same time
      sceneQueue: sceneQueue,// anime scene queue
      autoPlay: false,// auto play with no event
      flipType: 'click',// flip type eg:click, swipe, wheel
      containerTemplate: '<div class="container main"></div>',// scene root container, it will be appended to body.
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',// prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>',// next button dom
      showLoading: function (){ 
        $(".mask").show();
        console.log("loading resource, show loading message.");
      }, 
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide loading message.")
      },
      showError: function (msg){ console.log(msg); }
    })
    
    anole.start();
    var window_w = document.body.clientWidth;
    var scene_w = $(".container").width();
    var scene_h = $(".container").height();
    var scale = window_w / scene_w + "";
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
    $(".container").css(transformProperty,"translate3d(-50%,"+((scale-1)*scene_h/2)+"px,0) scale("+scale+","+scale+")");
  })
});
