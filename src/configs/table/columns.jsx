import { roleList } from "@/data/combo";

export const columnUser = [
  {
    label: "name",
    key: "name",
  },
  {
    label: "email",
    key: "email",
  },
  {
    label: "roleType",
    key: "roleType",
    type: "option",
    option: [...roleList],
  },
  {
    label: "phone",
    key: "phone",
  },
  {
    label: "status",
    key: "active",
    type: "boolean",
    option: ["Aktif", "Tidak Aktif"],
  },
];

export const columnCategory = [
  {
    label: "name",
    key: "name",
  },
  {
    label: "description",
    key: "description",
  },
  {
    label: "companyName",
    key: "companyId",
    type: "option",
    option: [...roleList],
  },
  {
    label: "merchantName",
    key: "merchantId",
    type: "option",
    option: [...roleList],
  },
];

export const columnProduct = [
  {
    label: "productName",
    key: "name",
  },
  {
    label: "sku",
    key: "sku",
  },
  {
    label: "stock",
    key: "stock",
    align: "right",
  },
  {
    label: "sellingPrice",
    key: "sellingPrice",
    type: "currency",
    align: "right",
  },
  {
    label: "priceTotal",
    key: "totalPrice",
    type: "currency",
    align: "right",
  },
  {
    label: "status",
    key: "active",
    type: "boolean",
    option: ["Aktif", "Tidak Aktif"],
  },
];
