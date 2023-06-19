namespace API.Models
{
    public class DishIcons : BaseModel
    {
        public virtual string IconURI { get; set; }
        public virtual ISet<Dish> Dishes { get; set; } = new HashSet<Dish>();
    }
}
