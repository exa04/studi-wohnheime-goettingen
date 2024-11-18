import { Apartment, Application, Dorm, HousingType } from "@/lib/types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  ExternalLinkIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertTitle } from "./ui/alert";

export type SlideoverRef = {
  open(): void;
  close(): void;
};

export const Slideover = forwardRef(function Slideover(
  props: { slug: string },
  ref,
) {
  const [open, setOpen] = useState(false);

  const [dorm, setDorm] = useState<Dorm>();

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
    setDorm(undefined);
    const res = fetch(`/api/get/${encodeURIComponent(props.slug)}`).then(
      (res) => {
        res.json().then((res_dorm: Dorm) => {
          setDorm(res_dorm);
        });
      },
    );
  }, [props.slug]);

  return (
    <div
      data-open={open}
      className="fixed z-30 box-border flex h-[90svh] w-full flex-col overflow-hidden rounded-t-[1.125rem] border-black/20 bg-white shadow-2xl transition-transform dark:border-white/20 dark:bg-zinc-950 dark:shadow-black max-md:bottom-0 max-md:shadow-black max-md:data-[open=false]:translate-y-full md:top-0 md:h-svh md:max-h-svh md:max-w-md md:rounded-t-none md:border-r md:data-[open=false]:translate-x-[calc(-100%-4rem)] lg:left-80 lg:z-10 lg:m-4 lg:h-auto lg:max-h-[calc(100svh-2rem)] lg:rounded-[1.125rem] lg:border lg:bg-white/80 lg:backdrop-blur-xl lg:backdrop-saturate-150 lg:dark:bg-zinc-950/30"
    >
      <div className="flex w-full shrink-0 items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-800 dark:bg-zinc-900 md:h-16 md:px-4 md:py-0 lg:h-auto lg:px-3 lg:py-3">
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <ArrowLeftIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <div className="shrink grow" />
        <a href={dorm?.web_link}>
          <Button variant="ghost" size="icon">
            <ExternalLinkIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </a>
        <a href={dorm?.web_link}>
          <Button variant="secondary" className="shadow-none dark:shadow-md">
            Bewerben
          </Button>
        </a>
      </div>
      <div className="h-auto max-h-full w-full shrink grow overflow-auto">
        {!dorm ? (
          <Skeleton className="aspect-[3/2] w-full !rounded-none" />
        ) : (
          dorm.images[0] != undefined && (
            <Dialog>
              <DialogTrigger>
                <img
                  src={dorm.images[0]}
                  className="aspect-[3/2] w-full object-cover"
                  alt={"Foto von " + dorm.name}
                />
              </DialogTrigger>
              <DialogContent className="max-h-[90svh] max-w-[90svw] overflow-hidden border-0 p-0">
                <img
                  src={dorm.images[0]}
                  className="h-full max-h-[90svh] w-full max-w-[90svw] object-contain"
                  alt=""
                />
              </DialogContent>
            </Dialog>
          )
        )}
        {!dorm ? (
          <div className="box-border space-y-6 px-6 pb-6 pt-4">
            <div className="h-32 space-y-2">
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4 w-[40%]" />
            </div>
          </div>
        ) : (
          <div className="box-border space-y-6 px-6 pb-6 pt-4">
            <ReadMore>
              <h2 className="text-2xl font-bold tracking-tight">{dorm.name}</h2>
              {dorm.address != dorm.name && (
                <div className="text-zinc-600 dark:text-zinc-400">
                  {dorm.address}
                </div>
              )}
              <div className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {dorm.summary}
              </div>
              {dorm.images.length > 1 && (
                <div className={`mt-4 flex gap-2`}>
                  {dorm.images.length > 1 &&
                    dorm.images.slice(1).map((src) => (
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
            </ReadMore>
            <Separator />
            <section className="space-y-2 text-sm">
              <h3 className="text-xl font-semibold tracking-tight">
                Wohnformen
              </h3>
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="flex w-full justify-stretch">
                  {dorm.apartment_types?.map((t, i) => (
                    <TabsTrigger
                      value={i.toString()}
                      key={t.verbose_housing_type}
                      className="w-full grow"
                    >
                      {t.housing_type == HousingType.SINGLE
                        ? "EA"
                        : t.housing_type == HousingType.DOUBLE
                          ? "DA"
                          : t.housing_type == HousingType.SHARED_2
                            ? "2er-WG"
                            : t.housing_type == HousingType.SHARED_3
                              ? "3er-WG"
                              : t.housing_type == HousingType.SHARED_4
                                ? "4er-WG"
                                : t.housing_type == HousingType.FAMILY
                                  ? "Familie"
                                  : t.housing_type == HousingType.GROUP
                                    ? "GW"
                                    : ""}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {dorm.apartment_types?.map((t, i) => (
                  <TabsContent
                    value={i.toString()}
                    key={t.verbose_housing_type}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base font-bold">
                          {t.verbose_housing_type}
                        </CardTitle>
                        {(t.application != Application.NONE || t.notices) && (
                          <CardDescription className="space-y-2">
                            {t.application == Application.SINGLE && (
                              <Alert>
                                <AlertTitle className="mb-0 flex items-center gap-2">
                                  <ExclamationTriangleIcon />
                                  Bitte einzeln bewerben!
                                </AlertTitle>
                              </Alert>
                            )}
                            {t.application == Application.GROUP && (
                              <Alert>
                                <AlertTitle className="mb-0 flex items-center gap-2">
                                  <ExclamationTriangleIcon />
                                  Bitte gemeinsam bewerben!
                                </AlertTitle>
                              </Alert>
                            )}
                            {t.notices && <p>{t.notices}</p>}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2 grid h-24 w-full grid-cols-2 gap-2">
                          <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
                            <div className="text-lg font-semibold tracking-tight">
                              {Array.isArray(t.rent)
                                ? t.rent[0] + "-" + t.rent[1]
                                : t.rent}
                              €
                            </div>
                            <div className="text-zinc-600 dark:text-zinc-400">
                              Mietpreis
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
                            <div className="text-lg font-semibold tracking-tight">
                              {Array.isArray(t.waiting_period)
                                ? t.waiting_period[0] +
                                  "-" +
                                  t.waiting_period[1]
                                : t.waiting_period}
                            </div>
                            <div className="text-zinc-600 dark:text-zinc-400">
                              Monate Wartezeit
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 grid h-16 w-full grid-cols-3 gap-2 sm:h-20">
                          <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
                            <div className="text-sm font-semibold sm:text-base">
                              {t.furnished ? "Nicht" : "Voll"}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                              Möbliert
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
                            <div className="text-sm font-semibold sm:text-base">
                              {t.room_count}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                              Zimmer
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
                            <div className="text-sm font-semibold tracking-tighter sm:text-base">
                              {t.room_size}
                            </div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                              Zimmergröße
                            </div>
                          </div>
                        </div>
                        {t.facilities.length > 0 && (
                          <h4 className="text-base font-bold">Einrichtungen</h4>
                        )}
                        {t.facilities.length > 0 && (
                          <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400">
                            {t.facilities.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
            {dorm.facilities?.length != undefined &&
              dorm.facilities.length > 0 && (
                <section className="space-y-1 text-sm">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Ausstattung
                  </h3>
                  <ul className="ml-6 list-disc text-zinc-600 dark:text-zinc-400">
                    {dorm.facilities?.map((facility, i) => (
                      <li key={i}>{facility}</li>
                    ))}
                  </ul>
                </section>
              )}
            {dorm.parking_spots?.length != undefined &&
              dorm.parking_spots.length > 0 && (
                <section className="space-y-1 text-sm">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Parkmöglichkeiten
                  </h3>
                  <ul className="ml-6 list-disc text-zinc-600 dark:text-zinc-400">
                    {dorm.parking_spots?.map((spot, i) => (
                      <li key={i}>{spot}</li>
                    ))}
                  </ul>
                </section>
              )}
          </div>
        )}
      </div>
    </div>
  );
});

function ReadMore(props: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-expanded={expanded}
      className="relative overflow-hidden data-[expanded=false]:h-32"
    >
      {!expanded && (
        <Button
          className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
          variant="link"
          onClick={() => setExpanded(true)}
        >
          Mehr anzeigen
        </Button>
      )}
      <div
        className="h-full"
        style={{
          maskImage: expanded
            ? ""
            : "linear-gradient(to bottom, black 30%, transparent)",
        }}
      >
        {props.children}
      </div>
      {expanded && (
        <Button
          variant="link"
          className="mt-2 px-0"
          onClick={() => setExpanded(false)}
        >
          Weniger anzeigen
        </Button>
      )}
    </div>
  );
}
