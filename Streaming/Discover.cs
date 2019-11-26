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
        private static string directory = "/home/evan/Videos";
        private static HttpClient client = new HttpClient();

        private static Regex titleMatcher = new Regex(@"(^.+)\s\((.+)\)");

        private static string[] movieFormats ={
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

        public async static Task<List<MovieDBInfo>> FindMovies()
        {

            List<MovieDBInfo> details = new List<MovieDBInfo>();

            var options = new EnumerationOptions
            {
                RecurseSubdirectories = true
            };

            var movies = Directory.EnumerateFiles(directory, "*", options)
               .Where(file => movieFormats.Any(file.ToLower().EndsWith));

            foreach (string movie in movies)
            {
                var info = ParseFile(Path.GetFileNameWithoutExtension(movie));
                if (!(info is null))
                {
                    var query = new Dictionary<string, string>()
                    {
                        ["title"] = info.Title,
                        ["year"] = info.Year,
                    };
                    var url = QueryHelpers.AddQueryString("http://localhost:8080/", query);
                    var response = await client.GetAsync(url);

                    var res = await response.Content.ReadAsAsync<QueryData>();

                    if (res.Total > 0)
                    {
                        details.Add(res.Movies[0]);
                    }
                };
            }

            Console.WriteLine(details.Count);
            return details;
        }

        /// <summary>
        /// ParseFile attempts to create a MovieFile from a file name
        /// Recognized file name format -> Title (Year)
        /// </summary>
        /// <param name="fileName">Name of the file to be parsed</param>
        /// <returns>A MovieFile containing the parsed data or null if no match (invalid filename)</returns>
        private static MovieFile ParseFile(string fileName)
        {
            if (!titleMatcher.IsMatch(fileName)) { return null; }
            var match = titleMatcher.Match(fileName);

            return new MovieFile
            {
                Title = match.Groups[1].Value,
                Year = match.Groups[2].Value,
            };
        }
    }

    internal class MovieFile
    {
        public string Title;
        public string Year;
    }

    public struct QueryData
    {
        public int Total { get; set; }
        public MovieDBInfo[] Movies { get; set; }
    }

    public struct MovieDBInfo
    {
        [JsonPropertyName("id")]
        public int RowID { get; set; }
        public string URL { get; set; }
        public string Poster { get; set; }
        public string Rating { get; set; }
        public string Summary { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
    }
}