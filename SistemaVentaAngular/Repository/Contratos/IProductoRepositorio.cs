using SistemaVentaAngular.Models;
using System.Linq.Expressions;

namespace SistemaVentaAngular.Repository.Contratos
{
    public interface IProductoRepositorio
    {
        Task<Producto> Obtener(Expression<Func<Producto, bool>> filtro = null);
        Task<Producto> Crear(Producto entidad);
        Task<bool> Editar(Producto entidad);
        Task<bool> Eliminar(Producto entidad);
        Task<IQueryable<Producto>> Consultar(Expression<Func<Producto, bool>> filtro = null);
    }
}
