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

type ImageUploadResponse = {
  imageUrl: string;
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
    id:
      String(
        product.id
      ),

    name:
      product.name,

    slug:
      product.slug,

    category:
      product.category as Product["category"],

    price:
      product.price,

    oldPrice:
      product.oldPrice ??
      undefined,

    image:
      product.image ??
      "/images/products/placeholder.jpg",

    badge:
      product.badge ??
      undefined,

    colors:
      product.colors ??
      [],

    sizes:
      product.sizes ??
      [],

    isFeatured:
      product.featured,

    isNewArrival:
      product.newArrival,
  };
}

async function getErrorMessage(
  response: Response
) {
  if (
    response.status === 401
  ) {
    return (
      "Your session is missing or has expired. Please sign in again."
    );
  }

  if (
    response.status === 403
  ) {
    return (
      "You do not have permission to perform this action."
    );
  }

  if (
    response.status === 413
  ) {
    return (
      "The selected image is too large."
    );
  }

  try {
    const data =
      await response.json();

    if (
      typeof data?.message ===
      "string"
    ) {
      return data.message;
    }

    if (
      data?.errors
    ) {
      return Object.values(
        data.errors
      ).join(", ");
    }
  } catch {
    // Response body was not JSON.
  }

  return (
    `Request failed with status ${response.status}`
  );
}

/*
 * PUBLIC
 */
export async function getProducts():
  Promise<Product[]> {
  const response =
    await fetch(
      `${API_URL}/api/products`,
      {
        cache:
          "no-store",
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ProductApiResponse[] =
      await response.json();

  return data.map(
    mapProduct
  );
}

/*
 * PUBLIC
 */
export async function getProductById(
  id: string
): Promise<Product> {
  const response =
    await fetch(
      `${API_URL}/api/products/${id}`,
      {
        cache:
          "no-store",
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ProductApiResponse =
      await response.json();

  return mapProduct(
    data
  );
}

/*
 * PUBLIC
 */
export async function getProductBySlug(
  slug: string
): Promise<Product> {
  const response =
    await fetch(
      `${API_URL}/api/products/slug/${slug}`,
      {
        cache:
          "no-store",
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ProductApiResponse =
      await response.json();

  return mapProduct(
    data
  );
}

/*
 * ADMIN ONLY
 *
 * Upload product image.
 */
export async function uploadProductImage(
  file: File,
  accessToken: string
): Promise<string> {
  const formData =
    new FormData();

  formData.append(
    "image",
    file
  );

  const response =
    await fetch(
      `${API_URL}/api/products/images`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },

        body:
          formData,
      }
    );

  /*
   * IMPORTANT:
   *
   * Do not manually set Content-Type
   * here.
   *
   * The browser automatically adds
   * multipart/form-data together with
   * its required boundary.
   */

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ImageUploadResponse =
      await response.json();

  return data.imageUrl;
}

/*
 * ADMIN ONLY
 */
export async function createProduct(
  product: ProductRequest,
  accessToken: string
): Promise<Product> {
  const response =
    await fetch(
      `${API_URL}/api/products`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            product
          ),
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ProductApiResponse =
      await response.json();

  return mapProduct(
    data
  );
}

/*
 * ADMIN ONLY
 */
export async function updateProduct(
  id: string,
  product: ProductRequest,
  accessToken: string
): Promise<Product> {
  const response =
    await fetch(
      `${API_URL}/api/products/${id}`,
      {
        method:
          "PUT",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            product
          ),
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }

  const data:
    ProductApiResponse =
      await response.json();

  return mapProduct(
    data
  );
}

/*
 * ADMIN ONLY
 */
export async function deleteProduct(
  id: string,
  accessToken: string
): Promise<void> {
  const response =
    await fetch(
      `${API_URL}/api/products/${id}`,
      {
        method:
          "DELETE",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      await getErrorMessage(
        response
      )
    );
  }
}