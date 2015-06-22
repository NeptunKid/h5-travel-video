Google Inbound Travel Study 2015


CDN Services:


测速结果：
zepto: bootcss>useso>cncdn
hammer: bootcss>cncdn >staticfile>gbtags
require.js : useso>bootcss>cncdn>
TweenLite: bootcss>useso>sinaapp>cncdn

zepto 1.0rc1
http://libs.useso.com/js/zepto/1.0rc1/zepto.min.js
  or http://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js

requirejs 2.1.17:
http://cdn.bootcss.com/require.js/2.1.18/require.min.js
hammer.js  2.0.4
http://cdn.bootcss.com/hammer.js/2.0.4/hammer.min.js

GSAP:

http://cdn.bootcss.com/gsap/latest/easing/EasePack.min.js
http://cdn.bootcss.com/gsap/latest/plugins/CSSPlugin.min.js
http://cdn.bootcss.com/gsap/latest/TimelineLite.min.js
http://cdn.bootcss.com/gsap/latest/TweenLite.min.js




Google API:
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js?ver=3.4.2'></script>
to
<script type='text/javascript' src='http://ajax.useso.com/ajax/libs/jquery/1.7.2/jquery.min.js?ver=3.4.2'></script>

Google Fonts:
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600&subset=latin,latin-ext' rel='stylesheet'>
to
<link href='http://fonts.useso.com/css?family=Open+Sans:300,400,600&subset=latin,latin-ext' rel='stylesheet'>


Local Backup:
<script src="//http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js"></script>
<script>
if (!window.jQuery) {
var script = document.createElement('script');
script.src = "/js/jquery.min.js";
document.body.appendChild(script);
}
</script>