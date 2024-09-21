import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "../../public/images/hedera.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getNotarizations, getTokens } from "../apis";
import { useToast } from "@/components/ui/use-toast";
import { sendNft } from "../config/walletconnect";

export default function NFTPage() {
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const toast = useToast();
  console.log(selectedNFT);
  const [, setDecodedMetadata] = useState(null);

  const decodeBase64 = (base64String) => {
    try {
      return atob(base64String);
    } catch (e) {
      console.error("Failed to decode Base64 string", e);
      return null;
    }
  };

  useEffect(() => {
    if (selectedNFT && selectedNFT.metadata) {
      const decodedUrl = decodeBase64(selectedNFT.metadata);
      if (decodedUrl) {
        fetch(decodedUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setDecodedMetadata(data))
          .catch((err) => {
            console.error("Failed to fetch metadata", err);
            // toast.toast({
            //   title: "Fetch Error",
            //   description: "Failed to fetch metadata",
            // });
          });
      }
    }
  }, [selectedNFT]);

  const fetchNFT = async () => {
    try {
      const res: any = await getTokens();
      setNfts(res[0].nfts);

    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNFT();
  }, []);
  
  console.log(nfts,"==");

  if (nfts === undefined || nfts === null){
    return (
      <div>

      </div>
    )
  }

  return (
    <DashboardLayout loading={false}>
      <h1 className="text-3xl font-bold">Your NFTs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <Card key={nft.tokenid} className="p-4 bg-white rounded-lg shadow-md">
            <img
              src={Image}
              alt={nft.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <CardDescription className="text-lg font-semibold">
              {nft.name}
            </CardDescription>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedNFT(nft)}
                    variant="default"
                    className="mx-auto mt-2"
                  >
                    View Details
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedNFT && (
        <Dialog open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>NFT {selectedNFT.tokenid}</DialogTitle>
              <DialogDescription>Hedera Offsetting</DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap justify-between">
              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Account Id:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {selectedNFT.account_id}
                  </HoverCardTrigger>
                </HoverCard>{" "}
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Created Timestamp:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {new Date(
                      Number(selectedNFT.created_timestamp) * 1000
                    ).toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </HoverCardTrigger>
                </HoverCard>
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Modified Timestamp:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {new Date(
                      Number(selectedNFT.modified_timestamp) * 1000
                    ).toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </HoverCardTrigger>
                </HoverCard>
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Metadata:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {/* {decodeBase64(selectedNFT.metadata)} */}
                    Click to view
                  </HoverCardTrigger>
                  <HoverCardContent className="break-words text-blue-500">
                    {decodeBase64(selectedNFT.metadata)}
                  </HoverCardContent>
                </HoverCard>
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Serial Number:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {selectedNFT.serial_number}
                  </HoverCardTrigger>
                </HoverCard>
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Deleted:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {selectedNFT.deleted ? "Yes" : "No"}
                  </HoverCardTrigger>
                </HoverCard>
              </div>

              <div className="w-[46%] m-1 p-3 flex flex-col items-center bg-gray-100 rounded-lg">
                <p className="text-[12px] text-gray-600 font-semibold">
                  Token Id:
                </p>
                <HoverCard>
                  <HoverCardTrigger className="text-[14px] font-light">
                    {selectedNFT.token_id}
                  </HoverCardTrigger>
                </HoverCard>
              </div>
            </div>
            <div className="flex justify-between">
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={sendNft}>
                    Transfer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
