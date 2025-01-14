$(document).ready(function() {
  const charCount = 140;

  
  $('#tweet-text').on('input', function() {
    const currentCount = $(this).val().length;  // Get the current character count
    const charsLeft = charCount - currentCount;  // Calculate the remaining characters

    
    const counter = $(this).parent().find('.counter');  // Adjusted: use parent() to find the counter within the same form

    // Update the counter with the remaining characters
    counter.text(charsLeft);

    
    if (charsLeft < 0) {
      counter.css('color', 'red');  // Red if characters exceed the limit
    } else {
      counter.css('color', 'black');  // Black if within the character limit
    }
  });
});
