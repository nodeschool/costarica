;(function ($, Handlebars) {
  var mentorsUrl = 'https://raw.githubusercontent.com/CostaRicaJS/nodeschool-mentors-2016/master/mentors-data.json'
  var mentorTemplate = Handlebars.compile($('#mentor-template').html())

  $.getJSON(mentorsUrl)
    .then(function (mentors) {
      displayOrganizersAndMentors(mentors)
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
})(window.jQuery, window.Handlebars)
