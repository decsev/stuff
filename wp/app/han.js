import Qy from './js/qy.js';

var video1 = document.getElementById('video1');
var key1 = false, key2 = false, hastouch = false;
var hot = document.getElementById('hot');

function fitscreen() {
  var ratio = parseFloat((1500 / 1754) * innerHeight / 750);
  $('.load-text').css('margin-left', -((0.21 * innerHeight) * (417 / 382)) / 2 + 'px');
  $('.loadimg').css('width', (0.3 * innerHeight) * (490 / 530) + 'px').css('margin-left', -(0.3 * innerHeight) * (490 / 530) / 2 + 'px');
  $('.btn-enter').css('margin-left', -((0.1 * innerHeight) * (401 / 181)) / 2 + 'px');
  $('.bg').css('margin-left', -((1500 / 1754) * innerHeight / 2) + 'px');
  $('.video1').css('margin-left', -((750 / 876) * innerHeight / 2) + 'px');
  $('.red-tips').css('margin-left', -((750 / 876) * innerHeight / 750 * 164) + 'px');
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
  if (video1.currentTime > (15 + 0.2) && !key1) {
    video1.pause();
    $('.page-1').removeClass('hide').addClass('top1');
    $('.btn-music').addClass('hide');
    key1 = true;
  }

  if (video1.ended && !key2) {
    $('.video1').addClass('hide').removeClass('top1');
    $('.white-page').removeClass('hide').addClass('top1');
    $('.last-page').removeClass('hide');
    key2 = true;
    setTimeout(function () {
      $('.white-page').addClass('hide').removeClass('top1');
    }, 200);
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

$('#start').click(function () {
  $('.load-wrap').addClass('hide').removeClass('top1');
  //video1.currentTime = 14;
  $('.video1').addClass('top1');
  $('.btn-music').removeClass('hide');
  video1.play();
});

$('.btn-return').click(function () {
  $('.last-page').addClass('hide').removeClass('top1');
  $('.video1').addClass('top1').removeClass('hide');
  //video1.currentTime = 80;
  key1 = false, key2 = false, hastouch = false;
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
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/31/136/207/13494886.jpg",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/26/136/207/13494881.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/28/136/207/13494883.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/25/136/207/13494880.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/24/136/207/13494879.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/30/136/207/13494885.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/23/136/207/13494878.jpg",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/27/136/207/13494882.png",
    "http://img1.gtimg.com/autoguangzhou/pics/hv1/29/136/207/13494884.png",
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
          $('.btn-enter, .fangdajing').removeClass('hide');
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
    $('.video1').removeClass('hide');
  }
}

new Qy(opt);
