import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  ListBulletIcon,
  PinTopIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
  const apartments: Array<Apartment> = [
    {
      id: 0,
      name: "",
      summary: "",
      address: "",
      coordinates: [0, 0],
      web_link: "",
      housing: [],
      images: [],
      facilities: [],
      parking_spots: [],
    },
  ];

  let filtered_apartments = apartments;

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 box-border flex h-svh w-full max-w-xs flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
          <div className="flex w-full items-center justify-between gap-2">
            <h1 className="grow font-bold">Studi-Wohnheime</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListBulletIcon />
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
                            Teile eine Wohnung mit verschiedenen,
                            durchwechselnden Studis.
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
                            <SelectItem value="false">
                              Nicht vorhanden
                            </SelectItem>
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
            <ModeToggle />
          </div>
        </div>
        <ResultList apartments={filtered_apartments} />
      </div>
      {/* <Slideover /> */}
      <div className="h-screen w-screen bg-zinc-500"></div>
    </div>
  );
}

function Slideover() {
  return (
    <div className="fixed left-80 z-10 box-border h-svh w-full max-w-lg bg-white shadow-2xl dark:bg-zinc-900">
      <div className="sticky z-20 flex h-12 w-full items-center justify-between border-b border-zinc-300/50 bg-zinc-50 px-2 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" color="blue">
            <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <h2 className="font-bold">Johanniskirchhof/Paulinerstraße</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ExternalLinkIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button>Bewerben</Button>
        </div>
      </div>
      <ScrollArea className="h-full">
        <Dialog>
          <DialogTrigger>
            <img
              src="https://www.studentenwerk-goettingen.de/fileadmin/Inhalte/Seiten/Studentisches-Wohnen/Wohnheime/Albrecht_Thaer_Weg_6-26.jpg"
              className="aspect-[3/2] w-full object-cover"
            />
          </DialogTrigger>
          <DialogContent className="h-full max-h-[90svh] w-full max-w-[90svw] overflow-hidden border-0 p-0">
            <img
              src="https://www.studentenwerk-goettingen.de/fileadmin/Inhalte/Seiten/Studentisches-Wohnen/Wohnheime/Albrecht_Thaer_Weg_6-26.jpg"
              className="h-full w-full object-cover"
            />
          </DialogContent>
        </Dialog>
        <div className="space-y-4 px-6 py-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Die größte studentische Wohnanlage in Göttingen bietet 832
            Wohnplätze (Zimmer und Wohnungen) in verschiedenen Wohnformen an.
            Die ruhige Lage, große Grünflächen und ein umfangreiches
            Freizeitangebot zeichnen diese Wohnanlage aus. Dennoch sind
            Zentralcampus und Innenstadt in nur ca. 5 Minuten mit dem Fahrrad zu
            erreichen.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Dialog>
              <DialogTrigger>
                <img
                  src="https://www.studentenwerk-goettingen.de/fileadmin/_processed_/8/4/csm_Gutenbergstrasse_2-42_50750145da.jpg"
                  className="aspect-[3/2] rounded object-cover"
                />
              </DialogTrigger>
              <DialogContent className="h-full max-h-[90svh] w-full max-w-[90svw] overflow-hidden border-0 p-0">
                <img
                  src="https://www.studentenwerk-goettingen.de/fileadmin/_processed_/8/4/csm_Gutenbergstrasse_2-42_50750145da.jpg"
                  className="h-full w-full object-cover"
                />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <img
                  src="https://www.studentenwerk-goettingen.de/fileadmin/_processed_/4/f/csm_Gutenbergstrasse_2-42_Aussenansicht_d64ed3876e.jpg"
                  className="aspect-[3/2] rounded object-cover"
                />
              </DialogTrigger>
              <DialogContent className="h-full max-h-[90svh] w-full max-w-[90svw] overflow-hidden border-0 p-0">
                <img
                  src="https://www.studentenwerk-goettingen.de/fileadmin/_processed_/4/f/csm_Gutenbergstrasse_2-42_Aussenansicht_d64ed3876e.jpg"
                  className="h-full w-full object-cover"
                />
              </DialogContent>
            </Dialog>
          </div>
          <Button variant="link" className="mr-4 gap-2 px-0">
            <ExternalLinkIcon />
            In Google Maps anzeigen
          </Button>
          <Button variant="link" className="gap-2 px-0">
            <ExternalLinkIcon />
            Original anzeigen
          </Button>
          <h3 className="text-2xl font-bold">Wohnformen</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Dieses Wohnheim bietet 4 verschiedene Wohnformen an. W&auml;hle eine
            aus, um mehr zu ihr zu erfahren.
          </p>
          <h3 className="text-2xl font-bold">Ausstattung</h3>
          <h3 className="text-2xl font-bold">Parkmöglichkeiten</h3>
        </div>
      </ScrollArea>
    </div>
  );
}

function ListResult(props: {
  waiting_period: String;
  rent: String;
  residential_types: String[];
}) {
  return (
    <div
      className="pointer relative w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
      role="button"
    >
      <div className="font-semibold">Albrecht-Thaer-Weg 8-26</div>
      <div className="text-zinc-600 dark:text-zinc-400">
        {props.waiting_period} Wartezeit
        <br />
        {props.rent}€ Miete
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {props.residential_types.map((type, i) => (
          <p key={i}>{type}</p>
        ))}
      </div>
    </div>
  );
}

enum HousingType {
  GROUP,
  SINGLE,
  DOUBLE,
  COUPLE,
  FAMILY,
}

type Housing = {
  housing_type: HousingType;
  room_count: Number;
  room_size: String;
  rent: Number | [Number, Number];
  wating_period: [Number, Number];
  furnished: boolean;
  facilities: Array<String>;
  notices: Array<String>;
};

type Apartment = {
  id: Number;
  name: String;
  summary: String;
  address: String;
  coordinates: [Number, Number];
  web_link: String;
  housing: Array<Housing>;
  images: Array<String>;
  facilities: Array<String>;
  parking_spots: Array<String>;
};

function ResultList(props: { apartments: Array<Apartment> }) {
  return (
    <ScrollArea className="h-full shrink">
      {[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ].map((e) => (
        <ListResult
          key={e}
          waiting_period="8-11 Mo"
          rent="221-383"
          residential_types={[
            "Gruppenwohnungen-Zimmer",
            "Einzelappartments",
            "Doppelapartments",
          ]}
        />
      ))}
    </ScrollArea>
  );
}
