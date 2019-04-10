require('./scss/index.scss');


var loading = document.querySelector(".loading");
var loadingProcess = loading.getElementsByTagName("p")[0];
var swiperWrapper = document.querySelector(".swiper-wrapper");
var swiperSlide = document.querySelectorAll(".swiper-slide");
var picArr = [
  "img/pause.jpg", "img/play.jpg", "img/loading.gif", "img/logo.gif", "img/next.png", "img/p1_0.png", "img/p1_1.png",
  "img/p1_2.png", "img/p2_1.png", "img/p2_2.png", "img/p2_3.png", "img/p2_4.png", "img/p2_5.png", "img/p2_6.png", "img/p2_7.png", "img/p2_8.png",
  "img/p3-1.png", "img/p3-2.png", "img/p3-3.png", "img/p3-4.png", "img/p3-5.png", "img/p3-6.png", "img/p3-7.png",
  "img/p3-8.png", "img/p3-9.png", "img/p3-10.png", "img/p3-11.png", "img/p4_1.png", "img/p4_2.png",
  "img/p5_1.png", "img/p5_2.png", "img/p5_3.png", "img/p5_4.png", "img/p5_5.png", "img/p6_1.png", "img/p6_2.png",
  "img/p6_3.png", "img/p6_4.png", "img/p6_5.jpg", "img/p8_1.jpg", "img/p7_0.png", "img/p7_1.png", "img/p7_2.png",
  "img/p7_3.png", "img/p7_4.png", "img/p7_5.png", "img/p7_6.jpg", "img/p43.jpg", "img/t1.png", "img/t2.png", "img/t3.png",
  "img/t4.png", "img/tl.png", "img/c0.png", "img/c1.png", "img/c2.png", "img/c3.png", "img/c4.png", "img/c5.png",
  "img/c6.png", "img/c7.png", "img/c8.png", "img/c9.png",
]
var img = new Image();
var sum = picArr.length;
//console.log( picArr[40] ); 
var now = 0;

loadImg();
function loadImg() {
  loading.style.display = "block";
  img.src = picArr[now];

  function go() {
    now++;
    //		console.log(now);
    loadingProcess.innerHTML = parseInt(now / sum * 100) + "%";
    if (now < picArr.length) {
      loadImg()
    } else {
      //			console.log("全部加载完成");
      loading.style.display = "none";
      swiperWrapper.style.opacity = "1";
      action();
    }
  }
  img.onerror = go;
  img.onload = go;
}
function action() {
  document.getElementsByTagName("html")[0].style.background = "black"
  var mySwiper = new Swiper('.swiper-container', {
    direction: '',
    initialSlide: 0,
    speed: 800,
    followFinger: false,
    touchRatio: 0.1,
    resistanceRatio: 0,
    onSlideChangeStart: function (swiper) {
      swiperSlide[swiper.previousIndex].style.zIndex = -9999;
      // for (var i = 0; i < swiperSlide.length; i++) {
      //   swiperSlide[i].classList.add("swiper-no-swiping")
      // }
      // setTimeout(function () {
      //   for (var i = 0; i < swiperSlide.length; i++) {
      //     if (i != 1) {
      //       swiperSlide[i].classList.remove("swiper-no-swiping")
      //     }
      //   }
      // }, 1000)
      if (swiper.activeIndex !== 0) {
        document.getElementById('logo').innerHTML = '';
      }
      if (swiper.activeIndex > swiper.previousIndex) {
        swiperSlide[swiper.previousIndex].style.transform = "translateY(" + mySwiper.height + "px) scale(0.8)";
        swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(0.5)";
      } else {
        swiperSlide[swiper.previousIndex].style.transform = "translateY(" + -mySwiper.height + "px) scale(0.8)";
        swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(0.5)"
      }

      if (swiper.activeIndex === 0) {
        first();
      }
      if (swiper.activeIndex === 1) {
        second();
      }
      if (swiper.activeIndex === 2) {
        third();
      }
      if (swiper.activeIndex === 3) {
        forth();
      }
      if (swiper.activeIndex === 4) {
        fifth();
      }
      if (swiper.activeIndex === 5) {
        sixth();
      }
      if (swiper.activeIndex === 6) {
        sevth();
      }
    },
    onSlideChangeEnd: function (swiper) {
      swiperSlide[swiper.previousIndex].style.transform = "translateY(0px) scale(1)";
      swiperSlide[swiper.previousIndex].style.zIndex = 0;
      swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(1)"
    },
    nextButton: '.next',
    noSwiping: true
  })

  var mySwiperH = mySwiper.height;

  //----------------------------------------------------------------------第一屏-------
  var html = document.documentElement;
  var width = html.getBoundingClientRect().height;
  var fs = width / 10;

  var onoff = true;
  var onoff2 = true;
  var onoff3 = true;
  var tl = new TimelineMax();
  var tl2 = new TimelineMax();
  var tl3 = new TimelineMax();
  var tl4 = new TimelineMax();
  var onoff4 = true;
  var tl5 = new TimelineMax();
  var onoff5 = true;
  var tl6 = new TimelineMax();
  var onoff6 = true;
  var tl7 = new TimelineMax();
  var onoff7 = true;
  first();
  function first() {
    //第一屏动画
    var timeBoxSpan = document.querySelectorAll(".timeBox span");
    for (var i = 0; i < timeBoxSpan.length; i++) {
      timeBoxSpan[i].index = i;
    }
    if (onoff) {
      document.getElementById('logo').innerHTML = '<img class="logo" src="img/logo.gif?id=' + Math.random() + '" />';
      tl.staggerFrom(".line .span3", 1, {
        height: 0,
        ease: Linear.easeInOut,
        delay: 0
      })
        .staggerFrom(".line .span2", 0.8, {
          height: 0,
          ease: Linear.easeInOut,
          delay: 0
        })
        .staggerFrom(".line .span1", 0.8, {
          height: 0,
          ease: Linear.easeInOut,
          delay: 0
        })
      onoff = false;
    } else {
      document.getElementById('logo').innerHTML = '<img class="logo" src="img/logo.gif?id=' + Math.random() + '" />';
      tl.restart();
    }
  };
  // 第二屏

  // var onoff2 = true;
  function second() {
    if (onoff2) {
      tl2.from(".intro", 0.5, {
        opacity: 0,
        ease: Cubic.easeInOut
      }, 0.5)
        .to(".licheng", 1, {
          height: 1.466 * fs,
          ease: Linear.easeOut
        })
        .from(".l1", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut
        }, "-=0.7")
        .from(".t1", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.5")
        .to(".licheng", 1, {
          height: 2.932 * fs,
          ease: Linear.easeOut
        })
        .from(".l2", 1, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.7")
        .from(".t2", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.5")
        .to(".licheng", 1, {
          height: 4.398 * fs,
          ease: Linear.easeOut
        })
        .from(".l3", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.7")
        .from(".t3", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.5")
        .to(".licheng", 1, {
          height: 5.93 * fs,
          ease: Linear.easeOut
        })
        .from(".l4", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.7")
        .from(".t4", 0.5, {
          autoAlpha: 0,
          ease: Linear.easeOut,
          delay: 0
        }, "-=0.5")
      onoff2 = false;
    } else {
      tl2.restart();
    }
  };
  //----------------------------------------------------------------------第三屏-------
  function third() {
    if (onoff3) {
      onoff3 = false;
      tl3.from('.brand', 1, {
        autoAlpha: 0,
        ease: Linear.easeOut
      }, 1)
        .staggerFrom(".brandList span", 0.35, {
          scale: 0,
          cycle: {
            opacity: function () {
              return 0;
            },

            ease: Elastic.easeOut,
          }
        }, 0)
    } else {
      tl3.restart();
    }
  }
  // 第四屏
  function forth() {
    if (onoff4) {
      onoff4 = false;
      tl4.from('.c0', 1, {
        scale: 0,
        opacity: 0,
        ease: Bounce.easeOut
      })
        .staggerFrom('.proList span', 0.2, {
          cycle: {
            scale: function () { return 0 },
            opacity: function () { return 0 },
            // bezier: function () {
            //   return [
            //     { x: Math.random() * 300 + 400, y: Math.random() * 200 + 500, z: 1050 },
            //     { x: Math.random() * 300 + 200, y: Math.random() * 200 + 300, z: 550 },
            //     { x: Math.random() * 100, y: Math.random() * 200 + 300, z: 500 },
            //     { x: Math.random() * 100 - 300, y: Math.random() * 100 + 200, z: 450 },
            //     { x: Math.random() * 100 - 300, y: Math.random() * 20 + 60, z: 400 },
            //     { x: Math.random() * 50 - 150, y: Math.random() * 100 - 200, z: 350 },
            //     { x: Math.random() * 100 + 150, y: Math.random() * 100 - 200, z: 300 },
            //     { x: Math.random() * 100 + 220, y: Math.random() * 100 + 20, z: 400 },
            //     { x: Math.random() * 10 + 100, y: Math.random() * 100 + 30, z: 350 }
            //   ]
            // },
          },
          ease: Bounce.easeInOut
        }, 0.05)
        .from('.sun', 1, {
          opacity: 0,
          ease: Linear.easeOut
        })
    } else {
      tl4.restart();
    }
  }

  //----------------------------------------------------------------------第五屏-------

  function fifth() {
    if (onoff5) {
      onoff5 = false;
      tl5.from('.f1', 1, {
        y: -13 * fs,
        ease: Quart.easeInOut,
        delay: 0.5
      })
        .to('.f1', 1, {
          y: 0.2 * fs,
          ease: Bounce.easeOut,
        })
        .from('.f2', 0.4, {
          autoAlpha: 0,
          y: -2 * fs,
          ease: Bounce.easeOut,
          delay: 0.3
        })
        .from('.f3', 0.5, {
          // x: -5 * fs,
          opacity: 0,
          ease: Elastic.easeOut,
        })
        .from('.f4', 0.5, {
          // y: 5 * fs,
          opacity: 0,
          ease: Elastic.easeOut,
        })
    } else {
      tl5.restart();
    }
  }
  //----------------------------------------------------------------------第六屏-------

  function sixth() {
    if (onoff6) {
      onoff6 = false;
      tl6.staggerFrom(".sixth img", 0.2, {
        cycle: {
          // x: function (index) {
          //   switch (index) {
          //     case 0:
          //       return -8 * fs;
          //       break;
          //     case 1:
          //       return 4.8 * fs;
          //       break;
          //     case 2:
          //       return -5.85 * fs;
          //       break;
          //     default:
          //       return 6.4 * fs;
          //       break;
          //   }
          // }
          opacity: function () {
            return 0;
          }
        },
        ease: Linear.easeIn,
        delay: 0.5
      }, 0.5)
    } else {
      tl6.restart();
    }
  }

  // 第七屏
  function sevth() {
    if (onoff7) {
      onoff7 = false;
      tl7.from('.sev0', 1, {
        // y: -2 * fs,
        autoAlpha: 0,
        ease: Elastic.easeOut,
        delay: 1
      })
        .staggerFrom(".aa", 0.2, {
          cycle: {
            // x: function (index) {
            //   switch (index) {
            //     case 0:
            //       return -8 * fs;
            //       break;
            //     case 1:
            //       return 4.8 * fs;
            //       break;
            //     case 2:
            //       return -5.85 * fs;
            //       break;
            //     default:
            //       return 6.4 * fs;
            //       break;
            //   }
            // }
            opacity: function () {
              return 0;
            }
          },
          ease: Linear.easeIn,
          delay: 0.5
        }, 0.5)
        .from('.sev5', 1, {
          // y: 2 * fs,
          autoAlpha: 0,
          ease: Elastic.easeOut,
        }, "+=0.5")
    } else {
      tl7.restart();
    }
  }
}

let diddo = false;
let audio = document.getElementById('music');
let mc = document.getElementById('mc');
function audioAutoPlay() {
  if (audio.paused) {
    audio.play();
    mc.className = "pause";
  } else {
    audio.pause();
    mc.className = "play";
  }
}
mc.addEventListener('touchstart', function () {
  audioAutoPlay();
})
document.addEventListener('touchstart', function () {
  if (!diddo) {
    if (audio.paused) {
      audio.play();
      mc.className = "pause";
    }
    diddo = true;
  }
});
