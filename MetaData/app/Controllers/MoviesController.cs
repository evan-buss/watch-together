using System.Collections.Generic;
using System.Linq;
using MetaData.Models;
using Microsoft.AspNetCore.Mvc;

namespace MetaData.Controllers
{
    [ApiController]
    [Route("/")]
    public class MoviesController : ControllerBase
    {
        private readonly Context _context;
        public MoviesController(Context context)
        {
            _context = context;
        }

        [HttpGet("id/{movieId:int}")]
        public ActionResult<Movie> GetById(int movieId)
        {
            var movie = _context.Movies.Where(movie => movie.ID == movieId).First();
            return Ok(movie);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Movie>> SearchMovies([FromQuery] string title, [FromQuery] string year)
        {
            var results = _context.Movies.AsQueryable();
            if (title != null)
            {
                results = _context.Movies.Where(movie => movie.Title.ToLower().Contains(title));
            }
            else
            {
                return BadRequest();
            }

            if (year != null)
            {
                results = results.AsQueryable().Where(movie => movie.Year == year);
            }
            return Ok(results.ToList());
        }
    }
}