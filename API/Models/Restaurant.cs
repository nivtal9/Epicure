

namespace API.Models
{
    public class Restaurant : BaseModel
    {
        public virtual string Name { get; set; }
        public virtual string ImageURI { get; set; }
        public virtual int Rating { get; set; }
        public virtual int Popularity { get; set; }
        public virtual DateTime DateOpened { get; set; }
        public virtual Chef Chef { get; set; }
        public virtual ISet<Dish> Dishes { get; set; } = new HashSet<Dish>();
        public virtual ISet<OpeningHour> OpeningHours { get; set; } = new HashSet<OpeningHour>();
    }
}
