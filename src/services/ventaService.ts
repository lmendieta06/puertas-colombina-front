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

export type VentaResumen = {
  id: number;
  numero_factura: string;
  fecha_emision: string;
  cliente_nombre: string;
  cliente_email: string;
  total: string;
};

// ============ SERVICIO ============

export const ventaService = {
  /**
   * Crea una venta: el backend calcula IVA/retención, guarda en DB
   * y envía la factura por correo al cliente.
   */
  crear(input: CrearVentaInput) {
    return apiClient.post<CrearVentaResponse>("/api/ventas", input);
  },

  /**
   * Lista las últimas ventas (uso administrativo).
   */
  listar() {
    return apiClient.get<{ ok: true; ventas: VentaResumen[] }>("/api/ventas");
  },
};