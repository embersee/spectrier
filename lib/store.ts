import { create } from "zustand";
import { storeProduct } from "@/types/products";
import { Link, Post } from "./db/schema";

// Define the interface of the Cart state
interface State {
  cart: storeProduct[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: storeProduct) => void;
  removeFromCart: (Item: storeProduct) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (storeProduct: storeProduct) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === storeProduct.id);

    // If the item already exists in the Cart, increase its quantity
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === storeProduct.id
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + storeProduct.price,
      }));
    } else {
      const updatedCart = [...cart, { ...storeProduct, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + storeProduct.price,
      }));
    }
  },
  removeFromCart: (storeProduct: storeProduct) => {
    const cart = get().cart;

    const cartItem = cart.find((item) => item.id === storeProduct.id);

    // If the item already exists in the Cart, decrease its quantity
    if ((cartItem?.quantity as number) > 1) {
      const updatedCart = cart.map((item) =>
        item.id === storeProduct.id
          ? { ...item, quantity: (item.quantity as number) - 1 }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - storeProduct.price,
      }));
      return;
    }

    // Remove item from Cart
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== storeProduct.id),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - storeProduct.price,
    }));
  },
}));

interface PostState {
  isPostOpen: boolean;
  postData: Post | undefined;
}

interface PostAction {
  OpenPostModal: () => void;
  setPostData: (post: Post) => void;
}

export const usePostModal = create<PostState & PostAction>((set, get) => ({
  isPostOpen: false,
  postData: undefined,
  OpenPostModal: () => {
    const isOpen = get().isPostOpen;

    set((state) => ({
      isPostOpen: !isOpen,
    }));
  },
  setPostData: (post: Post) => {
    set((state) => ({ postData: post }));
  },
}));

interface LinkState {
  isLinkOpen: boolean;
  linkData: Link | undefined;
}

interface LinkAction {
  OpenLinkModal: () => void;
  setLinkData: (link: Link) => void;
}

export const useLinkModal = create<LinkState & LinkAction>((set, get) => ({
  isLinkOpen: false,
  linkData: undefined,
  OpenLinkModal: () => {
    const isOpen = get().isLinkOpen;

    set((state) => ({
      isLinkOpen: !isOpen,
    }));
  },
  setLinkData: (link: Link) => {
    set((state) => ({ linkData: link }));
  },
}));
