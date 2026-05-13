import { apiClient } from "@/lib/api";

// ============ TIPOS ============

export type Comentario = {
  id: number;
  nombre: string;
  ciudad: string;
  calificacion: number;
  mensaje: string;
  aprobado: boolean;
  creado_en: string;
};

export type CrearComentarioInput = {
  nombre: string;
  ciudad?: string;
  calificacion: number;
  mensaje: string;
};

// ============ SERVICIO ============

export const comentarioService = {
  /**
   * Obtiene los comentarios aprobados, más nuevos primero.
   */
  async listar(): Promise<Comentario[]> {
    const res = await apiClient.get<{ ok: true; comentarios: Comentario[] }>(
      "/api/comentarios",
    );
    return res.comentarios;
  },

  /**
   * Publica un comentario nuevo. El backend lo guarda y
   * notifica a la tienda por correo.
   */
  async crear(input: CrearComentarioInput): Promise<Comentario> {
    const res = await apiClient.post<{ ok: true; comentario: Comentario }>(
      "/api/comentarios",
      input,
    );
    return res.comentario;
  },
};