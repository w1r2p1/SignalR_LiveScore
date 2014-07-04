using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Common
{
    public class Score
    {
        public int Id { get; set; }
        public string TeamName1 { get; set; }
        public int Team1Score { get; set; }
        public string TeamName2 { get; set; }
        public int Team2Score { get; set; }
    }
}