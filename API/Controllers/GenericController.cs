
using API.DTO;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController<Model, DTO> : ControllerBase where Model : BaseModel where DTO : BaseDTO
    {
        readonly GenericService<Model, DTO> _service;
        readonly IMapper _mapper;
        public GenericController(IMapper mapper)
        {
            _mapper = mapper;
            _service = new GenericService<Model, DTO>(_mapper);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            IEnumerable<DTO> GetAll = await _service.GetAll();
            return GetAll == null? NotFound() : Ok(GetAll);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Model entity)
        {
            DTO existingEntity = await _service.Create(entity);
            return CreatedAtAction(nameof(Get), new { id = existingEntity.Id }, existingEntity);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get([FromRoute] int id)
        {
            DTO existingEntity =await _service.Get(id);
            return existingEntity == null ? NotFound() : Ok(existingEntity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update([FromBody] Model entity, [FromRoute] int id)
        {
            DTO existingEntity = await _service.Update(entity, id);
            return existingEntity == null ? NotFound() : Ok(existingEntity);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            bool existingEntity = await _service.Delete(id);
            return existingEntity ? NoContent() : NotFound();
        }
    }
}