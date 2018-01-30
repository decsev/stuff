var video1 = document.getElementById('video1');
//var video2 = document.getElementById('video2');
var key1 = false,key2 = false,key3 = false,hastouch=false;
var hot = document.getElementById('hot');
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

if(isiOS){
	$('.video1').attr('poster','img/poster.jpg');
}

function fitscreen(){
	var ratio = parseFloat((1500/1754)*innerHeight/750);
	$('.load-text').css('margin-left',-((0.21*innerHeight)*(417/382))/2+'px');
	$('.loadimg').css('width',(0.3*innerHeight)*(490/530)+'px').css('margin-left',-(0.3*innerHeight)*(490/530)/2+'px');
	$('.btn-enter').css('margin-left',-((0.1*innerHeight)*(401/181))/2+'px');
	$('.bg').css('margin-left',-((1500/1754)*innerHeight/2)+'px');
	$('.video1').css('margin-left',-((750/876)*innerHeight/2)+'px');
	//$('.video2').css('margin-left',-((750/876)*innerHeight/2)+'px');
	$('.last-bg').css('margin-left',-((1500/1754)*innerHeight/2)+'px');
	$('.last-person').css('margin-left',-((0.57*innerHeight)*(1197/1015))/2+'px');
	$('.last-line').css('margin-left',-((1500/1754)*innerHeight/2)+'px');
	$('.last-text1').css('margin-left',-((0.30*innerHeight)*(875/536))/2+'px');
	$('.last-text2').css('margin-left',-((0.29*innerHeight)*(805/510))/2+'px');
	$('.btn-return').css('margin-left',(((750/877)*innerHeight)*0.18)+'px');
	$('.btn-jump').css('margin-right',(((750/877)*innerHeight)*0.02)+'px');
	$('.btn-share').css('margin-left',(((750/877)*innerHeight)*0.02)+'px');
	$('.hand-left').css('margin-left',(((750/876)*innerHeight)*0.09)-(0.08*innerHeight)+'px');
	$('.hand-right').css('margin-left',(((750/876)*innerHeight)*0.09)+'px');
}; 

window.onresize = function(){
	fitscreen();
};

// video1.load();
// document.addEventListener('WeixinJSBridgeReady',function(){
// 	video1.load();
// });

video1.addEventListener('x5videoenterfullscreen',function(){	
	setTimeout(function(){
		fitscreen();
	},100);
	
});

var videotimer = setInterval(function(){
	if(video1.currentTime>(90+10/30)&&!key1){

		//MtaH5.clickStat("08");
		video1.pause();
		$('.page-1').removeClass('hide').addClass('top1');
		$('.btn-music').addClass('hide');
		key1 = true;
	}
	if(video1.ended&&!key2){

		//MtaH5.clickStat("09");
		$('.video1').addClass('hide').removeClass('top1');
		$('.white-page').removeClass('hide').addClass('top1');
		$('.last-page').removeClass('hide');
		key2 = true;
		setTimeout(function(){
			$('.white-page').addClass('hide').removeClass('top1');
			$('.last-person,.last-text1').removeClass('hide');
		},1000);
		$('.btn-music').addClass('hide');
	}
	// if(video2.ended&&!key3){

	// 	//MtaH5.clickStat("10");
	// 	$('.video2').addClass('hide').removeClass('top1');
	// 	$('.white-page').removeClass('hide').addClass('top1');
	// 	$('.last-page').removeClass('hide');
	// 	key3 = true;
	// 	setTimeout(function(){
	// 		$('.white-page').addClass('hide').removeClass('top1');
	// 		$('.last-person,.last-text1').removeClass('hide');
	// 	},1000);
	// 	$('.btn-music').addClass('hide');
	// }
},10);

hot.addEventListener('touchend',function(e){

	//MtaH5.clickStat("04");
	
	if(e.touches.length>=2&&!hastouch){

		setTimeout(function(){
			video1.play();
			$('.page-1').addClass('hide').removeClass('top1');
			$('.btn-music').removeClass('hide');
		},200);
		hastouch = true;
	}
	video1.play();
	$('.page-1').addClass('hide').removeClass('top1');
	$('.pass-2').removeClass('hide');
	$('.btn-music').removeClass('hide');
},false);

$('.btn-enter').click(function(){

	//MtaH5.clickStat("03");

	$('.load-wrap').addClass('hide').removeClass('top1');
	// if((WhaleNest.getUrlParams().ADTAG=='fh'||WhaleNest.getUrlParams().ADTAG=='cl'||WhaleNest.getUrlParams().ADTAG=='wc'||WhaleNest.getUrlParams().ADTAG=='wcf'||WhaleNest.getUrlParams().ADTAG=='wpf'||WhaleNest.getUrlParams().ADTAG=='qtf'||WhaleNest.getUrlParams().ADTAG=='xmf'||WhaleNest.getUrlParams().ADTAG=='hef')&&!(WhaleNest.getSourceFromUA().source=='weixin'||WhaleNest.getSourceFromUA().source=='mqq')){

	// 	$('.video2').removeClass('hide').addClass('top1');
	// 	$('.btn-music').removeClass('hide');
	// 	$('.video1').addClass('hide');
	// 	if(isiOS){
	// 		setTimeout(function(){
	// 			$('.last-page').addClass('top1').removeClass('hide');
	// 		},1000);
	// 	}
	// 	for(var i=0;i<100;i++){
	// 		console.log(1);
	// 	}
	// 	video2.play();
	// }else{
		video1.currentTime = 150;
		$('.video1').addClass('top1');
		$('.btn-music').removeClass('hide');
		for(var i=0;i<100;i++){
			console.log(1);
		}
		video1.play();
	//}
	
});

$('.btn-return').click(function(){

	//MtaH5.clickStat("07");

	$('.last-page').addClass('hide').removeClass('top1');
	// if((WhaleNest.getUrlParams().ADTAG=='fh'||WhaleNest.getUrlParams().ADTAG=='cl'||WhaleNest.getUrlParams().ADTAG=='wc'||WhaleNest.getUrlParams().ADTAG=='wcf'||WhaleNest.getUrlParams().ADTAG=='wpf'||WhaleNest.getUrlParams().ADTAG=='qtf'||WhaleNest.getUrlParams().ADTAG=='xmf'||WhaleNest.getUrlParams().ADTAG=='hef')&&!(WhaleNest.getSourceFromUA().source=='weixin'||WhaleNest.getSourceFromUA().source=='mqq')){
	// 	$('.video2').addClass('top1').removeClass('hide');
	// 	video2.currentTime = 0;
	// 	key3 = false;
	// 	for(var i=0;i<100;i++){
	// 		console.log(1);
	// 	}
	// 	video2.play();
	// }else{
		$('.video1').addClass('top1').removeClass('hide');
		video1.currentTime = 0;
		key1 = false,key2 = false,hastouch = false;
		for(var i=0;i<100;i++){
			console.log(1);
		}
		video1.play();
	//}
	
});

$('.btn-share').click(function(){

	//MtaH5.clickStat("06");
	$('.share-page').removeClass('hide').addClass('top1');
});

$('.share-page').click(function(){
	$('.share-page').addClass('hide').removeClass('top1');
});

$('.btn-jump').click(function(){
	setTimeout(function(){
		window.location.href = 'https://baidu.com';
	},100);
});

$('.btn-music').click(function(){
	if($(this).hasClass('music-pause')){
		$(this).removeClass('music-pause');
		
		video1.muted = false;
	}else{
		$(this).addClass('music-pause');
		video1.muted = true;
	}
});

if(isAndroid){
	$('.btn-music').addClass('btn-music-a');
}