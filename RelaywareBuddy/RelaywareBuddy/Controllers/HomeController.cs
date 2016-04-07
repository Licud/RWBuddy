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
        private RWData RWData = new RWData();

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

        public JsonResult AddTimer(int id)
        {
            DateTime currentDate = DateTime.Now;

            string generatedId = currentDate.Year.ToString() + currentDate.Month.ToString() + currentDate.Day.ToString() + currentDate.Millisecond.ToString() + id.ToString();

            Timer newTimer = new Timer() { TimerObjectId = generatedId, Hours = 0, Minutes = 0, Seconds = 0, Task = "", Description = ""};

            RWData.TimerRepository.AddRecord(newTimer);

            return Json(new { timerObjectId = newTimer.TimerObjectId, hours = newTimer.Hours, minutes = newTimer.Minutes, seconds = newTimer.Seconds, task = newTimer.Task,
                description = newTimer.Description, timerIsRunning = 0 } );

        }

        public JsonResult AddCustomerAccess(NewCustomerAccess _newCustomerAccess)
        {
            CustomerAccess customerAccess = new CustomerAccess()
            {
                Customer = _newCustomerAccess.Customer,
                IPAddress = _newCustomerAccess.IPAddress,
                AccessType = _newCustomerAccess.AccessType,
                Password = _newCustomerAccess.Password,
                Created = DateTime.Now,
                LastUpdated = DateTime.Now
            };

            customerAccess = RWData.CustomerAccessRepository.AddAndReturnRecord(customerAccess);

            RWData.Save();

            return Json(new { Customer = customerAccess.Customer, IPAddress = customerAccess.IPAddress,
                                Password = customerAccess.Password, AccessType = customerAccess.AccessType});
        }

        public JsonResult GetAllCustomerAccessDetails()
        {

            var customerAccessData =  RWData.CustomerAccessRepository.GetAllRecords();

            return Json(customerAccessData, JsonRequestBehavior.AllowGet);

        }

        public JsonResult AddCustomer(NewCustomer _newCustomer)
        {
            Customer customer = new Customer()
            {
                CustomerName = _newCustomer.CustomerName,
                MSStartDate = (_newCustomer.MSStartDate == DateTime.MinValue) ? DateTime.Now : _newCustomer.MSStartDate,
                MSEndDate = (_newCustomer.MSEndDate == DateTime.MinValue) ? DateTime.Now : _newCustomer.MSEndDate,
                HasMS = _newCustomer.HasMS,
                DurationOfService = _newCustomer.DurationOfService,
                ReportingServices = _newCustomer.ReportingServices,
                notes = _newCustomer.notes,
                Created = DateTime.Now,
                LastUpdated = DateTime.Now
            };

            customer = RWData.CustomerRepository.AddAndReturnRecord(customer);

            return Json(new
            {
                CustomerName = customer.CustomerName,
                MSStartDate = customer.MSStartDate,
                MSEndDate = customer.MSEndDate,
                HasMS = customer.HasMS,
                DurationOfService = customer.DurationOfService,
                ReportingServices = customer.ReportingServices,
                notes = customer.notes,
                Created = customer.Created,
                LastUpdated = customer.LastUpdated
            });
        }
    }
}
