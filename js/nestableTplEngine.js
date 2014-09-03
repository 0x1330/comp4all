(function($) {
 
  // My micro jQuery templating engine.
  // Include this script before your closing </body> tag.
  // Usage:
  //
  //    <section data-html="content"></section>
  //
  // Will load /html/content.html into <section>
 
  // Settings.
  var includes,
      opt,
      last,
      defaults = {
        dirPath: 'html/',
        dataAttr: 'data-html',
        loadingClass: 'loading',
        loadedClass: 'loaded'
      };
 
  $.fn.loadContent = function(options) {
 
    // Overwrite default options with user provided ones.
    opt = $.extend({}, defaults, options);
 
    // Find all includes in context.
    includes = $('[' + opt.dataAttr + ']', $(this)).not('.' + opt.loadedClass + ', .' + opt.loadingClass);
 
    // Postpone the ready event.
    if (includes.length) {
      $.holdReady(true);
    }
 
    var loadAllIncludes = function(includes, lastParent) {
 
      // Iterate over all includes.
      includes.each(function(i, el) {
 
        // Prepare to .load()
        var src = opt.dirPath + $(el).attr(opt.dataAttr) + ".html";
        $(el)
          // Add loading class.
          .addClass(opt.loadingClass)
          // Load the html file.
          .load(src, function( response, status, xhr ) {
            // Add loaded class.
            $(this).removeClass(opt.loadingClass).addClass(opt.loadedClass);
 
            // Watch for the last item.
            if (i == includes.length - 1) {
              last = true;
            }
 
            // Nested includes
            var nestedIncludes = $(el).find('[' + opt.dataAttr + ']');
            if (nestedIncludes.length) {
              loadAllIncludes(nestedIncludes, last);
            }
            // Release the 'ready' event after the last include loaded.
            else if (last && lastParent) {
              $.holdReady(false);
            }
          });
      });
 
    }
 
    // Load contents.
    loadAllIncludes(includes, true);
 
  }
 
  // Init.
  $(document).loadContent();
 
})(jQuery);
