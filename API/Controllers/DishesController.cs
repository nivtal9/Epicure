using API.DTO;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishesController : GenericController<Dish, DishDTO>
    {
        private readonly DishService _dishService;

        public DishesController(IMapper mapper) : base(mapper)
        {
            _dishService = new DishService(mapper);
        }

        [HttpGet("signature")]
        public async Task<ActionResult> GetSignatureDishes()
        {
            IEnumerable<DishDTO> dishes = await _dishService.GetSignatureDishes();
            return dishes.FirstOrDefault() == null ? NotFound() : Ok(dishes);
        }

        [HttpPost("{dishid}/addrest/{restid}")]
        public async Task<ActionResult> AddDishRest([FromRoute] int restid, [FromRoute] int dishid)
        {
            DishDTO Dish = await _dishService.AddDishRest(restid, dishid);
            return CreatedAtAction(nameof(Get), new { id = Dish.Id }, Dish);
        }

        [HttpGet("{restid}/getbymealtype/{mealtype}")]
        public async Task<ActionResult> GetByMealType([FromRoute] int restid, [FromRoute] int mealtype)
        {
            IEnumerable<DishDTO> dishes = await _dishService.GetByMealType(restid, mealtype);
            return dishes.FirstOrDefault() == null ? NotFound() : Ok(dishes);
        }
    }
}
