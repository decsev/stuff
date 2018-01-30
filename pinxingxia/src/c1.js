var myvideoo = $("#my_video");

//监听window缩放或横竖屏事件
function initOrient(){
    var a = "onorientationchange" in window, b = a ? "orientationchange" : "resize";
    window.addEventListener(b, onOrientationChange, !1)
    window.addEventListener("resize", onWindowResize, !1)
}

//处理window横竖屏事件
function onOrientationChange(a){
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
function onWindowResize(){

}

$(function(){
    $('.btn').on('click',function(){
        $('.start_page').hide();
        $(".rotate_page").show();
        myvideoo.get(0).play();
        myvideoo.get(0).pause();
        onOrientationChange();
    })
    initOrient();
    myvideoo.get(0).addEventListener("ended",function(){
        window.location.href = "https://www.sgmw.com.cn/m/20180118/pingxingxia/h5-info/index.html";
    });
})