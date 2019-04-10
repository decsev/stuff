import Qy from './js/qy.js';
var video1 = document.getElementById('video1');
var key1 = false, key2 = false, key3 = false, hastouch = false, video1end= false;
var hasPause1 = false, hasPause2 = false;
var introduction = document.getElementById('introduction');
var go = document.getElementById('go');
var ungo = document.getElementById('ungo');
function fitscreen() {
  var ratio = parseFloat((1500 / 1754) * innerHeight / 750);
  $('.btn-enter').css('margin-left', -((0.17 * innerHeight) * (468 / 324)) / 2 + 'px');
  $('.goonbtn').css('margin-left', -((0.03 * innerHeight) * (301 / 54)) / 2 + 'px');
  $('.mybtn').css('height', (0.65 * innerWidth) * (106 / 576) + 'px').css('margin-left', (-0.65 * innerWidth / 2) + 'px');
  $('.goTitle').css('height', (0.85 * innerWidth) * (90 / 855) + 'px').css('margin-left', (-0.85 * innerWidth / 2) + 'px');
  $('.video1').css('margin-left', -((750 / 876) * innerHeight / 2) + 'px');
  $('.erweima').css('margin-left', (-0.32 * innerWidth / 2) + 'px');
  $('.btn-share').css('margin-left', (-0.65 * innerWidth / 2) + 'px');
  $('.btn-huigu').css('margin-left', (-0.65 * innerWidth / 2) + 'px');
};

window.onresize = function () {
  fitscreen();
};

video1.addEventListener('x5videoenterfullscreen', function () {
  setTimeout(function () {
    fitscreen();
  }, 100);
});

var videotimer = setInterval(function () {

  if (video1.currentTime > config.pause1 && !hasPause1) {
    video1.pause();
    $('.pause-page').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    hasPause1 = true;
  }

  if (video1.currentTime > config.pause2 && !hasPause2) {
    video1.pause();
    $('.pause-page').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    hasPause2 = true;
  }

  if (video1.currentTime > config.t1 && !key1) {
    video1.pause();
    $('.page-1').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    key1 = true;
  }

  if (video1.ended && !video1end) {
    $('#video2').addClass('hide').removeClass('top1');
    $('.white-page').removeClass('hide').addClass('top1');
    $('.last-page').removeClass('hide').addClass('top1');
    setTimeout(function () {
      $('.white-page').addClass('hide').removeClass('top1');
    }, 200);
    $('.btn-music').addClass('hide');
    video1end = true;
  }
}, 10);

introduction.addEventListener('touchend', function (e) {
  if (e.touches.length >= 2 && !hastouch) {
      $('.page-1').addClass('hide').removeClass('top1');
      $('.btn-music').removeClass('hide');
    video1.play();
    hastouch = true;
  }
    $('.page-1').addClass('hide').removeClass('top1');
    $('.btn-music').removeClass('hide');
  video1.play();
}, false);


// 开始播放
document.getElementById('fingerprint').addEventListener('touchend', function (e) {
  if (e.touches.length >= 2 && !hastouch) {
    $('#fingerprint').addClass('on');
    $('.load-wrap').addClass('hide').removeClass('top1');
    video1.currentTime = config.ct1;
    $('#video1').addClass('top1').removeClass('hide');
    $('.btn-music').removeClass('hide');
    video1.play();

  }
  $('#fingerprint').addClass('on');
  $('.load-wrap').addClass('hide').removeClass('top1');
  video1.currentTime = config.ct1;
  $('#video1').addClass('top1').removeClass('hide');
  $('.btn-music').removeClass('hide');
  video1.play();
}, false);


// 继续播放
document.getElementById('goOnPlay').addEventListener('touchend', function (e) {
  if (e.touches.length >= 2) {
    video1.play();
    $('.pause-page').addClass('hide').removeClass('top1');
    $('.btn-music').removeClass('hide');
  }
  video1.play();
  $('.pause-page').addClass('hide').removeClass('top1');
  $('.btn-music').removeClass('hide');
}, false);


// 分享页
$('.btn-return').click(function () {
  $('.last-page').addClass('hide').removeClass('top1');
  $('#video1').addClass('top1').removeClass('hide');
  //video1.currentTime = 80;
  key1 = false, key2 = false, key3 = false, hastouch = false;
  video1.play();

});

$('.btn-share').click(function () {
  $('.share-page').removeClass('hide').addClass('top1');
});

$('.share-page').click(function () {
  $('.share-page').addClass('hide').removeClass('top1');
});

$('.btn-jump').click(function () {
  setTimeout(function () {
    window.location.href = 'https://baidu.com';
  }, 100);
});

$('.btn-music').click(function () {
  if ($(this).hasClass('music-pause')) {
    $(this).removeClass('music-pause');

    video1.muted = false;
    video2.muted = false;
    video3.muted = false;
  } else {
    $(this).addClass('music-pause');
    video1.muted = true;
    video2.muted = true;
    video3.muted = true;
  }
});

// 页面初始化

fitscreen();
$('.load-wrap').removeClass('hide');
$('.load-wrap').css('opacity', '1');
document.addEventListener("touchmove", function (e) {
  e.preventDefault();
}, false);

// 加载进度
var percent = 0;
var percent_beforeLoad = 0;
var opt = {
  data: [
    "./src/img/bg.png",
    "./src/img/goon.png",
    "./src/img/end1.png",
    "./src/img/er.png",
    "./src/img/share.png",
    "./src/img/share-top.png",
    "./src/img/go.png",
    "./src/img/go-on.png",
    "./src/img/introduction.png",
    "./src/img/introduction-on.png",
    "./src/img/ungo.png",
    "./src/img/ungo-on.png",
    "./src/img/go-title.png",
    "./src/img/arr.png",
    "./src/img/p3/end3.png",
    "./src/img/p3/huigu2.png",
    "./src/img/p3/no.png",
    "./src/img/p3/open.png",
    "./src/img/p3/title.png",
    "./src/img/p3/yes.png",
    "./src/img/p2/end2.png",
    "./src/img/p2/huigu.png",
    "./src/img/p2/start-work.png",
    "./src/img/yello.png"
  ],
  allType: {
    image: [
      'jpg', 'png', 'gif'
    ],
    json: ['json'],
    audio: ['mp3']
  },
  
  loading: function (o) {
    percent_beforeLoad = Math.floor((o.nowProgress / o.allProgress) * 100);
    var loadtimer = setInterval(function () {
      if (percent >= 100) {
        clearInterval(loadtimer);
        setTimeout(function () {
          $('.load-percent').addClass('hide');
        }, 500)
        setTimeout(function () {
          $('.after-loading').removeClass('hide');
          $('.load-wrap').addClass('enter-bg');
        }, 1000)
      }
      $('.load-percent').html(percent + '%');
      if (percent < percent_beforeLoad)
        percent++;
    }
      , 50);
  },

  complate: function () {
    $('.hand-left').attr('src', $('.hand-left').attr('rsrc'));
    $('.hand-right').attr('src', $('.hand-right').attr('rsrc'));
    $.each($('.last-bg2'), function (i, item) {
      $(item).attr('src', $(item).attr('rsrc'));
    })
    $.each($('.rsrc'), function (i, item) {
      $(item).attr('src', $(item).attr('rsrc'));
    })
    $('.btn-share').attr('src', $('.btn-share').attr('rsrc'));
    $('#video1').removeClass('hide');
  }
}

new Qy(opt);
