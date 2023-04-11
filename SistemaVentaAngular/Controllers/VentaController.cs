using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SistemaVentaAngular.DTOs;
using SistemaVentaAngular.Models;
using SistemaVentaAngular.Repository.Contratos;
using SistemaVentaAngular.Utilidades;
using System.Globalization;

namespace SistemaVentaAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentaController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IVentaRepositorio _ventaRepositorio;

        public VentaController(IVentaRepositorio ventaRepositorio, IMapper mapper)
        {
            _mapper = mapper;
            _ventaRepositorio = ventaRepositorio;
        }


        [HttpPost]
        [Route("Registrar")]
        public async Task<IActionResult> Registrar([FromBody] VentaDTO request)
        {
            Response<VentaDTO> _response = new Response<VentaDTO>();
            try
            {

                Venta venta_creada = await _ventaRepositorio.Registrar(_mapper.Map<Venta>(request));
                request = _mapper.Map<VentaDTO>(venta_creada);

              if(venta_creada.IdVenta != 0)
                    _response = new Response<VentaDTO>() { status = true, msg = "ok", value = request };
              else
                    _response = new Response<VentaDTO>() { status = false, msg = "No se pudo registrar la venta" };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<VentaDTO>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet]
        [Route("Historial")]
        public async Task<IActionResult> Historial(string buscarPor,string? numeroVenta, string? fechaInicio, string? fechaFin)
        {
            Response<List<VentaDTO>> _response = new Response<List<VentaDTO>>();

            numeroVenta = numeroVenta is null ? "" : numeroVenta;
            fechaInicio = fechaInicio is null ? "" : fechaInicio;
            fechaFin = fechaInicio is null ? "" : fechaFin;

            try {

                List<VentaDTO> vmHistorialVenta = _mapper.Map<List<VentaDTO>>(await _ventaRepositorio.Historial(buscarPor, numeroVenta, fechaInicio, fechaFin));
               
                if (vmHistorialVenta.Count > 0)
                    _response = new Response<List<VentaDTO>>() { status = true, msg = "ok", value = vmHistorialVenta };
                else
                    _response = new Response<List<VentaDTO>>() { status = false, msg = "No se pudo registrar la venta" };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<List<VentaDTO>>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);

            }

        }

        [HttpGet]
        [Route("Reporte")]
        public async Task<IActionResult> Reporte(string? fechaInicio, string? fechaFin)
        {
            Response<List<ReporteDTO>> _response = new Response<List<ReporteDTO>>();
            DateTime _fechaInicio = DateTime.ParseExact(fechaInicio, "dd/MM/yyyy", new CultureInfo("es-PE"));
            DateTime _fechaFin = DateTime.ParseExact(fechaFin, "dd/MM/yyyy", new CultureInfo("es-PE"));

            try
            {

                List<ReporteDTO> listaReporte = _mapper.Map<List<ReporteDTO>>(await _ventaRepositorio.Reporte(_fechaInicio,_fechaFin));

                if (listaReporte.Count > 0)
                    _response = new Response<List<ReporteDTO>>() { status = true, msg = "ok", value = listaReporte };
                else
                    _response = new Response<List<ReporteDTO>>() { status = false, msg = "No se pudo registrar la venta" };

                return StatusCode(StatusCodes.Status200OK, _response);
            }
            catch (Exception ex)
            {
                _response = new Response<List<ReporteDTO>>() { status = false, msg = ex.Message };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);

            }

        }


     

    }
}
