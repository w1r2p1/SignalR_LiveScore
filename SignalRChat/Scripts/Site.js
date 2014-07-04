        
var chatHub;
var TeamNameSet1;
var TeamNameSet2;
var $alertMsg;
var alertHtmlClose = '<a href="#" data-dismiss="alert" class="close">&times;</a>';
var alertHtml;

        $(function () {
            $.ajaxSetup({
                cache: false
            });

            chatHub = $.connection.chatHub;

            configListeners();

            // Start Hub
            $.connection.hub.start({ transport: ['webSockets', 'serverSentEvents', 'longPolling'] })
                .done(function () {
                    chatHub.server.connect();
                });
        });

        function configListeners() {
            chatHub.client.getScore = function (liveScore) {
                $alertMsg.hide();
                if (liveScore.TeamName1 == null) {
                    $("#objectToAnimate").hide();
                    $alertMsg.show();
                    return false;
                }
                
                $("#Team1").html(liveScore.TeamName1);
                $("#Team2").html(liveScore.TeamName2);

                $("#Score1").html(liveScore.Team1Score);
                $("#Score2").html(liveScore.Team2Score);

                $("#objectToAnimate").fadeOut(500);
                $("#objectToAnimate").fadeIn(500);
            };

            $("#SendScore").click(function () {
                sendScore();
            });

            $("#ConfigBoard").click(function () {
                conFigBoard();
            });

            $alertMsg = $("#alertMsg");
            $alertMsg.hide();
            $alertMsg.on("close.bs.alert", function () {
                $alertMsg.hide();
                return false;
            });

        }
        
        function conFigBoard() {
            TeamNameSet1 = $("#TeamNameSet1").val();
            TeamNameSet2 = $("#TeamNameSet2").val();

            if ((TeamNameSet1 == "") || (TeamNameSet2 == "")) {
                alertHtml = alertHtmlClose;
                alertHtml = alertHtml.concat('Team Names are empty. Please supply.');

                $alertMsg.show();
                $alertMsg.html(alertHtml);
                return false;
            }
            $alertMsg.hide();
            
            $("#Team1Scorer").html(TeamNameSet1);
            $("#Team2Scorer").html(TeamNameSet2);
            var liveScore = { "Id": "1", "TeamName1": TeamNameSet1, "Team1Score": 0, "TeamName2": TeamNameSet2, "Team2Score": 0 };
            chatHub.server.gameConfigure(liveScore);
            $('#LiveTabs a[href="#scoreBoardTab"]').tab('show');
        }

        
        function sendScore() {
            var $Team1NameOnScorer = $("#Team1Scorer").html();
            var $Team2NameOnScorer = $("#Team2Scorer").html();

            var isDefinedTeam1 = $Team1NameOnScorer.toLowerCase().indexOf("not set");
            var isDefinedTeam2 = $Team2NameOnScorer.toLowerCase().indexOf("not set");

            if ((isDefinedTeam1 >= 0) || (isDefinedTeam2 >= 0)) {
                alertHtml = alertHtmlClose;
                alertHtml = alertHtml.concat('Cannot send score. No teams has been defined.');
                $alertMsg.show();
                $alertMsg.html(alertHtml);
                return false;
            }
            $alertMsg.hide();

            var Team1Score = $("#Team1Score").val();
            var Team2Score = $("#Team2Score").val();
            var liveScore = { "Id": "1", "TeamName1": TeamNameSet1, "Team1Score": Team1Score, "TeamName2": TeamNameSet2, "Team2Score": Team2Score };
            chatHub.server.updateScore(liveScore);
        }

        

