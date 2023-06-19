using API.DTO;
using API.Models;
using AutoMapper;
using NHibernate.Linq;

namespace API.Services
{
    public class RestaurantService : GenericService<Restaurant, RestaurantDTO>
    {
        protected readonly int POPULAR_VIEWS_COUNT = 100;
        public RestaurantService(IMapper mapper) : base(mapper)
        {
        }

        public async Task<IEnumerable<RestaurantDTO>> GetMostPopular()
        {
            using var session = _sessionFactory.OpenSession();
            var Restaurants = await session.Query<Restaurant>()?.ToListAsync();
            var DTOMap = _mapper.Map<IEnumerable<RestaurantDTO>>(Restaurants);
            return DTOMap.Any() ? DTOMap.OrderByDescending(rest => rest.Popularity).Take(3) : null;
        }


        public async Task<IEnumerable<RestaurantDTO>> GetPopular()
        {
            using var session = _sessionFactory.OpenSession();
            var Restaurants = await session.Query<Restaurant>()?.ToListAsync();
            var DTOMap = _mapper.Map<List<RestaurantDTO>>(Restaurants);
            return DTOMap.Any() ? DTOMap.FindAll(rest => rest.Popularity >= POPULAR_VIEWS_COUNT) : null;
        }

        public async Task<IEnumerable<RestaurantDTO>> GetRestaurantByChefId(int id)
        {
            using var session = _sessionFactory.OpenSession();
            var Restaurants = await session.Query<Restaurant>()?.ToListAsync();
            Restaurants = Restaurants.FindAll(rest => rest.Chef.Id == id);
            return _mapper.Map<IEnumerable<RestaurantDTO>>(Restaurants);
        }
        public async Task<RestaurantDTO> AddRestaurantChef(int chefid, int restid)
        {
            using var session = _sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();
            Restaurant Restaurant = await session.GetAsync<Restaurant>(restid);
            Chef Chef = await session.GetAsync<Chef>(chefid);
            Restaurant.Chef = Chef;
            await session.MergeAsync(Restaurant);
            await transaction.CommitAsync();
            return _mapper.Map<RestaurantDTO>(Restaurant);
        }
    }
}
