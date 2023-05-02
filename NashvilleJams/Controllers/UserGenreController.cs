using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Model;
using NashvilleJams.Repository;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGenreController : ControllerBase
    {
        private readonly IUserGenreRepository _userGenreRepository;
        private readonly IGenreRepository _genreRepository;

        public UserGenreController(IUserGenreRepository userGenreRepository, IGenreRepository genreRepository)
        {
            _userGenreRepository = userGenreRepository;
            _genreRepository = genreRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userGenreRepository.GetAllUserGenres());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userGenre = _userGenreRepository.GetUserGenreById(id);
            if (userGenre == null)
            {
                return NotFound();
            }
            return Ok(userGenre);
        }


        [HttpDelete("deleteUserGenre{id}")]
        public IActionResult DeleteUserGenre(int userGenreId, Genre genre)
        {

            _userGenreRepository.DeleteUserGenre(userGenreId, genre);
            return Ok();

        }


    }
}
