
var Wvideo = function(opt){
    var me = this;
    this.video = opt.video;
    this.isplaying = 0; // 0 未播，1在播
    this.hasplayed = 0; // 0 未播过 1 已播过
    //ended 回调
    this.video.get(0).addEventListener("ended",function(){
        me.hasplayed = 1;
        opt.ended();
    });
    this.init();
}

Wvideo.prototype.init  = function(){
    //click 回调
    let _t = this;
    $('.start_page .btn').on('click',function(){
        $('.start_page').hide();
        $(".rotate_page").show();
        _t.play();
        _t.pause();
        _t.onOrientationChange();
    })
    this.initOrient();
}
//播放视频
Wvideo.prototype.play = function(){
    this.isplaying = 1;
    myvideoo.get(0).play();
}

//暂停播放视频
Wvideo.prototype.pause = function(){
    this.isplaying = 0;
    myvideoo.get(0).pause();
}

//监听window缩放或横竖屏事件
Wvideo.prototype.initOrient = function(){
    var a = "onorientationchange" in window, b = a ? "orientationchange" : "resize";
    window.addEventListener(b, this.onOrientationChange, !1)
    window.addEventListener("resize", this.onWindowResize, !1)
}

//处理window横竖屏事件
Wvideo.prototype.onOrientationChange = function(a){
    var _this = this;
    if(180 == window.orientation || 0 == window.orientation || a==1){ // 竖屏
        setTimeout(function(){
            $(".rotate_page").fadeIn(100);
        }, 2);
        myvideoo.get(0).pause();
    } else if(90 == window.orientation || -90 == window.orientation || a==2){ // 横屏
        myvideoo.get(0).play();
        setTimeout(function(){
            $(".rotate_page").fadeOut(100);
        }, 7);
    } else {
        setTimeout(function(){
            $(".rotate_page").show();
        }, 0);
    }
    
}

//处理window缩放事件
Wvideo.prototype.onWindowResize = function(){
    // var width = window.innerWidth, height = window.innerHeight;
    // this.video.width = window.innerWidth;
    // this.video.height = window.innerHeight;
}

//显示或隐藏横屏提示
Wvideo.prototype.showHideCanvas = function(a,b){
    a ? $(".rotate_page").fadeOut(b) : $(".rotate_page").fadeIn(b);
}

var myvideo,myvideoo;
$(function(){
    var opt = {
        video: $('#my_video'),
        ended: function(){
            window.location.href = "http://wawaji.linkfun.cc/guanggao/v3/h5-info/index.html";
        },
        hideLoading: function(){
            $('.start_page').fadeOut();
        }
    }
    myvideoo = $("#my_video");
    myvideo = new Wvideo(opt);
    // setTimeout(function(){
    //     $('.btn').fadeIn(700);
    // },1000);
})

function log(v){
    $('#log').append('<p>'+ v +'</p>')
}