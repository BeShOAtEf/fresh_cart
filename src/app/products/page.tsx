import Link from "next/link";
import Image from "next/image";
import ProductItemBtn from "./_components/ProductItemBtn";

async function getProducts() {
  const apiUrl = process.env.API || "https://ecommerce.routemisr.com/api/v1";
  const res = await fetch(`${apiUrl}/products`, { cache: 'no-store' });
  const data = await res.json();
  return data.data || [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md flex flex-col justify-between">
            <Link href={`/products/${product._id}`}>
              <div className="relative w-full h-48">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-green-600 font-semibold uppercase">{product.category?.name}</span>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate mt-1">{product.title}</h2>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price} EGP</span>
                  <span className="text-sm text-yellow-500 flex items-center">
                    <i className="fa-solid fa-star mr-1"></i> {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>

            <div className="p-4 pt-0">
              <ProductItemBtn id={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}