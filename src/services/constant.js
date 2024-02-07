export const URL_CONSTANT = {
  auth: {
    check: "api/v1/auth/check",
    login: "api/v1/auth/login",
  },
  product: {
    all: {
      ADMIN_MERCHANT: "api/v1/admin/products",
      CASHIER: "api/v1/cashier/product",
      SUPER_ADMIN: "api/v1/office/products",
    },
    image: {
      ADMIN_MERCHANT: "api/v1/admin/products/image",
      SUPER_ADMIN: "api/v1/office/products/image",
    },
  },
  user: {
    all: {
      ADMIN_MERCHANT: "api/v1/admin/users",
      CASHIER: "api/v1/cashier/users",
      SUPER_ADMIN: "api/v1/office/users",
    },
  },
  category: {
    all: {
      ADMIN_MERCHANT: "api/v1/admin/categories",
      CASHIER: "api/v1/cashier/categories",
      SUPER_ADMIN: "api/v1/office/categories",
    },
    combo: {
      ADMIN_MERCHANT: "api/v1/admin/categories/search",
      CASHIER: "api/v1/cashier/categories/search",
      SUPER_ADMIN: "api/v1/office/categories/search",
    },
  },
  shopping_cart: {
    all: {
      ADMIN_MERCHANT: "api/v1/admin/shopping-cart",
      CASHIER: "api/v1/cashier/shopping-cart",
      SUPER_ADMIN: "api/v1/office/shopping-cart",
    },
    item: {
      ADMIN_MERCHANT: "api/v1/admin/shopping-cart/item",
      CASHIER: "api/v1/cashier/shopping-cart/item",
      SUPER_ADMIN: "api/v1/office/shopping-cart/item",
    },
  },
  transaction: {
    payment: {
      ADMIN_MERCHANT: "api/v1/admin/transaction",
      CASHIER: "api/v1/cashier/transaction",
      SUPER_ADMIN: "api/v1/office/transaction",
    },
  },
};
