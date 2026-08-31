import type {
  Order,
} from "@/types/order";

export const orders: Order[] = [
  {
    id: "1",
    orderNumber: "MOD-284913",
    date: "2026-08-28",
    status: "shipped",
    total: 15400,
    items: [
      {
        id: "1",
        productName: "Classic Linen Shirt",
        productImage:
          "/images/products/classic-linen-shirt.jpg",
        quantity: 1,
        price: 6500,
        size: "M",
        color: "White",
      },
      {
        id: "2",
        productName: "Relaxed Summer Dress",
        productImage:
          "/images/products/relaxed-summer-dress.jpg",
        quantity: 1,
        price: 8900,
        size: "S",
        color: "Cream",
      },
    ],
    shippingAddress: {
      name: "Luthira Peiris",
      address: "123 Main Street",
      city: "Colombo",
      postalCode: "00100",
      phone: "+94 77 123 4567",
    },
  },
  {
    id: "2",
    orderNumber: "MOD-731506",
    date: "2026-08-22",
    status: "delivered",
    total: 9800,
    items: [
      {
        id: "3",
        productName: "Minimal Leather Crossbody",
        productImage:
          "/images/products/leather-crossbody.jpg",
        quantity: 1,
        price: 9800,
        color: "Brown",
      },
    ],
    shippingAddress: {
      name: "Luthira Peiris",
      address: "123 Main Street",
      city: "Colombo",
      postalCode: "00100",
      phone: "+94 77 123 4567",
    },
  },
];