import { ClockIcon } from "@heroicons/react/24/solid";
import { Avatar, MenuItem, Typography } from "@material-tailwind/react";
import moment from "moment";

export function NotifList({
  icon: any = <></>,
  imageSrc = "",
  title = "",
  description = "",
  date = new Date(),
}) {
  return (
    <MenuItem className="flex items-center gap-4">
      <Avatar src={imageSrc}></Avatar>
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-normal"
        >
          {title && <strong>{title}</strong>}
          {title && " "}
          {description}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="flex items-center gap-1 text-xs font-normal opacity-60"
        >
          <ClockIcon className="h-3.5 w-3.5" /> {moment(date).fromNow()}
        </Typography>
      </div>
    </MenuItem>
  );
}

NotifList.displayName = "/src/widgets/layout/notif-list.jsx";
export default NotifList;
