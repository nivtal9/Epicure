using API.DTO;

namespace API.Models
{
    public class Dish : BaseModel
    {
        public virtual string Name { get; set; }
        public virtual string Ingredients { get; set; }
        public virtual string ImageURI { get; set; }
        public virtual int Price { get; set; }
        public virtual Restaurant Restaurant { get; set; }
        public virtual ISet<DishChanges> DishChanges { get; set; }
        public virtual ISet<DishIcons> DishIcons { get; set; } = new HashSet<DishIcons>();
        public virtual ISet<DishMealTypes> DishMealTypes { get; set; } = new HashSet<DishMealTypes>();
        public virtual ISet<DishSides> DishSides { get; set; } = new HashSet<DishSides>();
    }
}
