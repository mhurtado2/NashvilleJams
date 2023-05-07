using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Model;
using NashvilleJams.Repository;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreaOfTownController : ControllerBase
    {
        private readonly IAreaOfTownRepository _areaOfTownRepository;

        public AreaOfTownController(IAreaOfTownRepository areaOfTownRepository)
        {
            _areaOfTownRepository = areaOfTownRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_areaOfTownRepository.GetAllAreas());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var area = _areaOfTownRepository.GetAreaById(id);
            if (area == null)
            {
                return NotFound();
            }
            return Ok(area);
        }

        [HttpPost]
        public IActionResult Post(AreaOfTown areaOfTown)
        {
            _areaOfTownRepository.AddArea(areaOfTown);
            return CreatedAtAction(nameof(Get), new { id = areaOfTown.Id }, areaOfTown);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, AreaOfTown areaOfTown)
        {
            if (id != areaOfTown.Id)
            {
                return BadRequest();
            }

            _areaOfTownRepository.UpdateArea(areaOfTown);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _areaOfTownRepository.DeleteArea(id);
            return NoContent();
        }

    }
}
