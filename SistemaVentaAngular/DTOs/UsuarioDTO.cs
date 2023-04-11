namespace SistemaVentaAngular.DTOs
{

    public class UsuarioDTO
    {
        public int IdUsuario { get; set; }
        public string NombreApellidos { get; set; }
        public string Correo { get; set; }
        public int IdRol { get; set; }
        public string rolDescripcion { get; set; }
        public string Clave { get; set; }

    }
}
