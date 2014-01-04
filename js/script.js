var slideUpDownDelay = 600; //delay of slide up/slide down
var switchJobDelay = 800; //delay between slide right/slide left
var transitionRound2 = 800; //fade into Round 2
var transitionRound3 = 800; //fade into individual job details
var scrollAmount = 900; //controls scrolling length on individual job page
var scrollDelay = 600; //controls scroll delay on individual job page
var dragDistance = 5; //controls amount dragged before action takes place
var dragThreshold = 150; //controls amount dragged to swap
var transitionPause = true; //if true it limits how fast the user can scroll through jobs
var maxDragAmount = 200; //Max allowed drag amount - slows down really quick drags
var transitionShareSave = 800; //delay to fade in share/save
var minDragShareSaveAmount = 50; //swipe distance for save/share to fade in
var minDragAmount = 50; //amount to swipe in one direction to commit to swiping in that direction
var foundJob = false; //has selected an initial job. Otherwise right swipe is disabled.
var swipeUpDown = 0;
var swipeLeftRight = 0;
var dragShareSave = false;
var transition = false;
var circle_number = 0;
var current_job = 1;
var round1 = true;
var round2 = false;
var roundJobs = false;
/*var round1 = false;
var round2 = false;
var roundJobs = true;*/
var swipeUpV = false;
var swipeDownV = false;
var size_job = $('.round-1').length;
	function getCurrentBeacon() {
		if (roundJobs)
			currentBeacon = '#jobs';
		else if (round2)
			currentBeacon = '#round-2';
		else currentBeacon = '#job-'+current_job;
		return currentBeacon;

	}
	function getNextJob(direction) {
		next_job = 1;
		if (direction=="left") {
			next_job = current_job-1;
			if (next_job<1) next_job=size_job;
		}	
		return next_job;
	}

	function getNextBeacon(direction) {
		nextBeacon = "#job-1";
		if (direction=="left") {
			next_job = current_job-1;
			if (next_job<1) next_job=size_job;
			nextBeacon = "#job-"+next_job;
		} if (direction=="right") {
			nextBeacon = "#jobs";
		}
		return nextBeacon;

	}
	function revertSaveShare() {
		$(getCurrentBeacon()).animate({
			top: 0
			}, switchJobDelay, function() {
				swipeUpDown = 0;
				swipeLeftRight = 0;
		});
		
	}
	function swapRevert(direction) {
		if (direction=="left") {
			$(getCurrentBeacon()).animate({
				marginLeft: 0,
				left: 0,
				width: 640
			}, switchJobDelay, function () {
				$(this).width(640).css('margin-left','0px').css('left','0px');
			});
			$(getNextBeacon(direction)).animate({
				left: 0,
				width: 0,
				marginLeft: 640
			}, switchJobDelay, function() {
				swipeUpDown = 0;
				swipeLeftRight = 0;
			
			});
		} else if (direction=="right") {
			$(getCurrentBeacon()).animate({
				marginLeft: 0,
				left: 0,
				width: 640
			}, switchJobDelay, function () {
				$(this).width(640).css('margin-left','0px').css('left','0px');
			});
			$(getNextBeacon(direction)).animate({
				left: -640,
				width: 640,
				marginLeft: 0
			}, switchJobDelay, function() {
				swipeUpDown = 0;
				swipeLeftRight = 0;
			
			});

		}
	}
	function swapJobFinish(direction) {
		transition = true;
			//alert(next);
		if (direction=="left") {
			//alert(getCurrentBeacon());
			$('.round-1, #round-2, #jobs').not(getNextBeacon(direction)).not(getCurrentBeacon()).stop(true,true).hide().css('margin-left','0px').css('left','0px');
			$(getCurrentBeacon()).stop(true,true).show().width(640).css('left','0px').css('z-index', 2001).animate({
				marginLeft: -640
			}, switchJobDelay, function () {
			
			});//fadeOut(switchJobDelay);
			$(getNextBeacon(direction)).stop(true,true).show().css('left','0px').css('opacity','1').css('z-index', 2002).css('overflow','hidden').animate({
				marginLeft: 0,
				width: 640
			}, switchJobDelay, function () {
				current_job = getNextJob(direction);
				circle_number = 0;
				round1 = true; 
				round2 = false;
				roundJobs = false;
				transition = false;
				swipeUpDown = 0;
				swipeLeftRight = 0;
			
			});
			//$('#jobs #article-'+current_job).hide();
		} else if (direction=="right") {
			//alert(getCurrentBeacon());
			$('#jobs, .round-1, #round-2').not(getNextBeacon(direction)).not(getCurrentBeacon()).stop(true,true).hide().css('margin-left','0px').css('left','0px');
			$(getCurrentBeacon()).stop(true,true).show().css('margin-left','0px').css('z-index', 2001).animate({
				left: 640,
				width: 0
			}, switchJobDelay, function () {
			
			});
			$(getNextBeacon(direction)).stop(true,true).show().css('margin-left','0px').css('opacity','1').css('z-index', 2002).animate({
				left: 0,
				width: 640
			}, switchJobDelay, function () {
				current_job = getNextJob();
				circle_number = 0;
				round1 = false; 
				round2 = false;
				roundJobs = true;
				transition = false;
				swipeUpDown = 0;
				swipeLeftRight = 0;
			
			});
		}
	}
$(document).ready(function() {
	dHeight=parseInt(($(window).height()-422)/2);
//	dHeight=parseInt((1136-960)/2);
	if (1|| ($('#round-1').length || $('#round-1').length)&& dHeight>0) {
		//alert ('hi'); 
		$('.circle-1').css('top', function (index, curValue) {
			return (parseInt(curValue)+dHeight + 'px');
		});
		$('.span-1').css('top', function (index, curValue) {
			return (parseInt(curValue)+dHeight + 'px');
		});
		$('.span-2').css('top', function (index, curValue) {
			return (parseInt(curValue)+dHeight + 'px');
		});
		$('.span-3').css('top', function (index, curValue) {
			return (parseInt(curValue)+dHeight + 'px');
		});
 
	}
	function circle_tap(target) {
		//alert(target);
		if ($(target).children('span.circle').html()=="" || $(target).children('span.circle').html()==" " || $(target).children('span.circle').html()=="&nbsp;") {
			circle_number++;
			$(target).children('span.circle').html(circle_number);
			$('.jumbotron input.click-'+circle_number).attr('value',$(target).attr('data'));
			if (circle_number==3) {
				if (!round2) {
					$.fn.swipe.pageScroll.AUTO;
					$('.round-1').css('opacity','1').animate({
						opacity: 0
					}, transitionRound2, function() {
						$(this).hide();
						$(this).css('opacity','1');
					});
					$('#round-2').width(640).show().css('overflow', 'hidden').css('opacity','0').animate({
						opacity: 1
					}, transitionRound2);
					circle_number = 0;
					round1 = false; 
					round2 = true;
					roundJobs = false;
				} 
			}
			if (circle_number==2) {
				if (round2) {
					$('#round-2').css('opacity','1').animate({
						opacity: 0
					}, transitionRound2, function() {
						$(this).hide();
						$(this).css('opacity','1');
					});
					$('#jobs').hide().css('overflow', 'hidden').css('scrollTop','0px').show().css('opacity','0').animate({
						opacity: 1
					}, transitionRound2, function() {
						$('#jobs #wrapper').height(($('#jobs #wrapper article').height()+41)+'px');
						$(this).css('opacity','1');

					});
					circle_number = 0;
					round1 = false;
					round2 = false;
					roundJobs = true;
					$('.navbar-header').hide();
					$('.navbar').hide();
				}
			}
		}
	}
	$('.jumbotron > span').swipe({
		tap:function(event, target) {
			circle_tap(target);
		},
		doubletap:function(event, target) {
			circle_tap(target);
		},
		longtap:function(event, target) {
			circle_tap(target);
		}, 
		threshold: 50 

	});
	$('.jumbotron > span > span').swipe({
		tap:function(event, target) {
			circle_tap($(target).parent('span'));
		},
		doubletap:function(event, target) {
			circle_tap($(target).parent('span'));
		},
		longtap:function(event, target) {
			circle_tap($(target).parent('span'));
		}

	});
	function slideBeacon(distance,direction,phase,duration) {
		if (distance>maxDragAmount)
			distance = maxDragAmount;
		if (distance>50 && (direction=="left" || direction=="right")) {
			//alert(swipeUpDown+' '+swipeLeftRight+' '+minDragAmount);
		}
		if (swipeUpDown<minDragAmount && 
		(direction=="left" || foundJob && direction=="right" && !roundJobs)) {
			swipeLeftRight = minDragAmount;
			swipeUpDown = 0;
/*			if (direction=="left") {
				next_job = current_job+1;
				if (next_job>size_job) next_job=1;
			} else if (00 && direction=="right") {		
				next_job = current_job-1;
				if (next_job<1) next_job=size_job;
			}
			next=next_job;*/
			if (distance>dragDistance) {
				if (phase=="end") {
					if (distance>dragThreshold) {
						//$('html,body').stop().scrollTop(0);
						circle_number = 0;
						/*round1 = true; 
						round2 = false;
						roundJobs = false;*/
						$('.navbar-header').show();
						$('.navbar').show();
						$('.navbar-header-top').slideUp(0);
						$('.navbar-header-bottom').animate({
							height: 0
						}, 0, function() {
							$(this).hide();
						});
						$('.jumbotron span span.circle').html('&nbsp;');
						circle_number = 0;
						$('.jumbotron input').attr('value','');
						swapJobFinish(direction);
					} else swapRevert(direction);
				} else if (phase=="cancel") {
					swapRevert(direction);
				} else if (direction=="right") {
					$('#jobs, .round-1, #round-2').not(getNextBeacon(direction)).not(getCurrentBeacon()).css('margin-left','0px').css('left','0px').stop(true,true).hide();
					$(getCurrentBeacon()).
						css('margin-left','0px').
						css('overflow','hidden').
						show().
						css('z-index', 2001).
						css('left',(distance-dragDistance)+'px').
						width(640-(distance-dragDistance));
					$(getNextBeacon(direction)). 
						css('margin-left','0px').
						width(640).
						css('z-index', 2002).
						css('overflow','hidden').
						css('left',(distance-dragDistance-640)+'px').
						show();
				
				} else if (direction=="left") {
					$('#jobs, .round-1, #round-2').not(getNextBeacon(direction)).not(getCurrentBeacon()).css('margin-left','0px').css('left','0px').stop(true,true).hide();
					$(getCurrentBeacon()).
						show().
						css('left','0px').
						width(640).
						css('z-index', 2001).
						css('margin-left',(dragDistance-distance)+'px');
					$(getNextBeacon(direction)).css('overflow','hidden').
						css('left','0px').
						css('z-index', 2002).
						css('margin-left',(640+dragDistance-distance)+'px').
						width(distance-dragDistance).
						show();
					//$('#jobs #article-'+current_job).hide();
				}
			} 
		} else if (!roundJobs && swipeLeftRight<minDragAmount && direction=="up") {
			swipeLeftRight = 0;
			swipeUpDown = minDragAmount;
			if (phase=="end") {
				dragShareSave = false
				revertSaveShare();
				$('#save,#share').stop(true,true).fadeOut(transitionShareSave, function() {
					$(this).hide();
				});				
			} else {
				if (getCurrentBeacon() != "#jobs")
				$(getCurrentBeacon()).
					css('margin-left','0px').
					css('left','0px').
					css('overflow','hidden').
					show().
					css('z-index', 2001).
					css('top',(dragDistance-distance)+'px').
					width(640);
				if (distance>minDragShareSaveAmount) {
					$('#share').css('opacity',(distance-minDragShareSaveAmount)/100).show();

				} else $('#save, #share').hide();
			}
		} else if (!roundJobs && swipeLeftRight<minDragAmount && direction=="down") {
			swipeLeftRight = 0;
			swipeUpDown = minDragAmount;
			if (phase=="end") {
				dragShareSave = false
				revertSaveShare();
				$('#save,#share').stop(true,true).fadeOut(transitionShareSave, function() {
					$(this).hide();
				});				
			} else {
				if (getCurrentBeacon() != "#jobs")
				$(getCurrentBeacon()).
					css('margin-left','0px').
					css('left','0px').
					css('overflow','hidden').
					show().
					css('z-index', 2001).
					css('top',(distance-dragDistance)+'px').
					width(640);
				if (distance>minDragShareSaveAmount) {
					$('#save').css('opacity',(distance-minDragShareSaveAmount)/100).show();
				} else $('#save, #share').hide();
			}
		}
	}
 	$(window).swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers)
        {
			if (round1 || round2 || roundJobs) {
				if (distance>dragDistance && (!transition || !transitionPause)) 
					slideBeacon(distance, direction, phase,duration);
			}
        },
		swipeDown:function(event, direction, distance, duration, fingerCount) {
			if (roundJobs) {
				//alert('swipe Down');
				if ((parseInt($("#jobs").css('margin-top'))-scrollAmount)<0) {

					$('#jobs').stop().animate({
						marginTop: 0
					}, scrollDelay,'easeInOutExpo');
				} else {
					$('#jobs').stop().animate({
						marginTop: "+="+scrollAmount
					}, scrollDelay,'easeInOutExpo');			
				}
				if (0)
				$('html,body').stop().animate({
					scrollTop: "-="+scrollAmount
				}, scrollDelay,'easeInOutExpo');			
			}
		},
		swipeUp:function(event, direction, distance, duration, fingerCount) {
			if (roundJobs) {
				//alert('swipe Up');
/*				scrollAmount = distance;
				if (scrollAmount<100) scrollAmount*/
				//alert('(0-('+parseInt($("#jobs").css('margin-top'))+'-'+scrollAmount+'))>('+$("#jobs").height()+'-'+$(window).height);
				if ((0-(parseInt($("#jobs").css('margin-top'))-scrollAmount))>($("#jobs").height()-$(window).height())) {
					$('#jobs').stop().animate({
						marginTop: ($(window).height()-$("#jobs").height())
					}, scrollDelay,'easeInOutExpo');			
				
				} else {
					$('#jobs').stop().animate({
						marginTop: "-="+scrollAmount
					}, scrollDelay,'easeInOutExpo');			
				}
				if (0)
				$('html,body').stop().animate({
					scrollTop: "+="+scrollAmount
				}, scrollDelay,'easeInOutExpo');			
			}
		},
		allowPageScroll:"auto"
	});	
$('.round-1,#round-2').height($(window).height());
	
});