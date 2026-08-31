import type {
  Product,
} from "@/types/product";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

type ProductApiResponse = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string | null;
  badge: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  featured: boolean;
  newArrival: boolean;
};

export type ProductRequest = {
  name: string;
  slug: string;
  category:
    | "men"
    | "women"
    | "accessories";
  price: number;
  oldPrice?: number | null;
  image?: string | null;
  badge?: string | null;
  colors: string[];
  sizes: string[];
  featured: boolean;
  newArrival: boolean;
};

function mapProduct(
  product: ProductApiResponse
): Product {
  return {
    id: String(product.id),
    name: product.name,
    slug: product.slug,

    category:
      product.category as Product["category"],

    price: product.price,

    oldPrice:
      product.oldPrice ?? undefined,

    image:
      product.image ??
      "/images/products/placeholder.jpg",

    badge:
      product.badge ?? undefined,

    colors:
      product.colors ?? [],

    sizes:
      product.sizes ?? [],

    isFeatured:
      product.featured,

    isNewArrival:
      product.newArrival,
  };
}

async function getErrorMessage(
  response: Response
) {
  try {
    const data =
      await response.json();

    if (
      typeof data?.message ===
      "string"
    ) {
      return data.message;
    }

    if (data?.errors) {
      return Object.values(
        data.errors
      ).join(", ");
    }
  } catch {
    // Ignore invalid JSON
  }

  return `Request failed with status ${response.status}`;
}

export async function getProducts(): Promise<
  Product[]
> {
  const response = await fetch(
    `${API_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data: ProductApiResponse[] =
    await response.json();

  return data.map(mapProduct);
}

export async function getProductById(
  id: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data: ProductApiResponse =
    await response.json();

  return mapProduct(data);
}

export async function getProductBySlug(
  slug: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products/slug/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data: ProductApiResponse =
    await response.json();

  return mapProduct(data);
}

export async function createProduct(
  product: ProductRequest
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        product
      ),
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data: ProductApiResponse =
    await response.json();

  return mapProduct(data);
}

export async function updateProduct(
  id: string,
  product: ProductRequest
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        product
      ),
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data: ProductApiResponse =
    await response.json();

  return mapProduct(data);
}

export async function deleteProduct(
  id: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }
}