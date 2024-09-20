import { getDevices } from "@/apis";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllDevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateChange] = useState(0);

  const navigate = useNavigate();

  const fetchDevices = async () => {
    try {
      setIsLoading(true);
      const devices = await getDevices();

      if (devices) {
        setDevices(devices);
      } else {
        console.log("devices are null");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [stateChange]);

  return (
    <DashboardLayout loading={isLoading}>
      <h1 className="text-3xl font-bold">All Devices</h1>

      <div>
        <Table>
          <TableCaption>A list of all available bids.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Device Name</TableHead>
              <TableHead className="text-left"> Machine ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="text-right">Info</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {devices.map(
              ({
                id,

                publicKey,
              }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>
                    SONOFF-ELLITE
                    {/* {category.toUpperCase()} - {manufacturer.toUpperCase()} */}
                  </TableCell>
                  <TableCell>{`${publicKey.slice(0, 10)}...${publicKey.slice(
                    -10
                  )}`}</TableCell>
                  <TableCell>1{/* {userId} */}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      className="rounded-full mr-2"
                      onClick={() => navigate(`/device-detail/${id}`)} // Ensure ID is part of the URL path
                    >
                      <Icons.info className="h-4 w-4" />
                    </Button>
                  </TableCell>

                  <TableCell className="text-right">
                    {/* <Button
                      className="rounded-full text-red-500 bg-gray-200"
                      onClick={() => {
                        deleteDevice(id.toString());
                        setStateChange(stateChange + 1);
                      }}
                    >
                      <Icons.trash className="h-4 w-4" />
                    </Button> */}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
