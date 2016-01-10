$(function(){
  $('input:not(.button)').blur(function(){
    var self = this;
    if (validator.isFieldValid(this.id, $(this).val())) {
      $(self).parent().find('.error').text('').hide();
    } else {
      $(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
    }
  });

  $('input.button').click(function(){
    $('input:not(.button)').blur();
    if (!validator.isFormValid() && this.type == 'submit') return false;
  });
});
