$(document).on('turbolinks:load', function() {
  setAjaxToken();
  initUserCheck();
});

// Allow ajax requests to rails
function setAjaxToken() {
  var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );

  $.ajaxSetup( {
    beforeSend: function ( xhr ) {
      xhr.setRequestHeader( 'X-CSRF-Token', token );
    }
  });
}

function initUserCheck() {
  var $registrationForm = $('#registration-form');

  if ($registrationForm.size() === 0) {
    return;
  }

  var $name = $registrationForm.find('input[id="user_name"]'),
      $surname = $registrationForm.find('input[id="user_surname"]'),
      $email = $registrationForm.find('input[id="user_email"]'),
      checkUrl = $registrationForm.data('check-url');

  $name.blur(checkNameAndSurname);
  $surname.blur(checkNameAndSurname);
  $email.blur(checkEmail);

  function checkNameAndSurname() {
    var checkUrl = this.dataset.checkUrl;

    $.post(checkUrl, { name: $name.val(), surname: $surname.val() })
      .done(function (data) {
        $name.parent().find('.invalid-feedback').remove();

        if (data == 'im_used') {
          $name.parent().append('<div class="invalid-feedback">Name with given Surname already been taken</div>');
        };
      });
  };

  function checkEmail() {
    var checkUrl = this.dataset.checkUrl;

    $.post(checkUrl, { email: $email.val() })
      .done(function (data) {
        $email.parent().find('.invalid-feedback').remove();

        if (data == 'im_used') {
          $email.parent().append('<div class="invalid-feedback">Email has already been taken</div>');
        };
      });
  };
}
