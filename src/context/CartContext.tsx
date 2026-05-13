import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = { productId: string; quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: (CartItem & { product: Product })[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pc_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (id, qty = 1) =>
    setItems((cur) => {
      const ex = cur.find((i) => i.productId === id);
      if (ex) return cur.map((i) => (i.productId === id ? { ...i, quantity: i.quantity + qty } : i));
      return [...cur, { productId: id, quantity: qty }];
    });
  const remove: CartCtx["remove"] = (id) => setItems((cur) => cur.filter((i) => i.productId !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((cur) =>
      qty <= 0 ? cur.filter((i) => i.productId !== id) : cur.map((i) => (i.productId === id ? { ...i, quantity: qty } : i)),
    );
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { ...i, product } : null;
    })
    .filter(Boolean) as (CartItem & { product: Product })[];

  const count = detailed.reduce((s, i) => s + i.quantity, 0);
  const subtotal = detailed.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
