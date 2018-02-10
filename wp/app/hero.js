import Qy from './js/qy.js';

var video1 = document.getElementById('video1');
var key1 = false, key2 = false, key3 = false, hastouch = false,hastouch2 = false;
var hot = document.getElementById('hot');
var hot2 = document.getElementById('hot2');

function fitscreen() {
  var ratio = parseFloat((1500 / 1754) * innerHeight / 750);
  $('.load-text').css('margin-left', -((0.21 * innerHeight) * (417 / 382)) / 2 + 'px');
  $('.loadimg').css('width', (0.17 * innerHeight) * (545 / 214) + 'px').css('margin-left', -(0.17 * innerHeight) * (545 / 214) / 2 + 'px');
  $('.loadimg2').css('width', (0.04 * innerHeight) * (73 / 38) + 'px');
  $('.loadimg3').css('width', (0.04 * innerHeight) * (86 / 38) + 'px');
  $('.btn-enter').css('width', (0.1 * innerHeight) * (450 / 193) + 'px').css('margin-left', -((0.1 * innerHeight) * (450 / 193)) / 2 + 'px');
  $('.bg').css('margin-left', -((1500 / 1754) * innerHeight / 2) + 'px');
  $('.video1').css('margin-left', -((750 / 876) * innerHeight / 2) + 'px');
  $('.last-bg').css('margin-left', -((1500 / 1754) * innerHeight / 2) + 'px');
  $('.last-person').css('margin-left', -((0.57 * innerHeight) * (1197 / 1015)) / 2 + 'px');
  $('.last-line').css('margin-left', -((1500 / 1754) * innerHeight / 2) + 'px');
  $('.last-text1').css('margin-left', -((0.30 * innerHeight) * (875 / 536)) / 2 + 'px');
  $('.last-text2').css('margin-left', -((0.29 * innerHeight) * (805 / 510)) / 2 + 'px');
  $('.btn-return').css('margin-left', (((750 / 877) * innerHeight) * 0.18) + 'px');
  $('.btn-jump').css('margin-right', (((750 / 877) * innerHeight) * 0.02) + 'px');
  $('.btn-share').css('margin-left', (((750 / 877) * innerHeight) * 0.02) + 'px');
  $('.hand-left').css('margin-left', (((750 / 876) * innerHeight) * 0.09) - (0.08 * innerHeight) + 'px');
  $('.hand-right').css('margin-left', (((750 / 876) * innerHeight) * 0.09) + 'px');
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
  if (video1.currentTime > (82) && !key1) {
    video1.pause();
    $('.page-1').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    key1 = true;
  }

  if (video1.currentTime > (85) && !key3) {
    video1.pause();
    $('.page-2').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    key3 = true;
  }

  if (video1.ended && !key2) {
    $('.video1').addClass('hide').removeClass('top1');
    $('.white-page').removeClass('hide').addClass('top1');
    $('.last-page').removeClass('hide');
    key2 = true;
    setTimeout(function () {
      $('.white-page').addClass('hide').removeClass('top1');
      $('.last-person,.last-text1').removeClass('hide');
    }, 1000);
    $('.btn-music').addClass('hide');
  }
}, 10);

hot.addEventListener('touchend', function (e) {
  if (e.touches.length >= 2 && !hastouch) {
    setTimeout(function () {
      video1.play();
      $('.page-1').addClass('hide').removeClass('top1');
      $('.btn-music').removeClass('hide');
    }, 200);
    hastouch = true;
  }
  video1.play();
  $('.page-1').addClass('hide').removeClass('top1');
  $('.btn-music').removeClass('hide');
}, false);

hot2.addEventListener('touchend', function (e) {
  if (e.touches.length >= 2 && !hastouch2) {
    setTimeout(function () {
      video1.play();
      $('.page-2').addClass('hide').removeClass('top1');
      $('.btn-music').removeClass('hide');
    }, 200);
    hastouch2 = true;
  }
  video1.play();
  $('.page-2').addClass('hide').removeClass('top1');
  $('.btn-music').removeClass('hide');
}, false);

$('.btn-enter').click(function () {
  $('.load-wrap').addClass('hide').removeClass('top1');
  video1.currentTime = 80;
  $('.video1').addClass('top1');
  $('.btn-music').removeClass('hide');
  video1.play();
});

$('.btn-return, .btn-return-play').click(function () {
  $('.last-page').addClass('hide').removeClass('top1');
  $('.video1').addClass('top1').removeClass('hide');
  video1.currentTime = 80;
  key1 = false, key2 = false,key3 = false, hastouch = false,hastouch2 = false;
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
  } else {
    $(this).addClass('music-pause');
    video1.muted = true;
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
    "./src/img/hero/BG.png",
    "./src/img/hero/hand_left.png",
    "./src/img/hero/hand_right.png",
    "./src/img/hero/last_bg.png",
    "./src/img/hero/last_jump.png",
    "./src/img/hero/last_line.png",
    "./src/img/hero/last_person.png",
    "./src/img/hero/last_return.png",
    "./src/img/hero/last_share.png",
    "./src/img/hero/last_text1.png",
    "./src/img/hero/last_text2.png",
    "./src/img/hero/load_img.png",
    "./src/img/hero/load_text.png",
    "./src/img/hero/music.png",
    "./src/img/hero/poster.jpg",
    "./src/img/hero/share_ing.png",
    "./src/img/hero/share_icon.jpg",
    "./src/img/hero/start.png",
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
        $('.btn-enter').removeClass('hide');
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
    $('.last-bg').attr('src', $('.last-bg').attr('rsrc'));
    $('.last-line').attr('src', $('.last-line').attr('rsrc'));
    $('.last-person').attr('src', $('.last-person').attr('rsrc'));
    $('.last-text1').attr('src', $('.last-text1').attr('rsrc'));
    $('.last-text2').attr('src', $('.last-text2').attr('rsrc'));
    $('.btn-return').attr('src', $('.btn-return').attr('rsrc'));
    $('.btn-jump').attr('src', $('.btn-jump').attr('rsrc'));
    $('.btn-share').attr('src', $('.btn-share').attr('rsrc'));
    $('.video1').removeClass('hide');

    $.each($('.rsrc'), function(i,item){
      $(item).attr('src', $(item).attr('rsrc'));
    })
  }
}
new Qy(opt);
var swiper = new Swiper('.swiper-container', {
  // pagination: '.swiper-pagination',
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  slidesPerView: 1,
  // paginationClickable: true,
  spaceBetween: 30,
  loop: true
});