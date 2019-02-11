// In this activity, you will partially implement a single function called getRepoContributors. Using the request package, you will fetch the list of contributors as a JSON string from the GitHub API's contributors endpoint. Upon receiving the results, your function will invoke a callback function with the results. This callback function will loop over and print out the avatar_url for each object in the collection.


//In the next step you will implement the function to use the request library to programmatically fetch the list of contributors via HTTPS for the given repo.


var request = require('request');
var https = require('https');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});