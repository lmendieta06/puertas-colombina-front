import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/blog", label: "Blog" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contactanos", label: "Contáctanos" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="stripe-fiesta" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-gradient-puertas text-primary-foreground shadow-puerta">
            <span className="font-display text-lg leading-none">P</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base tracking-wide text-gradient-puertas">Puertas Colombia</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-gold-deep">Arte · Color · Historia</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm tracking-wide text-foreground/80 transition hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrito"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-medium text-secondary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-3 text-sm hover:bg-muted"
                activeProps={{ className: "text-primary font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
