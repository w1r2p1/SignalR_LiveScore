using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

using LiveScore.Common;

namespace LiveScore
{
    public class ChatHub : Hub
    {
        #region Data Members

        static Score _score = new Score();

        #endregion

        //public ChatHub()
        //{
        //    _Score.Id = 0;
        //    _Score.TeamName1 = "Dallas Mavericks";
        //    _Score.TeamName2 = "Antonio Spurs";
        //    _Score.Team1Score = 0;
        //    _Score.Team2Score = 0;
        //    //SendScore();
        //}

        public void SendMessage(string _message)
        {
            //Clients.All.messageReceived(_message);
            Clients.All.receiveChatMsg(_message);
        }

        public void Connect()
        {
            Clients.Caller.getScore(_score);
        }

        public void GameConfigure(Score Score)
        {
            _score.Id = 1;
            _score.TeamName1 = Score.TeamName1;
            _score.TeamName2 = Score.TeamName2;
            _score.Team1Score = 0;
            _score.Team2Score = 0;
            SendScore();
        }


        public void UpdateScore(Score Score)
        {
            _score.TeamName1 = Score.TeamName1;
            _score.Team1Score = Score.Team1Score;
            _score.TeamName2 = Score.TeamName2;
            _score.Team2Score = Score.Team2Score;
            
            //Clients.All.SendScore(Score);
            SendScore();
        }

        public void SendScore()
        {
            Clients.All.getScore(_score);
        }

    }
}

