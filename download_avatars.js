// In this activity, you will partially implement a single function called getRepoContributors. Using the request package, you will fetch the list of contributors as a JSON string from the GitHub API's contributors endpoint. Upon receiving the results, your function will invoke a callback function with the results. This callback function will loop over and print out the avatar_url for each object in the collection.


//Your next and final step in this exercise should be to change your getRepoContributors function to parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

//You will also need to modify the callback function to iterate over the results and (for now) console.log the value for each avatar_url in the collection:

var secrets = require('./secrets.js');
var request = require('request');
var https = require('https');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${secrets.GITHUB_TOKEN}`
    }
  };

  request(options, function (err, res, body) {
    if (!err && res.statusCode === 200) {
    var info = JSON.parse(body);
    info.forEach(function(user){
      var avatar = user.avatar_url;
      console.log(avatar);
    })
    }
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});