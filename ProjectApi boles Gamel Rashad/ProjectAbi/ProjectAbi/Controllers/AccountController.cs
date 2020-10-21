using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ProjectAbi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ProjectAbi.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> registration(CustomerModel customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                
                UserStore<IdentityUser> store = 
                    new UserStore<IdentityUser>(new ApplicationDbContext());
                UserManager<IdentityUser> manager =
                    new UserManager<IdentityUser>(store);
                IdentityUser user = new IdentityUser();
                user.UserName = customer.UserName;
                user.PasswordHash = customer.Password;
                user.Email = customer.Email;
           IdentityResult result=await manager.CreateAsync(user, customer.Password);
                if(result.Succeeded)
                {
                    return Created("", "register Sucess " + user.UserName);
                }
                else
                {
                    
                    return BadRequest((result.Errors.ToList())[0]);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
