using System.Collections.Generic;
using System.Threading.Tasks;
using watch_together.Streaming;

namespace watch_together.Services
{
    public interface ILibraryService
    {
        Task<IEnumerable<MovieLibraryFile>> ScanLibrary();
        Task<IEnumerable<MovieLibraryFile>> GetLibrary();
        Task<IEnumerable<MovieLibraryFile>> LoadMoviesFromFile();
        IEnumerable<MovieLibraryFile> UpdateMovie(int libraryID, Metadata metadata);
    }
}