using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Net.Http;
using System.Linq;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json.Serialization;

namespace watch_together.Streaming
{
    /// <summary>
    /// Discover contains static methods used to find movie files on the local file system.
    /// </summary>
    public static class Discover
    {
        private static readonly HttpClient Client = new HttpClient();
        private static readonly Regex TitleMatcher = new Regex(@"(^.+)\s\((.+)\)");

        private static readonly string[] MovieFormats =
        {
            ".avi",
            ".flv",
            ".h264",
            ".m4v",
            ".mkv",
            ".mov",
            ".mp4",
            ".mpg",
            ".mpeg",
            ".wmv",
        };

        /// <summary>
        /// FindMovies searches for movie files in the given directory. For each movie 
        /// found it attempts to load metadata from the online API. 
        /// </summary>
        /// <returns></returns>
        public static async Task<List<MovieLibrary>> FindMovies(string directory)
        {
            // Stored all the found library objects 
            var movieLibrary = new List<MovieLibrary>();

            // Make sure we visit all subdirectories of the given Video directory 
            var options = new EnumerationOptions
            {
                RecurseSubdirectories = true
            };

            // Search for any files matching media file format extensions
            var movies = Directory.EnumerateFiles(path: directory, searchPattern: "*", enumerationOptions: options)
                .Where(predicate: file => MovieFormats.Any(predicate: s => file.ToLower().EndsWith(s)));

            // Loop through each found movie file and attempt to parse information about it 
            foreach (var moviePath in movies)
            {
                // If the title is in the proper format, we can extract the title and year 
                var parsedData = ParseFile(Path.GetFileNameWithoutExtension(path: moviePath));

                var movieFile = new MovieLibrary
                {
                    Id = movieLibrary.Count(),
                    Path = moviePath,
                    Metadata = null,
                    Modified = false
                };

                // Invalid title format, let the user handle metadata matching client-side
                if (!(parsedData is null))
                {
                    // Query the Metadata API to find movie by title and year
                    var query = new Dictionary<string, string>()
                    {
                        [key: "title"] = parsedData.Title,
                        [key: "year"] = parsedData.Year,
                    };
                    var url = QueryHelpers.AddQueryString(uri: "http://localhost:8080/", queryString: query);
                    var response = await Client.GetAsync(url);

                    // Retrieve the matching movies by converting from JSON to QueryData objects
                    var res = await response.Content.ReadAsAsync<QueryData>();

                    // Make sure results were found...
                    if (res.Total != 0)
                    {
                        // TODO: The API should be able to return a single file in the new version
                        movieFile.Metadata = res.Movies[0];
                    }
                }
                movieLibrary.Add(movieFile);
            }

            return movieLibrary;
        }

        /// <summary>
        /// ParseFile attempts to create a MovieFile from a file name
        /// Recognized file name format -> Title (Year)
        /// </summary>
        /// <param name="fileName">Name of the file to be parsed</param>
        /// <returns>A MovieFile containing the parsed data or null if no match (invalid filename)</returns>
        private static MovieFile ParseFile(string fileName)
        {
            if (!TitleMatcher.IsMatch(fileName))
            {
                return null;
            }

            var match = TitleMatcher.Match(fileName);

            return new MovieFile
            {
                Title = match.Groups[1].Value,
                Year = match.Groups[2].Value,
            };
        }
    }

    /// <summary>
    /// MovieFile is created by parsing a media file name
    /// "Drive (2011)" -> "Drive" "2011"
    /// </summary>
    internal class MovieFile
    {
        public string Title;
        public string Year;
    }

    /// <summary>
    /// QueryData is the object that is returned from querying the Metadata API
    /// </summary>
    public class QueryData
    {
        public int Total { get; set; }
        public MovieDbInfo[] Movies { get; set; }
    }

    public class MovieDbInfo
    {
        [JsonPropertyName("id")] public int RowId { get; set; }
        public string Url { get; set; }
        public string Poster { get; set; }
        public string Rating { get; set; }
        public string Summary { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
    }

    /// <summary>
    /// MovieLibrary represents the objects stored to the user's library file.
    /// It gives each movie a unique id, associated the path, and stores the movie's
    /// metadata.
    /// </summary>
    public class MovieLibrary
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public bool Modified { get; set; }
        public MovieDbInfo Metadata { get; set; }
    }
}