import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import heroCollection from "@/assets/hero-collection.jpg";
import {
  ArrowRight,
  CreditCard,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Puertas Colombia · Arte en puertas artesanales" },
      {
        name: "description",
        content:
          "Réplicas artesanales de las puertas patrimoniales de Colombia. Talladas a mano, cada pieza es única.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featuredIds = [
    "mompox-102",
    "bogota-101",
    "candelaria-011",
    "cartagena-015",
    "barranquilla-012",
    "portallaves-xl",
  ];

  const featured = featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream/60">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold-deep">
              <Sparkles className="h-4 w-4" />
              Elaboradas a mano
            </div>

            <h1 className="font-display text-5xl leading-tight text-balance md:text-7xl">
              Guardamos la historia de Colombia en madera.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Réplicas artesanales inspiradas en puertas, fachadas, portones y aldabas
              tradicionales colombianas. Cada pieza combina arte, color, memoria regional
              y trabajo hecho a mano.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/productos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Ver colección
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/quienes-somos"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Nuestra historia
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-6">
              <Stat n="22+" label="años de historia" />
              <Stat n="100%" label="hecho a mano" />
              <Stat n="12" label="regiones inspiradas" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden rounded-sm bg-background p-4 shadow-lg md:block">
              <div className="text-xs uppercase tracking-[0.2em] text-gold-deep">
                Punto de venta
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                Usaquén · Stand 18
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-border bg-background p-3 shadow-xl">
              <img
                src={heroCollection}
                alt="Colección artesanal de Puertas Colombia"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 right-4 rounded-sm bg-night px-5 py-4 text-cream shadow-lg">
              <div className="text-xs uppercase tracking-[0.2em] text-gold">
                Arte · Color · Historia
              </div>
              <div className="mt-1 font-display text-2xl">Puertas Colombia</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/60 bg-background">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-4 md:px-8">
          <TrustItem
            icon={<HeartHandshake className="h-5 w-5" />}
            title="Hecho a mano"
            text="Piezas artesanales elaboradas con detalle, color e identidad colombiana."
          />
          <TrustItem
            icon={<Truck className="h-5 w-5" />}
            title="Envíos nacionales"
            text="Despachos a principales ciudades de Colombia por transportadora aliada."
          />
          <TrustItem
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Pedido confirmado"
            text="Validamos disponibilidad, datos y ciudad antes de realizar el despacho."
          />
          <TrustItem
            icon={<CreditCard className="h-5 w-5" />}
            title="Pago seguro"
            text="Proceso de compra claro, con confirmación previa y atención personalizada."
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
            Explora por colección
          </div>
          <h2 className="font-display text-4xl md:text-5xl">
            Encuentra una pieza para cada espacio
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nuestro catálogo reúne cuadros decorativos, portallaves y aldabas inspiradas
            en la arquitectura tradicional colombiana.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <CategoryCard title="Puertas decorativas" text="Tallas XXL, XL, L, M, S y XS." />
          <CategoryCard title="Aldabas" text="Edición especial inspirada en Cartagena." />
          <CategoryCard title="Portallaves" text="Arte funcional para la entrada del hogar." />
          <CategoryCard title="Personalizados" text="Piezas por encargo según referencia." />
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
              Colección destacada
            </div>
            <h2 className="font-display text-4xl md:text-5xl">Piezas únicas</h2>
          </div>
          <Link
            to="/productos"
            className="text-sm uppercase tracking-wider text-primary hover:underline"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="relative bg-night text-cream">
        <div className="stripe-fiesta" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-caribe-yellow">
              Nuestra herencia
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Hace 22 años abrimos las puertas a la{" "}
              <em className="font-serif italic text-caribe-yellow">
                colección colombiana
              </em>.
            </h2>
          </div>

          <div className="space-y-4 text-cream/80">
            <p>
              Estas puertas llevan consigo la herencia de elementos renacentistas,
              barrocos y la influencia de los estilos español, árabe y francés que
              dieron forma a nuestra arquitectura colonial.
            </p>
            <p>
              Buscamos material histórico de la época de la colonización entre 1880
              y 1930, y lo reinterpretamos con maderas, hierros y bronces de la región.
            </p>
            <Link
              to="/quienes-somos"
              className="inline-flex items-center gap-2 pt-3 text-sm uppercase tracking-wider text-gold hover:text-cream"
            >
              Conoce nuestra historia <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
            Proceso artesanal
          </div>
          <h2 className="font-display text-4xl md:text-5xl">
            De la puerta real a una pieza de colección
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <ProcessStep
            number="01"
            title="Inspiración"
            text="Investigamos puertas, fachadas y portones tradicionales de Colombia."
          />
          <ProcessStep
            number="02"
            title="Diseño"
            text="Adaptamos la referencia a escala, cuidando proporciones, color y ornamentos."
          />
          <ProcessStep
            number="03"
            title="Talla y pintura"
            text="Trabajamos madera, detalles, herrajes y acabados de manera artesanal."
          />
          <ProcessStep
            number="04"
            title="Entrega"
            text="Confirmamos disponibilidad, empaque, ciudad de destino y método de entrega."
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream/50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
              Comentarios
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Opiniones de personas que valoran el detalle artesanal, la identidad
              colombiana y el significado cultural de cada pieza.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Testimonial
              name="Cliente en Bogotá"
              text="La pieza se ve preciosa en la entrada de mi casa. Tiene mucho detalle y transmite una historia muy colombiana."
            />
            <Testimonial
              name="Compradora de regalo"
              text="Fue un regalo diferente y muy especial. Me gustó que no fuera un producto genérico, sino algo con identidad."
            />
            <Testimonial
              name="Visitante en Usaquén"
              text="Los colores, acabados y formas llaman mucho la atención. Es una marca con una propuesta muy bonita."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[2rem] bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 text-xs uppercase tracking-[0.25em] opacity-80">
              Colección artesanal
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              Lleva a tu espacio una puerta con historia.
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Explora nuestra colección y elige una pieza inspirada en las regiones,
              colores y arquitectura de Colombia.
            </p>
            <Link
              to="/productos"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              Comprar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function CategoryCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <Link
        to="/productos"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        Ver productos <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <div className="text-xs uppercase tracking-[0.25em] text-gold-deep">
        {number}
      </div>
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-6">
      <div className="font-serif text-3xl italic text-primary">“</div>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-deep">
        {name}
      </div>
    </div>
  );
}