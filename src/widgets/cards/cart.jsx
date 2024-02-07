import CurrencyFormat from "@/configs/curency";
import { imageOnError } from "@/configs/utils";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

const CartList = ({
  items,
  onRemoveFromCart,
  onUpdateQuantity,
  handleOpen,
  handleOpenCash,
  setTotal,
  categoryList,
  setPaymentMethod,
}) => {
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.totalPrice * item.quantity;
    }, 0);
  };
  const getCategory = () => {
    let category = categoryList.find(
      (item) => item.value == items.category?.id
    );
    if (category) return category.other?.imageUrl;
  };

  return (
    <div className="mx-2 flex  w-[460px] min-w-[300px] flex-grow-0 flex-col">
      <div className="rounded-md bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Item List</h2>
        <ul className="item-scroll max-h-[450px] min-h-[200px] overflow-y-auto">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2"
            >
              <TrashIcon
                className=" cursor-pointer text-red-600"
                width={24}
                onClick={() => {
                  onRemoveFromCart(item.id);
                }}
              ></TrashIcon>
              <div className="flex flex-row">
                <div className=" w-20 items-center ">
                  <>
                    <img
                      src={item.images[0] || getCategory() || ""}
                      onError={imageOnError}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </>
                </div>
                <div className="flex flex-col">
                  <span className="w-24 truncate text-base">{item.name}</span>
                  <span className=" text-base text-purple-300">
                    <CurrencyFormat value={item.totalPrice} currency="IDR" />
                  </span>
                </div>
              </div>
              <div>
                <div className=" items-center self-end">
                  <div className="flex flex-row gap-2">
                    <MinusCircleIcon
                      className={`cursor-pointer ${
                        item.quantity == 1 ? " text-red-600" : ""
                      }`}
                      width={24}
                      onClick={() => {
                        item.quantity == 1
                          ? onRemoveFromCart(item.id)
                          : onUpdateQuantity(item.productId, item.quantity - 1);
                      }}
                    ></MinusCircleIcon>
                    {item.quantity}
                    <PlusCircleIcon
                      className="cursor-pointer"
                      width={24}
                      onClick={() => {
                        onUpdateQuantity(item.productId, item.quantity + 1);
                      }}
                    ></PlusCircleIcon>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-base font-semibold">
          Total :{" "}
          <CurrencyFormat value={calculateTotalPrice()} currency="IDR" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            hidden={items.length !== 0 ? false : true}
            variant="gradient"
            onClick={() => {
              handleOpen();
              setPaymentMethod("CARD");
            }}
            size="lg"
            className="w-full"
            color="purple"
          >
            Bayar Sekarang
          </Button>
          <Button
            hidden={items.length !== 0 ? false : true}
            variant="outlined"
            onClick={() => {
              handleOpenCash();
              setPaymentMethod("CASH");
            }}
            size="lg"
            className="w-full"
            color="purple"
          >
            Cash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
