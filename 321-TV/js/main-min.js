window.fbAsyncInit = function() {
        FB.init({
          appId      : '256176231217869',
          xfbml      : true,
          version    : 'v2.0'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

function FBShareOp(){
	var product_name   = 	'SendaScript';
	var description	   =	'On average we spend an hour a day waiting in lines, that\'s 2-3 years of your life. While we can\'t reduce all your waiting time, World\'s latest pharmacy app, SendaScript, will ensure you don\'t ever have to wait inside a pharmacy again. Get your prescriptions dispensed & pay for them before you arrive. Check out how it works ENJOY!';
	var share_image	   =	'https://pbs.twimg.com/profile_images/481296278576328704/sXkjkqc5.png';
	var share_url	   =	'https://www.facebook.com/sendascript';	
        var share_capt     =    '';
    FB.ui({
        method: 'feed',
        name: product_name,
        link: share_url,
        picture: share_image,
        caption: share_capt,
        description: description

    }, function(response) {
        if(response && response.post_id){}
        else{}
    });
}

$(document).ready(
		function() {
			var c = false, b = false;
			$(".slide").css("opacity", 1);
			$(".main").onepage_scroll({
				sectionContainer : "section"
			});
			/*var a = new $.BigVideo({
				useFlashForFirefox : false
			});
			a.init();
			if (Modernizr.touch) {
				a.show("img/background1.jpg");
			} else {
				a.show("video/timelapse.mp4", {
					ambient : true,
					doLoop : true,
					altSource : "video/timelapse.ogv"
				});
			}
			setTimeout(function() {
				$("#big-video-wrap").show().animate({
					opacity : 1
				});
			}, 2500);*/
			$(".demo1 .rotate").textrotator({
				animation : "fade",
				speed : 2000
			});
			$(".take-a-look").on(
					"click",
					function() {
						$(".onepage-pagination li:nth-child(2)").children()
								.trigger("click");
					});
			$(".onepage-pagination").addClass("animated fadeInRight delay-3");
			$(".onepage-pagination").children().each(function() {
				switch ($(this).children().data("index")) {
				case 1:
					$(this).children().append("<i class='entypo-home'></i>");
					break;
				case 2:
					$(this).children().append("<i class='entypo-dot'></i>");
					break;
				case 3:
					$(this).children().append("<i class='entypo-dot-2'></i>");
					break;
				case 4:
					$(this).children().append("<i class='entypo-dot-3'></i>");
					break;
				case 5:
					$(this).children().append("<i class='entypo-mail'></i>");
					break;
				}
			});
			setInterval(function() {
				if ($("body").hasClass("viewing-page-2")) {
					$(".slide-1-title").removeClass("hide").addClass(
							"animated fadeInRight delay-1");
					$(".slide-1-1").removeClass("hide").addClass(
							"animated fadeInRight delay-3");
					$(".iphone-1").removeClass("hide").addClass(
							"animated fadeInUp delay-3");
					$(".slide-1-2").removeClass("hide").addClass(
							"animated fadeInDown delay-5");
					$(".slide-1-3").removeClass("hide").addClass(
							"animated fadeInDown delay-6");
					$(".slide-1-scroll").removeClass("hide").addClass(
							"animated fadeInDown delay-12");
					$(".icon span").css("color", "#fff");
					console.log(c);
					if (c == true) {
						$(".slide-1").css("background-color", "#1ABC9C");
					}
				}
				if ($("body").hasClass("viewing-page-3")) {
					$(".iphone-2").removeClass("hide").addClass(
							"animated fadeInDown delay-1");
					$(".slide-2-title").removeClass("hide").addClass(
							"animated fadeIn delay-3");
					$(".slide-2-1").removeClass("hide").addClass(
							"animated fadeIn delay-4");
					$(".slide-2-2").removeClass("hide").addClass(
							"animated fadeInDown delay-5");
					$(".slide-2-3").removeClass("hide").addClass(
							"animated fadeInDown delay-6");
					$(".slide-2-4").removeClass("hide").addClass(
							"animated fadeInDown delay-9");
					$(".slide-2-5").removeClass("hide").addClass(
							"animated fadeInDown delay-10");
					$(".slide-2-6").removeClass("hide").addClass(
							"animated fadeInDown delay-11");
					$(".slide-2-scroll").removeClass("hide").addClass(
							"animated fadeInDown delay-15");
					$(".icon span").css("color", "#fff");
					if (c == true) {
						$(".slide-2").css("background-color", "#34495e");
					}
				}
				if ($("body").hasClass("viewing-page-4")) {
					$(".slide-3-title").removeClass("hide").addClass(
							"animated fadeInLeft delay-1");
					$(".slide-3-1").removeClass("hide").addClass(
							"animated fadeInLeft delay-3");
					$(".iphone-3").removeClass("hide").addClass(
							"animated fadeInUp delay-3");
					$(".slide-3-2").removeClass("hide").addClass(
							"animated fadeInDown delay-5");
					$(".slide-3-3").removeClass("hide").addClass(
							"animated fadeInDown delay-6");
					$(".slide-3-scroll").removeClass("hide").addClass(
							"animated fadeInDown delay-12");
					$(".icon span").css("color", "#333");
					if (c === true) {
						$(".slide-3").css("background", "#f1c40f");
					}
				}
				if ($("body").hasClass("viewing-page-5")) {
					$(".icon span").css("color", "#fff");
				}
				if (c == true && b == false) {
					$(".slide-1").css("background", "#e74c3c");
					$(".slide-2").css("background", "#1ABC9C");
					$(".slide-3").css("background", "#34495e");
					b = true;
				}
			}, 300);
			$(".settings-icon").on("click", function() {
				$(this).parent().toggleClass("open");
			});
			$(".toggle-video").on("click", function() {
				$("#big-video-wrap").toggleClass("hide-video");
			});
			$(".toggle-opacity-first").on("click", function() {
				$(".home").toggleClass("full-color");
			});
			$(".toggle-opacity-all").on("click", function() {
				$(".home").toggleClass("full-color");
				$(".slide-1").toggleClass("full-color");
				$(".slide-2").toggleClass("full-color");
				$(".slide-3").toggleClass("full-color");
				$(".contact").toggleClass("full-color");
			});
			$(".toggle-phone").on(
					"click",
					function() {
						$(".home-phone").toggleClass("hide animated fadeIn");
						$(".home-copy").toggleClass(
								"col-sm-8 col-sm-offset-2 col-sm-6");
					});
			$(".toggle-slide-fade").on("click", function() {
				if (c === false) {
					c = true;
					console.log(c);
				} else {
					if (c === true) {
						c = false;
						console.log(c);
					}
				}
				$(".slide-1").toggleClass("fade-background");
				$(".slide-2").toggleClass("fade-background");
				$(".slide-3").toggleClass("fade-background");
			});

			/* ------------------------------------------------------------------------ */
	/* MAILCHIMP SUBSCRIPTION */
	/* ------------------------------------------------------------------------ */
		if ($('#newsletterform').length) {
		  if ($('#newsletterform').attr('data-mailchimp') == 'true') {
			$('#newsletterform').attr('action', 'subscribe-mailchimp.php');
			$('#newsletterform').ajaxForm({ dataType: 'json',
											timeout: 2000,
											success: mailchimpCallback});
		  } else {
			$('#newsletterform').attr('action', 'subscribe.php');
			$('#newsletterform').ajaxForm({ dataType: 'json',
											timeout: 2000,
											success: Callback});
		  }
		  $('#button-newsletter').click(function() { 
		  	$('#newsletterform').submit(); 
		  	return false; 
		  });
		} 	

		
	//TWITTER SHARE
	 $('.twitter-popup').click(function(event) {
    	var width  = 575,
        	height = 400,
        	left   = ($(window).width()  - width)  / 2,
        	top    = ($(window).height() - height) / 2,
        	url    = this.href,
        	opts   = 'status=1' +
            	     ',width='  + width  +
                	 ',height=' + height +
                 	',top='    + top    +
                 	',left='   + left;
    
    	window.open(url, 'twitter', opts);
 
    	return false;
  	});


		});

function Callback(response) {
		if (response.responseStatus == 'err') {
		  if (response.responseMsg == 'ajax') {
			alert('Error - this script can only be invoked via an AJAX call.');
		  } else if (response.responseMsg == 'fileopen') {
			alert('Error opening $emailsFile. Please refer to documentation for help.');
		  } else if (response.responseMsg == 'name') {
			alert('Please enter a valid name.');
		  } else if (response.responseMsg == 'email') {
			alert('Please enter a valid email address.');
		  } else if (response.responseMsg == 'duplicate') {
			alert('You are already subscribed to our newsletter.');
		  } else if (response.responseMsg == 'filewrite') {
			alert('Error writing to $emailsFile. Please refer to documentation for help.');
		  } else {
			alert('Undocumented error. Please refresh the page and try again.');
		  }
		} else if (response.responseStatus == 'ok') {
		  alert('Thank you for subscribing to our newsletter!');
		} else {
		  alert('Undocumented error. Please refresh the page and try again.');
		}
	  }
	  
	  
	  function mailchimpCallback(response) {
		if (response.responseStatus == 'err') {
		  if (response.responseMsg == 'ajax') {
			alert('Error - this script can only be invoked via an AJAX call.');
		  } else if (response.responseMsg == 'name') {
			alert('Please enter a valid name.');
		  } else if (response.responseMsg == 'email') {
			alert('Please enter a valid email address.');
		  } else if (response.responseMsg == 'listid') {
			alert('Invalid MailChimp list name.');
		  } else if (response.responseMsg == 'duplicate') {
			alert('You are already subscribed to our newsletter.');
		  } else {
			alert('Undocumented error (' + response.responseMsg + '). Please refresh the page and try again.');
		  }
		} else if (response.responseStatus == 'ok') {
		  alert('Thank you for subscribing! Please confirm your subscription in the email you\'ll receive shortly.');
		  document.getElementById('newsletter-email').value="";
		} else {
		  alert('Undocumented error. Please refresh the page and try again.');
		}
	  }