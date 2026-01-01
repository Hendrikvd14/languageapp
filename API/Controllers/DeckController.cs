using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeckController(IUnitOfWork uow) : BaseApiController
    {
    }
}
