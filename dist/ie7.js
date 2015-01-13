/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icomoon-accessibility': '&#xe600;',
		'icomoon-face-unlock': '&#xe601;',
		'icomoon-perm-contact-cal': '&#xe602;',
		'icomoon-reorder': '&#xe603;',
		'icomoon-contacts': '&#xe604;',
		'icomoon-quick-contacts-dialer': '&#xe605;',
		'icomoon-quick-contacts-mail': '&#xe606;',
		'icomoon-add': '&#xe607;',
		'icomoon-clear': '&#xe608;',
		'icomoon-keyboard-control': '&#xe609;',
		'icomoon-local-phone': '&#xe60a;',
		'icomoon-check-box': '&#xe60b;',
		'icomoon-check-box-outline-blank': '&#xe60c;',
		'icomoon-radio-button-off': '&#xe60d;',
		'icomoon-radio-button-on': '&#xe60e;',
		'icomoon-settings': '&#xe60f;',
		'icomoon-params': '&#xe610;',
		'icomoon-data': '&#xe611;',
		'icomoon-glass': '&#xf000;',
		'icomoon-music': '&#xf001;',
		'icomoon-search': '&#xf002;',
		'icomoon-envelope-o': '&#xf003;',
		'icomoon-heart': '&#xf004;',
		'icomoon-star': '&#xf005;',
		'icomoon-star-o': '&#xf006;',
		'icomoon-user': '&#xf007;',
		'icomoon-film': '&#xf008;',
		'icomoon-th-large': '&#xf009;',
		'icomoon-th': '&#xf00a;',
		'icomoon-th-list': '&#xf00b;',
		'icomoon-check': '&#xf00c;',
		'icomoon-close': '&#xf00d;',
		'icomoon-search-plus': '&#xf00e;',
		'icomoon-search-minus': '&#xf010;',
		'icomoon-power-off': '&#xf011;',
		'icomoon-signal': '&#xf012;',
		'icomoon-cog': '&#xf013;',
		'icomoon-trash-o': '&#xf014;',
		'icomoon-home': '&#xf015;',
		'icomoon-file-o': '&#xf016;',
		'icomoon-clock-o': '&#xf017;',
		'icomoon-road': '&#xf018;',
		'icomoon-download': '&#xf019;',
		'icomoon-arrow-circle-o-down': '&#xf01a;',
		'icomoon-arrow-circle-o-up': '&#xf01b;',
		'icomoon-inbox': '&#xf01c;',
		'icomoon-play-circle-o': '&#xf01d;',
		'icomoon-repeat': '&#xf01e;',
		'icomoon-refresh': '&#xf021;',
		'icomoon-list-alt': '&#xf022;',
		'icomoon-lock': '&#xf023;',
		'icomoon-flag': '&#xf024;',
		'icomoon-headphones': '&#xf025;',
		'icomoon-volume-off': '&#xf026;',
		'icomoon-volume-down': '&#xf027;',
		'icomoon-volume-up': '&#xf028;',
		'icomoon-qrcode': '&#xf029;',
		'icomoon-barcode': '&#xf02a;',
		'icomoon-tag': '&#xf02b;',
		'icomoon-tags': '&#xf02c;',
		'icomoon-book': '&#xf02d;',
		'icomoon-bookmark': '&#xf02e;',
		'icomoon-print': '&#xf02f;',
		'icomoon-camera': '&#xf030;',
		'icomoon-font': '&#xf031;',
		'icomoon-bold': '&#xf032;',
		'icomoon-italic': '&#xf033;',
		'icomoon-text-height': '&#xf034;',
		'icomoon-text-width': '&#xf035;',
		'icomoon-align-left': '&#xf036;',
		'icomoon-align-center': '&#xf037;',
		'icomoon-align-right': '&#xf038;',
		'icomoon-align-justify': '&#xf039;',
		'icomoon-list': '&#xf03a;',
		'icomoon-dedent': '&#xf03b;',
		'icomoon-indent': '&#xf03c;',
		'icomoon-video-camera': '&#xf03d;',
		'icomoon-image': '&#xf03e;',
		'icomoon-pencil': '&#xf040;',
		'icomoon-map-marker': '&#xf041;',
		'icomoon-adjust': '&#xf042;',
		'icomoon-tint': '&#xf043;',
		'icomoon-edit': '&#xf044;',
		'icomoon-share-square-o': '&#xf045;',
		'icomoon-check-square-o': '&#xf046;',
		'icomoon-arrows': '&#xf047;',
		'icomoon-step-backward': '&#xf048;',
		'icomoon-fast-backward': '&#xf049;',
		'icomoon-backward': '&#xf04a;',
		'icomoon-play': '&#xf04b;',
		'icomoon-pause': '&#xf04c;',
		'icomoon-stop': '&#xf04d;',
		'icomoon-forward': '&#xf04e;',
		'icomoon-fast-forward': '&#xf050;',
		'icomoon-step-forward': '&#xf051;',
		'icomoon-eject': '&#xf052;',
		'icomoon-chevron-left': '&#xf053;',
		'icomoon-chevron-right': '&#xf054;',
		'icomoon-plus-circle': '&#xf055;',
		'icomoon-minus-circle': '&#xf056;',
		'icomoon-times-circle': '&#xf057;',
		'icomoon-check-circle': '&#xf058;',
		'icomoon-question-circle': '&#xf059;',
		'icomoon-info-circle': '&#xf05a;',
		'icomoon-crosshairs': '&#xf05b;',
		'icomoon-times-circle-o': '&#xf05c;',
		'icomoon-check-circle-o': '&#xf05d;',
		'icomoon-ban': '&#xf05e;',
		'icomoon-arrow-left': '&#xf060;',
		'icomoon-arrow-right': '&#xf061;',
		'icomoon-arrow-up': '&#xf062;',
		'icomoon-arrow-down': '&#xf063;',
		'icomoon-mail-forward': '&#xf064;',
		'icomoon-expand': '&#xf065;',
		'icomoon-compress': '&#xf066;',
		'icomoon-plus': '&#xf067;',
		'icomoon-minus': '&#xf068;',
		'icomoon-asterisk': '&#xf069;',
		'icomoon-exclamation-circle': '&#xf06a;',
		'icomoon-gift': '&#xf06b;',
		'icomoon-leaf': '&#xf06c;',
		'icomoon-fire': '&#xf06d;',
		'icomoon-eye': '&#xf06e;',
		'icomoon-eye-slash': '&#xf070;',
		'icomoon-exclamation-triangle': '&#xf071;',
		'icomoon-plane': '&#xf072;',
		'icomoon-calendar': '&#xf073;',
		'icomoon-random': '&#xf074;',
		'icomoon-comment': '&#xf075;',
		'icomoon-magnet': '&#xf076;',
		'icomoon-chevron-up': '&#xf077;',
		'icomoon-chevron-down': '&#xf078;',
		'icomoon-retweet': '&#xf079;',
		'icomoon-shopping-cart': '&#xf07a;',
		'icomoon-folder': '&#xf07b;',
		'icomoon-folder-open': '&#xf07c;',
		'icomoon-arrows-v': '&#xf07d;',
		'icomoon-arrows-h': '&#xf07e;',
		'icomoon-bar-chart': '&#xf080;',
		'icomoon-twitter-square': '&#xf081;',
		'icomoon-facebook-square': '&#xf082;',
		'icomoon-camera-retro': '&#xf083;',
		'icomoon-key': '&#xf084;',
		'icomoon-cogs': '&#xf085;',
		'icomoon-comments': '&#xf086;',
		'icomoon-thumbs-o-up': '&#xf087;',
		'icomoon-thumbs-o-down': '&#xf088;',
		'icomoon-star-half': '&#xf089;',
		'icomoon-heart-o': '&#xf08a;',
		'icomoon-sign-out': '&#xf08b;',
		'icomoon-linkedin-square': '&#xf08c;',
		'icomoon-thumb-tack': '&#xf08d;',
		'icomoon-external-link': '&#xf08e;',
		'icomoon-sign-in': '&#xf090;',
		'icomoon-trophy': '&#xf091;',
		'icomoon-github-square': '&#xf092;',
		'icomoon-upload': '&#xf093;',
		'icomoon-lemon-o': '&#xf094;',
		'icomoon-phone': '&#xf095;',
		'icomoon-square-o': '&#xf096;',
		'icomoon-bookmark-o': '&#xf097;',
		'icomoon-phone-square': '&#xf098;',
		'icomoon-twitter': '&#xf099;',
		'icomoon-facebook': '&#xf09a;',
		'icomoon-github': '&#xf09b;',
		'icomoon-unlock': '&#xf09c;',
		'icomoon-credit-card': '&#xf09d;',
		'icomoon-rss': '&#xf09e;',
		'icomoon-hdd-o': '&#xf0a0;',
		'icomoon-bullhorn': '&#xf0a1;',
		'icomoon-bell-o': '&#xf0a2;',
		'icomoon-certificate': '&#xf0a3;',
		'icomoon-hand-o-right': '&#xf0a4;',
		'icomoon-hand-o-left': '&#xf0a5;',
		'icomoon-hand-o-up': '&#xf0a6;',
		'icomoon-hand-o-down': '&#xf0a7;',
		'icomoon-arrow-circle-left': '&#xf0a8;',
		'icomoon-arrow-circle-right': '&#xf0a9;',
		'icomoon-arrow-circle-up': '&#xf0aa;',
		'icomoon-arrow-circle-down': '&#xf0ab;',
		'icomoon-globe': '&#xf0ac;',
		'icomoon-wrench': '&#xf0ad;',
		'icomoon-tasks': '&#xf0ae;',
		'icomoon-filter': '&#xf0b0;',
		'icomoon-briefcase': '&#xf0b1;',
		'icomoon-arrows-alt': '&#xf0b2;',
		'icomoon-group': '&#xf0c0;',
		'icomoon-chain': '&#xf0c1;',
		'icomoon-cloud': '&#xf0c2;',
		'icomoon-flask': '&#xf0c3;',
		'icomoon-cut': '&#xf0c4;',
		'icomoon-copy': '&#xf0c5;',
		'icomoon-paperclip': '&#xf0c6;',
		'icomoon-floppy-o': '&#xf0c7;',
		'icomoon-square': '&#xf0c8;',
		'icomoon-bars': '&#xf0c9;',
		'icomoon-list-ul': '&#xf0ca;',
		'icomoon-list-ol': '&#xf0cb;',
		'icomoon-strikethrough': '&#xf0cc;',
		'icomoon-underline': '&#xf0cd;',
		'icomoon-table': '&#xf0ce;',
		'icomoon-magic': '&#xf0d0;',
		'icomoon-truck': '&#xf0d1;',
		'icomoon-pinterest': '&#xf0d2;',
		'icomoon-pinterest-square': '&#xf0d3;',
		'icomoon-google-plus-square': '&#xf0d4;',
		'icomoon-google-plus': '&#xf0d5;',
		'icomoon-money': '&#xf0d6;',
		'icomoon-caret-down': '&#xf0d7;',
		'icomoon-caret-up': '&#xf0d8;',
		'icomoon-caret-left': '&#xf0d9;',
		'icomoon-caret-right': '&#xf0da;',
		'icomoon-columns': '&#xf0db;',
		'icomoon-sort': '&#xf0dc;',
		'icomoon-sort-desc': '&#xf0dd;',
		'icomoon-sort-asc': '&#xf0de;',
		'icomoon-envelope': '&#xf0e0;',
		'icomoon-linkedin': '&#xf0e1;',
		'icomoon-rotate-left': '&#xf0e2;',
		'icomoon-gavel': '&#xf0e3;',
		'icomoon-dashboard': '&#xf0e4;',
		'icomoon-comment-o': '&#xf0e5;',
		'icomoon-comments-o': '&#xf0e6;',
		'icomoon-bolt': '&#xf0e7;',
		'icomoon-sitemap': '&#xf0e8;',
		'icomoon-umbrella': '&#xf0e9;',
		'icomoon-clipboard': '&#xf0ea;',
		'icomoon-lightbulb-o': '&#xf0eb;',
		'icomoon-exchange': '&#xf0ec;',
		'icomoon-cloud-download': '&#xf0ed;',
		'icomoon-cloud-upload': '&#xf0ee;',
		'icomoon-user-md': '&#xf0f0;',
		'icomoon-stethoscope': '&#xf0f1;',
		'icomoon-suitcase': '&#xf0f2;',
		'icomoon-bell': '&#xf0f3;',
		'icomoon-coffee': '&#xf0f4;',
		'icomoon-cutlery': '&#xf0f5;',
		'icomoon-file-text-o': '&#xf0f6;',
		'icomoon-building-o': '&#xf0f7;',
		'icomoon-hospital-o': '&#xf0f8;',
		'icomoon-ambulance': '&#xf0f9;',
		'icomoon-medkit': '&#xf0fa;',
		'icomoon-fighter-jet': '&#xf0fb;',
		'icomoon-beer': '&#xf0fc;',
		'icomoon-h-square': '&#xf0fd;',
		'icomoon-plus-square': '&#xf0fe;',
		'icomoon-angle-double-left': '&#xf100;',
		'icomoon-angle-double-right': '&#xf101;',
		'icomoon-angle-double-up': '&#xf102;',
		'icomoon-angle-double-down': '&#xf103;',
		'icomoon-angle-left': '&#xf104;',
		'icomoon-angle-right': '&#xf105;',
		'icomoon-angle-up': '&#xf106;',
		'icomoon-angle-down': '&#xf107;',
		'icomoon-desktop': '&#xf108;',
		'icomoon-laptop': '&#xf109;',
		'icomoon-tablet': '&#xf10a;',
		'icomoon-mobile': '&#xf10b;',
		'icomoon-circle-o': '&#xf10c;',
		'icomoon-quote-left': '&#xf10d;',
		'icomoon-quote-right': '&#xf10e;',
		'icomoon-spinner': '&#xf110;',
		'icomoon-circle': '&#xf111;',
		'icomoon-mail-reply': '&#xf112;',
		'icomoon-github-alt': '&#xf113;',
		'icomoon-folder-o': '&#xf114;',
		'icomoon-folder-open-o': '&#xf115;',
		'icomoon-smile-o': '&#xf118;',
		'icomoon-frown-o': '&#xf119;',
		'icomoon-meh-o': '&#xf11a;',
		'icomoon-gamepad': '&#xf11b;',
		'icomoon-keyboard-o': '&#xf11c;',
		'icomoon-flag-o': '&#xf11d;',
		'icomoon-flag-checkered': '&#xf11e;',
		'icomoon-terminal': '&#xf120;',
		'icomoon-code': '&#xf121;',
		'icomoon-mail-reply-all': '&#xf122;',
		'icomoon-star-half-empty': '&#xf123;',
		'icomoon-location-arrow': '&#xf124;',
		'icomoon-crop': '&#xf125;',
		'icomoon-code-fork': '&#xf126;',
		'icomoon-chain-broken': '&#xf127;',
		'icomoon-question': '&#xf128;',
		'icomoon-info': '&#xf129;',
		'icomoon-exclamation': '&#xf12a;',
		'icomoon-superscript': '&#xf12b;',
		'icomoon-subscript': '&#xf12c;',
		'icomoon-eraser': '&#xf12d;',
		'icomoon-puzzle-piece': '&#xf12e;',
		'icomoon-microphone': '&#xf130;',
		'icomoon-microphone-slash': '&#xf131;',
		'icomoon-shield': '&#xf132;',
		'icomoon-calendar-o': '&#xf133;',
		'icomoon-fire-extinguisher': '&#xf134;',
		'icomoon-rocket': '&#xf135;',
		'icomoon-maxcdn': '&#xf136;',
		'icomoon-chevron-circle-left': '&#xf137;',
		'icomoon-chevron-circle-right': '&#xf138;',
		'icomoon-chevron-circle-up': '&#xf139;',
		'icomoon-chevron-circle-down': '&#xf13a;',
		'icomoon-html5': '&#xf13b;',
		'icomoon-css3': '&#xf13c;',
		'icomoon-anchor': '&#xf13d;',
		'icomoon-unlock-alt': '&#xf13e;',
		'icomoon-bullseye': '&#xf140;',
		'icomoon-ellipsis-h': '&#xf141;',
		'icomoon-ellipsis-v': '&#xf142;',
		'icomoon-rss-square': '&#xf143;',
		'icomoon-play-circle': '&#xf144;',
		'icomoon-ticket': '&#xf145;',
		'icomoon-minus-square': '&#xf146;',
		'icomoon-minus-square-o': '&#xf147;',
		'icomoon-level-up': '&#xf148;',
		'icomoon-level-down': '&#xf149;',
		'icomoon-check-square': '&#xf14a;',
		'icomoon-pencil-square': '&#xf14b;',
		'icomoon-external-link-square': '&#xf14c;',
		'icomoon-share-square': '&#xf14d;',
		'icomoon-compass': '&#xf14e;',
		'icomoon-caret-square-o-down': '&#xf150;',
		'icomoon-caret-square-o-up': '&#xf151;',
		'icomoon-caret-square-o-right': '&#xf152;',
		'icomoon-eur': '&#xf153;',
		'icomoon-gbp': '&#xf154;',
		'icomoon-dollar': '&#xf155;',
		'icomoon-inr': '&#xf156;',
		'icomoon-cny': '&#xf157;',
		'icomoon-rouble': '&#xf158;',
		'icomoon-krw': '&#xf159;',
		'icomoon-bitcoin': '&#xf15a;',
		'icomoon-file': '&#xf15b;',
		'icomoon-file-text': '&#xf15c;',
		'icomoon-sort-alpha-asc': '&#xf15d;',
		'icomoon-sort-alpha-desc': '&#xf15e;',
		'icomoon-sort-amount-asc': '&#xf160;',
		'icomoon-sort-amount-desc': '&#xf161;',
		'icomoon-sort-numeric-asc': '&#xf162;',
		'icomoon-sort-numeric-desc': '&#xf163;',
		'icomoon-thumbs-up': '&#xf164;',
		'icomoon-thumbs-down': '&#xf165;',
		'icomoon-youtube-square': '&#xf166;',
		'icomoon-youtube': '&#xf167;',
		'icomoon-xing': '&#xf168;',
		'icomoon-xing-square': '&#xf169;',
		'icomoon-youtube-play': '&#xf16a;',
		'icomoon-dropbox': '&#xf16b;',
		'icomoon-stack-overflow': '&#xf16c;',
		'icomoon-instagram': '&#xf16d;',
		'icomoon-flickr': '&#xf16e;',
		'icomoon-adn': '&#xf170;',
		'icomoon-bitbucket': '&#xf171;',
		'icomoon-bitbucket-square': '&#xf172;',
		'icomoon-tumblr': '&#xf173;',
		'icomoon-tumblr-square': '&#xf174;',
		'icomoon-long-arrow-down': '&#xf175;',
		'icomoon-long-arrow-up': '&#xf176;',
		'icomoon-long-arrow-left': '&#xf177;',
		'icomoon-long-arrow-right': '&#xf178;',
		'icomoon-apple': '&#xf179;',
		'icomoon-windows': '&#xf17a;',
		'icomoon-android': '&#xf17b;',
		'icomoon-linux': '&#xf17c;',
		'icomoon-dribbble': '&#xf17d;',
		'icomoon-skype': '&#xf17e;',
		'icomoon-foursquare': '&#xf180;',
		'icomoon-trello': '&#xf181;',
		'icomoon-female': '&#xf182;',
		'icomoon-male': '&#xf183;',
		'icomoon-gittip': '&#xf184;',
		'icomoon-sun-o': '&#xf185;',
		'icomoon-moon-o': '&#xf186;',
		'icomoon-archive': '&#xf187;',
		'icomoon-bug': '&#xf188;',
		'icomoon-vk': '&#xf189;',
		'icomoon-weibo': '&#xf18a;',
		'icomoon-renren': '&#xf18b;',
		'icomoon-pagelines': '&#xf18c;',
		'icomoon-stack-exchange': '&#xf18d;',
		'icomoon-arrow-circle-o-right': '&#xf18e;',
		'icomoon-arrow-circle-o-left': '&#xf190;',
		'icomoon-caret-square-o-left': '&#xf191;',
		'icomoon-dot-circle-o': '&#xf192;',
		'icomoon-wheelchair': '&#xf193;',
		'icomoon-vimeo-square': '&#xf194;',
		'icomoon-try': '&#xf195;',
		'icomoon-plus-square-o': '&#xf196;',
		'icomoon-space-shuttle': '&#xf197;',
		'icomoon-slack': '&#xf198;',
		'icomoon-envelope-square': '&#xf199;',
		'icomoon-wordpress': '&#xf19a;',
		'icomoon-openid': '&#xf19b;',
		'icomoon-bank': '&#xf19c;',
		'icomoon-graduation-cap': '&#xf19d;',
		'icomoon-yahoo': '&#xf19e;',
		'icomoon-google': '&#xf1a0;',
		'icomoon-reddit': '&#xf1a1;',
		'icomoon-reddit-square': '&#xf1a2;',
		'icomoon-stumbleupon-circle': '&#xf1a3;',
		'icomoon-stumbleupon': '&#xf1a4;',
		'icomoon-delicious': '&#xf1a5;',
		'icomoon-digg': '&#xf1a6;',
		'icomoon-pied-piper': '&#xf1a7;',
		'icomoon-pied-piper-alt': '&#xf1a8;',
		'icomoon-drupal': '&#xf1a9;',
		'icomoon-joomla': '&#xf1aa;',
		'icomoon-language': '&#xf1ab;',
		'icomoon-fax': '&#xf1ac;',
		'icomoon-building': '&#xf1ad;',
		'icomoon-child': '&#xf1ae;',
		'icomoon-paw': '&#xf1b0;',
		'icomoon-spoon': '&#xf1b1;',
		'icomoon-cube': '&#xf1b2;',
		'icomoon-cubes': '&#xf1b3;',
		'icomoon-behance': '&#xf1b4;',
		'icomoon-behance-square': '&#xf1b5;',
		'icomoon-steam': '&#xf1b6;',
		'icomoon-steam-square': '&#xf1b7;',
		'icomoon-recycle': '&#xf1b8;',
		'icomoon-automobile': '&#xf1b9;',
		'icomoon-cab': '&#xf1ba;',
		'icomoon-tree': '&#xf1bb;',
		'icomoon-spotify': '&#xf1bc;',
		'icomoon-deviantart': '&#xf1bd;',
		'icomoon-soundcloud': '&#xf1be;',
		'icomoon-database': '&#xf1c0;',
		'icomoon-file-pdf-o': '&#xf1c1;',
		'icomoon-file-word-o': '&#xf1c2;',
		'icomoon-file-excel-o': '&#xf1c3;',
		'icomoon-file-powerpoint-o': '&#xf1c4;',
		'icomoon-file-image-o': '&#xf1c5;',
		'icomoon-file-archive-o': '&#xf1c6;',
		'icomoon-file-audio-o': '&#xf1c7;',
		'icomoon-file-movie-o': '&#xf1c8;',
		'icomoon-file-code-o': '&#xf1c9;',
		'icomoon-vine': '&#xf1ca;',
		'icomoon-codepen': '&#xf1cb;',
		'icomoon-jsfiddle': '&#xf1cc;',
		'icomoon-life-bouy': '&#xf1cd;',
		'icomoon-circle-o-notch': '&#xf1ce;',
		'icomoon-ra': '&#xf1d0;',
		'icomoon-empire': '&#xf1d1;',
		'icomoon-git-square': '&#xf1d2;',
		'icomoon-git': '&#xf1d3;',
		'icomoon-hacker-news': '&#xf1d4;',
		'icomoon-tencent-weibo': '&#xf1d5;',
		'icomoon-qq': '&#xf1d6;',
		'icomoon-wechat': '&#xf1d7;',
		'icomoon-paper-plane': '&#xf1d8;',
		'icomoon-paper-plane-o': '&#xf1d9;',
		'icomoon-history': '&#xf1da;',
		'icomoon-circle-thin': '&#xf1db;',
		'icomoon-header': '&#xf1dc;',
		'icomoon-paragraph': '&#xf1dd;',
		'icomoon-sliders': '&#xf1de;',
		'icomoon-share-alt': '&#xf1e0;',
		'icomoon-share-alt-square': '&#xf1e1;',
		'icomoon-bomb': '&#xf1e2;',
		'icomoon-futbol-o': '&#xf1e3;',
		'icomoon-tty': '&#xf1e4;',
		'icomoon-binoculars': '&#xf1e5;',
		'icomoon-plug': '&#xf1e6;',
		'icomoon-slideshare': '&#xf1e7;',
		'icomoon-twitch': '&#xf1e8;',
		'icomoon-yelp': '&#xf1e9;',
		'icomoon-newspaper-o': '&#xf1ea;',
		'icomoon-wifi': '&#xf1eb;',
		'icomoon-calculator': '&#xf1ec;',
		'icomoon-paypal': '&#xf1ed;',
		'icomoon-google-wallet': '&#xf1ee;',
		'icomoon-cc-visa': '&#xf1f0;',
		'icomoon-cc-mastercard': '&#xf1f1;',
		'icomoon-cc-discover': '&#xf1f2;',
		'icomoon-cc-amex': '&#xf1f3;',
		'icomoon-cc-paypal': '&#xf1f4;',
		'icomoon-cc-stripe': '&#xf1f5;',
		'icomoon-bell-slash': '&#xf1f6;',
		'icomoon-bell-slash-o': '&#xf1f7;',
		'icomoon-trash': '&#xf1f8;',
		'icomoon-copyright': '&#xf1f9;',
		'icomoon-at': '&#xf1fa;',
		'icomoon-eyedropper': '&#xf1fb;',
		'icomoon-paint-brush': '&#xf1fc;',
		'icomoon-birthday-cake': '&#xf1fd;',
		'icomoon-area-chart': '&#xf1fe;',
		'icomoon-pie-chart': '&#xf200;',
		'icomoon-line-chart': '&#xf201;',
		'icomoon-lastfm': '&#xf202;',
		'icomoon-lastfm-square': '&#xf203;',
		'icomoon-toggle-off': '&#xf204;',
		'icomoon-toggle-on': '&#xf205;',
		'icomoon-bicycle': '&#xf206;',
		'icomoon-bus': '&#xf207;',
		'icomoon-ioxhost': '&#xf208;',
		'icomoon-angellist': '&#xf209;',
		'icomoon-cc': '&#xf20a;',
		'icomoon-ils': '&#xf20b;',
		'icomoon-meanpath': '&#xf20c;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icomoon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());