﻿using API.Models;

namespace API.Interface
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
