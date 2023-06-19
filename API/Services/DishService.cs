
using API.DTO;
using API.Helper;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NHibernate.Linq;

namespace API.Services
{
    public class DishService : GenericService<Dish, DishDTO>
    {
        public DishService(IMapper mapper) : base(mapper) { }

        public async Task<IEnumerable<DishDTO>> GetSignatureDishes()
        {
            using var session = _sessionFactory.OpenSession();
            var Dishes = await session.Query<Dish>()?.ToListAsync();
            Dishes = Dishes.FindAll(dish => dish.Price >= 100);
            return _mapper.Map<IEnumerable<DishDTO>>(Dishes).Take(3);
        }
        public async Task<DishDTO> AddDishRest(int restid, int dishid)
        {
            using var session = _sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();
            Dish Dish = await session.GetAsync<Dish>(dishid);
            Restaurant Restaurant = await session.GetAsync<Restaurant>(restid);
            Dish.Restaurant = Restaurant;
            await session.MergeAsync(Dish);
            await transaction.CommitAsync();
            return _mapper.Map<DishDTO>(Dish);
        }

        public async Task<IEnumerable<DishDTO>> GetByMealType(int restid, int mealtype)
        {
            using var session = _sessionFactory.OpenSession();
            var Dishes = await session.Query<Dish>()?
                .Where(dish => dish.DishMealTypes.Any(type => type.Enum == mealtype)
                && dish.Restaurant.Id == restid).ToListAsync();
            return _mapper.Map<IEnumerable<DishDTO>>(Dishes);
        }
    }
}
