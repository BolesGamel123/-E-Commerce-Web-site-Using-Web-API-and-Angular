using ProjectAbi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ProjectAbi.Controllers
{
   
    public class ProductController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();
        public IHttpActionResult getproduct()
        {
            List<Product> prods = context.Products.ToList();
            return Ok(prods);
        }

        public IHttpActionResult getProductById(int id)
        {
            Product Prd = context.Products.Where(p => p.ID == id).FirstOrDefault();
            return Ok(Prd);
        }



        [HttpPost]
        public IHttpActionResult add(Product p)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                context.Products.Add(p);
                context.SaveChanges();
              

               
                return Created(" ", "Added Sucess");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        //[Route("api/updateprod/{id}")]

        //public IHttpActionResult Put(int id, Product p)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {
        //        Product prod = context.Products.FirstOrDefault(pr => pr.ID == id);
        //        prod.Name = p.Name;
        //        prod.Price = p.Price;
        //        prod.Description = p.Description;
        //        prod.Quantity = p.Quantity;
        //        context.SaveChanges();

        //        return StatusCode(HttpStatusCode.NoContent);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);

        //    }
        //}

            
        public IHttpActionResult DEleteDept(int id) 
        {
            try
            {
                Product pro = context.Products.FirstOrDefault(d => d.ID == id);
                context.Products.Remove(pro);
                context.SaveChanges();
                return Ok("DElete Sucess");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        

    
        [HttpPost]
        [Route("api/Upload")]
        public HttpResponseMessage Upload()
        {
            string Image = null;
            var httpRequest = HttpContext.Current.Request;

            var postedFile = httpRequest.Files["Image"];

            Image = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");

            Image = Image + DateTime.Now.ToString("yymmssff") + Path.GetExtension(postedFile.FileName);

            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + Image);
            postedFile.SaveAs(filePath);

            Product p = new Product()
            {
                Name = httpRequest["Name"],
                Description=httpRequest["Description"],
                Quantity= int.Parse(httpRequest["Quantity"]),
                Price = double.Parse(httpRequest["Price"]),
                Image = Image

            };
            context.Products.Add(p);
            context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created);

        }




        public IHttpActionResult PutSave(int id)
        {
            string Image = null;
            var httpRequest = HttpContext.Current.Request;

            var postedFile = httpRequest.Files["Image"];

            Image = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");

            Image = Image + DateTime.Now.ToString("yymmssff") + Path.GetExtension(postedFile.FileName);

            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + Image);
            postedFile.SaveAs(filePath);

            Product p = new Product()
            {
                Name = httpRequest["Name"],
                Description = httpRequest["Description"],
                Quantity = int.Parse(httpRequest["Quantity"]),
                Price = double.Parse(httpRequest["Price"]),
                Image = Image

            };
            Product prod = context.Products.FirstOrDefault(pr => pr.ID == id);
            prod.Name = p.Name;
            prod.Description = p.Description;
            prod.Quantity = p.Quantity;
            prod.Price = p.Price;
            prod.Image = p.Image;
           
            context.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);

        }

    }
}
