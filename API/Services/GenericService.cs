
using API.DTO;
using API.Helper;
using API.Models;
using AutoMapper;
using NHibernate;
using NHibernate.Linq;

namespace API.Services
{
    public class GenericService<Model,DTO> where Model: BaseModel where DTO: BaseDTO
    {
        public readonly IMapper _mapper;
        public readonly ISessionFactory _sessionFactory;

        public GenericService(IMapper mapper) {
            _mapper = mapper;
            _sessionFactory = NHibernateManager.GetSession();
        }

        public async Task<IEnumerable<DTO>> GetAll()
        {
            using var session = _sessionFactory.OpenSession();
            var Models = await session.Query<Model>()?.ToListAsync();
            return _mapper.Map<IEnumerable<DTO>>(Models);
        }

        public async Task<DTO> Create(Model entity)
        {
            using var session = _sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();
            await session.SaveAsync(entity);
            await transaction.CommitAsync();
            return _mapper.Map<DTO>(entity);
        }

        public async Task<DTO> Get(int id)
        {
            using var session = _sessionFactory.OpenSession();
            return await session.GetAsync<DTO>(id);
        }

        public async Task<DTO> Update(Model entity, int id)
        {
            using var session = _sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();
            Model entityExist = await session.GetAsync<Model>(id);
            if (entityExist == null) return null;
            entity.Id = entityExist.Id;
            await session.MergeAsync(entity);
            await transaction.CommitAsync();
            return _mapper.Map<DTO>(entityExist);
        }

        public async Task<bool> Delete(int id)
        {
            using var session = _sessionFactory.OpenSession();
            using var transaction = session.BeginTransaction();
            Model entityExist = await session.GetAsync<Model>(id);
            if (entityExist == null) return false;
            await session.DeleteAsync(entityExist);
            await transaction.CommitAsync();
            return true;
        }
    }
}
