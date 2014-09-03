(function($) {
 
  // My micro jQuery templating engine
  // Include this script before your closing </body> tag.
  // Usage:
  //
  //    <section data-html="content"></section>
  //
  // This will load <html/content.html> into <section>
 
  var dirPath = "html/",
      includes = $("[data-html]"),
      len = includes.length;
 
  // Postpone the ready event.
  if (len) {
    $.holdReady( true );
  }
 
  // Load external contents
  includes.each(function(i, el) {
    var src = dirPath + $(el).attr("data-html") + ".html";
    $(el).load(src, function() {
      if (i == len - 1) {
        $.holdReady( false );
      }
    });
  });
 
})(jQuery);
