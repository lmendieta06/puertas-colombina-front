import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products, formatPrice, getProductAvailability } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const categories = [
  "Todas",
  "XXL",
  "XL",
  "L",
  "M",
  "S",
  "XS",
  "Aldabas",
  "Porta llaves",
] as const;

const priceRanges = [
  { label: "Todos los precios", min: 0, max: Infinity },
  { label: "Hasta $150.000", min: 0, max: 150000 },
  { label: "$150.000 a $300.000", min: 150000, max: 300000 },
  { label: "$300.000 a $600.000", min: 300000, max: 600000 },
  { label: "Más de $600.000", min: 600000, max: Infinity },
];

const availabilityOptions = [
  "Todas",
  "Disponible",
  "Bajo pedido",
  "Agotado",
] as const;

const getRegionGroup = (region: string) => {
  const value = region.toLowerCase();

  if (
    value.includes("bogotá") ||
    value.includes("candelaria") ||
    value.includes("usaquén")
  ) {
    return "Bogotá";
  }

  if (value.includes("cartagena")) return "Cartagena";
  if (value.includes("barranquilla")) return "Barranquilla";
  if (value.includes("mompox")) return "Mompox";
  if (
    value.includes("antioquia") ||
    value.includes("granada") ||
    value.includes("santa fe") ||
    value.includes("jardín")
  ) {
    return "Antioquia";
  }

  if (
    value.includes("quindío") ||
    value.includes("filandia") ||
    value.includes("salento")
  ) {
    return "Quindío";
  }

  if (value.includes("santander") || value.includes("girón")) {
    return "Santander";
  }

  if (value.includes("santa marta") || value.includes("magdalena")) {
    return "Santa Marta";
  }

  if (value.includes("cauca") || value.includes("popayán")) {
    return "Cauca";
  }

  if (value.includes("guajira") || value.includes("riohacha")) {
    return "Guajira";
  }

  if (value.includes("caldas") || value.includes("salamina")) {
    return "Caldas";
  }

  return "Otras regiones";
};

const regions = [
  "Todas",
  ...Array.from(new Set(products.map((product) => getRegionGroup(product.region)))).sort(),
];

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos · Puertas Colombia" },
      {
        name: "description",
        content:
          "Colección completa de puertas artesanales, aldabas y porta llaves colombianos.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const location = useLocation();

  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");
  const [region, setRegion] = useState("Todas");
  const [priceRange, setPriceRange] = useState(priceRanges[0].label);
  const [availability, setAvailability] =
    useState<(typeof availabilityOptions)[number]>("Todas");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const filteredProducts = useMemo(() => {
    const selectedPrice =
      priceRanges.find((range) => range.label === priceRange) ?? priceRanges[0];

    return products.filter((product, index) => {
      const productAvailability = getProductAvailability(product);

      const matchesCategory =
        category === "Todas" || product.category === category;

      const matchesRegion =
        region === "Todas" || getRegionGroup(product.region) === region;

      const matchesPrice =
        product.price >= selectedPrice.min && product.price <= selectedPrice.max;

      const matchesAvailability =
        availability === "Todas" || productAvailability === availability;

      const matchesFeatured =
        !onlyFeatured ||
        product.badge === "Más vendido" ||
        product.badge === "Nuevo" ||
        product.badge === "Edición especial" ||
        index < 6;

      return (
        matchesCategory &&
        matchesRegion &&
        matchesPrice &&
        matchesAvailability &&
        matchesFeatured
      );
    });
  }, [category, region, priceRange, availability, onlyFeatured]);

  const clearFilters = () => {
    setCategory("Todas");
    setRegion("Todas");
    setPriceRange(priceRanges[0].label);
    setAvailability("Todas");
    setOnlyFeatured(false);
  };

  const activeFilters =
    category !== "Todas" ||
    region !== "Todas" ||
    priceRange !== priceRanges[0].label ||
    availability !== "Todas" ||
    onlyFeatured;

  if (location.pathname !== "/productos") {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="mb-10 max-w-2xl">
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold-deep">
          Catálogo
        </div>

        <h1 className="font-display text-5xl text-balance md:text-6xl">
          Nuestra colección
        </h1>

        <p className="mt-4 text-muted-foreground">
          Explora puertas artesanales, aldabas y porta llaves inspirados en la
          arquitectura tradicional colombiana. Filtra por categoría, región,
          disponibilidad y precio.
        </p>
      </header>

      <section className="mb-10 rounded-sm border border-border bg-card p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium uppercase tracking-[0.18em]">
              Filtrar colección
            </h2>
          </div>

          {activeFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <X className="h-4 w-4" />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <FilterGroup label="Categoría">
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as (typeof categories)[number])
              }
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label="Región">
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label="Precio">
            <select
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              {priceRanges.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label="Disponibilidad">
            <select
              value={availability}
              onChange={(event) =>
                setAvailability(
                  event.target.value as (typeof availabilityOptions)[number],
                )
              }
              className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              {availabilityOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label="Destacados">
            <button
              onClick={() => setOnlyFeatured((value) => !value)}
              className={`w-full rounded-sm border px-3 py-2.5 text-sm transition ${
                onlyFeatured
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-muted"
              }`}
            >
              {onlyFeatured ? "Viendo destacados" : "Solo destacados"}
            </button>
          </FilterGroup>
        </div>

        <div className="mt-5 text-sm text-muted-foreground">
          {filteredProducts.length} producto
          {filteredProducts.length === 1 ? "" : "s"} encontrado
          {filteredProducts.length === 1 ? "" : "s"}.
          {filteredProducts.length > 0 && (
            <span>
              {" "}
              Desde{" "}
              {formatPrice(
                Math.min(...filteredProducts.map((product) => product.price)),
              )}
              .
            </span>
          )}
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="rounded-sm border border-border bg-card px-6 py-16 text-center">
          <p className="text-muted-foreground">
            No hay piezas con esos filtros. Prueba cambiar la categoría, región,
            precio o disponibilidad.
          </p>

          <button
            onClick={clearFilters}
            className="mt-5 rounded-sm bg-primary px-5 py-2.5 text-sm uppercase tracking-wider text-primary-foreground transition hover:opacity-90"
          >
            Ver toda la colección
          </button>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}