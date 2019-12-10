using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using watch_together.Models;

namespace watch_together.Controllers
{
    public class HostLogin
    {
        public string Password { get; set; }
    }

    public class LoginResponse
    {
        public string Response { get; set; }
        public string Message { get; set; }
    }

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Settings _settings;
        public UserController(IOptionsMonitor<Settings> settings)
        {
            _settings = settings.CurrentValue;
            Console.WriteLine("PASSWORD: " + _settings.Password);
        }

        [HttpPost]
        [Route("api/login")]
        public ActionResult<string> Login([FromBody] HostLogin loginData)
        {
            if (loginData.Password == _settings.Password)
            {
                return Ok(new LoginResponse
                {
                    Response = "Login Successful",
                    Message = "Select a movie to start streaming"
                });
            }
            return BadRequest(new LoginResponse
            {
                Response = "Invalid Password",
                Message = "Check the host console for the password"
            });
        }
    }
}