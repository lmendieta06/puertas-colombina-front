import mompox1 from "@/assets/products/mompox-1.jpg";
import mompox2 from "@/assets/products/mompox-2.jpg";
import mompox3 from "@/assets/products/mompox-3.jpg";
import mompox4 from "@/assets/products/mompox-4.jpg";
import bogota1 from "@/assets/products/bogota-1.jpg";
import bogota2 from "@/assets/products/bogota-2.jpg";
import bogota3 from "@/assets/products/bogota-3.jpg";
import candelaria1 from "@/assets/products/candelaria-1.jpg";
import candelaria2 from "@/assets/products/candelaria-2.jpg";
import candelaria3 from "@/assets/products/candelaria-3.jpg";
import giron1 from "@/assets/products/giron-1.jpg";
import giron2 from "@/assets/products/giron-2.jpg";
import giron3 from "@/assets/products/giron-3.jpg";
import santamarta1 from "@/assets/products/santamarta-1.jpg";
import santamarta2 from "@/assets/products/santamarta-2.jpg";
import costaCaribe1 from "@/assets/products/costa-caribe-1.jpg";
import costaCaribe2 from "@/assets/products/costa-caribe-2.jpg";
import barranquilla1 from "@/assets/products/barranquilla-1.jpg";
import barranquilla2 from "@/assets/products/barranquilla-2.jpg";
import cartagena1 from "@/assets/products/cartagena-1.jpg";
import cartagena2 from "@/assets/products/cartagena-2.jpg";
import santafe1 from "@/assets/products/santafe-1.jpg";
import santafe2 from "@/assets/products/santafe-2.jpg";
import filandia1 from "@/assets/products/filandia-1.jpg";
import filandia2 from "@/assets/products/filandia-2.jpg";
import usaquen1 from "@/assets/products/usaquen-1.jpg";
import usaquen2 from "@/assets/products/usaquen-2.jpg";
import granada1 from "@/assets/products/granada-1.jpg";
import granada2 from "@/assets/products/granada-2.jpg";
import aldabaLeon from "@/assets/products/aldaba-leon.jpg";
import aldabaLeon2 from "@/assets/products/aldaba-leon-2.jpg";
import aldabaRana from "@/assets/products/aldaba-rana.jpg";
import aldabaRana2 from "@/assets/products/aldaba-rana-2.jpg";
import portallaves1 from "@/assets/products/portallaves-1.jpg";
import portallaves2 from "@/assets/products/portallaves-2.jpg";

export type Product = {
  id: string;
  name: string;
  region: string;
  ref: string;
  size: string;
  category: "XXL" | "XL" | "L" | "M" | "S" | "XS" | "Aldabas" | "Porta llaves";
  price: number;
  images: string[];
  shortDescription: string;
  description: string;
  materials?: string;
  availability?: "Disponible" | "Bajo pedido" | "Agotado";
  badge?: "Más vendido" | "Nuevo" | "Edición especial" | "Bajo pedido";
};

export const products: Product[] = [
  {
    id: "mompox-102",
    name: "Mompox",
    region: "Mompox · Bolívar",
    ref: "Ref. 102",
    size: "20 cm × 46 cm",
    category: "XXL",
    price: 890000,
    images: [mompox1, mompox2, mompox3, mompox4],
    shortDescription: "Portón colonial mompoxino con herrería ornamental tallada a mano.",
    description:
      "Réplica artesanal del portón mompoxino del siglo XVIII. Tallada en madera de cedro con acabado envejecido y herrajes en bronce trabajados artesanalmente. Cada pieza es única, firmada por el artesano que la creó con técnicas ancestrales heredadas de generaciones de talladores colombianos.",
  },
  {
    id: "bogota-101",
    name: "Bogotá",
    region: "Bogotá · Cundinamarca",
    ref: "Ref. 101",
    size: "23 cm × 29 cm",
    category: "XL",
    price: 520000,
    images: [bogota1, bogota2, bogota3],
    shortDescription: "Puerta cundiboyacense en azul cielo con detalles tallados en blanco.",
    description:
      "Inspirada en las casonas del centro histórico bogotano, esta puerta refleja la elegancia capitalina con su paleta azul y blanco característica. Detalles ornamentales en bronce y tallados sobre madera de cedro envejecida.",
  },
  {
    id: "candelaria-011",
    name: "Candelaria",
    region: "La Candelaria · Bogotá",
    ref: "Ref. 011",
    size: "23 cm × 29 cm",
    category: "XL",
    price: 520000,
    images: [candelaria1, candelaria2, candelaria3],
    shortDescription: "Doble puerta azul con herrajes coloniales del barrio histórico.",
    description:
      "Réplica de las puertas dobles del barrio La Candelaria, corazón colonial de Bogotá. Pieza tallada a mano con bisagras y cerradura en bronce envejecido sobre cedro macizo.",
  },
  {
    id: "giron-100",
    name: "Girón",
    region: "Girón · Santander",
    ref: "Ref. 100",
    size: "23 cm × 29 cm",
    category: "XL",
    price: 540000,
    images: [giron1, giron2, giron3],
    shortDescription: "Puerta santandereana de colores vibrantes y ventana enrejada.",
    description:
      "El espíritu de Girón en madera. Acabados en rojo, amarillo y azul que evocan el pueblo patrimonio de Santander. Incluye pequeña ventana enrejada y ornamentos florales tallados.",
  },
  {
    id: "santamarta-050",
    name: "Santa Marta",
    region: "Santa Marta · Magdalena",
    ref: "Ref. 050",
    size: "23 cm × 29 cm",
    category: "XL",
    price: 520000,
    images: [santamarta1, santamarta2],
    shortDescription: "Puerta samaria con motivos florales en naranja y blanco.",
    description:
      "Réplica de las puertas del centro histórico de Santa Marta. Acabado en naranja cálido y blanco, con detalles florales y volutas talladas a mano.",
  },
  {
    id: "costa-caribe-021",
    name: "Costa Caribe",
    region: "Caribe Colombiano",
    ref: "Ref. 021",
    size: "20 cm × 36 cm",
    category: "L",
    price: 380000,
    images: [costaCaribe1, costaCaribe2],
    shortDescription: "Puerta caribeña en rojo y azul con espíritu costero.",
    description:
      "El Caribe colombiano hecho puerta. Madera tratada con acabado envejecido y colores vibrantes que recuerdan las casonas de Cartagena, Mompox y Santa Marta.",
  },
  {
    id: "granada-055",
    name: "Granada",
    region: "Granada · Antioquia",
    ref: "Ref. 055",
    size: "20 cm × 32 cm",
    category: "L",
    price: 360000,
    images: [granada1, granada2],
    shortDescription: "Puerta antioqueña arqueada con metalistería ornamental.",
    description:
      "Réplica de los portones del oriente antioqueño con su característico arco superior, paleta azul y naranja, y herrajes finamente trabajados.",
  },
  {
    id: "barranquilla-012",
    name: "Barranquilla",
    region: "Barranquilla · Atlántico",
    ref: "Ref. 012",
    size: "19 cm × 33 cm",
    category: "L",
    price: 380000,
    images: [barranquilla1, barranquilla2],
    shortDescription: "Puerta arroyera con tope arqueado y carnaval de colores.",
    description:
      "Inspirada en la arquitectura republicana de la Arenosa. Combina rojos, azules, verdes y amarillos para celebrar el espíritu del Carnaval.",
  },
  {
    id: "cartagena-015",
    name: "Cartagena",
    region: "Cartagena · Bolívar",
    ref: "Ref. 015",
    size: "19 cm × 33 cm",
    category: "L",
    price: 420000,
    images: [cartagena1, cartagena2],
    shortDescription: "Doble puerta heroica en naranja y azul colonial.",
    description:
      "Réplica de las puertas del centro amurallado de Cartagena. Talla detallada sobre cedro con acabados en naranja terracota y azul colonial.",
  },
  {
    id: "santafe-027",
    name: "Santa Fe de Antioquia",
    region: "Santa Fe · Antioquia",
    ref: "Ref. 027",
    size: "19 cm × 33 cm",
    category: "L",
    price: 380000,
    images: [santafe1, santafe2],
    shortDescription: "Doble puerta paisa con celosía blanca calada.",
    description:
      "Tradicional puerta de la ciudad madre antioqueña. Verde y azul con celosía blanca calada que filtra la luz tropical.",
  },
  {
    id: "filandia-032",
    name: "Filandia",
    region: "Filandia · Quindío",
    ref: "Ref. 032",
    size: "20 cm × 34 cm",
    category: "L",
    price: 360000,
    images: [filandia1, filandia2],
    shortDescription: "Puerta cafetera roja y blanca de balcón filandeño.",
    description:
      "El paisaje cultural cafetero en una pieza. Inspirada en las casas de Filandia, Quindío. Roja y blanca con tallados delicados de la región cafetera.",
  },
  {
    id: "usaquen-05",
    name: "Usaquén",
    region: "Usaquén · Bogotá",
    ref: "Ref. 05",
    size: "20 cm × 34 cm",
    category: "L",
    price: 360000,
    images: [usaquen1, usaquen2],
    shortDescription: "Puerta de pueblo bogotano con paneles tricolor.",
    description:
      "Pieza inspirada en las puertas del antiguo municipio de Usaquén. Paneles en turquesa, rojo y amarillo con pequeña ventana enrejada.",
  },
  {
    id: "aldaba-leon",
    name: "Aldaba León",
    region: "Colección Herrajes",
    ref: "Aldaba L01",
    size: "12 cm × 8 cm",
    category: "Aldabas",
    price: 180000,
    images: [aldabaLeon, aldabaLeon2],
    shortDescription: "Aldaba colonial con cabeza de león en bronce envejecido.",
    description:
      "Aldaba en bronce fundido y envejecido a mano, símbolo colonial de fortaleza y protección. Pieza ideal para puertas, decoración o como objeto de colección.",
  },
  {
    id: "aldaba-rana",
    name: "Aldaba Rana",
    region: "Colección Herrajes",
    ref: "Aldaba R01",
    size: "10 cm × 8 cm",
    category: "Aldabas",
    price: 160000,
    images: [aldabaRana, aldabaRana2],
    shortDescription: "Aldaba ornamental en forma de rana, símbolo de prosperidad.",
    description:
      "Inspirada en aldabas precolombinas. La rana representa abundancia y buena fortuna. Bronce envejecido trabajado artesanalmente.",
  },
  {
    id: "portallaves-xl",
    name: "Porta llaves Colonial XL",
    region: "Colección Funcional",
    ref: "PLL-XL",
    size: "30 cm × 22 cm",
    category: "Porta llaves",
    price: 280000,
    images: [portallaves1, portallaves2],
    shortDescription: "Porta llaves de pared con puertas que se abren.",
    description:
      "Pieza funcional y decorativa: una réplica de puerta colonial colombiana que se abre para revelar ganchos para llaves. Madera tallada y pintada a mano.",
  },
    {
    id: "salamina-107",
    name: "Salamina",
    region: "Salamina · Caldas",
    ref: "Ref. 107",
    size: "14 cm × 20 cm",
    category: "M",
    price: 240000,
    images: [santafe1, santafe2],
    shortDescription: "Puerta caldense de formato mediano inspirada en la arquitectura tradicional.",
    description:
      "Pieza artesanal inspirada en las puertas de Salamina, Caldas. Su formato mediano permite ubicarla en estudios, salas auxiliares o espacios de colección.",
    availability: "Disponible",
    badge: "Nuevo",
  },
  {
    id: "popayan-116",
    name: "Popayán",
    region: "Popayán · Cauca",
    ref: "Ref. 116",
    size: "14 cm × 20 cm",
    category: "M",
    price: 250000,
    images: [candelaria1, candelaria2],
    shortDescription: "Puerta blanca de inspiración colonial payanesa.",
    description:
      "Inspirada en la arquitectura blanca y colonial de Popayán. Una pieza de formato mediano pensada para decoración interior y regalos con identidad cultural.",
    availability: "Bajo pedido",
    badge: "Bajo pedido",
  },
  {
    id: "riohacha-108",
    name: "Riohacha",
    region: "Riohacha · Guajira",
    ref: "Ref. 108",
    size: "14 cm × 20 cm",
    category: "M",
    price: 240000,
    images: [costaCaribe1, costaCaribe2],
    shortDescription: "Puerta mediana inspirada en los colores del Caribe colombiano.",
    description:
      "Diseño artesanal inspirado en la Guajira y sus tonos cálidos. Ideal para quienes buscan una pieza decorativa con carácter caribeño.",
    availability: "Disponible",
  },
  {
    id: "jardin-103",
    name: "Jardín",
    region: "Jardín · Antioquia",
    ref: "Ref. 103",
    size: "14 cm × 20 cm",
    category: "M",
    price: 245000,
    images: [granada1, granada2],
    shortDescription: "Pieza antioqueña de formato mediano con inspiración de pueblo patrimonial.",
    description:
      "Puerta artesanal inspirada en los balcones, colores y fachadas tradicionales de Jardín, Antioquia. Una pieza ideal para colección o regalo.",
    availability: "Disponible",
  },

  {
    id: "barranquilla-059-s",
    name: "Barranquilla S",
    region: "Barranquilla · Atlántico",
    ref: "Ref. 059",
    size: "Aprox. 19 cm × 11 cm",
    category: "S",
    price: 145000,
    images: [barranquilla1, barranquilla2],
    shortDescription: "Puerta pequeña de inspiración barranquillera.",
    description:
      "Formato pequeño inspirado en los colores vivos de Barranquilla. Ideal como souvenir, regalo o pieza decorativa auxiliar.",
    availability: "Disponible",
    badge: "Más vendido",
  },
  {
    id: "usaquen-073-s",
    name: "Usaquén S",
    region: "Usaquén · Bogotá",
    ref: "Ref. 073",
    size: "Aprox. 19 cm × 11 cm",
    category: "S",
    price: 145000,
    images: [usaquen1, usaquen2],
    shortDescription: "Puerta pequeña inspirada en el antiguo pueblo de Usaquén.",
    description:
      "Pieza artesanal de formato pequeño inspirada en las puertas tradicionales de Usaquén, Bogotá. Funciona muy bien como recuerdo o detalle decorativo.",
    availability: "Disponible",
  },
  {
    id: "cartagena-083-s",
    name: "Cartagena S",
    region: "Cartagena · Bolívar",
    ref: "Ref. 083",
    size: "Aprox. 19 cm × 11 cm",
    category: "S",
    price: 150000,
    images: [cartagena1, cartagena2],
    shortDescription: "Puerta pequeña inspirada en la ciudad amurallada.",
    description:
      "Diseño pequeño inspirado en Cartagena y sus puertas coloniales. Una pieza con alto valor decorativo y cultural.",
    availability: "Bajo pedido",
    badge: "Bajo pedido",
  },
  {
    id: "salento-010-s",
    name: "Salento S",
    region: "Salento · Quindío",
    ref: "Ref. 010",
    size: "Aprox. 19 cm × 11 cm",
    category: "S",
    price: 145000,
    images: [filandia1, filandia2],
    shortDescription: "Puerta pequeña inspirada en la arquitectura cafetera.",
    description:
      "Pieza de formato pequeño inspirada en el paisaje cultural cafetero y sus casas tradicionales llenas de color.",
    availability: "Disponible",
  },
  {
    id: "fresno-088-s",
    name: "Fresno S",
    region: "Fresno · Tolima",
    ref: "Ref. 088",
    size: "Aprox. 19 cm × 11 cm",
    category: "S",
    price: 140000,
    images: [granada1, granada2],
    shortDescription: "Puerta pequeña inspirada en la arquitectura tradicional del Tolima.",
    description:
      "Diseño artesanal de formato pequeño inspirado en puertas regionales del Tolima. Ideal para detalles decorativos o regalos.",
    availability: "Disponible",
    badge: "Nuevo",
  },

  {
    id: "bogota-116-xs",
    name: "Bogotá XS",
    region: "Bogotá · Cundinamarca",
    ref: "Ref. 116",
    size: "Aprox. 10 cm × 11 cm",
    category: "XS",
    price: 95000,
    images: [bogota1, bogota3],
    shortDescription: "Mini puerta decorativa inspirada en Bogotá.",
    description:
      "Formato XS inspirado en puertas bogotanas. Perfecto para colección, regalo pequeño o decoración de escritorio.",
    availability: "Disponible",
    badge: "Más vendido",
  },
  {
    id: "barranquilla-012-xs",
    name: "Barranquilla XS",
    region: "Barranquilla · Atlántico",
    ref: "Ref. 012",
    size: "Aprox. 10 cm × 11 cm",
    category: "XS",
    price: 95000,
    images: [barranquilla1, barranquilla2],
    shortDescription: "Mini puerta con inspiración caribeña.",
    description:
      "Pieza XS inspirada en Barranquilla. Su tamaño compacto la hace ideal como souvenir o detalle decorativo.",
    availability: "Disponible",
  },
  {
    id: "filandia-031-xs",
    name: "Filandia XS",
    region: "Filandia · Quindío",
    ref: "Ref. 031",
    size: "Aprox. 10 cm × 11 cm",
    category: "XS",
    price: 95000,
    images: [filandia1, filandia2],
    shortDescription: "Mini puerta inspirada en la arquitectura cafetera.",
    description:
      "Formato XS inspirado en Filandia y la arquitectura del Eje Cafetero. Una pieza pequeña con gran identidad regional.",
    availability: "Disponible",
  },
  {
    id: "cartagena-209-xs",
    name: "Cartagena XS",
    region: "Cartagena · Bolívar",
    ref: "Ref. 209",
    size: "Aprox. 10 cm × 11 cm",
    category: "XS",
    price: 98000,
    images: [cartagena1, cartagena2],
    shortDescription: "Mini puerta inspirada en Cartagena.",
    description:
      "Pieza XS inspirada en las puertas coloniales de Cartagena. Ideal para colección, souvenir o regalo con identidad colombiana.",
    availability: "Bajo pedido",
    badge: "Bajo pedido",
  },

  {
    id: "aldaba-caballo-mar",
    name: "Aldaba Caballo de Mar",
    region: "Cartagena · Bolívar",
    ref: "Aldaba C01",
    size: "Aprox. 20 cm × 35 cm",
    category: "Aldabas",
    price: 190000,
    images: [aldabaLeon, aldabaLeon2],
    shortDescription: "Aldaba edición especial inspirada en portones de Cartagena.",
    description:
      "Aldaba decorativa de edición especial inspirada en los portones históricos de Cartagena. Representa la conexión entre mar, arquitectura y tradición artesanal.",
    materials: "Bronce envejecido trabajado artesanalmente",
    availability: "Bajo pedido",
    badge: "Edición especial",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export const getProductSku = (product: Product) => {
  const line =
    product.category === "Aldabas"
      ? "ALD"
      : product.category === "Porta llaves"
        ? "PKL"
        : "PRT";

  const size =
    product.category === "Aldabas"
      ? "ESP"
      : product.category === "Porta llaves"
        ? "XL"
        : product.category;

  const ref = product.ref.replace(/\D/g, "").padStart(3, "0") || "001";

  const region = product.region.toLowerCase();

  const regionCode = region.includes("bogotá") || region.includes("candelaria") || region.includes("usaquén")
    ? "BOG"
    : region.includes("cartagena")
      ? "CTG"
      : region.includes("barranquilla")
        ? "BQL"
        : region.includes("mompox")
          ? "MOM"
          : region.includes("antioquia") || region.includes("granada") || region.includes("santa fe")
            ? "ANT"
            : region.includes("quindío") || region.includes("filandia")
              ? "QUI"
              : region.includes("santander") || region.includes("girón")
                ? "SAN"
                : region.includes("santa marta") || region.includes("magdalena")
                  ? "STA"
                  : "COL";

  return `PC-${line}-${size}-${ref}-${regionCode}-V1`;
};

export const getProductMaterials = (product: Product) =>
  product.materials ??
  (product.category === "Aldabas"
    ? "Bronce envejecido trabajado artesanalmente"
    : product.category === "Porta llaves"
      ? "Madera tallada a mano, ganchos metálicos y acabado protector"
      : "Madera tallada a mano, pintura artesanal y acabado protector");

export const getProductAvailability = (product: Product) =>
  product.availability ?? "Disponible";