using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleJams.Model;
using NashvilleJams.Repository;
using System.Security.Claims;

namespace NashvilleJams.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }


        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var user = _userRepository.GetUserById(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(user);
        //}

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpGet("Me")]
        public IActionResult Me()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            // All newly registered users start out as a "user" user type e. they are not admins)
            user.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = user.FireBaseUserId }, user);
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.DeleteUser(id);
            return NoContent();
        }


    }
}

//