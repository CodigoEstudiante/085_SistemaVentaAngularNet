using SistemaVentaAngular.Models;

namespace SistemaVentaAngular.Repository.Contratos
{
    public interface ICategoriaRepositorio
    {
        Task<List<Categoria>> Lista();
    }
}
