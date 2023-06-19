
using API.DTO;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : GenericController<Restaurant, RestaurantDTO>
    {
        private readonly RestaurantService _restaurantService;

        public RestaurantsController(IMapper mapper) : base(mapper)
        {
            _restaurantService = new RestaurantService(mapper);
        }

        [HttpGet("top3")]
        public async Task<ActionResult> GetMostPopular()
        {
            IEnumerable<RestaurantDTO> top3 = await _restaurantService.GetMostPopular();
            return top3 == null ? NotFound() : Ok(top3);
        }

        [HttpGet("populars")]
        public async Task<ActionResult> GetPopular()
        {
            IEnumerable<RestaurantDTO> popularRestaurants = await _restaurantService.GetPopular();
            return popularRestaurants == null ? NotFound() : Ok(popularRestaurants);
        }

        [HttpGet("bychef/{id}")]
        public async Task<ActionResult> GetRestaurantsByChefId(int id)
        {
            IEnumerable<RestaurantDTO> filteredRestaurants = await _restaurantService.GetRestaurantByChefId(id);
            return filteredRestaurants == null ? NotFound() : Ok(filteredRestaurants);
        }

        [HttpPost("{restid}/addchef/{chefid}")]
        public async Task<ActionResult> AddRestaurantsToChef([FromRoute] int chefid, [FromRoute] int restid)
        {
            RestaurantDTO Restaurant = await _restaurantService.AddRestaurantChef(chefid, restid);
            return CreatedAtAction(nameof(Get), new { id = Restaurant.Id }, Restaurant);
        }
    }
}
