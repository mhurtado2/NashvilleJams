using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
