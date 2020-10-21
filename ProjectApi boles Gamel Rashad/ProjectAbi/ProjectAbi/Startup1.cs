using System;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;
using ProjectAbi.Models;

[assembly: OwinStartup(typeof(ProjectAbi.Startup1))]

namespace ProjectAbi
{
    public class Startup1
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath=new PathString("/login"),
                AccessTokenExpireTimeSpan=TimeSpan.FromDays(14),
                AllowInsecureHttp=true,
                Provider = new TokenCreate()

            });
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());



            HttpConfiguration config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute("DefaultRoute", "api/{Controller}/{id}", new { id = RouteParameter.Optional });

            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            app.UseWebApi(config);

        }
    }

    internal class TokenCreate : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials
             (OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add(" Access - Control - Allow - Origin ", new[] { "*" });
            UserStore<IdentityUser> store =
                   new UserStore<IdentityUser>(new ApplicationDbContext());

            UserManager<IdentityUser> manager =
                new UserManager<IdentityUser>(store);
            IdentityUser user = await manager.FindAsync(context.UserName, context.Password);
            if (user==null)
            {
                context.SetError("grant_error", "username & password Not Valid");
            }
            else
            {
                ClaimsIdentity claims = new ClaimsIdentity(context.Options.AuthenticationType);
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
                claims.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
                if(manager.IsInRole(user.Id,"Admin"))
                    claims.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
                context.Validated(claims);
            }
        }
    }
}
