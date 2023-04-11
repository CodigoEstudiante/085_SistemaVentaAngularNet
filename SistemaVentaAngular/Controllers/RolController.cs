using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaVentaAngular.DTOs;
using SistemaVentaAngular.Repository.Contratos;
using AutoMapper;
using SistemaVentaAngular.Models;
using Microsoft.EntityFrameworkCore;
using SistemaVentaAngular.Utilidades;

namespace SistemaVentaAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRolRepositorio _rolRepositorio;
        public RolController(IRolRepositorio rolRepositorio, IMapper mapper)
        {
            _mapper = mapper;
            _rolRepositorio = rolRepositorio;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            Response<List<RolDTO>> _response = new Response<List<RolDTO>>();

            try
            {
                List<RolDTO> _listaRoles = new List<RolDTO>();
                _listaRoles = _mapper.Map<List<RolDTO>>(await _rolRepositorio.Lista());

                if (_listaRoles.Count > 0)
                    _response = new Response<List<RolDTO>>() { status = true, msg= "ok", value = _listaRoles };
                else
                    _response = new Response<List<RolDTO>>() { status = false, msg = "sin resultados", value = null };


                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<List<RolDTO>>() { status = false, msg = ex.Message, value = null };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}
