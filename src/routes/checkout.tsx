import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  CreditCard,
  Download,
  Landmark,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Send,
  ShieldCheck,
  Smartphone,
  Truck,
  WalletCards,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { ventaService } from "@/services/ventaService";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Puertas Colombia" },
      {
        name: "description",
        content:
          "Finaliza tu pedido de Puertas Colombia con pago simulado, datos de envío y descarga de factura.",
      },
    ],
  }),
  component: CheckoutPage,
});

const paymentMethods = [
  {
    id: "pse",
    title: "PSE",
    description: "Pago desde cuenta bancaria",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "card",
    title: "Tarjeta",
    description: "Crédito o débito",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "nequi",
    title: "Nequi",
    description: "Pago desde billetera digital",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "daviplata",
    title: "Daviplata",
    description: "Pago móvil",
    icon: <WalletCards className="h-5 w-5" />,
  },
  {
    id: "transfer",
    title: "Transferencia",
    description: "Confirmación manual",
    icon: <Building2 className="h-5 w-5" />,
  },
];

function CheckoutPage() {
  const { detailed, subtotal, count, clear } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("pse");
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const shipping = subtotal > 0 ? 18000 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const form = new FormData(event.currentTarget);

      const { venta } = await ventaService.crear({
        cliente: {
          nombre: String(form.get("name") || "").trim(),
          email: String(form.get("email") || "").trim(),
          telefono: String(form.get("phone") || "").trim(),
          ciudad: String(form.get("city") || "").trim(),
          direccion: String(form.get("address") || "").trim(),
          notas: String(form.get("notes") || "").trim() || undefined,
        },
        items: detailed.map((item) => ({
          producto_id: String(item.product.id),
          descripcion: `${item.product.name} (${item.product.ref})`,
          cantidad: Number(item.quantity),
          precio_unitario: Number(item.product.price),
        })),
        metodo_pago: paymentMethod,
        envio: shipping,
      });

      setOrderNumber(venta.numero_factura);
      setOrderTotal(venta.total);
      setConfirmed(true);
      clear();
    } catch (err) {
      console.error("[checkout] Error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al procesar el pedido. Inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDescargarFactura = async () => {
    setDownloading(true);
    try {
      const url = ventaService.urlPDF(orderNumber);
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo generar el PDF");

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("[checkout] Error descargando PDF:", err);
      alert(
        "No pudimos descargar la factura en este momento. Intenta de nuevo en unos segundos.",
      );
    } finally {
      setDownloading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
        <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
            Pedido confirmado
          </div>

          <h1 className="font-display text-5xl">Gracias por tu pedido</h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Hemos registrado tu solicitud de compra. Descarga tu factura electrónica
            haciendo clic en el botón de abajo. Te contactaremos pronto para confirmar
            los detalles del envío.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-sm bg-muted p-5 text-left text-sm">
            <div className="flex justify-between border-b border-border pb-3">
              <span className="text-muted-foreground">Número de factura</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-border py-3">
              <span className="text-muted-foreground">Productos</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium">{formatPrice(orderTotal)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleDescargarFactura}
              disabled={downloading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Generando PDF..." : "Descargar factura"}
            </button>

            <Link
              to="/productos"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Seguir comprando
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Guarda este número de factura. Si necesitas la factura nuevamente, escríbenos
            por WhatsApp con este número y te la reenviaremos.
          </p>
        </div>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
        <h1 className="font-display text-5xl">Tu carrito está vacío</h1>
        <p className="mt-4 text-muted-foreground">
          Agrega productos antes de continuar al pago.
        </p>

        <Link
          to="/productos"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <Link
        to="/carrito"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <header className="mt-8 max-w-3xl">
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          Checkout
        </div>
        <h1 className="font-display text-5xl text-balance md:text-6xl">
          Finaliza tu pedido
        </h1>
        <p className="mt-4 text-muted-foreground">
          Completa tus datos de envío y selecciona un método de pago. Al confirmar
          podrás descargar tu factura electrónica.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-3xl">Datos de envío</h2>
                <p className="text-sm text-muted-foreground">
                  Usaremos esta información para confirmar el despacho.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre completo" name="name" required />
              <Field label="Correo electrónico" name="email" type="email" required />
              <Field label="Teléfono / WhatsApp" name="phone" required />
              <Field label="Ciudad" name="city" required />
            </div>

            <div className="mt-5">
              <Field label="Dirección de entrega" name="address" required />
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                Indicaciones adicionales
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Ej: apartamento, horario de entrega, referencias de ubicación..."
                className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-3xl">Método de pago</h2>
                <p className="text-sm text-muted-foreground">
                  Selecciona una opción de pago para simular la compra.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-4 rounded-sm border p-4 text-left transition ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {method.icon}
                  </span>
                  <span>
                    <span className="block font-medium">{method.title}</span>
                    <span className="block text-sm text-muted-foreground">
                      {method.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field label="Número de tarjeta" name="cardNumber" placeholder="0000 0000 0000 0000" />
                <Field label="Nombre en la tarjeta" name="cardName" />
                <Field label="Vencimiento" name="expiry" placeholder="MM/AA" />
                <Field label="CVV" name="cvv" placeholder="123" />
              </div>
            )}

            {paymentMethod === "pse" && (
              <div className="mt-6 rounded-sm bg-muted p-4 text-sm text-muted-foreground">
                Serías redirigido a PSE para seleccionar tu banco y confirmar el pago.
              </div>
            )}

            {paymentMethod === "nequi" && (
              <div className="mt-6 rounded-sm bg-muted p-4 text-sm text-muted-foreground">
                Se enviaría una solicitud de pago al número Nequi registrado.
              </div>
            )}

            {paymentMethod === "daviplata" && (
              <div className="mt-6 rounded-sm bg-muted p-4 text-sm text-muted-foreground">
                Se generaría una confirmación de pago con Daviplata.
              </div>
            )}

            {paymentMethod === "transfer" && (
              <div className="mt-6 rounded-sm bg-muted p-4 text-sm text-muted-foreground">
                Recibirías los datos bancarios para realizar la transferencia y enviar el comprobante.
              </div>
            )}
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <TrustItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Pago seguro"
              text="Simulación de pago con confirmación previa."
            />
            <TrustItem
              icon={<Truck className="h-5 w-5" />}
              title="Envío nacional"
              text="Despacho a principales ciudades de Colombia."
            />
            <TrustItem
              icon={<PackageCheck className="h-5 w-5" />}
              title="Pedido verificado"
              text="Confirmamos disponibilidad antes del envío."
            />
          </section>

          {errorMsg && (
            <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Procesando..." : "Confirmar pedido"}
          </button>
        </form>

        <aside>
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-3xl">Resumen del pedido</h2>

            <div className="mt-6 space-y-5">
              {detailed.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-16 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium leading-tight">{item.product.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.product.ref} · Cantidad: {item.quantity}
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Envío estimado" value={formatPrice(shipping)} />
              <Row label="Productos" value={String(count)} />
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="font-display text-2xl">Total</span>
              <span className="font-display text-3xl text-primary">
                {formatPrice(total)}
              </span>
            </div>

            <div className="mt-5 rounded-sm bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
              El valor de envío es estimado. En una compra real se confirma según ciudad,
              tamaño del producto y transportadora disponible. Al total se le aplicará IVA y
              retención según normativa colombiana.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
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
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}