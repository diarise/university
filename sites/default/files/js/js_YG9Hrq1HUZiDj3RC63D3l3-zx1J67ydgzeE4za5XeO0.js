(function ($) {

/**
 * Terminology:
 *
 *   "Link" means "Everything which is in flag.tpl.php" --and this may contain
 *   much more than the <A> element. On the other hand, when we speak
 *   specifically of the <A> element, we say "element" or "the <A> element".
 */

/**
 * The main behavior to perform AJAX toggling of links.
 */
Drupal.flagLink = function(context) {
  /**
   * Helper function. Updates a link's HTML with a new one.
   *
   * @param element
   *   The <A> element.
   * @return
   *   The new link.
   */
  function updateLink(element, newHtml) {
    var $newLink = $(newHtml);

    // Initially hide the message so we can fade it in.
    $('.flag-message', $newLink).css('display', 'none');

    // Reattach the behavior to the new <A> element. This element
    // is either whithin the wrapper or it is the outer element itself.
    var $nucleus = $newLink.is('a') ? $newLink : $('a.flag', $newLink);
    $nucleus.addClass('flag-processed').click(flagClick);

    // Find the wrapper of the old link.
    var $wrapper = $(element).parents('.flag-wrapper:first');
    // Replace the old link with the new one.
    $wrapper.after($newLink).remove();
    Drupal.attachBehaviors($newLink.get(0));

    $('.flag-message', $newLink).fadeIn();
    setTimeout(function(){ $('.flag-message.flag-auto-remove', $newLink).fadeOut() }, 3000);
    return $newLink.get(0);
  }

  /**
   * A click handler that is attached to all <A class="flag"> elements.
   */
  function flagClick(event) {
    // Prevent the default browser click handler
    event.preventDefault();

    // 'this' won't point to the element when it's inside the ajax closures,
    // so we reference it using a variable.
    var element = this;

    // While waiting for a server response, the wrapper will have a
    // 'flag-waiting' class. Themers are thus able to style the link
    // differently, e.g., by displaying a throbber.
    var $wrapper = $(element).parents('.flag-wrapper');
    if ($wrapper.is('.flag-waiting')) {
      // Guard against double-clicks.
      return false;
    }
    $wrapper.addClass('flag-waiting');

    // Hide any other active messages.
    $('span.flag-message:visible').fadeOut();

    // Send POST request
    $.ajax({
      type: 'POST',
      url: element.href,
      data: { js: true },
      dataType: 'json',
      success: function (data) {
        data.link = $wrapper.get(0);
        $.event.trigger('flagGlobalBeforeLinkUpdate', [data]);
        if (!data.preventDefault) { // A handler may cancel updating the link.
          data.link = updateLink(element, data.newLink);
        }

        // Find all the link wrappers on the page for this flag, but exclude
        // the triggering element because Flag's own javascript updates it.
        var $wrappers = $('.flag-wrapper.flag-' + data.flagName.flagNameToCSS() + '-' + data.contentId).not(data.link);
        var $newLink = $(data.newLink);

        // Hide message, because we want the message to be shown on the triggering element alone.
        $('.flag-message', $newLink).hide();

        // Finally, update the page.
        $wrappers = $newLink.replaceAll($wrappers);
        Drupal.attachBehaviors($wrappers.parent());

        $.event.trigger('flagGlobalAfterLinkUpdate', [data]);
      },
      error: function (xmlhttp) {
        alert('An HTTP error '+ xmlhttp.status +' occurred.\n'+ element.href);
        $wrapper.removeClass('flag-waiting');
      }
    });
  }

  $('a.flag-link-toggle:not(.flag-processed)', context).addClass('flag-processed').click(flagClick);
};

/**
 * Prevent anonymous flagging unless the user has JavaScript enabled.
 */
Drupal.flagAnonymousLinks = function(context) {
  $('a.flag:not(.flag-anonymous-processed)', context).each(function() {
    this.href += (this.href.match(/\?/) ? '&' : '?') + 'has_js=1';
    $(this).addClass('flag-anonymous-processed');
  });
}

String.prototype.flagNameToCSS = function() {
  return this.replace(/_/g, '-');
}

/**
 * A behavior specifically for anonymous users. Update links to the proper state.
 */
Drupal.flagAnonymousLinkTemplates = function(context) {
  // Swap in current links. Cookies are set by PHP's setcookie() upon flagging.

  var templates = Drupal.settings.flag.templates;

  // Build a list of user-flags.
  var userFlags = Drupal.flagCookie('flags');
  if (userFlags) {
    userFlags = userFlags.split('+');
    for (var n in userFlags) {
      var flagInfo = userFlags[n].match(/(\w+)_(\d+)/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      // User flags always default to off and the JavaScript toggles them on.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).after(templates[flagName + '_' + contentId]).remove();
      }
    }
  }

  // Build a list of global flags.
  var globalFlags = document.cookie.match(/flag_global_(\w+)_(\d+)=([01])/g);
  if (globalFlags) {
    for (var n in globalFlags) {
      var flagInfo = globalFlags[n].match(/flag_global_(\w+)_(\d+)=([01])/);
      var flagName = flagInfo[1];
      var contentId = flagInfo[2];
      var flagState = (flagInfo[3] == '1') ? 'flag' : 'unflag';
      // Global flags are tricky, they may or may not be flagged in the page
      // cache. The template always contains the opposite of the current state.
      // So when checking global flag cookies, we need to make sure that we
      // don't swap out the link when it's already in the correct state.
      if (templates[flagName + '_' + contentId]) {
        $('.flag-' + flagName.flagNameToCSS() + '-' + contentId, context).each(function() {
          if ($(this).find('.' + flagState + '-action').size()) {
            $(this).after(templates[flagName + '_' + contentId]).remove();
          }
        });
      }
    }
  }
}

/**
 * Utility function used to set Flag cookies.
 *
 * Note this is a direct copy of the jQuery cookie library.
 * Written by Klaus Hartl.
 */
Drupal.flagCookie = function(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    // NOTE Needed to parenthesize options.path and options.domain
    // in the following expressions, otherwise they evaluate to undefined
    // in the packed version for some reason...
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

Drupal.behaviors.flagLink = {};
Drupal.behaviors.flagLink.attach = function(context) {
  // For anonymous users with the page cache enabled, swap out links with their
  // current state for the user.
  if (Drupal.settings.flag && Drupal.settings.flag.templates) {
    Drupal.flagAnonymousLinkTemplates(context);
  }

  // For all anonymous users, require JavaScript for flagging to prevent spiders
  // from flagging things inadvertently.
  if (Drupal.settings.flag && Drupal.settings.flag.anonymous) {
    Drupal.flagAnonymousLinks(context);
  }

  // On load, bind the click behavior for all links on the page.
  Drupal.flagLink(context);
};

})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches sticky table headers.
 */
Drupal.behaviors.tableHeader = {
  attach: function (context, settings) {
    if (!$.support.positionFixed) {
      return;
    }

    $('table.sticky-enabled', context).once('tableheader', function () {
      $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
    });
  }
};

/**
 * Constructor for the tableHeader object. Provides sticky table headers.
 *
 * @param table
 *   DOM object for the table to add a sticky header to.
 */
Drupal.tableHeader = function (table) {
  var self = this;

  this.originalTable = $(table);
  this.originalHeader = $(table).children('thead');
  this.originalHeaderCells = this.originalHeader.find('> tr > th');
  this.displayWeight = null;

  // React to columns change to avoid making checks in the scroll callback.
  this.originalTable.bind('columnschange', function (e, display) {
    // This will force header size to be calculated on scroll.
    self.widthCalculated = (self.displayWeight !== null && self.displayWeight === display);
    self.displayWeight = display;
  });

  // Clone the table header so it inherits original jQuery properties. Hide
  // the table to avoid a flash of the header clone upon page load.
  this.stickyTable = $('<table class="sticky-header"/>')
    .insertBefore(this.originalTable)
    .css({ position: 'fixed', top: '0px' });
  this.stickyHeader = this.originalHeader.clone(true)
    .hide()
    .appendTo(this.stickyTable);
  this.stickyHeaderCells = this.stickyHeader.find('> tr > th');

  this.originalTable.addClass('sticky-table');
  $(window)
    .bind('scroll.drupal-tableheader', $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    .bind('resize.drupal-tableheader', { calculateWidth: true }, $.proxy(this, 'eventhandlerRecalculateStickyHeader'))
    // Make sure the anchor being scrolled into view is not hidden beneath the
    // sticky table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceAnchor.drupal-tableheader', function () {
      window.scrollBy(0, -self.stickyTable.outerHeight());
    })
    // Make sure the element being focused is not hidden beneath the sticky
    // table header. Adjust the scrollTop if it does.
    .bind('drupalDisplaceFocus.drupal-tableheader', function (event) {
      if (self.stickyVisible && event.clientY < (self.stickyOffsetTop + self.stickyTable.outerHeight()) && event.$target.closest('sticky-header').length === 0) {
        window.scrollBy(0, -self.stickyTable.outerHeight());
      }
    })
    .triggerHandler('resize.drupal-tableheader');

  // We hid the header to avoid it showing up erroneously on page load;
  // we need to unhide it now so that it will show up when expected.
  this.stickyHeader.show();
};

/**
 * Event handler: recalculates position of the sticky table header.
 *
 * @param event
 *   Event being triggered.
 */
Drupal.tableHeader.prototype.eventhandlerRecalculateStickyHeader = function (event) {
  var self = this;
  var calculateWidth = event.data && event.data.calculateWidth;

  // Reset top position of sticky table headers to the current top offset.
  this.stickyOffsetTop = Drupal.settings.tableHeaderOffset ? eval(Drupal.settings.tableHeaderOffset + '()') : 0;
  this.stickyTable.css('top', this.stickyOffsetTop + 'px');

  // Save positioning data.
  var viewHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (calculateWidth || this.viewHeight !== viewHeight) {
    this.viewHeight = viewHeight;
    this.vPosition = this.originalTable.offset().top - 4 - this.stickyOffsetTop;
    this.hPosition = this.originalTable.offset().left;
    this.vLength = this.originalTable[0].clientHeight - 100;
    calculateWidth = true;
  }

  // Track horizontal positioning relative to the viewport and set visibility.
  var hScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
  var vOffset = (document.documentElement.scrollTop || document.body.scrollTop) - this.vPosition;
  this.stickyVisible = vOffset > 0 && vOffset < this.vLength;
  this.stickyTable.css({ left: (-hScroll + this.hPosition) + 'px', visibility: this.stickyVisible ? 'visible' : 'hidden' });

  // Only perform expensive calculations if the sticky header is actually
  // visible or when forced.
  if (this.stickyVisible && (calculateWidth || !this.widthCalculated)) {
    this.widthCalculated = true;
    var $that = null;
    var $stickyCell = null;
    var display = null;
    var cellWidth = null;
    // Resize header and its cell widths.
    // Only apply width to visible table cells. This prevents the header from
    // displaying incorrectly when the sticky header is no longer visible.
    for (var i = 0, il = this.originalHeaderCells.length; i < il; i += 1) {
      $that = $(this.originalHeaderCells[i]);
      $stickyCell = this.stickyHeaderCells.eq($that.index());
      display = $that.css('display');
      if (display !== 'none') {
        cellWidth = $that.css('width');
        // Exception for IE7.
        if (cellWidth === 'auto') {
          cellWidth = $that[0].clientWidth + 'px';
        }
        $stickyCell.css({'width': cellWidth, 'display': display});
      }
      else {
        $stickyCell.css('display', 'none');
      }
    }
    this.stickyTable.css('width', this.originalTable.outerWidth());
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('form#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
(function($){
/**
 * To make a form auto submit, all you have to do is 3 things:
 *
 * ctools_add_js('auto-submit');
 *
 * On gadgets you want to auto-submit when changed, add the ctools-auto-submit
 * class. With FAPI, add:
 * @code
 *  '#attributes' => array('class' => array('ctools-auto-submit')),
 * @endcode
 *
 * If you want to have auto-submit for every form element,
 * add the ctools-auto-submit-full-form to the form. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-full-form')),
 * @endcode
 *
 * If you want to exclude a field from the ctool-auto-submit-full-form auto submission,
 * add the class ctools-auto-submit-exclude to the form element. With FAPI, add:
 * @code
 *   '#attributes' => array('class' => array('ctools-auto-submit-exclude')),
 * @endcode
 *
 * Finally, you have to identify which button you want clicked for autosubmit.
 * The behavior of this button will be honored if it's ajaxy or not:
 * @code
 *  '#attributes' => array('class' => array('ctools-use-ajax', 'ctools-auto-submit-click')),
 * @endcode
 *
 * Currently only 'select', 'radio', 'checkbox' and 'textfield' types are supported. We probably
 * could use additional support for HTML5 input types.
 */

Drupal.behaviors.CToolsAutoSubmit = {
  attach: function(context) {
    // 'this' references the form element
    function triggerSubmit (e) {
      var $this = $(this);
      if (!$this.hasClass('ctools-ajaxing')) {
        $this.find('.ctools-auto-submit-click').click();
      }
    }

    // the change event bubbles so we only need to bind it to the outer form
    $('form.ctools-auto-submit-full-form', context)
      .add('.ctools-auto-submit', context)
      .filter('form, select, input:not(:text, :submit)')
      .once('ctools-auto-submit')
      .change(function (e) {
        // don't trigger on text change for full-form
        if ($(e.target).is(':not(:text, :submit, .ctools-auto-submit-exclude)')) {
          triggerSubmit.call(e.target.form);
        }
      });

    // e.keyCode: key
    var discardKeyCode = [
      16, // shift
      17, // ctrl
      18, // alt
      20, // caps lock
      33, // page up
      34, // page down
      35, // end
      36, // home
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
       9, // tab
      13, // enter
      27  // esc
    ];
    // Don't wait for change event on textfields
    $('.ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit', context)
      .filter(':not(.ctools-auto-submit-exclude)')
      .once('ctools-auto-submit', function () {
        // each textinput element has his own timeout
        var timeoutID = 0;
        $(this)
          .bind('keydown keyup', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID && clearTimeout(timeoutID);
            }
          })
          .keyup(function(e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          })
          .bind('change', function (e) {
            if ($.inArray(e.keyCode, discardKeyCode) === -1) {
              timeoutID = setTimeout($.proxy(triggerSubmit, this.form), 500);
            }
          });
      });
  }
}
})(jQuery);
;
(function($){

	$(document).ready(function() {
		$("#kcomTestimonialsSlideshow > div:gt(0)").hide();

		setInterval(function() { 
		  $('#kcomTestimonialsSlideshow > div:first')
			.fadeOut(700)
			.next()
			.fadeIn(700)
			.end()
			.appendTo('#kcomTestimonialsSlideshow');
		},  5000);
	});	

})(jQuery);
