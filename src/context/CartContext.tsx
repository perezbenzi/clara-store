"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  tag: string | null;
  imagePlaceholder: string;
  variant: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, variant: string) => void;
  updateQuantity: (id: number, variant: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; id: number; variant: string }
  | { type: "UPDATE_QTY"; id: number; variant: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "HYDRATE":
      return action.items;

    case "ADD": {
      const existing = state.find(
        (i) => i.id === action.item.id && i.variant === action.item.variant
      );
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id && i.variant === action.item.variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];
    }

    case "REMOVE":
      return state.filter(
        (i) => !(i.id === action.id && i.variant === action.variant)
      );

    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return state.filter(
          (i) => !(i.id === action.id && i.variant === action.variant)
        );
      }
      return state.map((i) =>
        i.id === action.id && i.variant === action.variant
          ? { ...i, quantity: action.quantity }
          : i
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "claras-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD", item });
  }, []);

  const removeItem = useCallback((id: number, variant: string) => {
    dispatch({ type: "REMOVE", id, variant });
  }, []);

  const updateQuantity = useCallback(
    (id: number, variant: string, quantity: number) => {
      dispatch({ type: "UPDATE_QTY", id, variant, quantity });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
