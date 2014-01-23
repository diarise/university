var dotsub_defaults = {
    subtitleArea: 'dotsubSubtitleArea',
    subtitleHolderHolder: 'dotsubSubtitleHolderHolder',
    subtitleHolder: 'dotsubSubtitleHolder',
    languageSelect: 'dotsubLanguageSelect',
    languageSelectHolder: 'dotsubLanguageSelectHolder',
    server: "http://dotsub.com",
    enableLanguageSelection: false,
    playerId: null,
    renderSelectionTo: null,
    showOnlyPublished: true
};

var dotsub_currentState = {
    currentCaptions: [],
    currentCaption: {startTime : -1, duration: -1},
    player: null
};

$(document).ready(function() {
    if(Drupal.settings.dotsub == null) {
        return;
    }
    configure();
    //get player if it is null
    if(!Drupal.settings.dotsub.player_id) {
        dotsub_currentState.player = $('video')[0]
    }
    else {
        dotsub_currentState.player = $("#"+Drupal.settings.dotsub.player_id)[0];
    }
    jwplayer(Drupal.settings.dotsub.player_id).onTime(function(e) {
        findCurrentCaption(jwplayer(Drupal.settings.dotsub.player_id).getPosition());
    });
    $('video').css("position", 'relative');

    $("<div id="+dotsub_defaults.subtitleHolderHolder+"> </div>").insertAfter(dotsub_currentState.player);
    $("<div id="+dotsub_defaults.subtitleHolder+"> </div>").appendTo('#'+dotsub_defaults.subtitleHolderHolder);
    $("<div id="+dotsub_defaults.subtitleArea+"> </div>").appendTo("#"+dotsub_defaults.subtitleHolder);

    if(Drupal.settings.dotsub.enableLanguageSelection) {
        fetchMetadata(Drupal.settings.dotsub.username, Drupal.settings.dotsub.externalId);
    }
    fetchCaptions(Drupal.settings.dotsub.username, Drupal.settings.dotsub.externalId, Drupal.settings.dotsub.language);

});

function configure() {
    if(Drupal.settings.dotsub.enableLanguageSelection == null) {
        Drupal.settings.dotsub.enableLanguageSelection = dotsub_defaults.enableLanguageSelection;
    }
    if(Drupal.settings.dotsub.showOnlyPublished == null) {
        Drupal.settings.dotsub.showOnlyPublished = dotsub_defaults.showOnlyPublished;
    }
}

function fetchCaptions(username, extId, language) {
    var subs = dotsub_defaults.server + "/media/u/"+ username +"/"+extId+"/c/"+language+"/js?callback=loadCaptions";
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = subs;
    headID.appendChild(newScript);
}

function loadCaptions(captions) {
    dotsub_currentState.currentCaptions = captions;
    dotsub_currentState.currentCaption = {startTime : -1, duration: -1};
    findCurrentCaption(jwplayer(Drupal.settings.dotsub.player_id).getPosition());
}

function fetchMetadata(username, extId) {
    var metadata = dotsub_defaults.server + "/media/u/"+ username +"/"+extId+"/md/js-metadata?callback=loadMetadata";
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = metadata;
    headID.appendChild(newScript);
}

function loadMetadata(metadata) {
    var render = $("#"+Drupal.settings.dotsub.renderSelectionTo)[0];
    if(!render) {
        $("<div id="+dotsub_defaults.languageSelectHolder+"> </div>").insertAfter("#"+dotsub_defaults.subtitleHolderHolder);
        render = $("#" + dotsub_defaults.languageSelectHolder)[0];
    }
    $("<select id='"+dotsub_defaults.languageSelect+"'>Language:<select>").appendTo($("#" + dotsub_defaults.languageSelectHolder));
    $("<option value='None'>Enable Captions</option>").appendTo("#" + dotsub_defaults.languageSelect);
    for(l in metadata.languages) {
        var option;
        option = "<option value='" + l + "'> " + metadata.languages[l].languageName + "</option>";
        if(l == Drupal.settings.dotsub.language && metadata.languages[l].percentageComplete == 100) {
            option = "<option value='" + l + "' selected='true'> " + metadata.languages[l].languageName + "</option>";
        }
        if(l == metadata.language) {
            $(option).appendTo("#" + dotsub_defaults.languageSelect);
        }
        else if(Drupal.settings.dotsub.showOnlyPublished && metadata.languages[l].workflowStatus == "PUBLISHED") {
            $(option).appendTo("#" + dotsub_defaults.languageSelect);
        }
        else if(!Drupal.settings.dotsub.showOnlyPublished && metadata.languages[l].percentageComplete == 100) {
            $(option).appendTo("#" + dotsub_defaults.languageSelect);
        }
    }
    //add the switch listener
    $("#" + dotsub_defaults.languageSelect).change(function(){
		
        var code = $("#" + dotsub_defaults.languageSelect)[0].value;
        if(code != "None") {
			 $("#" + dotsub_defaults.languageSelect + ' option[value="None"]').text('Remove Captions');
            fetchCaptions(Drupal.settings.dotsub.username, Drupal.settings.dotsub.externalId, $("#" + dotsub_defaults.languageSelect)[0].value);
        }
        else {
            dotsub_currentState.currentCaptions = [];
            dotsub_currentState.currentCaption = {startTime : -1, duration: -1};
            findCurrentCaption(-1);
			 $("#" + dotsub_defaults.languageSelect + ' option[value="None"]').text('Enable Captions');
        }
    });
}

function findCurrentCaption(videoTime) {
    //video time is in seconds
    videoTime = videoTime * 1000;
    var found = false;
    $.each(dotsub_currentState.currentCaptions,(function(index, item){
        if(item.startTime <= videoTime && (item.startTime + item.duration) > videoTime) {
            $("#"+dotsub_defaults.subtitleArea).html(item.content);
            found = true;
        }
    }));
    if(!found) {
        $("#"+dotsub_defaults.subtitleArea).html("");
    }
}