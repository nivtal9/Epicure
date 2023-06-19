namespace API.Models
{
    public class DishMealTypes : BaseModel
    {
        public virtual int Enum { get; set; }
        public virtual ISet<Dish> Dishes { get; set; } = new HashSet<Dish>();
    }
}
