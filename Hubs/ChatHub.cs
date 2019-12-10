using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace watch_together.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage chatMessage)
        {
            await Clients.All.SendAsync("broadcastMessage", chatMessage);
        }
    }

    public class ChatMessage
    {
        public DateTime Timestamp { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }
    }
}