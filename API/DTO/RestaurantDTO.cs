using API.Models;

namespace API.DTO
{
    public class RestaurantDTO : BaseDTO
    {
        public string Name { get; set; }
        public string ImageURI { get; set; }
        public int Rating { get; set; }
        public int Popularity { get; set; }
        public DateTime DateOpened { get; set; }
        public ChefDTO Chef { get; set; }
        public ISet<OpeningHoursDTO> OpeningHours { get; set; } = new HashSet<OpeningHoursDTO>();
    }
}
