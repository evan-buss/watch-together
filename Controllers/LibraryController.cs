using System.IO;
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
        private readonly ILibraryService _service;

        public LibraryController(ILibraryService service)
        {
            _service = service;
            // _service = new LibraryService(Path.Combine(_config["config"], _config["library:database"]), _config["library:directory"], _config["api"]);
        }

        // We need a way to define manual entries. Manual entries should never be overwritten
        /// <summary>
        /// Scan performs a system scan on the directory given in the config file. 
        /// It sends the results and writes the new library to a file
        /// </summary>
        /// <returns></returns>
        [HttpGet("scan")]
        public async Task<IEnumerable<MovieLibraryFile>> ScanLibrary()
        {
            var library = await _service.ScanLibrary();
            return library;
        }

        /// <summary>
        /// Retrieve the user's library via the stored library file.
        /// </summary>
        /// <returns>Array of movie paths</returns>
        [HttpGet]
        public async Task<ActionResult<Metadata>> GetLibrary()
        {
            return Ok(await _service.GetLibrary());
        }

        /// <summary>
        /// DeleteMetadata removes the metdata associated with a specific movie file
        /// </summary>
        /// <param name="libraryID"></param>
        /// <returns>The new library as a list of MovieLibraryFile</returns>
        [HttpDelete]
        public ActionResult<IEnumerable<MovieLibraryFile>> DeleteMetdata(int libraryID)
        {
            var updatedLibrary = _service.UpdateMovie(libraryID, null);
            return Ok(updatedLibrary);
        }

        /// <summary>
        /// UpdateMovie updates a specific movie with new metadata
        /// </summary>
        /// <param name="libraryID">The library ID of the movie to be updated</param>
        /// <param name="metadata">A JSON Metdata object containing the new metdata information</param>
        /// <returns>The new library as a list of MovieLibraryFile</returns>
        [HttpPost]
        public ActionResult<IEnumerable<MovieLibraryFile>> UpdateMovie(int libraryID, [FromBody] Metadata metadata)
        {
            var updatedLibrary = _service.UpdateMovie(libraryID, metadata);
            return Ok(updatedLibrary);
        }
    }
}