using API.DTO;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefsController : GenericController<Chef, ChefDTO>
    {
        private readonly ChefService chefService;

        public ChefsController(IMapper mapper) : base(mapper)
        {
            chefService = new ChefService(mapper);
        }

        [HttpGet("chefoftheweek")]
        public async Task<ActionResult> GetChefOfTheWeek()
        {
            ChefDTO chef = await chefService.GetChefOfTheWeek();
            return chef == null ? NotFound() : Ok(chef);
        }
    }
}
