// Custom scripts file

(function ($, Drupal) {

    'use strict';

    // replace sidebar content with card content
    Drupal.behaviors.grid = {
        attach: function (context) {
            $(".card--feature-grid").click(function (event) {

                var a = $(this).children(".card__content").html();

                $(".l-sidebar__aside1 div").html(a);

                return false;
            });

            $('.feature-grid-tabs div:not(:first)').addClass('inactive');
            $('.feature-grid').hide();
            $('.feature-grid:first').show();


            $('.feature-grid-tabs .button').click(function () {
                var t = $(this).attr('id');
                if ($(this).hasClass('inactive')) {
                    $('.feature-grid-tabs .button').addClass('inactive');
                    $(this).removeClass('inactive');

                    $('.feature-grid').hide();
                    $('#' + t + '-cards').fadeIn();
                    $('#' + t + '-cards .card--feature-grid')
                        .first()
                        .each(function () {
                            $(this).click();
                        });
                }
            });

            // Select the first feature card item on page load just once
            $(".card--feature-grid")
                .first()
                .once("default-card-feature-grid-select")
                .each(function () {
                    $(this).click();
                });
        }
    }

})(jQuery, Drupal);