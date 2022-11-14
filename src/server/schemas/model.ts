import { z } from "zod"

export const AssetClassCreateInput = z.object({
  name: z.string(),
})

export const AssetTypeCreateInput = z.object({
  name: z.string(),
})

export const AssetCategoryInput = z.object({
  name: z.string(),
})

export const ModelCreateInput = z.object({
  name: z.string(),
  brand: z.string().optional(),
  number: z.string().optional(),

  asset_class: AssetClassCreateInput.optional(),
  assetClassId: z.number().optional(),
  asset_category: AssetCategoryInput.optional(),
  assetCategoryId: z.number().optional(),
  asset_type: AssetTypeCreateInput.optional(),
  assetTypeId: z.number().optional(),
})

export const ModelEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
  brand: z.string().optional(),
  number: z.string().optional(),

  asset_class: AssetClassCreateInput.optional(),
  assetClassId: z.number().optional(),
  asset_category: AssetCategoryInput.optional(),
  assetCategoryId: z.number().optional(),
  asset_type: AssetTypeCreateInput.optional(),
  assetTypeId: z.number().optional(),
})
