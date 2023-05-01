using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using NashvilleJams.Model;
using NashvilleJams.Repository;
using System.Security.Claims;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JamController : ControllerBase
    {
        private readonly IJamRepository _jamRepository;
        private readonly IUserRepository _userRepository;

        public JamController(IJamRepository jamRepository, IUserRepository userRepository)
        {
            _jamRepository = jamRepository;
            _userRepository = userRepository;
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
            var currentUser = GetCurrentUserProfile();
            jam.UserId = currentUser.Id;

            _jamRepository.AddJam(jam);
            return CreatedAtAction(nameof(Get), new { id = jam.Id }, jam);
        }

        [HttpGet("getJamCount")]
        public IActionResult GetBikesInShopCount()
        {

            return Ok(_jamRepository.GetJamCount());
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


        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
