$(document).ready(function() {
  // --- our code goes here ---
  const charCount = 140;
});

  $('#tweet-text').on('input', function() {
    let currentCount = $(this).val().length;
    let charsLeft = charCount - currentCount;
  })