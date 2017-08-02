using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Monitoring.Data;
using Microsoft.EntityFrameworkCore;

namespace Monitoring.Controllers
{
    public class HomeController : Controller
    {
        MonitoringDbContext _dbContext;
        public HomeController(MonitoringDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/deps")]
        public IActionResult Get()
        {
            try
            {
                var maxPeriod = _dbContext.debts.Max(s => s.period);
                var begPeriod = _dbContext.debts.Where(s => s.period < maxPeriod).Max(s => s.period);
                var model = _dbContext.debts.Include(s=>s.supers).Where(s => s.period == maxPeriod).GroupBy(s => new { s.period, s.supers.code, s.supers.descr }).Select(s => new
                {
                    s.Key.period,
                    s.Key.code,
                    super = s.Key.descr,
                    shippment = s.Sum(t => t.shippment),
                    payment = s.Sum(t => t.payment),
                    bal = s.Sum(t => t.bal),
                    debt = s.Sum(t => t.debt),
                    deltaBal = _dbContext.debts.Where(t => t.period == begPeriod && t.super == s.Key.code).Sum(k => k.bal),
                    deltaDebt = _dbContext.debts.Where(t => t.period == begPeriod && t.super == s.Key.code).Sum(k => k.debt)
                });
                return Ok(new { model = model, apiStatus = "successfully", message = "get list depts", success = true });
            }
            catch(Exception ex)
            {
                return Ok(new { apiStatus = "error", message = ex.Message, success = false });
            }
        }
        [HttpGet]
        [Route("api/agents/{id}")]
        public IActionResult GetAgents(string id)
        {
            var maxPeriod = _dbContext.debts.Max(s => s.period);
            var begPeriod = _dbContext.debts.Where(s => s.period < maxPeriod).Max(s => s.period);
            var model = _dbContext.debts.Where(s => s.period == maxPeriod && s.super == id).GroupBy(s => new { s.period, s.agents.code, s.agents.descr }).Select(s => new
            {
                s.Key.period,
                s.Key.code,
                agent = s.Key.descr,
                shippment = s.Sum(t => t.shippment),
                payment = s.Sum(t => t.payment),
                bal = s.Sum(t => t.bal),
                debt = s.Sum(t => t.debt),
                deltaBal = _dbContext.debts.Where(t => t.period == begPeriod && t.agent == s.Key.code).Sum(k => k.bal),
                deltaDebt = _dbContext.debts.Where(t => t.period == begPeriod && t.agent == s.Key.code).Sum(k => k.debt)
            });
            return Ok(new { model = model, apiStatus = "successfully", message = "get list agents", success = true });
        }
        [HttpGet]
        [Route("api/customers/{agent}")]
        public IActionResult GetCustomers(string agent)
        {
            var maxPeriod = _dbContext.debts.Max(s => s.period);
            var begPeriod = _dbContext.debts.Where(s => s.period < maxPeriod).Max(s => s.period);
            var model = _dbContext.debts.Where(s => s.period == maxPeriod && s.agent == agent).GroupBy(s => new { s.period, s.kontragents.code, s.kontragents.descr }).Select(s => new
            {
                s.Key.period,
                s.Key.code,
                customer = s.Key.descr,
                shippment = s.Sum(t => t.shippment),
                payment = s.Sum(t => t.payment),
                bal = s.Sum(t => t.bal),
                debt = s.Sum(t => t.debt),
                deltaBal = _dbContext.debts.Where(t => t.period == begPeriod && t.customer == s.Key.code).Sum(k => k.bal),
                deltaDebt = _dbContext.debts.Where(t => t.period == begPeriod && t.customer == s.Key.code).Sum(k => k.debt)
            });
            return Ok(new { model = model, apiStatus = "successfully", message = "get list customers", success = true });
        }

    }
}
