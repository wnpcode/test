import { CreditCardIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";

export const notifList = [
  {
    imageSrc:
      "https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg",
    icon: (
      <Avatar
        src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
        alt="item-1"
        size="sm"
        variant="circular"
      />
    ),
    actor: "Nur Wahyudi",
    title: "New message",
    description: "from Laur",
    date: new Date(2023, 11, 4, 9, 41, 15),
  },
  {
    imageSrc:
      "https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg",
    icon: (
      <Avatar
        src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
        alt="item-1"
        size="sm"
        variant="circular"
      />
    ),
    actor: "Nur Wahyudi",
    title: "New album",
    description: "by Travis Scott",
    date: new Date(2023, 11, 3),
  },
  {
    imageSrc:
      "https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg",
    icon: (
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
        <CreditCardIcon className="h-4 w-4 text-white" />
      </div>
    ),
    actor: "Nur Wahyudi",
    title: "Payment successfully completed",
    description: "by Travis Scott",
    date: new Date(2023, 11, 2),
  },
];

export const fakeUser = [
  {
    name: "John Michael",
    email: "johnmichael@mail.dummy",
    role: "ADMIN",
    phone: "099889889871",
    status: false,
  },
  {
    name: "Alexa Liras",
    email: "alexaliras@mail.dummy",
    role: "ADMIN",
    phone: "099889889872",
    status: true,
  },
  {
    name: "Laurent Perrier",
    email: "laurentperrier@mail.dummy",
    role: "MERCHANT",
    phone: "099889889873",
    status: true,
  },
  {
    name: "Michael Levi",
    email: "michaellevi@mail.dummy",
    role: "MERCHANT",
    phone: "099889889874",
    status: false,
  },
  {
    name: "Richard Gran",
    email: "richardgran@mail.dummy",
    role: "MERCHANT",
    phone: "099889889875",
    status: true,
  },
];

export default notifList;
