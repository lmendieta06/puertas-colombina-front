import { useEffect } from "react";
import { Instagram } from "lucide-react";

type Props = {
  /**
   * El ID del widget que te da Elfsight (la parte después de "elfsight-app-").
   * Ejemplo: "a253a694-53c6-49ca-9ee4-6895cc31a44c"
   */
  widgetId: string;
  /** URL del perfil de Instagram para el botón CTA */
  instagramUrl?: string;
  /** Título de la sección */
  title?: string;
  /** Subtítulo */
  subtitle?: string;
};

export function InstagramFeed({
  widgetId,
  instagramUrl = "https://www.instagram.com/puertascolombianas",
  title = "Síguenos en Instagram",
  subtitle = "Descubre nuestras últimas piezas, procesos artesanales y la inspiración detrás de cada puerta.",
}: Props) {
  // Carga el script de Elfsight solo una vez en toda la app
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <header className="mb-10 text-center">
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          @puertascolombianas
        </div>
        <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      </header>

      {/* Widget de Elfsight: se renderiza cuando platform.js se carga */}
      <div
        className={`elfsight-app-${widgetId}`}
        data-elfsight-app-lazy
      />

      <div className="mt-8 text-center">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90"
        >
          <Instagram className="h-4 w-4" />
          Ver perfil completo
        </a>
      </div>
    </section>
  );
}