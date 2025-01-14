$(document).ready(function() {
  const charCount = 140;

  
  $('#tweet-text').on('input', function() {
    const currentCount = $(this).val().length;  
    const charsLeft = charCount - currentCount;  

    
    const counter = $(this).parent().find('.counter');  // Adjusted: use parent() to find the counter within the same form

    // Update the counter with the remaining characters
    counter.text(charsLeft);

    
    if (charsLeft < 0) {
      counter.addClass('red');  // Add the 'red' class if over the character limit
    } else {
      counter.removeClass('red');  // Remove the 'red' class if within the limit
    }
  });
});