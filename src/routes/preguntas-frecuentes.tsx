import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  CreditCard,
  HeartHandshake,
  MessageCircle,
  PackageCheck,
  Paintbrush,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () => ({
    meta: [
      { title: "Preguntas frecuentes · Puertas Colombia" },
      {
        name: "description",
        content:
          "Resuelve dudas sobre envíos, tiempos de entrega, pedidos personalizados, pagos y cuidado de las piezas artesanales de Puertas Colombia.",
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    icon: <Truck className="h-5 w-5" />,
    question: "¿Hacen envíos nacionales?",
    answer:
      "Sí. Realizamos envíos a principales ciudades de Colombia por medio de transportadoras aliadas. El valor del envío se confirma según la ciudad, el tamaño de la pieza y la disponibilidad del producto.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    question: "¿Cuánto tarda en llegar un pedido?",
    answer:
      "Los productos disponibles suelen tardar entre 3 y 5 días hábiles. Los productos bajo pedido o personalizados pueden tardar entre 7 y 12 días hábiles, dependiendo del diseño y la carga de producción.",
  },
  {
    icon: <Paintbrush className="h-5 w-5" />,
    question: "¿Puedo pedir una pieza personalizada?",
    answer:
      "Sí. Revisamos solicitudes personalizadas según referencia, tamaño, color o inspiración regional. Antes de iniciar, confirmamos viabilidad, tiempo estimado y precio final.",
  },
  {
    icon: <PackageCheck className="h-5 w-5" />,
    question: "¿Qué materiales utilizan?",
    answer:
      "Trabajamos principalmente con madera tallada a mano, pintura artesanal, acabados protectores y detalles metálicos según el tipo de pieza.",
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    question: "¿Cómo se confirma la compra?",
    answer:
      "Después de seleccionar el producto, confirmamos disponibilidad, datos de envío y método de pago. Para pedidos personalizados, también confirmamos detalles del diseño antes de producir.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    question: "¿Cómo debo cuidar mi pieza?",
    answer:
      "Recomendamos ubicarla en espacios interiores, evitar humedad directa y limpiarla suavemente con un paño seco. No se recomienda usar químicos fuertes sobre la pintura o el acabado.",
  },
];

function FaqPage() {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-4 py-20 md:px-8">
        <header className="max-w-3xl">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
            Preguntas frecuentes
          </div>
          <h1 className="font-display text-5xl text-balance md:text-6xl">
            Todo lo que necesitas saber antes de comprar
          </h1>
          <p className="mt-4 text-muted-foreground">
            Resolvemos las dudas más comunes sobre disponibilidad, envíos, tiempos de entrega,
            pedidos personalizados, pagos y cuidado de las piezas.
          </p>
        </header>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-sm border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                {faq.icon}
              </div>
              <h2 className="font-display text-2xl">{faq.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </article>
          ))}
        </section>
      </section>

      <section className="bg-cream/50">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:items-center md:px-8">
          <div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h2 className="font-display text-4xl">¿Tienes otra pregunta?</h2>
            <p className="mt-3 text-muted-foreground">
              Escríbenos y te ayudamos a escoger la pieza ideal, confirmar disponibilidad o
              resolver dudas sobre tu pedido personalizado.
            </p>
          </div>

          <Link
            to="/contactanos"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm uppercase tracking-wider text-primary-foreground transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar
          </Link>
        </div>
      </section>
    </div>
  );
}