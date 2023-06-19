
using API.DTO;
using API.Models;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Restaurant, RestaurantDTO>();
            CreateMap<Chef, ChefDTO>();
            CreateMap<Dish, DishDTO>();
            CreateMap<DishChanges, DishChangesDTO>();
            CreateMap<DishIcons, DishIconsDTO>();
            CreateMap<DishMealTypes, DishMealTypesDTO>();
            CreateMap<DishSides, DishSidesDTO>();
            CreateMap<OpeningHour, OpeningHoursDTO>();
            CreateMap<User, UserDTO>();
        }
    }
}