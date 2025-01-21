/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  // Function to render all tweets in the container
  const renderTweets = function(tweets) {
    // Clear the container before rendering tweets
    $('.tweets-container').empty();

    // Render each tweet and prepend it (newest tweet at the top)
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);  // Prepend to show the newest tweet first
    }
  };

  // Function to create a single tweet element
  const createTweetElement = function(tweet) {
    return $(`
      <article class="tweet">
        <header>
          <img class="avatars" src="${tweet.user.avatars}" alt="Avatar of ${tweet.user.name}">
          <span class="name">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="tweet-content">${tweet.content.text}</p>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  };

  // Initial rendering of tweets (fetch from the server)
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',  // Fetch the latest tweets from the server
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error('Error loading tweets:', err);
      }
    });
  };

  // Load tweets initially from the server
  loadTweets();

  // Handle tweet form submission
  $("form").on("submit", function(event) {
    event.preventDefault(); // Prevent form submission (page refresh)

    // Get the tweet text from the textarea and trim any extra spaces
    const tweetText = $('#tweet-text').val().trim();
    
    // Check if tweet text is empty
    if (tweetText === "") {
      alert("Tweet field cannot be empty.");
    } 
    // Check if tweet text exceeds the character limit (140 characters)
    else if (tweetText.length > 140) {
      alert("Tweet cannot exceed 140 characters.");
    } 
    else {
      // Send the tweet data to the server via POST request
      $.ajax({
        method: 'POST',
        url: '/tweets',  // Server endpoint to create a new tweet
        data: $(this).serialize(),  // Serialize the form data
        success: function() {
          // After a successful POST, load the updated list of tweets
          loadTweets();

          // Clear the textarea and reset the character counter
          $('#tweet-text').val('');
          $('.counter').text(140);
        },
        error: function(err) {
          console.error('Error posting tweet:', err);
        }
      });
    }
  });
});
