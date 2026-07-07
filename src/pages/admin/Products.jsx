import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { deleteProduct } from "../../api/productApi";

const Products = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        page,
        limit: 10,
      });

      setProducts(res.data.data?.products || []);
      setPagination(res.data.data.pagination);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!ok) return;

    try {

      const res = await deleteProduct(id);

      toast.success(res.data.message);

      fetchProducts();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  if (!loading && products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Products Found
        </h2>

        <p className="text-gray-500 mt-2">
          Add your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Products
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Image
                </th>

                <th className="text-left py-3">
                  Product
                </th>

                <th className="text-left py-3">
                  Category
                </th>

                <th className="text-left py-3">
                  Price
                </th>

                <th className="text-left py-3">
                  Stock
                </th>

                <th className="text-left py-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b"
                >

                  <td className="py-3">

                    <img
                      src={product.thumbnail?.url}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                      loading="lazy"
                    />

                  </td>

                  <td>

                    <h3 className="font-semibold">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.brand}
                    </p>

                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ${Number(product.price).toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={`font-semibold ${product.stock <= 5
                        ? "text-red-500"
                        : "text-green-600"
                        }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin-dashboard/products/edit/${product._id}`
                          )
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="flex justify-end items-center gap-3 mt-6">

            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <span>
              Page {pagination.currentPage} / {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Products;