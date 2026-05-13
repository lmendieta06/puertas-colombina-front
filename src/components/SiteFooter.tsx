import { Link } from "@tanstack/react-router";
import { ExternalLink, Instagram, MapPin } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/puertas_colombianas/?hl=en",
    icon: <Instagram className="h-4 w-4" />,
  },
  {
    label: "Facebook",
    href: "http://web.facebook.com/puertascolombianas?utm_source=ig&utm_medium=social&utm_content=link_in_bio#",
    icon: <ExternalLink className="h-4 w-4" />,
  },
  {
    label: "Ubicación",
    href: "https://maps.app.goo.gl/DWAiHDdfZoxwJGae6",
    icon: <MapPin className="h-4 w-4" />,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-night text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">Puertas Colombia</div>
          <p className="mt-3 max-w-sm text-sm text-cream/70">
            Puertas colombianas elaboradas a mano. Piezas inspiradas en la arquitectura
            colonial, la memoria regional y los colores de Colombia.
          </p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-[0.2em] text-gold">
              Redes y ubicación
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-xs text-cream/80 transition hover:border-gold hover:text-gold"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            Navegación
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Inicio</Link></li>
            <li><Link to="/productos" className="hover:text-gold">Productos</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-gold">Quiénes somos</Link></li>
            <li><Link to="/contactanos" className="hover:text-gold">Contáctanos</Link></li>
            <li>
              <Link to="/preguntas-frecuentes" className="hover:text-gold">
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold">
            Contacto
          </div>

          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>Mercado de las Pulgas Usaquén · Stand 18</li>
            <li>Carrera 6 Calle 119b · Bogotá</li>
            <li>puertascombianas@gmail.com</li>
            <li>+57 321 613 6824</li>
            <li>+57 311 841 7307</li>
          </ul>

          <a
            href="https://maps.app.goo.gl/DWAiHDdfZoxwJGae6"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition hover:text-cream"
          >
            Ver ubicación
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-cream/50 md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} Puertas Colombia. Todos los derechos reservados.</span>
          <span className="font-serif italic">Donde cada puerta cuenta una historia.</span>
        </div>
      </div>
    </footer>
  );
}
