import { apiClient } from "@/lib/api";

// ============ TIPOS ============

export type VentaItemInput = {
  producto_id: string;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
};

export type ClienteInput = {
  nombre: string;
  documento?: string;
  email: string;
  telefono?: string;
  ciudad?: string;
  direccion?: string;
  notas?: string;
};

export type CrearVentaInput = {
  cliente: ClienteInput;
  items: VentaItemInput[];
  metodo_pago: string;
  envio?: number;
};

export type CrearVentaResponse = {
  ok: true;
  venta: {
    id: number;
    numero_factura: string;
    total: number;
    cliente_email: string;
  };
};

// ============ SERVICIO ============

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const ventaService = {
  /**
   * Crea una venta: el backend calcula IVA/retención y la guarda en DB.
   * Devuelve el número de factura para descargar el PDF después.
   */
  crear(input: CrearVentaInput) {
    return apiClient.post<CrearVentaResponse>("/api/ventas", input);
  },

  /**
   * Devuelve la URL pública para descargar la factura en PDF.
   * El navegador la abre directamente.
   */
  urlPDF(numeroFactura: string): string {
    return `${API_URL}/api/ventas/${encodeURIComponent(numeroFactura)}/pdf`;
  },
};