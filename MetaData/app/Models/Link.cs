using System.ComponentModel.DataAnnotations.Schema;
namespace MetaData.Models
{
    [Table("link")]
    public class Link
    {
        [Column("id")]
        public int ID { get; set; }

        [Column("url")]
        public virtual Movie Movie { get; set; }
        [Column("link")]
        public string Url { get; set; }
    }
}