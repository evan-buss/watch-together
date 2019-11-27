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

        private static string[] movieFormats =
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
        public static async Task<List<MovieDbInfo>> FindMovies(string directory)
        {
            List<MovieDbInfo> details = new List<MovieDbInfo>();

            var options = new EnumerationOptions
            {
                RecurseSubdirectories = true
            };

            var movies = Directory.EnumerateFiles(path: directory, searchPattern: "*", enumerationOptions: options)
                .Where(predicate: file => movieFormats.Any(predicate: s => file.ToLower().EndsWith(s)));

            foreach (string movie in movies)
            {
                var info = ParseFile(Path.GetFileNameWithoutExtension(path: movie));
                if (!(info is null))
                {
                    var query = new Dictionary<string, string>()
                    {
                        [key: "title"] = info.Title,
                        [key: "year"] = info.Year,
                    };
                    var url = QueryHelpers.AddQueryString(uri: "http://localhost:8080/", queryString: query);
                    var response = await Client.GetAsync(url);

                    var res = await response.Content.ReadAsAsync<QueryData>();

                    if (res.Total > 0)
                    {
                        details.Add(item: res.Movies[0]);
                    }
                }

                ;
            }

            Console.WriteLine(value: details.Count);
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

    internal class MovieFile
    {
        public string Title;
        public string Year;
    }

    public struct QueryData
    {
        public int Total { get; set; }
        public MovieDbInfo[] Movies { get; set; }
    }

    public struct MovieDbInfo
    {
        [JsonPropertyName("id")] public int RowId { get; set; }
        public string Url { get; set; }
        public string Poster { get; set; }
        public string Rating { get; set; }
        public string Summary { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
    }
}