var Wvideo=function(opt){this.video=opt.video;this.isplaying=0;this.hasplayed=0;this.init()}Wvideo.prototype.init=function(){var _t=this;var me=this;this.video.get(0).addEventListener("canplay",function(){})this.video.get(0).addEventListener("progress",function(o){})this.video.get(0).addEventListener("canplaythrough",function(){$('.load_tip').html('点击观看');me.onOrientationChange()})this.video.get(0).addEventListener("ended",function(){me.hasplayed=1;opt.ended()});this.video.get(0).addEventListener("error",function(){console.log('发生未知错误！')});$('.start_page').on('click',function(){$(this).hide();_t.play();_t.pause();_t.onOrientationChange()})this.initOrient();console.log('Wvideo init...')}Wvideo.prototype.play=function(){this.isplaying=1;myvideoo.get(0).play()}Wvideo.prototype.pause=function(){this.isplaying=0;myvideoo.get(0).pause()}Wvideo.prototype.initOrient=function(){var a="onorientationchange"in window,b=a?"orientationchange":"resize";window.addEventListener(b,this.onOrientationChange,!1)window.addEventListener("resize",this.onWindowResize,!1)}Wvideo.prototype.onOrientationChange=function(a){var _this=this;if(180==window.orientation||0==window.orientation||a==1){setTimeout(function(){$(".rotate_page").fadeIn(100)},100);myvideoo.get(0).pause()}else if(90==window.orientation||-90==window.orientation||a==2){myvideoo.get(0).play();setTimeout(function(){$(".rotate_page").fadeOut(500)},700);myvideoo.get(0).play()}else{setTimeout(function(){_this.showHideCanvas(true,500)},700)}}Wvideo.prototype.onWindowResize=function(){var width=window.innerWidth,height=window.innerHeight;this.video.width=window.innerWidth;this.video.height=window.innerHeight}Wvideo.prototype.showHideCanvas=function(a,b){a?$(".rotate_page").fadeOut(b):$(".rotate_page").fadeIn(b)}



var myvideo,myvideoo;
$(function(){
    var opt = {
        video: $('#my_video'),
        ended: function(){
            //console.log('play ended')
            window.location.href = "http://www.baidu.com";
        },
        hideLoading: function(){
            $('.start_page').fadeOut();
        }
    }
    myvideoo = $("#my_video");
    myvideo = new Wvideo(opt);
})

function log(v){
    $('#log').append('<p>'+ v +'</p>')
}