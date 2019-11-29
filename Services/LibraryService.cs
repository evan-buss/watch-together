using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using watch_together.Streaming;
using System.Linq;
using System;

namespace watch_together.Services
{
    public class LibraryService
    {
        /// <summary>
        /// LoadMovies retrieves the cached library files from the disk
        /// </summary>
        /// <param name="fileDir">The directory to search for 'movies.json' cache file.</param>
        /// <returns></returns>
        public async Task<IEnumerable<MovieLibrary>> LoadMoviesFromFile(string fileDir)
        {
            var filePath = Path.Combine(fileDir, "movies.json");
            if (!File.Exists(filePath)) return new MovieLibrary[0];
            await using var fs = File.OpenRead(filePath);
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

        public async Task<IEnumerable<MovieLibrary>> UpdateMovie(int libraryID, MovieDbInfo metadata, string filePath)
        {
            MovieLibrary[] library;
            // Open the library json file and serialize it into MovieLibrary objects
            using (var fs = File.Open(Path.Combine(filePath, "movies.json"), FileMode.Open))
            {
                library = await JsonSerializer.DeserializeAsync<MovieLibrary[]>(fs);
                // Search the library array for the specific libraryID

                foreach (var movie in library)
                {
                    if (movie.Id == libraryID)
                    {
                        movie.Metadata = metadata;
                        movie.Modified = true;
                    }
                }
            }
            SaveMoviesToFile(library, filePath);
            return library;
        }
    }
}