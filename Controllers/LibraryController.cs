using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using watch_together.Streaming;
using System.Threading.Tasks;

namespace watch_together.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LibraryController : ControllerBase
    {
        [HttpGet]
        /// <summary>
        /// Retrieve the user's library
        /// </summary>
        /// <returns>Array of movie paths</returns>
        public async Task<IEnumerable<MovieDBInfo>> GetLibrary()
        {
            return await Discover.FindMovies();
        }
    }
}