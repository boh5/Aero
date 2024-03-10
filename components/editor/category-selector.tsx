"use client"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"
import { Check } from "lucide-react"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { categorySchema } from "@/lib/validations/category"
import { postPublishSchema } from "@/lib/validations/post"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type postPatchData = z.infer<typeof postPublishSchema>

interface CategorySelectorProps extends PopoverProps {
  form: UseFormReturn<Pick<postPatchData, "category_id">>
  field: ControllerRenderProps<Pick<postPatchData, "category_id">>
  categories: z.infer<typeof categorySchema>[]
}

export async function CategorySelector({
  field,
  form,
  categories,
  ...props
}: CategorySelectorProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between md:max-w-[200px] lg:max-w-[300px]"
          >
            {field.value
              ? categories.find((category) => category.id === field.value)?.name
              : "Set a category..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                value={category.name}
                key={category.id}
                onSelect={() => {
                  form.setValue("category_id", category.id)
                }}
              >
                {category.name}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    field.value === category.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
