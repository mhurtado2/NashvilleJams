using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Model;
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

        [HttpPost]
        public IActionResult Post(Jam jam)
        {

            _jamRepository.AddJam(jam);
            return CreatedAtAction(nameof(Get), new { id = jam.Id }, jam);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Jam jam)
        {
            if (id != jam.Id)
            {
                return BadRequest();
            }

            _jamRepository.UpdateJam(jam);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _jamRepository.DeleteJam(id);
            return NoContent();
        }

    }
}
