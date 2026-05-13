import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star, Truck } from "lucide-react";
import heroCollection from "@/assets/hero-collection.jpg";
import {
  formatPrice,
  getProductAvailability,
  getProductSku,
} from "@/data/products";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const availability = getProductAvailability(product);
  const sku = getProductSku(product);

  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
      <Link to="/productos/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.images[0] ?? heroCollection}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = product.images[1] ?? heroCollection;
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary shadow-sm">
            {product.category}
          </div>

          {product.badge && (
            <div className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-night shadow-sm">
              {product.badge}
            </div>
          )}

          <div
            className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-medium text-white shadow-sm ${
              availability === "Disponible"
                ? "bg-green-700"
                : availability === "Bajo pedido"
                  ? "bg-yellow-700"
                  : "bg-red-700"
            }`}
          >
            {availability}
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div>
          <Link
            to="/productos/$id"
            params={{ id: product.id }}
            className="font-display text-2xl leading-tight transition hover:text-primary"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-sm text-muted-foreground">
            {product.region}
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium">4.8</span>
          <span className="flex text-gold-deep">
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
          </span>
          <span className="text-muted-foreground">(12)</span>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            Ref: {product.ref} · SKU: {sku}
          </div>
          <div>Tamaño: {product.size}</div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        <div>
          <div className="text-2xl font-semibold text-foreground">
            {formatPrice(product.price)}
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5 text-primary" />
            Envío nacional disponible
          </div>
        </div>

        <div className="grid gap-2">
          <Link
            to="/productos/$id"
            params={{ id: product.id }}
            className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-2.5 text-sm font-medium text-night transition hover:opacity-90"
          >
            Ver detalles
          </Link>

          <Link
            to="/productos/$id"
            params={{ id: product.id }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            <ShoppingCart className="h-4 w-4" />
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}