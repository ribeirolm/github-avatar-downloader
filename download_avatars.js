var secrets = require('./secrets.js');
var request = require('request');
var https = require('https');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined || repoName === undefined) {
    console.log("This application cannot run without a specified repo owner and repo name in the command line!");
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${secrets.GITHUB_TOKEN}`
      }
    };
    // console.log(options.url);

    request(options, function (err, res, body) {
      if (!err && res.statusCode === 200) {
      var info = JSON.parse(body);
      cb(err, info);
      };
    });
  }
}

function downloadImageByURL(avatar, filePath) {
  request.get(avatar)
  .on('error', function(error){
     throw error;
  })
  .on('response', function(response){
    console.log('Downloading image...');
  })
  .pipe(fs.createWriteStream(`./avatars/${filePath}.jpg`));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, info){
  info.forEach(function(user){
      var avatar = user.avatar_url;
      var filePath = user.login;
      downloadImageByURL (avatar, filePath);
  });
});


// getRepoContributors("jquery", "jquery", function(err, info){
//   info.forEach(function(user){
//       var avatar = user.avatar_url;
//       var filePath = user.login;
//       downloadImageByURL (avatar, filePath);
//   });
// });