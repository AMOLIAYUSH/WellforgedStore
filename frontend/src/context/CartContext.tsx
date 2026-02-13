import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  hasItem: (id: string) => boolean;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, token } = useAuth();

  // Sync with backend on login
  useEffect(() => {
    if (isLoggedIn && token) {
      syncCartWithBackend();
    } else if (!isLoggedIn) {
      // Potentially clear or keep local cart depending on UX
      // For now we keep it local
    }
  }, [isLoggedIn, token]);

  const syncCartWithBackend = async () => {
    setIsLoading(true);
    try {
      // 1. Get current backend cart
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();

      if (response.ok) {
        // 2. If local cart has items, merge them
        if (items.length > 0) {
          const bulkItems = items.map(item => ({ product_id: item.id, quantity: item.quantity }));
          await fetch("http://localhost:5000/api/cart/bulk-add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ items: bulkItems })
          });

          // Re-fetch after merge
          const finalResponse = await fetch("http://localhost:5000/api/cart", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const finalData = await finalResponse.json();
          updateItemsFromBackend(finalData.items);
        } else {
          updateItemsFromBackend(data.items);
        }
      }
    } catch (error) {
      console.error("Cart sync failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemsFromBackend = (backendItems: any[]) => {
    const formattedItems: CartItem[] = backendItems.map(item => ({
      id: item.product_id,
      name: item.name,
      size: item.name.split("-").pop()?.trim() || "Unit",
      price: parseFloat(item.price),
      quantity: item.quantity,
      image: item.image_url || "" // Handle missing images
    }));
    setItems(formattedItems);
  };

  const addItem = async (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    if (isLoggedIn && token) {
      try {
        await fetch("http://localhost:5000/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ product_id: newItem.id, quantity })
        });
      } catch (error) {
        console.error("Failed to add item to backend cart:", error);
      }
    }

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...newItem, quantity }];
    });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    if (isLoggedIn && token) {
      try {
        // We need the cart_item.id (UUID) not the product_id to update specific rows
        // But our current frontend 'items' state uses product_id as 'id'.
        // We might need to refactor backend to accept product_id for updates OR store cart_item_id in frontend.
        // For simplicity, let's allow backend to update by product_id if we have it, 
        // OR re-sync after update.
        // Let's assume for now we use the /add endpoint with relative quantity or fix controller.

        // Actually, let's fix the backend controller `updateCartItem` to use product_id if we want,
        // or just re-sync. Re-syncing is safer but more network heavy.

        // BETTER: Use POST /add with (quantity - currentQuantity) to adjust.
        const currentItem = items.find(i => i.id === id);
        if (currentItem) {
          const diff = quantity - currentItem.quantity;
          await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ product_id: id, quantity: diff })
          });
        }
      } catch (error) {
        console.error("Failed to update quantity in backend:", error);
      }
    }

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = async (id: string) => {
    if (isLoggedIn && token) {
      try {
        // Backend removeCartItem expects the cart_item table ID.
        // Let's modify backend to allow delete by product_id.
        await fetch(`http://localhost:5000/api/cart/product/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Failed to remove item from backend:", error);
      }
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const hasItem = (id: string) => items.some((item) => item.id === id);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        hasItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
