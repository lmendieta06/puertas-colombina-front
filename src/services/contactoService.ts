import { apiClient } from "@/lib/api";

// ============ TIPOS ============

export type CrearContactoInput = {
  nombre: string;
  email: string;
  telefono?: string;
  ciudad?: string;
  asunto?: string;
  mensaje: string;
};

export type CrearContactoResponse = {
  ok: true;
  contacto: { id: number };
};

// ============ SERVICIO ============

export const contactoService = {
  /**
   * Envía un mensaje desde el formulario "Contáctanos".
   * El backend lo guarda en DB y reenvía al correo de la tienda.
   */
  enviar(input: CrearContactoInput) {
    return apiClient.post<CrearContactoResponse>("/api/contacto", input);
  },
};