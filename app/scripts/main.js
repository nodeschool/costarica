;(function ($, Handlebars) {
  var organizersUrl = 'http://raw.githubusercontent.com/CostaRicaJS/organizers/master/organizers-data.json'
  var mentorsUrl = 'https://raw.githubusercontent.com/CostaRicaJS/nodeschool-mentors-2016/master/mentors-data.json'
  var mentorTemplate = Handlebars.compile($('#mentor-template').html())

  $.when($.getJSON(organizersUrl), $.getJSON(mentorsUrl))
    .then(function (organizersResponse, mentorsResponse) {
      if (organizersResponse[1] !== 'success' || mentorsResponse[1] !== 'success') {
        return handleError()
      }
      displayOrganizersAndMentors($.extend({}, organizersResponse[0], mentorsResponse[0]))
    }, handleError)

  function handleError (err) {
    $('#mentors-container').html('esto es vergonsozo! lo sentimos pero no pudimos obtener la información de los mentors')
    console.error('cannot obtain organizers and mentors data \n', err)
  }

  function displayOrganizersAndMentors (organizersAndMentors) {
    var html = ''
    $.each(organizersAndMentors, function (person, personData) {
      html += mentorTemplate(personData)
    })
    $('#mentors-container').html(html)
  }

  // navigation


// variables
  var $header_top = $('.header-top');
  var $nav = $('nav');



// toggle menu
  $header_top.find('a').on('click', function() {
    $(this).parent().toggleClass('open-menu');
  });



// fullpage customization
  $('#fullpage').fullpage({
    sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
    menu: '#menu',

    afterLoad: function(anchorLink, index) {
      $header_top.css('background', 'rgba(0, 47, 77, .3)');
      $nav.css('background', 'rgba(0, 47, 77, .25)');
      if (index == 5) {
        $('#fp-nav').hide();
      }
    },

    onLeave: function(index, nextIndex, direction) {
      if(index == 5) {
        $('#fp-nav').show();
      }
    },

    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
      if(anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(false, 'up');
        $header_top.css('background', 'transparent');
        $nav.css('background', 'transparent');
        $(this).css('background', '#374140');
        $(this).find('h2').css('color', 'white');
        $(this).find('h3').css('color', 'white');
        $(this).find('p').css(
          {
            'color': '#DC3522',
            'opacity': 1,
            'transform': 'translateY(0)'
          }
        );
      }
    },

    onSlideLeave: function( anchorLink, index, slideIndex, direction) {
      if(anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(true, 'up');
        $header_top.css('background', 'rgba(0, 47, 77, .3)');
        $nav.css('background', 'rgba(0, 47, 77, .25)');
      }
    }
  });

})(window.jQuery, window.Handlebars)
