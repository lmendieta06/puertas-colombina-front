import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import {
  Check,
  ChevronLeft,
  CreditCard,
  Gift,
  Hammer,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  getProduct,
  formatPrice,
  products,
  getProductSku,
  getProductMaterials,
  getProductAvailability,
} from "@/data/products";

export const Route = createFileRoute("/productos/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · Puertas Colombia` },
          { name: "description", content: loaderData.product.shortDescription },
          {
            property: "og:title",
            content: `${loaderData.product.name} · Puertas Colombia`,
          },
          {
            property: "og:description",
            content: loaderData.product.shortDescription,
          },
          { property: "og:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Pieza no encontrada</h1>
      <Link
        to="/productos"
        className="mt-6 inline-block text-sm uppercase tracking-wider text-primary hover:underline"
      >
        ← Volver al catálogo
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Algo salió mal</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

const sizes = ["XXL", "XL", "L", "M", "S", "XS"] as const;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/\bxxl\b|\bxl\b|\bl\b|\bm\b|\bs\b|\bxs\b/g, "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/·/g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .trim();

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const { add } = useCart();

  const sku = getProductSku(product);
  const materials = getProductMaterials(product);
  const availability = getProductAvailability(product);

  const productBaseName = normalize(product.name);
  const productRefNumber = product.ref.replace(/\D/g, "");
  const productRegionBase = normalize(product.region.split("·")[0] ?? product.region);

  const sizeVariants = sizes.map((size) => {
    const variant = products.find((item) => {
      const itemBaseName = normalize(item.name);
      const itemRefNumber = item.ref.replace(/\D/g, "");
      const itemRegionBase = normalize(item.region.split("·")[0] ?? item.region);

      const sameName = itemBaseName === productBaseName;
      const sameReference =
        productRefNumber.length > 0 && itemRefNumber === productRefNumber;
      const sameRegion =
        productRegionBase.length > 0 && itemRegionBase === productRegionBase;

      return item.category === size && (sameName || sameReference || sameRegion);
    });

    return {
      size,
      variant,
      available: Boolean(variant),
      active: product.category === size,
    };
  });

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const alsoBought = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 3);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <Link
          to="/productos"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Volver al catálogo
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[90px_minmax(0,1fr)_360px]">
          <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
            {product.images.map((img, index) => (
              <button
                key={`${img}-${index}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-muted transition ${
                  active === index
                    ? "border-primary shadow-md"
                    : "border-border opacity-80 hover:border-gold hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} vista ${index + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = product.images[0];
                  }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div
                className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-xl border border-border bg-muted"
                onMouseMove={handleMove}
                onMouseLeave={() => setZoom(null)}
              >
                <img
                  src={product.images[active]}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src = product.images[0];
                  }}
                  className="h-full w-full object-cover transition-transform duration-200"
                  style={
                    zoom
                      ? {
                          transformOrigin: `${zoom.x}% ${zoom.y}%`,
                          transform: "scale(2.15)",
                        }
                      : undefined
                  }
                />

                <div className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm">
                  {product.category}
                </div>

                {product.badge && (
                  <div className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-night shadow-sm">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1 text-xs text-foreground shadow-sm">
                  {active + 1} / {product.images.length}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-gold-deep">
                  {product.category} · {product.ref}
                </div>

                <h1 className="mt-3 font-display text-4xl leading-tight text-balance md:text-5xl">
                  {product.name}
                </h1>

                <p className="mt-2 font-serif text-lg italic text-muted-foreground">
                  {product.region}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-1 text-gold-deep">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-muted-foreground">18 opiniones</span>
                  <span className="text-sm text-muted-foreground">|</span>
                  <span className="text-sm text-muted-foreground">SKU: {sku}</span>
                </div>

                <div className="mt-5">
                  <div className="text-sm text-muted-foreground">Precio</div>
                  <div className="font-display text-4xl text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Precio de referencia. El envío se confirma según ciudad y tamaño.
                  </p>
                </div>

                <p className="mt-6 leading-relaxed text-foreground/85">
                  {product.description}
                </p>

                <div className="mt-6">
                  <div className="mb-2 text-sm font-medium">Selecciona talla</div>

                  <div className="flex flex-wrap gap-2">
                    {sizeVariants.map(({ size, variant, available, active }) =>
                      available && variant ? (
                        <Link
                          key={size}
                          to="/productos/$id"
                          params={{ id: variant.id }}
                          className={`rounded-sm border px-4 py-2 text-sm transition ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background hover:border-primary hover:bg-muted"
                          }`}
                        >
                          {size}
                        </Link>
                      ) : (
                        <button
                          key={size}
                          type="button"
                          disabled
                          title="No disponible en esta talla"
                          className="cursor-not-allowed rounded-sm border border-border bg-muted px-4 py-2 text-sm text-muted-foreground opacity-60"
                        >
                          {size}
                        </button>
                      ),
                    )}
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Las tallas disponibles dependen de las referencias cargadas en el catálogo.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <MiniTrust
                    icon={<Hammer className="h-4 w-4" />}
                    title="Hecho a mano"
                    text="Tallado, pintado y acabado artesanal."
                  />
                  <MiniTrust
                    icon={<Gift className="h-4 w-4" />}
                    title="Ideal para regalo"
                    text="Pieza decorativa con identidad colombiana."
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="order-3">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="font-display text-3xl text-primary">
                {formatPrice(product.price)}
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <PurchaseLine
                  icon={<PackageCheck className="h-4 w-4" />}
                  title="Disponibilidad"
                  text={availability}
                  strong
                />
                <PurchaseLine
                  icon={<Truck className="h-4 w-4" />}
                  title="Entrega estimada"
                  text="3 a 5 días hábiles si está disponible."
                />
                <PurchaseLine
                  icon={<MapPin className="h-4 w-4" />}
                  title="Envíos"
                  text="A principales ciudades de Colombia."
                />
                <PurchaseLine
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Confirmación"
                  text="Validamos el pedido antes del despacho."
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">Cantidad</label>
                <div className="inline-flex items-center rounded-full border border-border bg-background">
                  <button
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    className="grid h-10 w-10 place-items-center rounded-l-full hover:bg-muted"
                    type="button"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((value) => value + 1)}
                    className="grid h-10 w-10 place-items-center rounded-r-full hover:bg-muted"
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-night transition hover:opacity-90"
                type="button"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Añadido al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Añadir al carrito
                  </>
                )}
              </button>

              <Link
                to="/carrito"
                onClick={handleAdd}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Comprar ahora
              </Link>

              <a
                href="https://wa.me/573216136824?text=Hola%20Puertas%20Colombia%2C%20quiero%20informaci%C3%B3n%20sobre%20este%20producto."
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>

              <div className="mt-5 rounded-sm bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                Compra simulada para el portal. El pedido real se confirma por WhatsApp,
                junto con ciudad, disponibilidad y método de entrega.
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-3xl">Acerca de este artículo</h2>

            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <Bullet>
                Pieza artesanal inspirada en puertas, fachadas y portones tradicionales de
                Colombia.
              </Bullet>
              <Bullet>
                Elaborada con procesos manuales de talla, pintura, envejecido y acabado
                protector.
              </Bullet>
              <Bullet>
                Ideal para decoración del hogar, oficinas, regalos especiales o colección
                patrimonial.
              </Bullet>
              <Bullet>
                Cada producto conserva una referencia comercial para facilitar catálogo,
                pedidos e inventario.
              </Bullet>
              <Bullet>
                Inspiración regional: {product.region}. Categoría: {product.category}.
              </Bullet>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-3xl">Ficha técnica</h2>

            <div className="mt-5 divide-y divide-border text-sm">
              <Spec label="Nombre" value={product.name} />
              <Spec label="Referencia" value={product.ref} />
              <Spec label="SKU" value={sku} />
              <Spec label="Categoría" value={product.category} />
              <Spec label="Región" value={product.region} />
              <Spec label="Tamaño" value={product.size} />
              <Spec label="Materiales" value={materials} />
              <Spec label="Acabado" value="Pintado y envejecido artesanalmente" />
              <Spec label="Disponibilidad" value={availability} />
              <Spec label="Origen" value="Colombia" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-4">
          <TrustBox
            icon={<Truck className="h-5 w-5" />}
            title="Envíos nacionales"
            text="Despachos a principales ciudades de Colombia por transportadora aliada."
          />
          <TrustBox
            icon={<PackageCheck className="h-5 w-5" />}
            title="Entrega estimada"
            text="Disponible: 3 a 5 días hábiles. Bajo pedido: 7 a 12 días hábiles."
          />
          <TrustBox
            icon={<CreditCard className="h-5 w-5" />}
            title="Pago confirmado"
            text="Confirmación previa del pedido, ciudad de entrega y método de pago."
          />
          <TrustBox
            icon={<HeartHandshake className="h-5 w-5" />}
            title="Atención cercana"
            text="Acompañamiento por WhatsApp para resolver dudas antes de comprar."
          />
        </section>

        {alsoBought.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.25em] text-gold-deep">
                  Recomendados
                </div>
                <h2 className="font-display text-3xl">Clientes también compraron</h2>
              </div>
              <Link
                to="/productos"
                className="text-sm uppercase tracking-wider text-primary hover:underline"
              >
                Ver catálogo →
              </Link>
            </div>

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {alsoBought.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl">Opiniones de clientes</h2>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex text-gold-deep">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="font-medium">4.8 de 5</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Basado en opiniones de clientes y visitantes del punto de venta.
              </p>
            </div>

            <div className="space-y-4">
              <Review
                name="Cliente en Bogotá"
                text="La pieza tiene mucho detalle y el acabado se siente artesanal. Se ve muy bien en la entrada de la casa."
              />
              <Review
                name="Compradora de regalo"
                text="Me gustó porque no es un regalo genérico. Tiene historia, color y una identidad muy colombiana."
              />
              <Review
                name="Visitante en Usaquén"
                text="Los diseños llaman la atención y la idea de representar puertas de Colombia es muy original."
              />
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-3xl">Preguntas sobre este producto</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Question
              question="¿Se puede personalizar?"
              answer="Sí, algunos diseños pueden adaptarse según tamaño, color o referencia. La viabilidad se confirma por WhatsApp."
            />
            <Question
              question="¿Cómo se envía?"
              answer="Se empaca cuidadosamente y se despacha por transportadora aliada a principales ciudades de Colombia."
            />
            <Question
              question="¿Cómo se cuida?"
              answer="Se recomienda limpiar con paño seco y ubicar en interiores, evitando humedad directa o químicos fuertes."
            />
          </div>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-8">
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-gold-deep">
              Productos similares
            </div>
            <h2 className="font-display text-3xl">Piezas relacionadas</h2>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function PurchaseLine({
  icon,
  title,
  text,
  strong = false,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  strong?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <div className="font-medium">{title}</div>
        <p className={strong ? "text-primary" : "text-muted-foreground"}>{text}</p>
      </div>
    </div>
  );
}

function MiniTrust({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-sm font-medium">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-4 py-3">
      <div className="font-medium text-foreground">{label}</div>
      <div className="text-muted-foreground">{value}</div>
    </div>
  );
}

function TrustBox({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Review({ name, text }: { name: string; text: string }) {
  return (
    <article className="rounded-sm bg-muted p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex text-gold-deep">
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </article>
  );
}

function Question({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-sm border border-border bg-background p-5">
      <h3 className="font-display text-xl">{question}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
    </article>
  );
}