;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	  'demo': 'demo',
    'hammer': 'hammer',
    'TweenLite': 'js/TweenLite.min',
    'TimelineLite' : 'js/TimelineLite.min',
    'CSSPlugin' : 'js/CSSPlugin.min'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});