using angularAspNet.Context;
using angularAspNet.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angularAspNet.Controllers
{
    [Route("api/[controller]")]
    public class EroiController : Controller
    {

        //Select all heroes
        [HttpGet("[action]")]
        public List<Eroi> GetEroi()
        {

            using (var context = new EroiContext())
            {
                return context.Eroi.ToList();
            }

        }

        //Select a heroe with the name
        [HttpGet("[action]")]
        public List<Eroi> GetEroe([FromQuery] string name)
        {
            using (var context = new EroiContext())
            {
                var result = context.Eroi.Where(x => x.Name.Contains(name));
               
                if(result != null)
                {
                    return result.ToList();
                }

                return null;
            }
        }

        /*[HttpGet("[action]")]
        public List<Eroi> GetEroe([FromQuery] string name)
        {
            using (var context = new EroiContext())
            {
                IQueryable<Eroi> whereEroi = context.Eroi.Where(x => x.Name.Contains(name));

                return whereEroi.ToList();
            }
        }*/

        //Select a heroe with the ID
        [HttpGet("[action]/{id}")]
        public Eroi GetEroeID([FromRoute] int id)
        {
            using (var context = new EroiContext())
            {
                return context.Eroi.Single(x => x.Id == id);
            }
        }

        //Add a new heroe
        [HttpPost("[action]")]
        public Eroi InsertEroe([FromBody] Eroi eroe)
        {
            using (var context = new EroiContext())
            {
                context.Eroi.Add(eroe);
                context.SaveChanges();
                return eroe;
            }
        }

        //Update name of a heroe
        [HttpPut("[action]")]
        public IActionResult UpdateEroe([FromBody] Eroi eroe)
        {
            using (var context = new EroiContext())
            {
                var eroeDaDb = context.Eroi.FirstOrDefault(x => x.Id == eroe.Id); //cerca il primo elemento il cui ID matcha con quello passato dall'utente
                if (eroeDaDb == null)
                {
                    return NotFound();
                }
                eroeDaDb.Name = eroe.Name;
                context.SaveChanges();
                return Ok(eroeDaDb);
            }
        }

        //Delete a heroe
        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteEroe([FromRoute] int id)
        {
            using (var context = new EroiContext())
            {
                var eroeDaDb = context.Eroi.FirstOrDefault(x => x.Id == id);
                if (eroeDaDb == null)
                {
                    return NotFound();
                }
                context.Eroi.Remove(eroeDaDb);
                context.SaveChanges();
                return Ok(eroeDaDb);
            }
        }


    }
}
