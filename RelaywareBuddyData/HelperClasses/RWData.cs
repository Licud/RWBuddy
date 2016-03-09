using Data_Access_Layer.Repositories;
using RelaywareBuddyData.HelperClasses;
using System;
using RelaywareBuddyData.Models;

namespace Data_Access_Layer.Unit_Of_Work
{
    public class RWData : IDisposable
    {
        private RelaywareBuddyContext context = new RelaywareBuddyContext();
        private GenericRepository<Customer> customerRepository;
        private GenericRepository<CustomerAccess> customerAccessRepository;
        private GenericRepository<Ticket> ticketRepository;
        private GenericRepository<Timer> timerRepository;

        public GenericRepository<Timer> TimerRepository
        {
            get
            {
                if (this.timerRepository == null)
                    this.timerRepository = new GenericRepository<Timer>(context);
                return timerRepository;
            }
        }

        public GenericRepository<Customer> CustomerRepository
        {
            get
            {
                if (this.customerRepository == null)
                    this.customerRepository = new GenericRepository<Customer>(context);
                return customerRepository;
            }
        }

        public GenericRepository<CustomerAccess> CustomerAccessRepository
        {
            get
            {
                if (this.customerAccessRepository == null)
                    this.customerAccessRepository = new GenericRepository<CustomerAccess>(context);
                return customerAccessRepository;
            }
        }

        public GenericRepository<Ticket> TicketRepository
        {
            get
            {
                if (this.ticketRepository == null)
                    this.ticketRepository = new GenericRepository<Ticket>(context);
                return ticketRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
