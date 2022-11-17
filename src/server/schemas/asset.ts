import { z } from "zod"
import { ManagementCreateInput, ModelCreateInput } from "./model"

export const AssetCreateInput = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string(),
  alt_number: z.string(),
  serial_no: z.string().nullish(),
  barcode: z.string().nullish(),
  description: z.string().nullish(),
  remarks: z.string().nullish(),

  model: ModelCreateInput,
  custodianId: z.number().optional(),
  locationId: z.number().optional(),
  vendorId: z.number().optional(),
  subsidiaryId: z.number().optional(),
  projectId: z.number().optional(),
  parentId: z.number().optional(),
  management: ManagementCreateInput,
})
