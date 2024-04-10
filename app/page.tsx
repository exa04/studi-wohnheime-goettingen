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
import { Slideover, SlideoverRef } from "@/components/Slideover";

export default function Home() {
  const [results, set_results] = useState<Array<DormResult>>();

  const [focussed_dorm, setFocussedDorm] = useState<string>();

  const slideover = useRef<SlideoverRef>(null);
  function openSlideover(slug: string) {
    setFocussedDorm(slug);
    slideover.current?.open();
  }

  useEffect(() => {
    const res = fetch(`/api/search/`).then((res) => {
      res.json().then((json: Array<DormResult>) => {
        set_results(json);
      });
    });
  }, []);

  return (
    <div>
      <div className="fixed bottom-0 left-0 z-20 box-border flex h-[66svh] w-full flex-col border-r border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950 md:top-0 md:h-svh md:max-w-xs">
        <div className="flex h-14 shrink-0 items-center border-b border-zinc-200 bg-zinc-50 pl-6 pr-4 dark:border-zinc-800 dark:bg-zinc-900 md:h-16">
          <div className="flex w-full items-center justify-between gap-1">
            <h1 className="grow font-bold">Studi-Wohnheime</h1>
            <FilterSheet />
            <ModeToggle />
          </div>
        </div>
        <ScrollArea className="h-full shrink">
          {results ? (
            results.map((result) => (
              <div
                className={`pointer relative w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800 ${focussed_dorm == result.slug ? "bg-zinc-100 dark:bg-zinc-900" : ""}`}
                role="button"
                key={result.slug}
                onClick={(e) => openSlideover(result.slug)}
              >
                <div className="font-semibold">{result.name}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {result.housing_types.map((type, i) => (
                    <p key={i}>{type}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="relative">
              <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-white dark:to-zinc-950"></div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[120px]" />
                <Skeleton className="h-3 w-[160px]" />
                <Skeleton className="h-3 w-[170px]" />
              </div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[100px]" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-3 w-[140px]" />
              </div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[160px]" />
                <Skeleton className="h-3 w-[140px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[180px]" />
                <Skeleton className="h-3 w-[120px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[120px]" />
                <Skeleton className="h-3 w-[160px]" />
                <Skeleton className="h-3 w-[130px]" />
              </div>
              <div className="w-full items-stretch space-y-1 border-b border-zinc-200 px-6 py-4 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                <Skeleton className="mb-3 h-5 w-[190px]" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-3 w-[140px]" />
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      {focussed_dorm && <Slideover ref={slideover} slug={focussed_dorm} />}
      <div className="h-screen w-screen bg-white dark:bg-zinc-900"></div>
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
