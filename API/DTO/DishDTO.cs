namespace API.DTO
{
    public class DishDTO : BaseDTO
    {
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string ImageURI { get; set; }
        public int Price { get; set; }
        public RestaurantDTO Restaurant { get; set; }
        public ISet<DishChangesDTO> DishChanges { get; set; } = new HashSet<DishChangesDTO>();
        public ISet<DishIconsDTO> DishIcons { get; set; } = new HashSet<DishIconsDTO>();
        public ISet<DishMealTypesDTO> DishMealTypes { get; set; } = new HashSet<DishMealTypesDTO>();
        public ISet<DishSidesDTO> DishSides { get; set; } = new HashSet<DishSidesDTO>();

    }
}
