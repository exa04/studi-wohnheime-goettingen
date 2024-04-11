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
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { all_dorms } from "@/lib/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Slideover, SlideoverRef } from "@/components/Slideover";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useTheme } from "next-themes";

mapboxgl.accessToken =
  "pk.eyJ1IjoiMjIzMjMwIiwiYSI6ImNsbHE5MDAxYTBkdmUzcnBva2duNHk2N2kifQ.XZf_VzTUdxuCA8UzUgkwTg";

export default function Home() {
  const [results, set_results] = useState<Array<DormResult>>();
  const { theme, setTheme } = useTheme();

  const [focussed_dorm, setFocussedDorm] = useState<string>();

  const slideover = useRef<SlideoverRef>(null);
  function openSlideover(slug: string) {
    setFocussedDorm(slug);
    slideover.current?.open();
  }

  useEffect(() => {
    if (!results || !theme) return;
    let style = "mapbox://styles/mapbox/standard";
    const dark_theme =
      theme == "dark" ||
      (theme == "system" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark_theme) {
      style = "mapbox://styles/mapbox/dark-v11";
    }
    let mb_map = new mapboxgl.Map({
      container: mapContainer.current || ".map-container",
      style,
      center: [9.94, 51.546],
      zoom: 12,
      maxBounds: [
        [9.811834, 51.45219],
        [10.081352, 51.608504],
      ],
    });

    mb_map.on("load", () => {
      mb_map.addSource("dorms", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: results.map((r) => {
            return {
              type: "Feature",
              properties: {
                slug: r.slug,
                description:
                  "<b class='text-sm'>" +
                  r.name +
                  "</b><br><div class='text-xs'>" +
                  r.housing_types.join("<br>") +
                  "</div>",
              },
              geometry: {
                type: "Point",
                coordinates: r.coordinates,
              },
            };
          }),
        },
      });
      mb_map.addLayer({
        id: "dorms",
        type: "circle",
        source: "dorms",
        paint: {
          "circle-color": dark_theme ? "#3b82f6" : "#000000",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      mb_map.on("mouseenter", "dorms", (e) => {
        mb_map.getCanvas().style.cursor = "pointer";

        if (!e.features) return;
        // @ts-ignore
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties?.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(mb_map);
      });

      mb_map.on("click", "dorms", (e) => {
        if (!e.features || !e.features[0].properties) return;
        openSlideover(e.features[0].properties.slug);
      });

      mb_map.on("mouseleave", "dorms", () => {
        mb_map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    map.current = mb_map;
  }, [theme, results]);

  useEffect(() => {
    fetch(`/api/search/`).then((res) => {
      res.json().then((dorm_results: Array<DormResult>) => {
        set_results(dorm_results);
      });
    });
  }, []);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();

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
        <div className="h-full shrink overflow-auto">
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
        </div>
      </div>
      {focussed_dorm && <Slideover ref={slideover} slug={focussed_dorm} />}
      <div
        ref={mapContainer}
        className="map-container h-screen w-screen max-md:h-[34svh]"
      />
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
