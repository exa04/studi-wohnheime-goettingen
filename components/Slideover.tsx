import { Dorm } from "@/lib/types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";

export type SlideoverRef = {
  open(): void;
  close(): void;
};

export const Slideover = forwardRef(function Slideover(
  props: { id: number },
  ref,
) {
  const [dorm, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [web_link, setWebLink] = useState("");
  const [apartment_types, setApartmentTypes] = useState(Array);
  const [images, setImages] = useState<Array<string>>(Array);
  const [address, setAddress] = useState("");

  const [facilities, setFacilities] = useState<Array<string>>();
  const [parking_spots, setParkingSpots] = useState<Array<string>>();

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  useEffect(() => {
    setOpen(true);
    setLoading(true);
    const res = fetch(`/api/get/${props.id}`).then((res) => {
      res.json().then((json: Dorm) => {
        setTitle(json.name);
        setSummary(json.summary);
        setWebLink(json.web_link);
        setApartmentTypes(json.apartment_types);
        setImages(json.images);
        setAddress(json.address);
        setFacilities(json.facilities);
        setParkingSpots(json.parking_spots);
        setLoading(false);
      });
    });
  }, [props.id]);

  return (
    <div
      data-open={open}
      className="w-100svw fixed bottom-0 z-30 box-border h-[80svh] w-full border-r border-black/20 bg-white shadow-2xl shadow-black data-[open=false]:hidden dark:border-white/20 dark:bg-zinc-950 md:top-0 md:h-svh md:max-w-md lg:left-80 lg:z-10"
    >
      <div className="sticky z-20 flex h-16 w-full items-center justify-between border-b border-zinc-300/50 bg-zinc-50 px-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            color="blue"
            onClick={() => setOpen(false)}
          >
            <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          {loading ? (
            <Skeleton className="h-4 w-[200px]" />
          ) : title != address ? (
            <h2>
              <div className="-mb-1 font-bold">{title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {address}
              </div>
            </h2>
          ) : (
            <h2>
              <div className="font-bold leading-tight">{title}</div>
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://ipack.studentenwerk-goettingen.de/wohnheimaufnahmeantrag.html"
            target="_blank"
          >
            <Button className="gap-2 max-sm:!px-3">
              <span className="max-sm:hidden">Bewerben</span>
            </Button>
          </a>
        </div>
      </div>
      <ScrollArea className="h-full">
        {loading ? (
          <Skeleton className="aspect-[3/2] w-full !rounded-none" />
        ) : (
          images[0] != undefined && (
            <Dialog>
              <DialogTrigger>
                <img
                  src={images[0]}
                  className="aspect-[3/2] w-full object-cover"
                  alt={"Foto von " + title}
                />
              </DialogTrigger>
              <DialogContent className="max-h-[90svh] max-w-[90svw] overflow-hidden border-0 p-0">
                <img
                  src={images[0]}
                  className="h-full max-h-[90svh] w-full max-w-[90svw] object-contain"
                  alt=""
                />
              </DialogContent>
            </Dialog>
          )
        )}
        {loading ? (
          <div className="space-y-2 px-6 py-6">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        ) : (
          <div className="space-y-6 px-6 pb-6 pt-4">
            <div>
              <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {summary}
              </div>
              {images.length > 1 && (
                <div className={`mt-4 flex gap-2`}>
                  {images.length > 1 &&
                    images.slice(1).map((src) => (
                      <Dialog key={src}>
                        <DialogTrigger className="w-full shrink grow">
                          <img
                            alt="Weiteres Foto von dem Wohnheim"
                            src={src}
                            className="aspect-[3/2] rounded object-cover outline outline-1 -outline-offset-1 outline-black/20 dark:outline-white/20"
                          />
                        </DialogTrigger>
                        <DialogContent className="h-full max-h-[90svh] w-full max-w-[90svw] overflow-hidden border-0 p-0">
                          <img
                            alt=""
                            src={src}
                            className="h-full w-full object-cover"
                          />
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              )}
            </div>
            <Button variant="link" className="mr-4 gap-2 px-0">
              <ExternalLinkIcon />
              In Google Maps anzeigen
            </Button>
            <a href={web_link} target="_blank">
              <Button variant="link" className="gap-2 px-0">
                <ExternalLinkIcon />
                Original anzeigen
              </Button>
            </a>
            <Separator />
            <section className="space-y-1 text-sm">
              <h3 className="text-2xl font-bold">Wohnformen</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Dieses Wohnheim bietet {apartment_types.length} verschiedene
                Wohnformen an. W&auml;hle eine aus, um mehr zu ihr zu erfahren.{" "}
              </p>
              <p>{JSON.stringify(apartment_types)}</p>
            </section>
            {facilities?.length != undefined && facilities.length > 0 && (
              <section className="space-y-1 text-sm">
                <h3 className="text-2xl font-bold">Ausstattung</h3>
                <ul className="ml-6 list-disc text-zinc-600 dark:text-zinc-400">
                  {facilities?.map((facility, i) => (
                    <li key={i}>{facility}</li>
                  ))}
                </ul>
              </section>
            )}
            {facilities?.length != undefined && facilities.length > 0 && (
              <section className="space-y-1 text-sm">
                <h3 className="text-2xl font-bold">Parkmöglichkeiten</h3>
                <ul className="ml-6 list-disc text-zinc-600 dark:text-zinc-400">
                  {parking_spots?.map((spot, i) => <li key={i}>{spot}</li>)}
                </ul>
              </section>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
});
