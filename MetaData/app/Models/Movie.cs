using System.ComponentModel.DataAnnotations.Schema;

namespace MetaData.Models
{
    [Table("movies")]
    public class Movie
    {
        [Column("id")] public int ID { get; set; }
        [Column("url")] public string Url { get; set; }
        [Column("title")] public string Title { get; set; }
        [Column("year")] public string Year { get; set; }
        [Column("rating")] public string Rating { get; set; }
        [Column("summary")] public string Summary { get; set; }
        [Column("poster")] public string Poster { get; set; }
    }
}