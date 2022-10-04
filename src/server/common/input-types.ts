import { z } from "zod"

export const RegisterUserInput = z.object({
  name: z.string({ required_error: "Name is required" }).min(1).nullish(),
  email: z.string({ required_error: "Email is required" }).email().min(1),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/,
      {
        message:
          "Password should contain 12 characters and not more than 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    )
    .min(12, { message: "Password should be at least 12 characters" })
    .max(20, { message: "Password should not be more than 20 characters" }),
  user_type: z.string().nullish(),
  image: z.string().nullish(),
  profile: z.object({
    first_name: z.string({ required_error: "First Name is required" }).min(1),
    last_name: z.string({ required_error: "Last Name is required" }).min(1),
    middle_name: z.string().nullish(),
    suffix: z.string().nullish(),
    date_of_birth: z.date().nullish(),
    phone_no: z.string().nullish(),
    gender: z.string().nullish(),
  }),
  address: z
    .object({
      street: z.string().nullish(),
      city: z.string().nullish(),
      state: z.string().nullish(),
      zip: z.string().nullish(),
      country: z.string().nullish(),
      shipping_address: z.string().nullish(),
      billing_address: z.string().nullish(),
    })
    .nullish(),
})

export const EditUserInput = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  email: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  user_type: z.string().optional(),
  image: z.string().optional(),
  profile: z.object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    middle_name: z.string().optional(),
    suffix: z.string().optional(),
    date_of_birth: z.date().optional(),
    phone_no: z.string().optional(),
    gender: z.string().optional(),
  }),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      shipping_address: z.string().optional(),
      billing_address: z.string().optional(),
    })
    .optional(),
})

export const AssetCreateInput = z.object({
  name: z.string(),
  number: z.string(),
  description: z.string().nullish(),
  serial_no: z.string().nullish(),
  project: z.string().nullish(),
  original_cost: z.number().nullish(),
  current_cost: z.number().nullish(),
  residual_value: z.number().nullish(),
  residual_value_percentage: z.number().nullish(),
  status: z.string().nullish(),
  lifetime: z.number().nullish(),
  netbook_value: z.number().nullish(),
  typeId: z.number().nullish(),
  categoryId: z.number().nullish(),
  userId: z.number().nullish(),
  model: z
    .object({
      name: z.string(),
      number: z.string().nullish(),
      brand: z.string().nullish(),
    })
    .nullish(),
  location: z
    .object({
      department: z.string().nullish(),
      floor: z.string().nullish(),
      class: z.string().nullish(),
    })
    .nullish(),
  manufacturerId: z.number().nullish(),
  supplierId: z.number().nullish(),
})

export const AssetEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
  number: z.string().optional(),
  description: z.string().optional(),
  serial_no: z.string().optional(),
  project: z.string().optional(),
  original_cost: z.number().optional(),
  current_cost: z.number().optional(),
  residual_value: z.number().optional(),
  residual_value_percentage: z.number().optional(),
  status: z.string().optional(),
  lifetime: z.number().optional(),
  netbook_value: z.number().optional(),
  typeId: z.number().optional(),
  categoryId: z.number().optional(),
  userId: z.number().optional(),
  model: z
    .object({
      name: z.string(),
      number: z.string().optional(),
      brand: z.string().optional(),
    })
    .optional(),
  location: z
    .object({
      department: z.string().optional(),
      floor: z.string().optional(),
      class: z.string().optional(),
    })
    .optional(),
  manufacturerId: z.number().optional(),
  supplierId: z.number().optional(),
})

export const CategoryCreateInput = z.object({
  name: z.string(),
})

export const CategoryEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
})

export const TypeCreateInput = z.object({
  name: z.string(),
})

export const TypeEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
})

export const ManufacturerCreateInput = z.object({
  name: z.string(),
  vendor: z.string().nullish(),
  type: z.string().nullish(),
  url: z.string().nullish(),
  image: z.string().nullish(),
  email: z.string().nullish(),
  phone_number: z.string().nullish(),
  alt_phone_number: z.string().nullish(),
  fax_number: z.string().nullish(),
  address: z
    .object({
      street: z.string().nullish(),
      city: z.string().nullish(),
      state: z.string().nullish(),
      zip: z.string().nullish(),
      country: z.string().nullish(),
      shipping_address: z.string().nullish(),
      billing_address: z.string().nullish(),
    })
    .nullish(),
})

export const ManufacturerEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
  vendor: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  alt_phone_number: z.string().optional(),
  fax_number: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      shipping_address: z.string().optional(),
      billing_address: z.string().optional(),
    })
    .optional(),
})

export const SupplierCreateInput = z.object({
  name: z.string(),
  vendor: z.string().nullish(),
  type: z.string().nullish(),
  url: z.string().nullish(),
  image: z.string().nullish(),
  email: z.string().nullish(),
  phone_number: z.string().nullish(),
  alt_phone_number: z.string().nullish(),
  fax_number: z.string().nullish(),
  address: z
    .object({
      street: z.string().nullish(),
      city: z.string().nullish(),
      state: z.string().nullish(),
      zip: z.string().nullish(),
      country: z.string().nullish(),
      shipping_address: z.string().nullish(),
      billing_address: z.string().nullish(),
    })
    .nullish(),
})

export const SupplierEditInput = z.object({
  id: z.number(),
  name: z.string().optional(),
  vendor: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  alt_phone_number: z.string().optional(),
  fax_number: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      shipping_address: z.string().optional(),
      billing_address: z.string().optional(),
    })
    .optional(),
})
