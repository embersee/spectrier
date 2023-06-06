"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { User } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross2Icon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { Product } from "@/lib/db/schema";
import { DataTableRowActions } from "./data-table-row-action";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { userSchema } from "./table-data/schema";
// import { UserForm } from "@table/table-data/schema";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("createdAt") as Date).toDateString()}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },

  // {
  //   accessorKey: "signed",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Редактировать" />
  //   ),
  //   cell: ({ row }) => {
  //     const { data: curators } = api.user.getAllCurators.useQuery();
  //     const { data: eduNames } = api.form.getEduNames.useQuery();
  //     const { data: aprentNames } = api.form.getApreticeshipNames.useQuery();

  //     const trpcClient = api.useContext();

  //     const {
  //       control,
  //       register,
  //       handleSubmit,
  //       watch,
  //       formState: { errors },
  //     } = useForm<UserForm>({
  //       resolver: zodResolver(userSchema),
  //       defaultValues: {
  //         FIO: row.original.FIO!,
  //         phonenumber: row.original.phonenumber!,
  //         curator: row.original.curator!,
  //         eduName: row.original.eduName!,
  //         specialty: row.original.specialty!,
  //         year: row.original.year!,
  //         apprenticeshipType: row.original.apprenticeshipType!,

  //         confirmed: row.original.confirmed!,
  //         signedNapravlenie: row.original.signedNapravlenie!,
  //         signedOtchet: row.original.signedOtchet!,
  //       },
  //     });

  //     const { mutate } = api.admin.editUser.useMutation({
  //       onMutate: () => {
  //         toast.loading("Редактируется...", {
  //           id: "form",
  //           style: {
  //             borderRadius: "10px",
  //             background: "#1E1E2A", //#1E1E2A
  //             color: "#fff",
  //           },
  //         });
  //       },
  //       onError: (error) => {
  //         toast.error(error.message, {
  //           id: "form",
  //           icon: "🥲",
  //           style: {
  //             borderRadius: "10px",
  //             background: "#F43F5E",
  //             color: "#fff",
  //           },
  //           duration: 10000,
  //         });
  //       },
  //       onSuccess: (data) => {
  //         toast.success(`Сохранено!`, {
  //           id: "form",
  //           icon: "👏",
  //           style: {
  //             borderRadius: "10px",
  //             background: "#22C55E",
  //             color: "#fff",
  //           },
  //         });
  //         trpcClient.user.getAllUsers.refetch();
  //       },
  //     });

  //     const onSubmit = (data: UserForm) => {
  //       data.telegramId = row.original.telegramID as string;
  //       console.log(JSON.stringify(data, null, 4));
  //       mutate(data);
  //     };

  //     return (
  //       <div className="flex space-x-2">
  //         <Sheet>
  //           <SheetTrigger asChild>
  //             <Button variant="outline">Редактировать</Button>
  //           </SheetTrigger>
  //           <SheetContent position="right" size="default">
  //             <SheetHeader>
  //               <SheetTitle>Редактировать студента</SheetTitle>
  //               <SheetDescription>
  //                 Делайте все изменения данных студента здесь, после нужно
  //                 нажать на кнопку сохранить.
  //               </SheetDescription>
  //             </SheetHeader>
  //             <form
  //               className="grid gap-4 py-4"
  //               onSubmit={handleSubmit(onSubmit)}
  //             >
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="name" className="text-right">
  //                   ФИО
  //                 </Label>
  //                 <Input
  //                   id="name"
  //                   className="col-span-3"
  //                   {...register("FIO")}
  //                 />
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="username" className="text-right">
  //                   Telegram
  //                 </Label>
  //                 <Input
  //                   id="username"
  //                   className="col-span-3"
  //                   disabled
  //                   value={row.original.name!}
  //                 />
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="phone" className="text-right">
  //                   Номер телефона
  //                 </Label>
  //                 <Input
  //                   id="phone"
  //                   className="col-span-3"
  //                   {...register("phonenumber")}
  //                 />
  //               </div>
  //               {errors.FIO && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="start" className="text-right">
  //                   Начало
  //                 </Label>
  //                 <Input
  //                   id="start"
  //                   value={row.original.startdate?.toLocaleDateString()}
  //                   className="col-span-3"
  //                   disabled
  //                 />
  //               </div>
  //               {errors.phonenumber && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="end" className="text-right">
  //                   Конец
  //                 </Label>
  //                 <Input
  //                   id="end"
  //                   value={row.original.enddate?.toLocaleDateString()}
  //                   className="col-span-3"
  //                   disabled
  //                 />
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="curator" className="text-right">
  //                   Куратор
  //                 </Label>
  //                 <div className="col-span-3">
  //                   <Controller
  //                     control={control}
  //                     name="curator"
  //                     render={({ field }) => (
  //                       <Select
  //                         defaultValue={row.original.curator || "Выберете..."}
  //                         onValueChange={(data: any) => field.onChange(data)}
  //                       >
  //                         <SelectTrigger
  //                           className=" bg-white"
  //                           value={field.value}
  //                         >
  //                           <SelectValue placeholder="Выбрать..." />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                           {curators?.map((item) => (
  //                             <SelectItem
  //                               key={item.id}
  //                               value={item.FIO as string}
  //                             >
  //                               {item.FIO}
  //                             </SelectItem>
  //                           ))}
  //                         </SelectContent>
  //                       </Select>
  //                     )}
  //                   />
  //                 </div>
  //               </div>
  //               {errors.curator && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="edu" className="text-right">
  //                   Учебное учереждение
  //                 </Label>
  //                 <div className="col-span-3">
  //                   <Controller
  //                     control={control}
  //                     name="eduName"
  //                     render={({ field }) => (
  //                       <Select
  //                         defaultValue={row.original.eduName || "Выберете..."}
  //                         onValueChange={(data: any) => field.onChange(data)}
  //                       >
  //                         <SelectTrigger
  //                           className="bg-white"
  //                           value={field.value}
  //                           placeholder="Выберете..."
  //                         >
  //                           <SelectValue
  //                             placeholder={
  //                               <span className="text-primary-500">
  //                                 Выберете...
  //                               </span>
  //                             }
  //                           />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                           {eduNames?.map((item) => (
  //                             <SelectItem
  //                               key={item.id}
  //                               value={item.name as string}
  //                             >
  //                               {item.name}
  //                             </SelectItem>
  //                           ))}
  //                         </SelectContent>
  //                       </Select>
  //                     )}
  //                   />
  //                 </div>
  //               </div>
  //               {errors.eduName && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="spec" className="text-right">
  //                   Специальность
  //                 </Label>
  //                 <Input
  //                   id="spec"
  //                   className="col-span-3"
  //                   {...register("specialty")}
  //                 />
  //               </div>
  //               {errors.specialty && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="year" className="text-right">
  //                   Курс
  //                 </Label>
  //                 <Input
  //                   id="year"
  //                   className="col-span-3"
  //                   {...register("year")}
  //                 />
  //               </div>
  //               {errors.year && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label htmlFor="type" className="text-right">
  //                   Вид практики
  //                 </Label>
  //                 <div className="col-span-3">
  //                   <Controller
  //                     control={control}
  //                     name="apprenticeshipType"
  //                     render={({ field }) => (
  //                       <Select
  //                         onValueChange={(data: any) => field.onChange(data)}
  //                         defaultValue={
  //                           row.original.apprenticeshipType || "Выберете..."
  //                         }
  //                       >
  //                         <SelectTrigger
  //                           className=" bg-white"
  //                           value={field.value}
  //                         >
  //                           <SelectValue placeholder="Выбрать..." />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                           {aprentNames?.map((item) => (
  //                             <SelectItem
  //                               key={item.id}
  //                               value={item.name as string}
  //                             >
  //                               {item.name}
  //                             </SelectItem>
  //                           ))}
  //                         </SelectContent>
  //                       </Select>
  //                     )}
  //                   />
  //                 </div>
  //               </div>
  //               {errors.apprenticeshipType && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}

  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label
  //                   htmlFor="confirmed"
  //                   className=" text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  //                 >
  //                   Подтвержден
  //                 </Label>
  //                 <Controller
  //                   control={control}
  //                   name="confirmed"
  //                   render={({ field }) => (
  //                     <Checkbox
  //                       id="confirmed"
  //                       className="col-span-3"
  //                       checked={field.value}
  //                       onCheckedChange={field.onChange}
  //                     />
  //                   )}
  //                 />
  //               </div>
  //               {errors.confirmed && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label
  //                   htmlFor="podpisNapr"
  //                   className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  //                 >
  //                   Направление подписано
  //                 </Label>
  //                 <Controller
  //                   control={control}
  //                   name="signedNapravlenie"
  //                   render={({ field }) => (
  //                     <Checkbox
  //                       id="podpisNapr"
  //                       className="col-span-3"
  //                       checked={field.value}
  //                       onCheckedChange={field.onChange}
  //                     />
  //                   )}
  //                 />
  //               </div>
  //               {errors.signedNapravlenie && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //               <div className="grid grid-cols-4 items-center gap-4">
  //                 <Label
  //                   htmlFor="otchet"
  //                   className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  //                 >
  //                   Отчет подписан
  //                 </Label>
  //                 <Controller
  //                   control={control}
  //                   name="signedOtchet"
  //                   render={({ field }) => (
  //                     <Checkbox
  //                       id="otchet"
  //                       className="col-span-3"
  //                       checked={field.value}
  //                       onCheckedChange={field.onChange}
  //                     />
  //                   )}
  //                 />
  //               </div>
  //               {errors.signedOtchet && (
  //                 <span className="text-red-500">Это поле обязательное!</span>
  //               )}
  //             </form>
  //             <SheetFooter>
  //               <SheetClose asChild>
  //                 <Button type="submit" onClick={() => onSubmit(watch())}>
  //                   Сохранить изменения
  //                 </Button>
  //               </SheetClose>
  //             </SheetFooter>
  //           </SheetContent>
  //         </Sheet>
  //       </div>
  //     );
  //   },
  // },
];
