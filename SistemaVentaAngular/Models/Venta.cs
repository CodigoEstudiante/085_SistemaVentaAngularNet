using System;
using System.Collections.Generic;

namespace SistemaVentaAngular.Models
{
    public partial class Venta
    {
        public Venta()
        {
            DetalleVenta = new HashSet<DetalleVenta>();
        }

        public int IdVenta { get; set; }
        public string? NumeroDocumento { get; set; }
        public string? TipoPago { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public decimal? Total { get; set; }

        public virtual ICollection<DetalleVenta> DetalleVenta { get; set; }
    }
}
