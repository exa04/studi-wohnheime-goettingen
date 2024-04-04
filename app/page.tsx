/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Dorm, DormResult, HousingType } from "@/lib/types";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  InputIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { all_dorms } from "@/lib/search";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [results, set_results] = useState(all_dorms);

  const [slideover_open, set_slideover_open] = useState(false);
  const [focussed_dorm, setFocussedDorm] = useState(-1);

  const slideover = useRef<SlideoverRef>(null);
  function openSlideover(id: number) {
    setFocussedDorm(id);
    slideover.current?.open();
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 z-20 box-border flex h-[66svh] w-full flex-col border-r border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900 md:top-0 md:h-svh md:max-w-xs">
        <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 bg-white bg-zinc-50 pl-6 pr-4 dark:border-zinc-800 dark:bg-zinc-950 md:h-16">
          <div className="flex w-full items-center justify-between gap-1">
            <h1 className="grow font-bold">Studi-Wohnheime</h1>
            <FilterSheet />
            <ModeToggle />
          </div>
        </div>
        <ScrollArea className="h-full shrink">
          {results.map((result) => (
            <div
              className="pointer relative w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
              role="button"
              key={result.id.toString()}
              onClick={(e) => openSlideover(result.id)}
            >
              <div className="flex justify-between gap-1">
                <div className="font-semibold">{result.name}</div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {Array.isArray(result.rent)
                    ? result.rent[0] + " - " + result.rent[1]
                    : result.rent.toString()}
                  €
                </div>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.housing_types.map((type, i) => (
                  <p key={i}>{type}</p>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      {focussed_dorm != -1 && <Slideover ref={slideover} id={focussed_dorm} />}
      <div className="h-screen w-screen bg-zinc-500"></div>
    </div>
  );
}

function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ListBulletIcon />
          <span className="sr-only">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            <div className="mb-4 font-semibold">Wohnform</div>
            <div className="mb-6 space-y-4">
              <div className="items-top flex space-x-2">
                <Checkbox id="group" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="group"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Gruppenwohnung
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Teile eine Wohnung mit verschiedenen, durchwechselnden
                    Studis.
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="single" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="single"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Einzelappartement
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Dein eigenes Appartement
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="double" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="double"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    2er-Gruppenwohnung
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Eine Wohnung für dich und eine weitere Person
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="couple" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="couple"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Doppelappartement
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Für Einzelpersonen oder Paare
                  </p>
                </div>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="family" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="family"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Familienwohnung
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Für deine Familie
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4 font-semibold">Ausstattung</div>
            <div className="mb-6 space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="furnishment">Möblierung</Label>
                <Select name="furnishment">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Egal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Egal</SelectItem>
                    <SelectItem value="true">Möbliert</SelectItem>
                    <SelectItem value="false">Unmöbliert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="furnishment">Parkplätze</Label>
                <Select name="furnishment">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Egal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Egal</SelectItem>
                    <SelectItem value="true">Vorhanden</SelectItem>
                    <SelectItem value="false">Nicht vorhanden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-4 font-semibold">Miete</div>
            <Slider defaultValue={[600]} min={200} max={600} step={1} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

type SlideoverRef = {
  open(): void;
  close(): void;
};

const Slideover = forwardRef(function Slideover(props: { id: number }, ref) {
  const [dorm, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [web_link, setWebLink] = useState("");
  const [apartment_types, setApartmentTypes] = useState(Array);
  const [images, setImages] = useState<Array<string>>(Array);
  const [address, setAddress] = useState("");

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
        setLoading(false);
      });
    });
  }, [props.id]);

  return (
    <div
      data-open={open}
      className="w-100svw fixed top-0 z-30 box-border h-svh w-full bg-white shadow-2xl data-[open=false]:hidden dark:bg-zinc-900 md:max-w-lg lg:left-80 lg:z-10"
    >
      <div className="sticky z-20 flex h-14 w-full items-center justify-between border-b border-zinc-300/50 bg-zinc-50 px-4 dark:border-zinc-800 dark:bg-zinc-950 md:h-16">
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
            <Skeleton className="h-4 w-[250px]" />
          ) : title != address ? (
            <h2>
              <div className="-mb-1 font-bold">{title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {address}
              </div>
            </h2>
          ) : (
            <h2 className="font-bold leading-tight">{title}</h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a href={web_link} target="_blank">
            <Button variant="ghost" size="icon">
              <ExternalLinkIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </a>
          <a
            href="https://ipack.studentenwerk-goettingen.de/wohnheimaufnahmeantrag.html"
            target="_blank"
          >
            <Button className="gap-2 max-sm:!px-3">
              <InputIcon />
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
          <div className="space-y-4 px-6 py-6">
            <div className="text-zinc-600 dark:text-zinc-400">{summary}</div>
            {images.length > 1 && (
              <div className={`grid grid-cols-${images.length} gap-2`}>
                {images.length > 1 &&
                  images.slice(1).map((src) => (
                    <Dialog key={src}>
                      <DialogTrigger>
                        <img
                          src={src}
                          className="aspect-[3/2] rounded object-cover"
                          alt="Weiteres Bild von dem Wohnheim"
                        />
                      </DialogTrigger>
                      <DialogContent className="h-full max-h-[90svh] w-full max-w-[90svw] overflow-hidden border-0 p-0">
                        <img
                          src={src}
                          className="h-full w-full object-cover"
                          alt=""
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            )}
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
            <h3 className="text-2xl font-bold">Wohnformen</h3>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            ) : (
              <p className="text-zinc-600 dark:text-zinc-400">
                Dieses Wohnheim bietet {apartment_types.length} verschiedene
                Wohnformen an. W&auml;hle eine aus, um mehr zu ihr zu erfahren.{" "}
              </p>
            )}
            <h3 className="text-2xl font-bold">Ausstattung</h3>
            <h3 className="text-2xl font-bold">Parkmöglichkeiten</h3>
          </div>
        )}
      </ScrollArea>
    </div>
  );
});
