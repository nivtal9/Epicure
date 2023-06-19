
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Linq;

namespace API.Services
{

    public class ChefService : GenericService<Chef, ChefDTO>
    {
        public ChefService(IMapper mapper) : base(mapper)
        {
        }

        public async Task<ChefDTO> GetChefOfTheWeek()
        {
            using var session = _sessionFactory.OpenSession();
            var Chefs = await session.Query<Chef>()?.ToListAsync();
            var DTOMap = _mapper.Map<IEnumerable<ChefDTO>>(Chefs);
            return DTOMap.Any() ? DTOMap.Aggregate((i1, i2) => i1.Views > i2.Views ? i1 : i2) : null;
        }
    }
}