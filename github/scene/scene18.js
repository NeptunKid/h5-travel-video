;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(18, anole.canvas, true);
	scene.createDom = function() {
		this.scenediv = $('<div></div>').addClass('scene18').appendTo(this.container);
		this.updiv = $('<div></div>').addClass('up').appendTo(this.scenediv);
		this.downdiv = $('<div></div>').addClass('down').appendTo(this.scenediv);
		this.title = $('<div></div>').addClass('title').appendTo(this.updiv);
		this.upimgdiv = $('<div></div>').addClass('circle-div').appendTo(this.updiv);
		this.downimgdiv = $('<div></div>').addClass('circle-div').appendTo(this.downdiv);
		this.upqrcode = $('<img src="/resource/qrcode0withmarco.png"></img>').addClass('marco-qrcode').appendTo(this.upimgdiv);
		this.downqrcode = $('<img src="/resource/qrcode0withmarco.png"></img>').addClass('marco-qrcode').appendTo(this.downimgdiv);
		$('<span>《马可波罗游记》</span>').appendTo(this.title);
		$('<span>2.0</span>').addClass('version').appendTo(this.title);
		this.scanline = $('<div></div>').addClass('scanline').appendTo(this.scenediv);
	};
    scene.animation = function () {
		this.tl.addLabel('begin')
			.to(this.container.find('.scene16'),0.4,{opacity:0},'begin')
			.to(this.container.find('.scene17'),0.4,{opacity:0},'begin')
			.to(this.container.find('.phone-div'),0.4,{opacity:0},'begin')
			.to(this.container.find('.scene18'),0.4,{opacity:1},'begin+=0.4')
			.fromTo(this.scanline,1,{top:"30%"},{top:"70%"})
			.fromTo(this.scanline,1,{top:"30%"},{top:"70%"},"+=0.4")
    };
	scene.cleanup = function() {
		this.container.find('.scene16').remove();
		this.container.find('.scene17').remove();
		this.container.find('.phone-div').remove();
	};
	anole.addScene(scene);
})
