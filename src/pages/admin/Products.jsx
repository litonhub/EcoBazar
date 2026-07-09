import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import {
  getProducts,
  deleteProduct,
} from "../../api/productApi";

import ProductHeader from "../../components/admindashboard/ProductHeader";
import ProductTable from "../../components/admindashboard/ProductTable";
import ProductPagination from "../../components/admindashboard/ProductPagination";
import BulkActionBar from "../../components/admindashboard/BulkActionBar";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Future Ready
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const fetchProducts = async () => {

    try {

      setLoading(true);


      const params = {
        page,
        limit: 10,
        sort,
      };


      if (search.trim()) {
        params.q = search.trim();
      }


      const res = await getProducts(params);


      setProducts(
        res.data.data?.products || []
      );


      setPagination(
        res.data.data?.pagination || {}
      );


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
  }, [page, search, sort]);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!ok) return;

    try {
      const res = await deleteProduct(id);

      toast.success(res.data.message);

      setSelectedProducts((prev) =>
        prev.filter(item => item !== id)
      );

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
    <>
      <ProductHeader
        totalProducts={
          pagination.totalProducts || 0
        }
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        onRefresh={() => {
          setSearch("");
          setSort("latest");
          setPage(1);
          fetchProducts();
        }}
        onAddProduct={() =>
          navigate(
            "/admin-dashboard/products/add"
          )
        }
        onBulkProduct={() =>
          navigate(
            "/admin-dashboard/products/bulk"
          )
        }
        onRecycleBin={() =>
          navigate(
            "/admin-dashboard/products/recycle-bin"
          )
        }
      />

      <BulkActionBar
        selectedCount={selectedProducts.length}
        onDelete={() => { }}
        onRestore={() => { }}
        onActivate={() => { }}
        onDeactivate={() => { }}
        onClear={() => setSelectedProducts([])}
      />

      <div className="bg-white rounded-xl shadow p-6 mt-6">
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
          <>
            <ProductTable
              products={products}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              onEdit={(product) =>
                navigate(
                  `/admin-dashboard/products/edit/${product._id}`
                )
              }
              onDelete={(product) =>
                handleDelete(product._id)
              }
            />

            <ProductPagination
              pagination={pagination}
              page={page}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Products;