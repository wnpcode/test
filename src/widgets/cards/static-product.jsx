import CurrencyFormat from "@/configs/curency";
import { imageOnError } from "@/configs/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const StatisticsProduct = ({ addCart, items, categoryList = [] }) => {
  const [loading, setLoading] = useState(true);

  const getCategory = () => {
    let category = categoryList.find((item) => item.value == items.category.id);
    if (category) return category.other.imageUrl;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Card
        className="h-auto w-full select-none"
        onClick={() => addCart(items)}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className="flex h-28 w-28 justify-center"
        >
          {loading && (
            <>
              <div className="absolute top-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ">
                <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
              </div>
            </>
          )}
          {/* {getCategory()} */}
          <img
            src={items.images[0] || getCategory() || ""}
            onError={imageOnError}
            alt="card-image"
            className="h-full w-full select-none object-cover"
          />
        </CardHeader>
        <CardBody className="flex justify-center p-1">
          <div className="mb-2 flex w-28 flex-col items-center justify-between">
            <Typography
              color="blue-gray"
              className="mx-auto w-28 select-none overflow-auto truncate text-center text-sm font-medium"
            >
              {items.name}
            </Typography>
            <Typography
              color="purple"
              className="my-1 select-none text-sm font-medium"
            >
              <CurrencyFormat value={items.totalPrice} currency="IDR" />
            </Typography>
            <Typography
              color="blue-gray"
              className="select-none text-xs font-thin"
            >
              Stock {items.stock}
            </Typography>
          </div>
        </CardBody>
        {/* <CardFooter className="p-1 px-6 pt-0 ">
          <Button
            ripple={false}
            fullWidth={true}
            onClick={() => addCart(items)}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:bg-purple-500 hover:text-white hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            <Typography className="text-xs font-medium ">Add Item</Typography>
          </Button>
        </CardFooter> */}
      </Card>
    </>
  );
};
