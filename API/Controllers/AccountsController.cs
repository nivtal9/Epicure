using API.DTO;
using API.Interface;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : Controller
    {
        private AccountsService _accountService;
        private readonly ITokenService _tokenService;

        public AccountsController(AccountsService accountService, ITokenService tokenService)
        {
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDTO registerUserDTO)
        {
            try
            {
                var user = await _accountService.RegisterUser(registerUserDTO);
                var userDTO = new UserDTO
                {
                    Username = user.Username,
                    Token = _tokenService.CreateToken(user)
                };
                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDTO loginDTO)
        {
            try
            {
                var user = await _accountService.Login(loginDTO);
                var userDTO = new UserDTO
                {
                    Username = user.Username,
                    Token = _tokenService.CreateToken(user)
                };
                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
