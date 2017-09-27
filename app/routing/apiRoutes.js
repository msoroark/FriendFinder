
//Require all the things. 
var friendsData = require('../data/friends.js');
var path = require("path");


module.exports = function(app) {

        app.get('/api/friends', function(req, res) {
            res.json(friendsData)
        });

        app.post('/api/friends', function(req, res) {

            var newFriend = req.body;

            if(newFriend['scores[]']) {
                newFriend.scores = newFriend['scores[]'];
            }

            //scores not working.- Debugg.
            console.log(newFriend || "no new friend!");

            //Grab scores. 
            for (var i = 0; i < newFriend.scores.length; i++) {

                if (newFriend.scores[i] == ("1 (Strongly Disagree)") || ("1 (Oh, geeze Rick.)")) {
                    newFriend.scores[i] = 1;

                } else if (newFriend.scores[i] == ("5 (Strongly Agree)") || ("5 (Wubba lubba dub dub!)")) {
                    newFriend.scores[i] = 5;

                } else {
                    newFriend.scores[i] = parseInt(newFriend.scores[i]);
                }
            }

            var differencesArray = [];
            //Compare. 
            for (var i = 0; i < friendsData.length; i++) {
                var compare = friendsData[i];
                var totalDifference = 0;

                for (var c = 0; c < compare.scores.length; c++) {
                    var differenceOneScore = Math.abs(compare.scores[c] - newFriend.scores[c]);
                    totalDifference += differenceOneScore;
                }
                differencesArray[i] = totalDifference;
            }

            var bestMatch = differencesArray[0];
            var bestMatchNumber = 0;

            for (var i = 1; i < differencesArray.length; i++) {
                if (differencesArray[i] < bestMatch) {
                    bestMatch = differencesArray[i];
                    bestMatchNumber = i;
                }
            }
            //pusssshhhhh.
            friendsData.push(newFriend);

            res.json(friendsData[bestMatchNumber]);

    })
}