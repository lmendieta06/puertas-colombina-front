import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/573216136824?text=Hola%20Puertas%20Colombia%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl hover:scale-110"
      aria-label="Contactar por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
