using Data_Access_Layer.Unit_Of_Work;
using RelaywareBuddy.ViewModels;
using RelaywareBuddyData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RelaywareBuddy.Controllers
{
    public class HomeController : Controller
    { 
        // GET: Home
        public ActionResult Index()
        {
            IndexViewModel thisModel = new IndexViewModel()
            {
                customer = new Customer(),
                customerAccess = new List<CustomerAccess>(),
                newCustomerAccess  = new CustomerAccess(),
                timer = new Timer(),
                ticket = new Ticket()
            };


            return View(thisModel);
        }

        public PartialViewResult AddTimer(string _taskGeneratedId)
        {

            return PartialView("TimerBoxPartial", new TimerViewModel() { taskGeneratedId = _taskGeneratedId });

        }
    }
}