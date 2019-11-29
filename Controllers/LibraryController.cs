using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using watch_together.Services;
using watch_together.Streaming;

namespace watch_together.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly LibraryService _service;

        public LibraryController(IConfiguration config)
        {
            _config = config;
            _service = new LibraryService();
        }

        // TODO: Define a JSON structure
        // We need a way to define manual entries. Manual entries should never be overwritten
        /// <summary>
        /// Scan performs a system scan on the directory given in the config file. 
        /// It sends the results and writes the new library to a file
        /// </summary>
        /// <returns></returns>
        [HttpGet("scan")]
        public async Task<IEnumerable<MovieLibrary>> ScanLibrary()
        {
            var movies = await Discover.FindMovies(_config["library:directory"], _config["apiUrl"]);
            _service.SaveMoviesToFile(movies, _config["configDir"]);
            return movies;
        }

        /// <summary>
        /// Retrieve the user's library via the stored library file.
        /// </summary>
        /// <returns>Array of movie paths</returns>
        [HttpGet]
        public async Task<ActionResult<MovieDbInfo>> GetLibrary()
        {
            return Ok(await _service.LoadMoviesFromFile(_config["configDir"]));
        }

        [HttpDelete]
        public async Task<ActionResult<IEnumerable<MovieLibrary>>> UpdateMovie(int libraryID)
        {
            var updatedLibrary = await _service.UpdateMovie(libraryID, null, _config["configDir"]);
            return Ok(updatedLibrary);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<MovieLibrary>>> UpdateMovie(int libraryID, [FromBody] MovieDbInfo metadata)
        {
            var updatedLibrary = await _service.UpdateMovie(libraryID, metadata, _config["configDir"]);
            return Ok(updatedLibrary);
        }
    }
}