import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const DetailReport = () => {
  const navigate = useNavigate();
  const TABLE_HEAD = [
    "Nama Produk",
    "Jumlah",
    "Satuan",
    "Diskon",
    "Total Harga",
  ];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      qty: "Manager",
      satuan: "23/04/18",
      disc: "10%",
      total: "100000",
    },
    {
      name: "Alexa Liras",
      qty: "Developer",
      satuan: "23/04/18",
      disc: "10%",
      total: "100000",
    },
    {
      name: "Laurent Perrier",
      qty: "Executive",
      satuan: "19/09/17",
      disc: "10%",
      total: "100000",
    },
    {
      name: "Michael Levi",
      qty: "Developer",
      satuan: "24/12/08",
      disc: "10%",
      total: "100000",
    },
    {
      name: "Richard Gran",
      qty: "Manager",
      satuan: "04/10/21",
      disc: "10%",
      total: "100000",
    },
  ];
  return (
    <>
      <Card className="mt-12">
        <CardBody className="overflow-x-scroll p-2 px-0 pt-0 pb-2">
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="h5">Tambah User</Typography>
              <span>Manajement User</span>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-row flex-wrap bg-white">
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className="my-2 text-base font-semibold">Nama Company</h3>
              <Input
                disabled
                color="blue"
                type="text"
                size="lg"
                className="w-full"
                onChange={(e) => {}}
                name="column1"
              />
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className="my-2 text-base font-semibold">
                Tanggal Transaksi
              </h3>
              <Input
                disabled
                color="blue"
                type="text"
                size="lg"
                onChange={(e) => {}}
                className="w-full"
                name="column1"
              />
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2">
              <h3 className="my-2 text-base font-semibold">Kasir</h3>
              <Input
                disabled
                color="blue"
                type="email"
                size="lg"
                className="w-full"
                onChange={(e) => {}}
                name="column1"
              />
            </div>
            <div className=" flex w-1/2 flex-col px-2 py-2 ">
              <h3 className="my-2 text-base font-semibold">Status</h3>
              <Switch color="purple" defaultChecked />
            </div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((item, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.satuan}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.qty}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.disc}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.total}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-row-reverse gap-1">
            <Button
              onClick={() => navigate("/dashboard/report")}
              className="mx-1 rounded-3xl"
              size="lg"
              color="purple"
              variant="gradient"
            >
              Simpan
            </Button>
            <Button
              onClick={() => navigate("/dashboard/report")}
              className="mx-1 rounded-3xl"
              size="lg"
              color="purple"
              variant="outlined"
            >
              Kembali
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default DetailReport;
