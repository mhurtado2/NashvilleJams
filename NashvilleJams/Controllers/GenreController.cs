﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Repository;

namespace NashvilleJams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;

        public GenreController(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_genreRepository.GetAllGenres());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var genre = _genreRepository.GetGenreById(id);
            if (genre == null)
            {
                return NotFound();
            }
            return Ok(genre);
        }


    }
}
