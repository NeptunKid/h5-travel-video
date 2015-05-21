;require(['anole'], function (anole){
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
    "replay": "replay.png"
  }
  
  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: ["bridge","gate","boat","oar","marco1"] //depend resources.
      },
      {
        fileName:'scene2.js',
        res: ["gate","boat","oar","marco1"] //depend resources.
      },
      {
        fileName:'scene3.js',
        res: ["gate","boat","oar","marco1","paperman"]
      },
      {
        fileName:'scene4.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate"]
      },
      {
        fileName:'scene5.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate"]
      },
      {
        fileName:'scene6.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay"]
      },
      {
        fileName:'scene7.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay"]
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
      flipType: 'click',// flip type eg:click, swipe
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
      showError: function (){ console.log("app error !!!! resource error!!!!") }
    })
    
    anole.start();
  })
});
