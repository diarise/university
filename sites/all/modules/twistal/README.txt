This module and it's sub-modules handle integration with Twistage, Dotsub and JWPlayer.

Installation:

Place this folder in your modules directory and enable as normal.

A default profile for twistage is added, you can edit this profile by visiting /admin/settings/twistal

Visit /admin/settings/twistal/dotsub and enter the dotsub user name

You can now add video fields to your selected content types


Theming:

The JWPlayer can be themed as per the documentation on their site.

Two variables are added to node.tpl.php for theming:
	$video_length; The total length of the video.
	$video_subtitles; The available languages for the video.