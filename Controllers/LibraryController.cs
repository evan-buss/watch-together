using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using watch_together.Streaming;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace watch_together.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly IConfiguration _config;
        public LibraryController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        /// <summary>
        /// Retrieve the user's library
        /// </summary>
        /// <returns>Array of movie paths</returns>
        public async Task<IEnumerable<MovieDBInfo>> GetLibrary()
        {
            var directory = _config.GetValue<string>("library:directory");
            return await Discover.FindMovies(directory);
        }
    }
}