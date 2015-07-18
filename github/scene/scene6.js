;require(['anole', 'zepto','TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function (anole){

  var scene = new anole.Scene(6, anole.canvas, true);
  var resourceUrl = anole.getResourceUrl();
  var sceneH = anole.getSceneH();
  var sceneW = anole.getSceneW();

  scene.createDom = function() {
    this.logo = this.container.find(".youtube-logo");
    this.browser_l = this.container.find(".browser-left");
    this.browser_r = this.container.find(".browser-right");
    this.xiaodianshi = this.container.find(".prev-scene");
    //cross
    this.wafer_box = $("<div class='wafer-box'></div>").appendTo(this.container);
    this.wafers = [];
    for(var i = 4; i > 0; --i) {
    	this.wafers.push($("<img class='wafer w" + i + "' src=" + resourceUrl + "waferx.png></img>").css("top", 0.1 * (4 - i) * sceneH).appendTo(this.wafer_box));
    }
    //text
    // this.per25 = $("<div class='per25'>25%</div>").appendTo(this.container);
    // this.per50 = $("<div class='per50'>50%</div>").appendTo(this.container);
    this.per75 = $("<div class='per75'>75%</div>").appendTo(this.container);
    //create semi-round pages
    this.pageWrapper = $("<div></div>").addClass("pageWrapper").appendTo(this.container);
    this.pageContainer = $("<div></div>").addClass("pages").appendTo(this.pageWrapper);
    //set vendor prefixes using tween
    TweenLite.set(this.pageWrapper, {perspective: 1000/*, perspectiveOrigin: "60% 50%"*/});
    TweenLite.set(this.pageContainer, {transformStyle: "preserve-3d"});
    this.pages = [];
    this.moving_wafers = [];
    for(var i = 1; i < 4; i++) {
    	this.pages.push($("<div></div>").addClass("page p" + i).appendTo(this.pageContainer));
    	this.moving_wafers.push($("<div><img src=" + resourceUrl + "wafer.png></img></div>").addClass("moving-wafer").appendTo(this.pages[i-1]));
    	TweenLite.set(this.pages[i-1], {backfaceVisibility: "hidden", rotationY: 90 * i, transformOrigin: "right"});
    }
    //page content
    $("<div class='search1'><img src=" + resourceUrl + "search_1googlelogo.png></img></div>").appendTo(this.pages[0]);
    $("<div><img src=" + resourceUrl + "searchbar1.png></img></div>").css({position: "absolute", height: 0.055 * sceneH, top: 0.45 * sceneH, left: 0.1 * sceneH}).appendTo(this.pages[0]);
    $("<div class='search3'><img src=" + resourceUrl + "search_3hotel.png></img></div>").appendTo(this.pages[1]);
    $("<div class='search5'><img src=" + resourceUrl + "search_5airplane.png></img></div>").appendTo(this.pages[2]);
    //new video png
    this.video1 = $("<img style='opacity: 0' src=" + resourceUrl + "videolist_image1_focus.png></img>").appendTo(this.browser_r.find(".v0"));
    this.video2 = $("<img style='opacity: 0' src=" + resourceUrl + "videolist_image3_focus.png></img>").appendTo(this.browser_r.find(".v2"));
    this.video3 = $("<img style='opacity: 0' src=" + resourceUrl + "videolist_image5_focus.png></img>").appendTo(this.browser_r.find(".v4"));

    //left panel except dafeiji
    this.left_panel = $("<div class='left-panel'></div>").appendTo(this.container);
    //this.plane_white = $("<div><img src=" + resourceUrl + "search_5airplane.png></img></div>").addClass("plane-white").appendTo(this.container);
    this.plane_green = $("<div><img src=" + resourceUrl + "search_6airplane_green.png></img></div>").addClass("plane-green").appendTo(this.container);
    //xiaofeiji
    //[top, left, scale]
    var xiaofeiji = ["top: 130px; left: 200px; height: 40px",//cannot use scale as it messes up with flying out
                     "top: 275px; left: 210px; height: 40px",
                     "top: 210px; left: 275px; height: 30px",
                     "top: 180px; left: 140px; height: 30px",
                     "top: 230px; left: 130px; height: 25px",
                     "top: 270px; left: 160px; height: 25px",
                     "top: 270px; left: 275px; height: 25px",
                     "top: 250px; left: 215px; height: 20px",
                     "top: 145px; left: 165px; height: 20px"
    ];
    for(var i = 0; i < xiaofeiji.length; i++) {
    	$("<img class='xiaofeiji' src='" + resourceUrl + "search_6airplane_green.png' style='opacity: 0; position:absolute; " + xiaofeiji[i] + "'></img>").appendTo(this.left_panel);
    }
    //scaled icons
    var scaled_magnifier = [
      "top: 225px; left: 310px; height: 40px",
      "top: 270px; left: 125px; height: 35px",
      "top: 130px; left: 130px; height: 35px",
      "top: 120px; left: 260px; height: 35px",
      "top: 320px; left: 225px; height: 35px",
      "top: 110px; left: 180px; height: 25px",
      "top: 315px; left: 185px; height: 25px",
      "top: 240px; left: 100px; height: 25px",
      "top: 90px; left: 140px; height: 20px",
      "top: 70px; left: 240px; height: 20px",
      "top: 145px; left: 335px; height: 20px",
      "top: 300px; left: 335px; height: 20px",
      "top: 350px; left: 270px; height: 20px",
      "top: 195px; left: 70px; height: 20px"
    ];
    var scaled_wafer = [
        "top: 140px; left: 300px; height: 30px",
        "top: 175px; left: 110px; height: 30px",
        "top: 305px; left: 270px; height: 30px",
        "top: 100px; left: 215px; height: 25px",
        "top: 95px; left: 250px; height: 25px",
        "top: 175px; left: 340px; height: 25px",
        "top: 290px; left: 310px; height: 25px",
        "top: 300px; left: 150px; height: 25px",
        "top: 270px; left: 80px; height: 25px",
        "top: 135px; left: 100px; height: 25px",
        "top: 80px; left: 190px; height: 20px",
        "top: 100px; left: 300px; height: 20px",
        "top: 180px; left: 310px; height: 20px",
        "top: 255px; left: 345px; height: 20px",
        "top: 350px; left: 200px; height: 20px",
        "top: 325px; left: 125px; height: 20px",
        "top: 205px; left: 95px; height: 20px",
        "top: 110px; left: 155px; height: 20px"
    ];
    for(var i = 0; i < scaled_magnifier.length; i++) {
    	$("<img class='scale-icons' src='" + resourceUrl + "scale_magnifier.png' style='opacity: 0; position:absolute; " + scaled_magnifier[i] + "'></img>").appendTo(this.left_panel);
    }
    for(var i = 0; i < scaled_wafer.length; i++) {
    	$("<img class='scale-icons' src='" + resourceUrl + "scale_wafer+.png' style='opacity: 0; position:absolute; " + scaled_wafer[i] + "'></img>").appendTo(this.left_panel);
    }
    //number 51%
    this.per51 = $("<div class='per51'>51%</div>").appendTo(this.left_panel);
  }
  var replaceImg = function(imgObject, destURL) {
  	imgObject.attr("src", destURL);
  	TweenLite.set(imgObject, {rotation: -90});
  }
  scene.animation =  function (){
    var duration = 0.06;
    //hide, .allTo() isn't available in lite ver.
    this.tl.addLabel("hideLeft");
    this.tl.to(this.logo, duration, {opacity: 0}, "hideLeft")
           .to(this.browser_l, duration, {opacity: 0, x: "-=" + 0.5 * sceneW}, "hideLeft")
           .to(this.xiaodianshi, duration, {opacity: 0}, "hideLeft")
           .to(this.browser_r, duration, {x: "-=" + 0.05 * sceneW});
    //wafer
    this.tl.addLabel("wafer");
    for(var i = 0; i < 4; i++) {
      this.tl.from(this.wafers[i], duration * (i + 1), {top: 0}, "wafer");
    }
    //page1
    this.tl.addLabel("page1")
           .to(this.pageWrapper, duration * 5, {opacity: 1}, "page1")//hacking perspectiveOrigin
	         .to(this.pageContainer, duration * 10, {rotationY:-90, transformOrigin: "right", ease:Power0.easeOut}, "page1")
           .to(this.video1, duration * 10, {opacity: 1}, "page1")
           //.addLabel("page1_wafer")
           .to(this.moving_wafers[0], duration * 5, {top: 0.295 * sceneH, left: -0.154 * sceneH})
           //.to(this.per25, duration * 5, {opacity: 1}, "page1_wafer")
           .set(this.moving_wafers[0], {display: "none"}).set(this.video1, {opacity: 0})
           .call(replaceImg, [this.wafers[3], resourceUrl + "wafer+.png"])
           .to(this.wafers[3], duration * 5, {rotation: 0});
    //page2
    this.tl.addLabel("page2")
	         .to(this.pageContainer, duration * 10, {rotationY:-180, transformOrigin: "right", ease:Power0.easeOut}, "page2")
           .to(this.video2, duration * 10, {opacity: 1}, "page2")
           //.to(this.per25, duration * 10, {opacity: 0}, "page2")
           //.addLabel("page2_wafer")
           .to(this.moving_wafers[1], duration * 5, {top: 0.191 * sceneH, left: -0.154 * sceneH})
           //.to(this.per50, duration * 5, {opacity: 1}, "page2_wafer")
           .set(this.moving_wafers[1], {display: "none"}).set(this.video2, {opacity: 0})
           .call(replaceImg, [this.wafers[2], resourceUrl + "wafer+.png"])
           .to(this.wafers[2], duration * 5, {rotation: 0});
    //page3
    this.tl.addLabel("page3")
	         .to(this.pageContainer, duration * 10, {rotationY:-270, transformOrigin: "right", ease:Power0.easeOut}, "page3")
           .to(this.video3, duration * 10, {opacity: 1}, "page3")
           //.to(this.per50, duration * 10, {opacity: 0}, "page3")
           .addLabel("page3_wafer")
           .to(this.moving_wafers[2], duration * 5, {top: 0.091 * sceneH, left: -0.154 * sceneH}, "page3_wafer")
           .to(this.per75, duration * 5, {opacity: 1}, "page3_wafer")
           .set(this.moving_wafers[2], {display: "none"}).set(this.video3, {opacity: 0})
           .call(replaceImg, [this.wafers[1], resourceUrl + "wafer+.png"])
           .to(this.wafers[1], duration * 5, {rotation: 0});
    //switch to green plane
    this.tl.to(this.plane_green, duration, {opacity: 1});
    //clear and move green plane.
    this.tl.addLabel("clear-stage")
           .to(this.pageWrapper, duration * 10, {opacity: 0}, "clear-stage")
           .to(this.pageContainer, duration * 10, {rotationY:-360, transformOrigin: "right", ease:Power0.easeOut}, "clear-stage")
           .to(this.wafer_box, duration, {opacity: 0}, "clear-stage")
           //.to(this.per25, duration, {opacity: 0}, "clear-stage")
           //.to(this.per50, duration, {opacity: 0}, "clear-stage")
           .to(this.per75, duration, {opacity: 0}, "clear-stage")
           .to(this.plane_green, duration * 10, {top: 0.35 * sceneH, left: 0.234 * sceneW, scale: 1.33}, "clear-stage")
           .to(this.per51, duration, {opacity: 1});
    //popup xiaofeiji and scaled icons.
    this.tl.addLabel("lalala")
    this.tl.staggerTo(this.left_panel.find(".xiaofeiji"), duration * 10, {opacity: 1}, duration / 9 * 10, "lalala")
           .staggerTo(this.left_panel.find(".scale-icons"), duration * 10, {opacity: 1}, duration / 3.2, "lalala");
    //xiaofeiji scatter away, dafeiji fly to upper right corner
    this.tl.addLabel("scatter");
    $.each(this.left_panel.find(".xiaofeiji"), function(index, item) {
    	this.tl.to(item, duration * 15, {opacity: 0, x: "+=" + (item.offsetLeft - 0.25 * sceneW), y: "+=" + (item.offsetTop - 0.5 * sceneH)}, "scatter");
    }.bind(this));
    this.tl.to(this.plane_green, duration * 20, {opacity: 0, top: 0, left: sceneW}, "scatter")
           .to(this.left_panel, duration * 5, {opacity: 0}, "scatter")
           .to(this.browser_l, duration * 15, {opacity: 1, x: "+=" + 0.5 * sceneW}, "scatter")
           .to(this.browser_r, duration * 5, {x: "+=" + 0.05 * sceneW}, "scatter")
           .to(this.xiaodianshi, duration * 5, {opacity: 1}, "scatter")
           .to(this.logo, duration * 5, {opacity: 1}, "scatter");
  }

  scene.cleanup = function() {
    this.wafer_box.remove();
    this.video1.remove();
    this.video2.remove();
    this.video3.remove();
    this.per75.remove();
    this.pageWrapper.remove();
    this.left_panel.remove();
    this.plane_green.remove();
	this.xiaodianshi.remove();
    this.browser_l.find(".comment.c3").show();//hack for scene7
  }
  anole.addScene(scene);
});
