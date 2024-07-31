(function ($, Drupal) {
  Drupal.behaviors.usda = {
    attach: function (context, settings) {
      $('.paragraph--type-dropdown-menu-slider', context).one('usdaDropdownSlider').each(function (i) {
        // Add <label> around <h2> contents
        var dropdownId = 'dropdown_menu_slider_' + i;
        $('h2', this).wrapInner('<label for="' + dropdownId + '"/>');
        // Convert <ul> to <select> and wire up events
        var $options = $('li', this).wrapInner('<option/>').find('option');
        var maxOptionLength = Math.max.apply(this, $('li', this).map(function(){return $(this).text().length;}));
        var $heros = $(this).nextUntil(':not(.paragraph--type-basic-hero)');
        var width = Math.min(160 + 8 * maxOptionLength, $(window).width() * .9);
        $('<select id="' + dropdownId + '"/>').append($options).appendTo($('div', this)).css('width', width)
        .bind('change', function(e) {
          $heros.hide().eq(this.selectedIndex).show();
        });
        $heros.not(':eq(0)').hide();
        $('ul', this).remove();
      });

      // Add accessibility labels to generic landmarks that don't have them.
      var labelMap = {
        'section.paragraph--type-basic-hero': 'Promoted Content',
        'figure[role=group]': 'Figure'
      };
      $.each(labelMap, function(selector, label) {
        $(selector.replace(/,|$/, ':not([aria-label]):not([aria-labelledby])'))
          .attr('aria-label', function(i, attr) {return label + ' ' + (i+1);});
      });

      var paragraphsColumnHeader = $('.usda-paragraph-column > *:first-child');
      // set equal height
      paragraphsColumnHeader.matchHeight();
      // add span to first-child element
      paragraphsColumnHeader.each(function() {
        $(this).wrapInner("<span></span>");
      });

      // Allow clicking the logo to navigate to the home page.
      $('.usda-logo').on('click', function() {
        location.href = '/';
      });

      // Close active nav menu on background click.
      var $menu = $('nav#block-usda-main-menu');
      if($menu.length > 0) {
        $('html').click(function(e) {
          if(e.target && !($('body').hasClass('usa-mobile_nav-active')) && !($.contains($menu[0], e.target))) {
            $('button[aria-expanded="true"]', $menu).trigger('click');
          }
        });
      }
    }
  };
})(jQuery, Drupal);
