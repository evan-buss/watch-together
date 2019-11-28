using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using watch_together.Streaming;

namespace watch_together.Services
{
    public class LibraryService
    {
        /// <summary>
        /// LoadMovies retrieves the cached library files from the disk
        /// </summary>
        /// <param name="fileDir">The directory to search for 'movies.json' cache file.</param>
        /// <returns></returns>
        public async Task<IEnumerable<MovieLibrary>> LoadMovies(string fileDir)
        {
            await using var fs = File.OpenRead(Path.Combine(fileDir, "movies.json"));
            return await JsonSerializer.DeserializeAsync<MovieLibrary[]>(fs);
        }

        /// <summary>
        /// Save movie library to JSON file.
        /// </summary>
        /// <param name="movies">List of MovieDbInfo Objects</param>
        /// <param name="destinationDir">Directory where the json file will be stored.</param>
        public async void SaveMoviesToFile(IEnumerable<MovieLibrary> movies, string destinationDir = "")
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            await using var fs = File.Create(Path.Combine(destinationDir, "movies.json"));
            await JsonSerializer.SerializeAsync(fs, movies, options);
        }
    }
}