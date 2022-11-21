import { AssetType, EmployeeType, VendorType } from "../types/generic"
import * as XLSX from "xlsx"
import { ExcelExportType } from "../types/employee"
import { Address, Company } from "@prisma/client"

export const getProperty = (
  filter: string,
  type: AssetType | EmployeeType | VendorType
  // subfilter?: string
) => {
  //get object property
  const property =
    Object.getOwnPropertyDescriptor(type, filter)?.value ?? "No value"

  //returns the actual property as string
  if (typeof property === "string" || typeof property === "number")
    return property.toString()

  //dig deeper if obj is an actual obj
  return property
    ? Object.getOwnPropertyDescriptor(property, "name")?.value
    : "No Value"

  // Allen's approach
  // if (typeof type?.[filter as keyof typeof type] === "object") {
  //   return (
  //     (
  //       type?.[filter as keyof typeof type] as unknown as Record<
  //         string,
  //         unknown
  //       >
  //     )?.name ?? "No value"
  //   )
  // }

  // return type?.[filter as keyof typeof type] ?? "No value"
}

export const getName = (filter: string, type: EmployeeType) => {
  return filter === "first_name"
    ? Object.getOwnPropertyDescriptor(type?.profile, "first_name")?.value
    : filter === "middle_name"
    ? Object.getOwnPropertyDescriptor(type?.profile, "middle_name")?.value
    : Object.getOwnPropertyDescriptor(type?.profile, "last_name")?.value
}

export const getAddress = (
  type:
    | EmployeeType
    | (Company & {
        address: Address | null
      })
) => {
  return `${type?.address?.street}, ${type?.address?.state}, ${type?.address?.city}, ${type?.address?.country} `
}

export const formatBytes = (bytes: number) => {
  if (!+bytes) return "0 Bytes"

  const k = 1024
  const dm = 2
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const downloadExcel = (data: ExcelExportType[]) => {
  // if (!data) {
  // csv null fall back
  const worksheet = XLSX.utils.json_to_sheet(data ?? [])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, "DataSheet.xlsx")
  // }

  return
}
