import api from "./api";


// ============================
// CREATE PRODUCT
// ============================

export const createProduct = (formData) => {
  return api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ============================
// GET ALL PRODUCTS
// ============================

export const getProducts = (
  params = {}
) => {

  return api.get(
    "/products",
    {
      params,
    }
  );

};

// ============================
// GET SINGLE PRODUCT BY SLUG
// ============================

export const getSingleProduct = (
  slug
) => {

  return api.get(
    `/products/${slug}`
  );

};

// ============================
// GET PRODUCT BY ID ADMIN
// ============================

export const getProductById = (
  id
) => {

  return api.get(
    `/products/id/${id}`
  );

};

// ============================
// UPDATE PRODUCT
// ============================

export const updateProduct = (
  id,
  formData
) => {

  return api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};

// ============================
// SOFT DELETE
// ============================

export const deleteProduct = (
  id
) => {

  return api.delete(
    `/products/${id}`
  );

};

// ============================
// RESTORE
// ============================

export const restoreProduct = (
  id
) => {

  return api.patch(
    `/products/restore/${id}`
  );

};

// ============================
// PERMANENT DELETE
// ============================

export const permanentDeleteProduct = (
  id
) => {

  return api.delete(
    `/products/permanent/${id}`
  );

};

// ============================
// STATUS UPDATE
// ============================

export const updateProductStatus = (
  id,
  data
) => {

  return api.patch(
    `/products/status/${id}`,
    data
  );

};

// ============================
// RECYCLE BIN
// ============================

export const getRecycleBinProducts = (
  params = {}
) => {

  return api.get(
    "/products/recycle-bin",
    {
      params,
    }
  );

};

// =================================================
// BULK IMAGE UPLOAD (Cloudinary)
// =================================================

export const bulkUploadImages = (
  formData
) => {

  return api.post(
    "/products/bulk/images",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};

// =================================================
// BULK CREATE PRODUCTS
// =================================================

export const bulkCreateProducts = (
  data
) => {

  return api.post(
    "/products/bulk-create",
    data
  );

};

// =================================================
// BULK STATUS
// =================================================

export const bulkUpdateProductStatus = (
  data
) => {

  return api.patch(
    "/products/bulk/status",
    data
  );

};

// =================================================
// BULK DELETE
// =================================================

export const bulkDeleteProducts = (
  data
) => {

  return api.patch(
    "/products/bulk/delete",
    data
  );

};

// =================================================
// BULK RESTORE
// =================================================

export const bulkRestoreProducts = (
  data
) => {

  return api.patch(
    "/products/bulk/restore",
    data
  );

};

// =================================================
// BULK PERMANENT DELETE
// =================================================

export const bulkPermanentDeleteProducts = (
  data
) => {

  return api.delete(
    "/products/bulk/permanent",
    {
      data,
    }
  );

};
// =================================================
// CSV IMPORT
// =================================================

export const importProductsFromCsv = (
  formData
) => {

  return api.post(
    "/products/import/csv",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};

// =================================================
// EXCEL IMPORT
// =================================================

export const importProductsFromExcel = (
  formData
) => {

  return api.post(
    "/products/import/excel",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};
// =================================================
// DOWNLOAD CSV TEMPLATE
// =================================================

export const downloadCsvTemplate = () => {

  return api.get(
    "/products/template/csv",
    {
      responseType: "blob",
    }
  );

};
// =================================================
// DOWNLOAD EXCEL TEMPLATE
// =================================================

export const downloadExcelTemplate = () => {

  return api.get(
    "/products/template/excel",
    {
      responseType: "blob",
    }
  );

};

// =================================================
// FAILED IMPORT REPORT
// =================================================

export const downloadFailedImportReport = (
  data
) => {

  return api.post(
    "/products/import/failed-report",
    data,
    {
      responseType: "blob",
    }
  );

};

// =================================================
// ANALYTICS
// =================================================

export const getProductStats = () => {

  return api.get(
    "/products/stats"
  );

};

export const getInventoryAnalytics = () => {

  return api.get(
    "/products/analytics/inventory"
  );

};

export const getCategoryAnalytics = () => {

  return api.get(
    "/products/analytics/category"
  );

};

export const getBrandAnalytics = () => {

  return api.get(
    "/products/analytics/brand"
  );

};