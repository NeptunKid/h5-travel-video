;require(['anole', 'zepto','TimelineLite'], function(anole, Scene){
    
	var scene = new anole.Scene(23, anole.canvas, false);
    scene.name = 'scene23.js';
	scene.createDom = function() {
		var x_list = [39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984,39,174,309,444,579,714,849,984];
		var y_list = [46,46,46,46,46,46,46,46,181,181,181,181,181,181,181,181,316,316,316,316,316,316,316,316,451,451,451,451,451,451,451,451,586,586,586,586,586,586,586,586,721,721,721,721,721,721,721,721];
		this.count = x_list.length;
		var modu = 15;
		this.people = [];
		this.page = $("<div></div>").addClass("page").appendTo(this.container);
		for (var i=0;i<this.count;i++){
			var person = $("<div></div>").addClass("person-ctn").appendTo(this.page)
				.append($("<div></div>").addClass("person p"+i%modu));
			person.css("top",y_list[i]-45);
			person.css("left",x_list[i]-45);
			this.people[i] = person;
		}
		this.g_svg = $("<div></div>").addClass("g-svg-ctn").append("<img src='./resource/g.svg'></img>").appendTo(this.container);
		this.g_ctn = $("<div></div>").addClass("g-ctn").appendTo(this.container).append('<div class="g-half"></div>');
		this.g0 = $("<div></div>").addClass("g-layer l0").appendTo(this.g_ctn);
		this.g1 = $("<div></div>").addClass("g-layer l1").appendTo(this.g_ctn);
		this.gtext = $("<p>g</p>").appendTo(this.g_ctn);
		this.g_bg = $("<div></div>").addClass("g-bg").appendTo(this.container).append("<img src='./resource/thinkwithgoogle.png'></img>");
		anole.canvas.removeClass('strips-16-22');
	}
	
	scene.animation = function() {
		var delta = 0.5;
		var people = $(".person");
		console.log(this.page);
		this.tl.delay(delta);
		this.tl.addLabel('begin')
		       .to(this.container.find('.person-ctn'), delta, {opacity:1})
		       .to(this.container.find('.person'), delta, {top:"0%"}, 'begin')
			   .addLabel('zoomout', '+=' + 1*delta) // pause for a while
			   .to(this.page, delta*2, {scale:0.3,x:"-50%",y:"-50%",delay:delta, opacity:0, ease:Linear.easeNone}, 'zoomout')
			   .to(this.page, delta*2, {opacity:0, delay: delta}, 'zoomout')
			   .to(this.g_svg, delta, {opacity:1, delay: 2*delta}, 'zoomout')
			   .to(this.g_svg, delta*5, {scale:0.1,x:"-50%",y:"-50%",ease:Linear.easeNone}, 'zoomout');
		
		this.tl.to(this.g_ctn,delta,{opacity:1})
		       .to(this.g0,delta*1.5,{rotationY:90, ease: Linear.easeNone})
			   .to(this.g1,delta*1.5,{rotationY:180, ease: Linear.easeNone});
         
		this.tl.to([this.g_ctn, this.g_svg, $('#scene23:after')], delta, {opacity:0})
	           .call(function() {
				   $('body').removeClass('strips-16-22');
			       $('#scene23:before').hide();

			   })
		       .set($('body'), {backgroundColor: 'rgba(255,255,255,0.5)'})
		       .to(this.g_bg,delta*3,{opacity:1,delay:delta});
	}
	scene.cleanup = function() {
		this.tl.set($('body'), {backgroundColor: '#D7CCC8'})
	}
	anole.addScene(scene);
})
