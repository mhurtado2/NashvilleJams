using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Repository;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGenreController : ControllerBase
    {
        private readonly IUserGenreRepository _userGenreRepository;

        public UserGenreController(IUserGenreRepository userGenreRepository)
        {
            _userGenreRepository = userGenreRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userGenreRepository.GetAllUserGenres());
        }
    }
}
