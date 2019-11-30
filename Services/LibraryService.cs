using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using watch_together.Streaming;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace watch_together.Services
{
    public class LibraryService : ILibraryService
    {
        private readonly string moviesFile;
        private readonly string moviesDirectory;
        private readonly string apiUrl;
        private IEnumerable<MovieLibraryFile> movies = new List<MovieLibraryFile>();
        private readonly IConfiguration _config;

        public LibraryService(IConfiguration config)
        {
            _config = config;
            Console.WriteLine("CONFIGURATION LOADED");
            Console.WriteLine(_config["config"]);
            moviesFile = Path.Combine(_config["config"], _config["library:database"]);
            moviesDirectory = _config["library:directory"];
            apiUrl = _config["api"];
        }

        /// <summary>
        /// UpdateLibrary loads the updates your existing saved library by rescanning the disk for changes.
        /// </summary>
        /// <returns>A list of updated library files.</returns>
        public async Task<IEnumerable<MovieLibraryFile>> ScanLibrary()
        {
            var newLibrary = new List<MovieLibraryFile>();
            // Add all the existing library to the dictionary
            var existing = new Dictionary<string, MovieLibraryFile>();
            foreach (var movie in await LoadMoviesFromFile())
            {
                existing.TryAdd(movie.Path, movie);
            }

            // TODO: Figure out if I should try to minimize api requests by only querying for
            // Loop through checking if each value exists in the library already
            foreach (var path in Discover.FindMovieFiles(moviesDirectory))
            {
                // If the paths match we use the existing metadata if user set metadata manually
                if (existing.ContainsKey(path) && existing[path].Modified)
                {
                    existing[path].Id = newLibrary.Count();
                    newLibrary.Add(existing[path]);
                }
                else
                {
                    // Otherwise we fetch fresh metadata for the file.
                    newLibrary.Add(await Discover.MatchMovie(path, newLibrary.Count(), apiUrl));
                }
            }

            movies = newLibrary;
            SaveMoviesToFile();
            return movies;
        }

        public async Task<IEnumerable<MovieLibraryFile>> GetLibrary()
        {
            if (movies.Count() != 0)
            {
                return movies;
            }
            movies = await LoadMoviesFromFile();
            return movies;
        }

        /// <summary>
        /// LoadMovies retrieves the cached library files from the disk
        /// </summary>
        /// <param name="fileDir">The directory to search for 'movies.json' cache file.</param>
        /// <returns></returns>
        public async Task<IEnumerable<MovieLibraryFile>> LoadMoviesFromFile()
        {

            // TODO: Not sure if we want to scan automatically if the user doesn't have any files
            if (!File.Exists(moviesFile)) return new MovieLibraryFile[0];
            await using var fs = File.OpenRead(moviesFile);
            movies = await JsonSerializer.DeserializeAsync<List<MovieLibraryFile>>(fs);
            return movies;
        }

        /// <summary>
        /// Save movie library to JSON file.
        /// </summary>
        /// <param name="movies">List of MovieDbInfo Objects</param>
        public async void SaveMoviesToFile()
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            await using var fs = File.Create(moviesFile);
            await JsonSerializer.SerializeAsync(fs, movies, options);
        }

        /// <summary>
        /// UpdateMovie alters the metadata of a single movie in the the user's library
        /// </summary>
        /// <param name="libraryID">The library ID of the movie to modify. NOTE: Library ID is different than Metadata ID</param>
        /// <param name="metadata">The new metadata object to replace the existing. 
        /// (We pass the object because in the future we will allow custom metadata via user form)</param>
        /// <returns></returns>
        public IEnumerable<MovieLibraryFile> UpdateMovie(int libraryID, Metadata metadata)
        {
            Console.WriteLine(movies.Count());
            foreach (var movie in movies)
            {
                if (movie.Id == libraryID)
                {
                    movie.Metadata = metadata;
                    movie.Modified = metadata == null ? false : true;
                }
            }

            // Save the updated movies to the disk
            SaveMoviesToFile();
            return movies;
        }
    }
}