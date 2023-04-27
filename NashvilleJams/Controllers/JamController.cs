using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Repository;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JamController : ControllerBase
    {
        private readonly IJamRepository _jamRepository;

        public JamController(IJamRepository jamRepository)
        {
            _jamRepository = jamRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jamRepository.GetAllJams());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var jam = _jamRepository.GetJamById(id);
            if (jam == null)
            {
                return NotFound();
            }
            return Ok(jam);
        }
    }
}
