import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { contactoService } from "@/services/contactoService";

export const Route = createFileRoute("/contactanos")({
  head: () => ({
    meta: [
      { title: "Contáctanos · Puertas Colombia" },
      {
        name: "description",
        content:
          "Escríbenos para cotizaciones, pedidos personalizados, envíos nacionales y compras de piezas artesanales.",
      },
    ],
  }),
  component: ContactPage,
});

const whatsappUrl =
  "https://wa.me/573216136824?text=Hola%20Puertas%20Colombia%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos.";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await contactoService.enviar({
        nombre: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        telefono: String(data.get("phone") || "").trim() || undefined,
        ciudad: String(data.get("city") || "").trim() || undefined,
        asunto: String(data.get("subject") || "").trim() || undefined,
        mensaje: String(data.get("message") || "").trim(),
      });

      form.reset();
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("[contactanos] Error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <header className="max-w-2xl">
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          Contáctanos
        </div>
        <h1 className="font-display text-5xl text-balance md:text-6xl">
          Hablemos de tu próxima pieza
        </h1>
        <p className="mt-4 text-muted-foreground">
          Escríbenos para comprar una pieza disponible, solicitar un pedido personalizado o resolver
          dudas sobre envíos, tiempos de entrega y métodos de pago.
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <Info
            icon={<MapPin className="h-4 w-4" />}
            title="Ubicación"
            lines={[
              "Mercado de las Pulgas Usaquén · Stand 18",
              "Carrera 6 Calle 119b · Bogotá",
              "Sábados y domingos",
            ]}
          />
          <Info
            icon={<Mail className="h-4 w-4" />}
            title="Correo"
            lines={["puertascombianas@gmail.com"]}
          />
          <Info
            icon={<Phone className="h-4 w-4" />}
            title="Teléfonos"
            lines={["+57 321 613 6824", "+57 311 841 7307"]}
          />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm bg-green-600 px-6 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-green-700"
          >
            <MessageCircle className="h-5 w-5" />
            Escribir por WhatsApp
          </a>

          <div className="rounded-sm border border-border bg-card p-6">
            <div className="font-serif italic text-lg leading-snug text-foreground">
              “Cada pieza se trabaja a mano y se confirma contigo antes del despacho.”
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gold-deep">
              — Puertas Colombia
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-sm border border-border bg-card p-8 lg:col-span-3"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nombre" name="name" required />
            <Field label="Correo" name="email" type="email" required />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Teléfono" name="phone" />
            <Field label="Ciudad" name="city" />
          </div>

          <Field label="Asunto" name="subject" />

          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
              Mensaje
            </label>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Cuéntanos qué producto te interesa o si deseas una pieza personalizada."
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm uppercase tracking-wider text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Enviando..." : "Enviar mensaje"}
          </button>

          {sent && (
            <p className="text-sm text-primary">
              Gracias por escribir. Te responderemos pronto.
            </p>
          )}

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function ContactPromise({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
function Info({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-deep">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </div>
      <div className="mt-2 space-y-0.5 pl-9 text-sm">
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        <ContactPromise
          title="Atención personalizada"
          text="Te ayudamos a escoger la pieza ideal según espacio, tamaño, ciudad de inspiración o tipo de regalo."
        />
        <ContactPromise
          title="Pedidos confirmados"
          text="Antes de despachar, verificamos disponibilidad, datos de contacto, dirección y método de entrega."
        />
        <ContactPromise
          title="Envíos nacionales"
          text="Realizamos envíos a principales ciudades de Colombia con tiempos estimados según disponibilidad."
        />
      </section>
    </div>
  );
}