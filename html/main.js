;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	'demo': 'demo',
	'zepto': [
		'//cdn.bootcss.com/zepto/1.0rc1/zepto.min',
		'zepto.min'
	],
	'hammer': [
	    '//cdn.bootcss.com/hammer.js/2.0.4/hammer.min', 
		'hammer.min'
	],
    'TweenLite': [
		'//cdn.bootcss.com/gsap/latest/TweenLite.min',
		'js/TweenLite.min'
	],
	'TimelineLite': [
		'//cdn.bootcss.com/gsap/latest/TimelineLite.min',
		'js/TimelineLite.min'
	],
	'CSSPlugin': [
		'//cdn.bootcss.com/gsap/latest/plugins/CSSPlugin.min',
		'js/CSSPlugin.min'
	],
	'EasePack': [
		'//cdn.bootcss.com/gsap/latest/easing/EasePack.min',
		'js/EasePack.min'
	]
  },
  shim: {
    'zepto': {
      exports: '$'
    },
	'hammer': {
	  exports: 'Hammer'
	},
	'TweeenLite': {
	  exports: 'TweenLite'
	}
  },
  deps: ['demo']
});
