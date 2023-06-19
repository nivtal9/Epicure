

namespace API.Models
{
    public class Chef : BaseModel
    {
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual int Views { get; set; }
        public virtual string ImageURI { get; set; }
        public virtual ISet<Restaurant> Restaurants { get; set; } = new HashSet<Restaurant>();
    }
}
