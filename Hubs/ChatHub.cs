using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace watch_together.Hubs
{
    public class ChatHub : Hub
    {

        public async Task NewMessage(string username, string message)
        {
            Console.WriteLine("receivedMessage");
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}