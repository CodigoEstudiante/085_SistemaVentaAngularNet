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
    public class UsuarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        public UsuarioController(IUsuarioRepositorio usuarioRepositorio,IMapper mapper)
        {
            _mapper = mapper;
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista() {
            Response<List<UsuarioDTO>> _response = new Response<List<UsuarioDTO>>();
            
            try
            {
                List<UsuarioDTO> ListaUsuarios = new List<UsuarioDTO>();
                IQueryable<Usuario> query = await _usuarioRepositorio.Consultar();
                query = query.Include(r => r.IdRolNavigation);

                ListaUsuarios  = _mapper.Map<List<UsuarioDTO>>(query.ToList());

                if (ListaUsuarios.Count > 0)
                    _response = new Response<List<UsuarioDTO>>() { status = true, msg = "ok", value = ListaUsuarios };
                else
                    _response = new Response<List<UsuarioDTO>>() { status = false, msg = "", value = null };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex) {
                _response = new Response<List<UsuarioDTO>>() { status = false, msg = ex.Message, value = null };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet]
        [Route("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion(string correo,string clave)
        {
            Response<Usuario> _response = new Response<Usuario> ();
            try
            {
                Usuario _usuario  = await _usuarioRepositorio.Obtener(u => u.Correo == correo && u.Clave == clave);

                if (_usuario != null)
                    _response = new Response<Usuario>() { status = true,msg="ok",value = _usuario };
                else
                    _response = new Response<Usuario>() { status = false, msg = "no encontrado", value = null };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<Usuario>() { status = false, msg = ex.Message, value = null };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] UsuarioDTO request)
        {
            Response<UsuarioDTO> _response = new Response<UsuarioDTO>();
            try
            {
                Usuario _usuario = _mapper.Map<Usuario>(request);

                Usuario _usuarioCreado =   await _usuarioRepositorio.Crear(_usuario);

                if(_usuarioCreado.IdUsuario != 0)
                    _response = new Response<UsuarioDTO>() { status = true, msg= "ok", value = _mapper.Map<UsuarioDTO>(_usuarioCreado) };
                else
                    _response = new Response<UsuarioDTO>() { status = false, msg = "No se pudo crear el usuario" };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<UsuarioDTO>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] UsuarioDTO request)
        {
            Response<UsuarioDTO> _response = new Response<UsuarioDTO>();
            try
            {
                Usuario _usuario = _mapper.Map<Usuario>(request);
                Usuario _usuarioParaEditar = await _usuarioRepositorio.Obtener(u => u.IdUsuario == _usuario.IdUsuario);

                if (_usuarioParaEditar != null)
                {

                    _usuarioParaEditar.NombreApellidos = _usuario.NombreApellidos;
                    _usuarioParaEditar.Correo = _usuario.Correo;
                    _usuarioParaEditar.IdRol = _usuario.IdRol;
                    _usuarioParaEditar.Clave = _usuario.Clave;

                    bool respuesta = await _usuarioRepositorio.Editar(_usuarioParaEditar);

                    if (respuesta)
                        _response = new Response<UsuarioDTO>() { status = true, msg = "ok", value = _mapper.Map<UsuarioDTO>(_usuarioParaEditar) };
                    else
                        _response = new Response<UsuarioDTO>() { status = false, msg = "No se pudo editar el usuario" };
                }
                else {
                    _response = new Response<UsuarioDTO>() { status = false, msg = "No se encontró el usuario" };
                }

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<UsuarioDTO>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }



        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Response<string> _response = new Response<string>();
            try
            {
                Usuario _usuarioEliminar = await _usuarioRepositorio.Obtener(u => u.IdUsuario == id);

                if (_usuarioEliminar != null) {

                    bool respuesta = await _usuarioRepositorio.Eliminar(_usuarioEliminar);

                    if (respuesta)
                        _response = new Response<string>() { status = true, msg = "ok", value = "" };
                    else
                        _response = new Response<string>() { status = false, msg = "No se pudo eliminar el usuario", value = "" };
                }

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<string>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}
