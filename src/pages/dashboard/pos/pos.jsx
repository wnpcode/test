import GetPath from "@/configs/access";
import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
} from "@/configs/asyncStorage";
import { getCurrentRole, handleCombo } from "@/configs/utils";
import { useMaterialTailwindController } from "@/context";
import LoadingContext from "@/context/utils"; // import loading
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/services";
import { URL_CONSTANT } from "@/services/constant";
import CartList from "@/widgets/cards/cart";
import { StatisticsProduct } from "@/widgets/cards/static-product";
import { ModalPayCash } from "@/widgets/modal/modal-pay-cash";
import { ModalPayment } from "@/widgets/modal/modal-payment";
import { ModalTapNfc } from "@/widgets/modal/modal-tap-nfc";
import { Button, Chip, Input, Typography } from "@material-tailwind/react";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";

const Product = () => {
  const loading = useContext(LoadingContext); // get state & function loading
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const isMerchant = GetPath().startsWith("/merchant");
  const [data, setData] = useState(getLocalStorage("product") || []);
  const [loginData, setLoginData] = useState(
    getSessionStorage("login_data")
      ? JSON.parse(getSessionStorage("login_data"))
      : {}
  );
  const [page, setpage] = useState(1);
  const [size, setsize] = useState(1000);
  const [sort, setsort] = useState("name");
  const [dir, setdir] = useState(1);
  const [pages, setpages] = useState(0);
  const [totalElements, settotalElements] = useState(0);
  const [title, settitle] = useState("");
  const [tags, settags] = useState([]);
  const [tipe, settipe] = useState("");
  const [category, setCategory] = useState("");
  const [status, setstatus] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectCategory, setSelectCategory] = useState("All");
  const [hasMore, sethasMore] = useState(true);
  const [nominal, setNominal] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [openCash, setOpenCash] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handleCategory = (val) => {
    if (val == "All") return setSelectCategory("All");
    setSelectCategory(val);
  };

  const getListCategory = async () => {
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.category.all[getCurrentRole()]}`
      );
      let list = _.map(response.data.content, handleCombo);
      list.unshift({ label: "All", value: "All" });
      setSelectCategory("All");
      setCategoryList(list);
      loading.setLoading(false);
    } catch (error) {
      loading.setLoading(false);
    }
  };
  const initialCart = [];
  const [cart, setCart] = useState(initialCart);

  const getData = async () => {
    let query = {};
    query["page"] = page - 1;
    query["size"] = size;
    query["sort"] = sort;
    query["dir"] = dir;
    if (title) query["name"] = title;
    if (selectCategory !== "All") query["categoryId"] = selectCategory;
    if (status) query["status"] = status;
    if (tipe) query["type"] = tipe;
    if (tags) query["tags"] = tags.join(",");
    try {
      let response = await axiosGet(
        `${URL_CONSTANT.product.all[getCurrentRole()]}`,
        query
      );
      setLocalStorage("product", JSON.stringify(response.data.content));
      setData(response.data.content);
      setpage(response.data.number + 1);
      setsize(response.data.size);
      settotalElements(response.data.totalElements);
      setpages(response.data.totalPages);
      sethasMore(response.data.number + 1 < response.data.totalPages);
    } catch (error) {
      loading.setLoading(false);
    }
  };

  const getMoreData = async () => {
    let query = {};
    query["page"] = page - 1 + 1;
    query["size"] = size;
    query["sort"] = sort;
    query["dir"] = dir;
    if (title) query["title"] = title;
    if (category) query["category"] = category;
    if (status) query["status"] = status;
    if (tipe) query["type"] = tipe;
    if (tags) query["tags"] = tags.join(",");
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.product.all[getCurrentRole()]}`,
        query
      );
      loading.setLoading(false);
      setData(data.concat(response.data.content));
      setpage(response.data.number + 1);
      setsize(response.data.size);
      settotalElements(response.data.totalElements);
      setpages(response.data.totalPages);
      sethasMore(response.data.number + 1 < response.data.totalPages);
    } catch (error) {
      loading.setLoading(false);
    }
  };
  const removeFromCart = (itemId) => {
    deleteCartSingle(itemId);
  };
  const updateQuantity = (itemId, quantity) => {
    let temp = {};
    temp["productId"] = itemId;
    temp["quantity"] = quantity;
    if (quantity == 0) return deleteCartSingle(itemId);
    updateCartSingle(temp);
  };

  const addCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.productId === item.id
    );
    let temp = {};
    if (existingItem) {
      temp["productId"] = item.id;
      temp["quantity"] = existingItem.quantity + 1;
    } else {
      temp["productId"] = item.id;
      temp["quantity"] = 1;
    }
    updateCartSingle(temp);
  };

  const updateCartSingle = async (item) => {
    const response = await axiosPut(
      `${URL_CONSTANT.shopping_cart.item[getCurrentRole()]}`,
      item
    );
    await getCartList();
  };

  const deleteCartSingle = async (id) => {
    const response = await axiosDelete(
      `${URL_CONSTANT.shopping_cart.item[getCurrentRole()]}/${id}`
    );
    await getCartList();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.totalPrice * item.quantity;
    }, 0);
  };

  const handleOpen = () => {
    var total = 0;
    total = calculateTotalPrice();
    setTotal(total);
    setOpen(!open);
  };

  const handleOpenCash = () => {
    var total = 0;
    total = calculateTotalPrice();
    setTotal(total);
    setOpenCash(!openCash);
  };

  const handleOpenPayment = () => {
    var total = 0;
    total = calculateTotalPrice();
    setTotal(total);
    setOpenPayment(!openPayment);
    setLoadingPayment(false);
  };

  const handlePayment = async ({ pin = "", nominal = 0 }) => {
    try {
      setNominal(nominal);
      let newData = { customer: {} };
      newData["paymentMethod"] = paymentMethod;
      newData["pin"] = pin;
      newData["isLimitProcess"] = true;
      newData["customer"]["pspUserId"] = "string";
      newData["customer"]["pspAccountId"] = "string";
      newData["customer"]["pspCallerId"] = "string";
      newData["customer"]["pspNfcId"] = "string";
      newData["customer"]["pspCompanyId"] = loginData.companyId;
      loading.setLoading(true);
      setLoadingPayment(true);
      const response = await axiosPost(
        `${URL_CONSTANT.transaction.payment[getCurrentRole()]}`,
        newData
      );
      setOpen(false);
      setOpenCash(false);
      setDataPayment(response.data);
      setOpenPayment(true);
    } catch (error) {
      console.log(error);
    } finally {
      loading.setLoading(false);
    }
  };

  const getCartList = async () => {
    try {
      loading.setLoading(true);
      let response = await axiosGet(
        `${URL_CONSTANT.shopping_cart.all[getCurrentRole()]}`
      );
      let cartItems = [];
      try {
        cartItems = response.data.shoppingCartItems.map((item) => {
          let temp = {
            ...item.product,
            productId: item.product.id,
            id: item.id,
            quantity: item.quantity,
            totalPrice: item.product.sellingPrice,
          };
          return temp;
        });
      } catch (error) {
        cartItems = [];
      }
      setCart(cartItems);
      loading.setLoading(false);
    } catch (error) {
      loading.setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    getListCategory();
    getCartList();
    const fetchIntervalProduct = setInterval(() => {
      getData();
    }, 10000);

    return () => clearInterval(fetchIntervalProduct);
  }, []);

  useEffect(() => {
    getData();
  }, [selectCategory]);

  useEffect(() => {
    const timeOutId = setTimeout(() => getData(), 500);
    return () => clearTimeout(timeOutId);
  }, [title]);

  return (
    <div className="mt-12 flex flex-row justify-between">
      <div className="flex  flex-col ">
        <div className="flex w-full flex-row md:flex-col ">
          <div className="w-3/4 md:w-full">
            <div className="w-72">
              <Input
                label="Search"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                icon={<i className="fas fa-search" />}
              />
            </div>
          </div>
          <div
            className={`my-2 flex w-1/4 ${
              isMerchant ? "max-w-[860px]" : "max-w-[630px]"
            } 
             justify-end gap-1 overflow-x-auto pb-3 md:w-full md:justify-start`}
          >
            {categoryList.map((el, key) => (
              <Chip
                key={`category-${key}`}
                color="purple"
                variant={selectCategory == el.value ? `filled` : `outlined`}
                onClick={() => {
                  handleCategory(el.value);
                }}
                value={el.label}
              />
            ))}
          </div>
        </div>
        <div
          className={`item-scroll flex h-[68vh] flex-grow flex-wrap content-start justify-start overflow-y-auto `}
        >
          {data.map((element, key) => (
            <div
              key={`product-${key}`}
              className="m-1 h-fit "
              onClick={() => {}}
            >
              <StatisticsProduct
                categoryList={categoryList}
                items={element}
                addCart={addCart}
                key={`${JSON.stringify(element).length}-category${
                  categoryList.length
                }`}
                setTotal={setTotal}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore ? (
            <Button
              ripple={false}
              fullWidth={true}
              onClick={() => {
                getMoreData();
              }}
              className="w-fit bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:bg-purple-500 hover:text-white hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              <Typography className="text-xs font-medium ">
                Load More
              </Typography>
            </Button>
          ) : (
            <Typography className="text-xs font-extrabold"> </Typography>
          )}
        </div>
      </div>

      <CartList
        key={`${JSON.stringify(cart).length}-category${categoryList.length}`}
        categoryList={categoryList}
        items={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        handleOpen={handleOpen}
        handleOpenCash={handleOpenCash}
        setTotal={setTotal}
        setPaymentMethod={setPaymentMethod}
      />
      <ModalPayment
        key={`data-payment-${JSON.stringify(dataPayment).length}`}
        open={openPayment}
        handleOpen={handleOpenPayment}
        payment={nominal}
        data={dataPayment}
      ></ModalPayment>

      <ModalTapNfc
        key={`${open ? "show" : ""}-nfc`}
        open={open}
        handleOpen={handleOpen}
        total={total}
        handlePayment={handlePayment}
        loadingPayment={loadingPayment}
      />
      <ModalPayCash
        key={`${openCash ? "show" : ""}-cash`}
        open={openCash}
        handleOpen={handleOpenCash}
        total={total}
        handlePayment={handlePayment}
        loadingPayment={loadingPayment}
      ></ModalPayCash>
    </div>
  );
};
export default Product;
