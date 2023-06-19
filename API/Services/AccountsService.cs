using API.DTO;
using API.Helper;
using API.Models;
using NHibernate;
using NHibernate.Linq;
using System.Security.Cryptography;
using System.Text;

namespace API.Services
{
    public class AccountsService
    {
        protected readonly ISessionFactory _sessionFactory = NHibernateManager.GetSession();
        public async Task<User> RegisterUser(RegisterDTO userDTO)
        {
            var isUserExist = await UserExists(userDTO.Username);
            if (isUserExist != null)
            {
                throw new Exception("User exists!");
            }
            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = userDTO.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password)),
                PasswordSalt = hmac.Key
            };
            using (var session = _sessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    await session.SaveAsync(user);
                    await transaction.CommitAsync();
                }
            }
            return user;
        }

        private async Task<User> UserExists(string username)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var user = await session.Query<User>().Where(user => user.Username == username.ToLower()).FirstOrDefaultAsync();
                return user;
            }
        }

        public async Task<User> Login(LoginDTO userDTO)
        {
            var userExists = await UserExists(userDTO.Username);
            if (userExists == null) throw new Exception("Unauthorized user!");
            using var hmac = new HMACSHA512(userExists.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != userExists.PasswordHash[i]) throw new Exception("Unauthorized user!");
            }
            return userExists;
        }
    }
}
