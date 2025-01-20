/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  // Initial tweets data (these are hardcoded for now)
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // Function to render all tweets in the container
  const renderTweets = function(tweets) {
    // Clear the container before rendering tweets
    $('.tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);  // Prepend to show the newest tweet first
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

  // Initial rendering of tweets
  renderTweets(data);

  // Handle tweet form submission
  $("form").on("submit", function(event) {
    event.preventDefault(); // Prevent form submission (page refresh)

    // Get the tweet text from the textarea
    const tweetText = $('#tweet-text').val();
    
    // Ensure tweet text is not empty before proceeding
    if (tweetText.trim() !== "") {
     
      const newTweet = {
        user: data[0].user,  // Use the first user's data (replace this with whichever user you want)
        content: {
          text: tweetText
        },
        created_at: Date.now()  // Use the current timestamp for the new tweet
      };

      
      data.unshift(newTweet);  // Add the new tweet at the beginning of the array (for newest tweets first)

      // Re-render the tweets (clear and append new tweets)
      renderTweets(data);

      // Clear the textarea and reset the character counter
      $('#tweet-text').val('');
      $('.counter').text(140);
    } else {
      alert("Tweet content cannot be empty.");
    }
  });
});
