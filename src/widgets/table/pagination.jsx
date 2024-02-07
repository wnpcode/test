import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MenuItem, Select } from "@mui/material";
import _ from "lodash";
import { useTranslation } from "react-i18next";

export function Pagination(props) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(props.page);
  const [sizeList, setSizeList] = useState([5, 10, 25, 50, 100]);
  const [size, setSize] = useState(props.size);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      props.setpage(index);
    },
  });

  const next = () => {
    if (active === props.pages) return;

    setActive(active + 1);
    props.setpage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    props.setpage(active - 1);
  };

  return (
    <div className="mt-2 flex justify-between">
      <div className="flex items-center gap-4 pl-4">
        <span>
          {t("page")} {active} {t("of")} {props.pages}
        </span>
      </div>
      <div>
        <Select
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            props.setsize(e.target.value);
            props.setpage(1);
          }}
        >
          {sizeList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> {t("previous")}
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === props.pages}
        >
          {t("next")}

          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
