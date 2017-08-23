/**
 * Created by Administrator on 2017/6/29 0029.
 */
(function(){
  var deviceWidth = document.documentElement.clientWidth < 640 ? document.documentElement.clientWidth : 640;
  document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';//640的设计稿
})();