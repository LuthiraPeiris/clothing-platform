export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedAt: string;
  status: "active" | "inactive";
};

export const customers: Customer[] = [
  {
    id: "1",
    name: "Nimal Perera",
    email: "nimal@example.com",
    phone: "+94 77 234 5678",
    orders: 6,
    totalSpent: 68400,
    joinedAt: "2026-02-14",
    status: "active",
  },
  {
    id: "2",
    name: "Amaya Silva",
    email: "amaya@example.com",
    phone: "+94 76 892 1134",
    orders: 4,
    totalSpent: 42100,
    joinedAt: "2026-03-08",
    status: "active",
  },
  {
    id: "3",
    name: "Kasun Fernando",
    email: "kasun@example.com",
    phone: "+94 71 445 8912",
    orders: 3,
    totalSpent: 29700,
    joinedAt: "2026-05-19",
    status: "active",
  },
  {
    id: "4",
    name: "Dinithi Jayasuriya",
    email: "dinithi@example.com",
    phone: "+94 75 229 0045",
    orders: 1,
    totalSpent: 7200,
    joinedAt: "2026-07-11",
    status: "inactive",
  },
  {
    id: "5",
    name: "Shenali Fernando",
    email: "shenali@example.com",
    phone: "+94 77 514 9902",
    orders: 8,
    totalSpent: 91600,
    joinedAt: "2026-01-22",
    status: "active",
  },
];