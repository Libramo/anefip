"use client";

import { PlusCircle, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import { regionList } from "@/app/utils/countriesList";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "../ui/command";

const jobTypes = ["temps-plein", "mi-temps", "stage"];

export function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filters from the URL
  const currentJobTypes =
    searchParams
      .get("jobTypes")
      ?.split(",")
      .map((jobType) => jobType.toLowerCase()) || [];
  const currentRegions =
    searchParams
      .get("location")
      ?.split(",")
      .map((region) => region.toLowerCase()) || [];

  function clearAllFilter() {
    router.push("/");
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value.toLowerCase()); // Ensure the value is lowercase before setting
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  function handleJobTypeChange(jobType: string, checked: boolean) {
    const current = new Set(currentJobTypes);

    if (checked) {
      current.add(jobType.toLowerCase()); // Ensure the jobType is lowercase before adding
    } else {
      current.delete(jobType.toLowerCase()); // Ensure the jobType is lowercase before deleting
    }

    const newValue = Array.from(current).join(",");

    console.log(newValue);

    router.push(`?${createQueryString("jobTypes", newValue)}`);
  }

  function handleRegionChange(region: string, checked: boolean) {
    const current = new Set(currentRegions);

    if (checked) {
      current.add(region.toLowerCase()); // Ensure the jobType is lowercase before adding
    } else {
      current.delete(region.toLowerCase()); // Ensure the jobType is lowercase before deleting
    }

    const newValue = Array.from(current).join(",");

    router.push(`?${createQueryString("location", newValue)}`);
  }

  const totalRegions = regionList.length;
  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">Filtres</CardTitle>
        <Button
          onClick={() => clearAllFilter()}
          variant="destructive"
          size="sm"
          className="h-8"
        >
          <span>Réinitialiser</span>
          <XIcon className="size-4" />
        </Button>
      </CardHeader>
      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Type d&apos;emploi</Label>
          <div className="grid gap-4">
            {jobTypes.map((job, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(checked) => {
                    handleJobTypeChange(job, checked as boolean);
                  }}
                  id={job}
                  checked={currentJobTypes.includes(job)}
                />
                <Label className="text-sm font-medium capitalize" htmlFor={job}>
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Régions</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dashed capitalize"
              >
                <PlusCircle />
                {currentRegions.length > 0
                  ? currentRegions.length === totalRegions
                    ? "Toutes les régions sont selectionnées"
                    : currentRegions.length < 3
                    ? `Regions: ${currentRegions.join(", ")}`
                    : `${currentRegions.length} regions selected`
                  : "Select Regions"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search Region" />
                <CommandList>
                  <CommandEmpty>Pas de resultats</CommandEmpty>
                  <CommandGroup>
                    <div className="max-h-60 overflow-y-auto">
                      {regionList.map((region) => {
                        const isSelected = currentRegions.includes(
                          region.name.toLowerCase()
                        );
                        return (
                          <CommandItem
                            key={region.code}
                            onSelect={() =>
                              handleRegionChange(region.name, !isSelected)
                            }
                          >
                            <div
                              className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50"
                              }`}
                            >
                              {/* <Check /> */}
                            </div>
                            <span>{region.name}</span>
                          </CommandItem>
                        );
                      })}
                    </div>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
