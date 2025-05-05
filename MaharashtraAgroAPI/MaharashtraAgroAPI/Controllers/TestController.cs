using Microsoft.AspNetCore.Mvc;

[Route("api/test")]  // Defines the API endpoint as /api/test
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult GetMessage()
    {
        return Ok("Hello from .NET API!");
    }
}
