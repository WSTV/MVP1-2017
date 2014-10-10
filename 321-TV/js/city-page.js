var apiContext = "http://www.teacheranalytics.com/api/getdata.php";
var cityUri = apiContext + "?devtype=computer&datamode=city";

function populateCityMenu(cityId) {
	$.get(cityUri, function(xml){
		var json = $.xml2json(xml);
		populateCitiesForMenu($('#desktop-city-menu'), json);
		populateCitiesForDropdown($('#dropdown-city-menu'), json);
		populateCitiesForMenu($('#tablet-city-menu'), json);
		var cityid = cityId ? cityId : json.item[0].cityid;
		setSelectedCity(cityid);
	});
}

function populateCitiesForMenu(menu, json) {
	$(json.item).each(function() {
		var img = '<img class="button-img img-responsive" src="images/' + this.id + '.gif " alt="' + this.city + '">';
		var url = $.url().attr('path');
		$(menu).append(
			'<a id="#' + this.city + '" href="' + url + '?cityid=' + this.cityid + '" onClick="javascript:setSelectedCity(' + "'" + this.cityid + "'" + ');" title="' + this.city + '" class="btn btn-mini circle-button city-button cityButton_' + this.cityid + '">' + img + '</a>'
		);
	});
}


function populateCitiesForDropdown(menu, json) {
	$(menu).empty();
	$(json.item).each(function() {
		
		$(menu).append("<option value='"+this.id+"'>"+this.city+"</option>");
		/*var img = '<img class="button-img" src="images/' + this.id + '.gif " alt="' + this.city + '">';
		var url = $.url().attr('path');
		$(menu).append(
			'<a id="#' + this.city + '" href="' + url + '?cityid=' + this.cityid + '" onClick="javascript:setSelectedCity(' + "'" + this.cityid + "'" + ');" title="' + this.city + '" class="btn btn-large circle-button city-button cityButton_' + this.cityid + '">' + img + '</a>'
		);*/
	});
}

function setSelectedCity(id) {
	$('.city-button').each(function() {
		$(this).removeClass('active');
	});
	$('.cityButton_' + id).addClass('active');
	var title = $('.cityButton_' + id).attr('title');
	$('#active-city-link').empty();
	$('#active-city-link').append('<a class="anchor" href="#' + title + '">' + title + '</a>');
	populateChannelMenu(id);
	$(".city-name").text(title);
	
	//Setting header logo with channel id
	
	$(".header-logo").attr("src", $(".cityButton_"+id).find("img").attr("src") );
	
}

function populateChannelMenu(cityId, selectedChannel) {
	var channelUri = apiContext + "?devtype=computer&datamode=channel&id=" + cityId;
	$.get(channelUri, function(xml){
		var json = $.xml2json(xml);
		populateChannelsForMenu($('#desktop-channel-menu'), json);
		populateChannelsForDropdown($('#dropdown-channel-menu'), json);
		populateChannelsForMenu($('#tablet-channel-menu'), json);
	});
}

function populateChannelsForDropdown(menu, json) {
	$(menu).empty();
	$(json.item).each(function() {
		
		$(menu).append("<option value='"+this.id+"'>"+this.channel+"</option>");
		/*var img = '<img class="button-img" src="images/' + this.id + '.gif " alt="' + this.city + '">';
		var url = $.url().attr('path');
		$(menu).append(
			'<a id="#' + this.city + '" href="' + url + '?cityid=' + this.cityid + '" onClick="javascript:setSelectedCity(' + "'" + this.cityid + "'" + ');" title="' + this.city + '" class="btn btn-large circle-button city-button cityButton_' + this.cityid + '">' + img + '</a>'
		);*/
	});
}

function populateChannelsForMenu(menu, json) {
	$(menu).empty();
	$(menu).append('<div id="' + $(menu).attr('id') + '-pane" class="scroll-pane"><div>');
	$(json.item).each(function() {
		var img = '<img class="button-img img-responsive" src="' + this.imagename + '" alt="' + this.channel + '">';
		$('#' + $(menu).attr('id') + '-pane').append(
			'<a id="' + this.channel + '_' + $(menu).attr('id') + '" href="#' + this.channel + '" onClick="javascript:loadChannel(' + 
				"'" + this.channel + "'" + ',' + 
				"'" + this.channelid + "'" + ',' + 
				"'" + _.str.escapeHTML(this.embedcode) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta1) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta2) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta3) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta1type) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta2type) + "'" + ',' + 
				"'" + _.str.escapeHTML(this.cta3type) + "'" + 
			');" class="btn btn-mini circle-button channel-button channelButton_' + this.channel + '" title="' + this.channeldesc + '">' + img + '</a>'
		);
	});
	resizeScrollMenus();
	var selectedChannel = $.url().attr('fragment');


	if (selectedChannel) {
		var channelObject = getObjects(json.item, 'channel', selectedChannel);
		console.log(channelObject);
		loadChannel(
			channelObject.channel, 
			channelObject.channelid, 
			channelObject.embedcode, 
			channelObject.cta1, 
			channelObject.cta2, 
			channelObject.cta3,
			channelObject.cta1type, 
			channelObject.cta2type, 
			channelObject.cta3type);	
	}
	else {
		loadChannel(
			json.item[0].channel, 
			json.item[0].channelid, 
			json.item[0].embedcode, 
			json.item[0].cta1, 
			json.item[0].cta2, 
			json.item[0].cta3,
			json.item[0].cta1type, 
			json.item[0].cta2type, 
			json.item[0].cta3type);
	}
}

function populateFutureChannelSchedule(channelid, channel) {
	var resourceLink = apiContext + "?devtype=computer&datamode=futuresch&id=" + channelid;
	var scheduleArea = '#schedule-table';
	populateChannelSchedule(channelid, scheduleArea, resourceLink, channel, true);
}

function populateStoredContent(channelid, channel) {
	var resourceLink = apiContext + "?devtype=computer&datamode=pastsch&id=" + channelid;
	var scheduleArea = '#stored-content-table';
	populateChannelSchedule(channelid, scheduleArea, resourceLink, channel);
}

function populateChannelSchedule(channelid, scheduleArea, resourceLink, channel, disableLink) {
	$.get(resourceLink, function(xml){
		var json = $.xml2json(xml);
		$(scheduleArea).empty();
		$(json.item).each(function() {
			var contentLink = disableLink ? this.eventdesc : '<a href="#' + channel + '" onClick="javascript:loadVideo(' + "'" + _.str.escapeHTML(this.embedcode) + "'" + ');populateCtaContent(' + 
					 "'" + _.str.escapeHTML(this.cta1) + "'" + ',' + 
					 "'" + _.str.escapeHTML(this.cta2) + "'" + ',' +
					 "'" + _.str.escapeHTML(this.cta3) + "'" + ',' + 
					 "'" + this.cta1type + "'" + ',' + 
					 "'" + this.cta2type + "'" + ',' + 
					 "'" + this.cta3type + "'" + 
					');">' + this.eventdesc + '</a>';
			$(scheduleArea).append('<tr><td>' + this.schtime + '</td><td>' + contentLink + '</td></tr>');
		});
		
	});
}

function loadVideo(embeddedCode) {
	$('#video-well').html(_.str.unescapeHTML(embeddedCode));
	resizeFrame();
	resizeScrollMenus();
	$('html,body').animate({scrollTop: 0}, 800);
}

function loadChannel(channel, id, embeddedCode, cta1, cta2, cta3, cta1type, cta2type, cta3type) {
	$('.channel-button').each(function() {
		$(this).removeClass('active');
	});
	$('.channelButton_' + channel).addClass('active');
	$('.channelTitle').html(channel);
	$('#video-well').empty();
	if (embeddedCode) {		
		loadVideo(embeddedCode);
	}
	else {
		$('#video-well').html('<video width="100%" id="video" controls><source src="" type="video/mp4"></video>');
	}
	populateCtaContent(cta1, cta2, cta3, cta1type, cta2type, cta3type);
	$('#active-channel-link').empty();
	$('#active-channel-link').append('<a class="anchor" href="#' + channel + '">' + channel + '</a>');
	populateFutureChannelSchedule(id, channel);
	populateStoredContent(id, channel);
	
	//Setting header channel name
	$(".channel-name").text(channel);
	
	resizeScrollMenus();
}

function populateCtaContent(cta1, cta2, cta3, cta1type, cta2type, cta3type) {
	$('#cta1').empty();
	$('#cta2').empty();
	$('#cta3').empty();
	
	if (cta1type || cta1) {
		
		$('#cta1').append('<div class="">' + _.str.unescapeHTML(cta1) + '</div>');
		
		$('#cta1').find('a').attr("target","_blank");
		$('#cta1').find('a').addClass("");
		$('#cta1').find('a').text("Special Offer");
		$('#cta1').show();
	}
	else {
		
		$('#cta1').hide();
	}
	
	if (cta2type || cta2) {
		$('#cta2').append('<div class="">' + '<i class="icon-phone"></i>' + '<a href="tel:' + _.str.unescapeHTML(cta2) + '">' + _.str.unescapeHTML(cta2) + '</div>');
		//<div id="cta2" class="pop-up-text"></div>
		//$('#cta2').find('a').addClass("btn-video btn-cta");
		$('#cta2').find('a').addClass(" ");
		$('#cta2').show();
	}
	else {
		$(".cta2").hide();
		$('#cta2').hide();
	}
	
	if (cta3type || cta3) {
		$('#cta3').append('<div class="">' + '<i class="icon-star"></i>' + _.str.unescapeHTML(cta3) + '</div>');
		
		$('#cta3').find('a').attr("target","_coupon");
		//$('#cta3').find('a').addClass("btn-video btn-cta");
		$('#cta3').find('a').addClass("");
		
		$('#cta3').show();
	}
	else {
		$(".cta3").hide();
		$('#cta3').hide();
	}
}

function resizeFrame() {
	var videoWidth = $('.video-well').width();
	
	var frameWidth = $('.video-well').find('iframe').width();
	var frameHeight = $('.video-well').find('iframe').height();
	var frameRatio = frameHeight / frameWidth;
	
	frameWidth = videoWidth * .9;
	$('.video-well').find('iframe').attr('width', frameWidth);
	$('.video-well').find('iframe').attr('height', frameWidth * frameRatio);
}

function resizeScrollMenus() {
	var videoHeight = $('.video-well').height();
	$('.scroll-well').height(videoHeight * .95);
	
	resizeFrame();
	
	var scrollWellWidth = null;
	if ($('#desktop-city-menu').width() && $('#desktop-city-menu').width() != 0) {
		scrollWellWidth = $('#desktop-city-menu').width();
	}
	else {
		scrollWellWidth = $('#tablet-city-menu').width();
	}
	
	var buttonRadius = scrollWellWidth * .75;
	$('.circle-button').height(buttonRadius);
	$('.circle-button').width(buttonRadius);
	$('.button-img').height(buttonRadius);
	$('.button-img').width(buttonRadius);
	$('.circle-button').css('line-height', buttonRadius + 'px');
}

function togglePanel(panelId) {
	var panelTogglePill = $(panelId + '-toggle');
	if ($(panelTogglePill).hasClass('active')) {
		$(panelTogglePill).removeClass('active');
		$(panelId).hide();
	} else {
		$(panelTogglePill).addClass('active');
		$(panelId).show();
	}
}

function setActiveButton(buttonId) {
	$(buttonId).siblings().each(function() {
		$(this).removeClass('active');
	});
	$(buttonId).addClass('active');
}

$(window).resize(function() {
	resizeScrollMenus();
});

function getObjects(obj, key, val) 
{
    var newObj = false; 
    $.each(obj, function()
    {
        var testObject = this; 
        $.each(testObject, function(k,v)
        {
            if(val == v && k == key)
            {
                newObj = testObject;
            }
        });
    });

    return newObj;
}


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
	  	console.log(response);

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
		  document.getElementById('newsletter-name').value="";
		  document.getElementById('newsletter-zip').value="";
		} else {
		  alert('Undocumented error. Please refresh the page and try again.');
		}
	  }
