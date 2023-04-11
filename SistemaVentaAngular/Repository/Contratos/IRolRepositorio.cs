using SistemaVentaAngular.Models;

namespace SistemaVentaAngular.Repository.Contratos
{
    public interface IRolRepositorio
    {
        Task<List<Rol>> Lista();
    }
}
