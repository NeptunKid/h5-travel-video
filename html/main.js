;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	'demo': 'demo',
    'hammer': 'hammer.min',
    'TweenLite': 'js/TweenLite.min',
    'TimelineLite' : 'js/TimelineLite.min',
    'CSSPlugin': 'js/CSSPlugin.min',
	'EasePack': 'js/EasePack.min'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});
