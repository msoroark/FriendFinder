var friendsData = require('../data/friends.js');

module.exports = function(app) {

        app.get('/api/friends', function(req, res) {
            res.json(friendsData)
        });

        app.post('/api/friends', function(req, res) {

            var newFriend = req.body;

            for (var i = 0; i < newFriend.scores.length; i++) {

                if (newFriend.scores[i] == ("1 (Strongly Disagree)") || ("(Oh, geeze Rick.)")) {
                    newFriend.scores[i] = 1;

                } else if (newFriend.scores[i] == ("5 (Strongly Agree)") || ("(Wubba lubba dub dub!)")) {
                    newFriend.scores[i] = 5;

                } else {
                    newFriend.scores[i] = parseInt(newFriend.scores[i]);
                }
            }

            var differencesArray = [];

            for (var i = 0; i < friendsData.length; i++) {
                var compare = friendsData[i];
                var totalDifferance = 0;

                for (var c = 0; c < compare.scores.length; c++) {
                    var differenceOneScore = Math.abs(compare.scores[c] - newFriend.scores[c]);
                    totalDifference += differenceOneScore;
                }
                differencesArray[i] = totalDifference;
            }

        });