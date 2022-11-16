import { z } from "zod"
import { AssetCreateInput } from "../src/server/schemas/asset"
import { EmployeeCreateInput } from "../src/server/schemas/employee"
import { LocationCreateInput } from "../src/server/schemas/location"
import { CreateUserInput } from "../src/server/schemas/user"
import { VendorCreateInput } from "../src/server/schemas/vendor"

export const userSeed: z.infer<typeof CreateUserInput>[] = [
  {
    name: "John Allen Delos Reyes",
    email: "jdelosreyes@fas.com",
    password: "##EHQ5cjR26=+B1PjjhV",
    user_type: "admin",
    profile: {
      first_name: "John Allen",
      last_name: "Delos Reyes",
      middle_name: "Redobla",
      date_of_birth: new Date(2000, 4, 20),
      gender: "Male",
      phone_no: "09954135867",
    },
    address: {
      street: "Blk 21 Lot 13",
      state: "Pulanglupa Uno",
      city: "Las Piñas City",
      country: "Philippines",
      zip: "1742",
    },
  },
  {
    name: "Clea Bernadette Payra",
    email: "cpayra@fas.com",
    password: "47MaD0A1QG9zY82YvtCw",
    user_type: "admin",
    profile: {
      first_name: "Clea Bernadette",
      last_name: "Payra",
      middle_name: "Domingo",
      date_of_birth: new Date(2000, 3, 19),
      gender: "Female",
      phone_no: "09457905387",
    },
    address: {
      street: "2206 Alacalde St.",
      state: "Brgy. 148",
      city: "City of Manila",
      country: "Philippines",
      zip: "1013",
    },
  },
  {
    name: "Franz Arvae Ignacio",
    email: "fignacio@fas.com",
    password: "8SapBWn3JCOTpET2ktfv",
    user_type: "admin",
    profile: {
      first_name: "Franz Arvae",
      last_name: "Ignacio",
      middle_name: "Montemayor",
      date_of_birth: new Date(2000, 4, 6),
      gender: "Male",
      phone_no: "09292045190",
    },
    address: {
      street: "Kapitan Tiago St.",
      state: "Acacia",
      city: "Malabon City",
      country: "Philippines",
      zip: "1474",
    },
  },
  {
    name: "Kevin Ralph Lauren Paular",
    email: "kpaular@fas.com",
    password: "$qZWvsyC@jaNvcA42=g9",
    user_type: "admin",
    profile: {
      first_name: "Kevin Ralph Lauren",
      last_name: "Paular",
      middle_name: "Butal",
      date_of_birth: new Date(1999, 8, 5),
      gender: "Male",
      phone_no: "09480494983",
    },
    address: {
      street: "Pelaez",
      state: "San Dionisio",
      city: "Parañaque City",
      country: "Philippines",
      zip: "1700",
    },
  },
  {
    name: "Klark Jasper Sisperez",
    email: "ksisperez@fas.com",
    password: "HCuzynjOeJKNNjpHq!=W",
    user_type: "admin",
    profile: {
      first_name: "Klark Jasper",
      last_name: "Sisperez",
      middle_name: "Peña",
      date_of_birth: new Date(1999, 8, 20),
      gender: "Male",
      phone_no: "09274974004",
    },
    address: {
      street: "Pilapil",
      state: "Brgy. 75",
      city: "City of Manila",
      country: "Philippines",
      zip: "1012",
    },
  },
]

export const employeeSeed: z.infer<typeof EmployeeCreateInput>[] = [
  {
    name: "John Allen Delos Reyes",
    email: "jdelosreyes@fas.com",
    employee_id: "EMP-01",
    position: "IT Manager",
    hired_date: new Date(2022, 7, 13),
    profile: {
      first_name: "John Allen",
      last_name: "Delos Reyes",
      middle_name: "Redobla",
      date_of_birth: new Date(2000, 4, 20),
      gender: "Male",
      phone_no: "09954135867",
    },
    address: {
      street: "Blk 21 Lot 13",
      state: "Pulanglupa Uno",
      city: "Las Piñas City",
      country: "Philippines",
      zip: "1742",
    },
  },
  {
    name: "Clea Bernadette Payra",
    email: "cpayra@fas.com",
    employee_id: "EMP-02",
    position: "Principal UI/UX Designer",
    hired_date: new Date(2022, 7, 13),
    profile: {
      first_name: "Clea Bernadette",
      last_name: "Payra",
      middle_name: "Domingo",
      date_of_birth: new Date(2000, 3, 19),
      gender: "Female",
      phone_no: "09457905387",
    },
    address: {
      street: "2206 Alacalde St.",
      state: "Brgy. 148",
      city: "City of Manila",
      country: "Philippines",
      zip: "1013",
    },
  },
  {
    name: "Franz Arvae Ignacio",
    email: "fignacio@fas.com",
    employee_id: "EMP-03",
    position: "Senior Web Developer",
    hired_date: new Date(2022, 7, 13),
    profile: {
      first_name: "Franz Arvae",
      last_name: "Ignacio",
      middle_name: "Montemayor",
      date_of_birth: new Date(2000, 4, 6),
      gender: "Male",
      phone_no: "09292045190",
    },
    address: {
      street: "Kapitan Tiago St.",
      state: "Acacia",
      city: "Malabon City",
      country: "Philippines",
      zip: "1474",
    },
  },
  {
    name: "Kevin Ralph Lauren Paular",
    email: "kpaular@fas.com",
    employee_id: "EMP-04",
    position: "Senior Mobile Developer",
    hired_date: new Date(2022, 7, 13),
    profile: {
      first_name: "Kevin Ralph Lauren",
      last_name: "Paular",
      middle_name: "Butal",
      date_of_birth: new Date(1999, 8, 5),
      gender: "Male",
      phone_no: "09480494983",
    },
    address: {
      street: "Pelaez",
      state: "San Dionisio",
      city: "Parañaque City",
      country: "Philippines",
      zip: "1700",
    },
  },
  {
    name: "Klark Jasper Sisperez",
    email: "ksisperez@fas.com",
    employee_id: "EMP-05",
    position: "Senior Software Engineer",
    hired_date: new Date(2022, 7, 13),
    profile: {
      first_name: "Klark Jasper",
      last_name: "Sisperez",
      middle_name: "Peña",
      date_of_birth: new Date(1999, 8, 20),
      gender: "Male",
      phone_no: "09274974004",
    },
    address: {
      street: "Pilapil",
      state: "Brgy. 75",
      city: "City of Manila",
      country: "Philippines",
      zip: "1012",
    },
  },
]

export const classSeed: { name: string }[] = [
  { name: "Techonology" },
  { name: "Utitility" },
]

export const categorySeed: { name: string }[] = [
  { name: "Hardware" },
  { name: "Software" },
  { name: "Emergency" },
  { name: "Essentials" },
]

export const typeSeed: { name: string }[] = [
  { name: "Laptop" },
  { name: "Computer" },
  { name: "Application" },
  { name: "Fire Extinguisher" },
  { name: "Camera" },
]


export const projectSeed: { name: string }[] = [
  { name: "BSP" },
  { name: "CAD" },
  { name: "FAS" },
]

export const locationSeed: z.infer<typeof LocationCreateInput>[] = [
  {
    floor: "1st",
    room: "101",
  },
  {
    floor: "2nd",
    room: "201",
  },
  {
    floor: "3rd",
    room: "301",
  },
  {
    floor: "4th",
    room: "401",
  },
  {
    floor: "5th",
    room: "501",
  },
]

export const vendorSeed: z.infer<typeof VendorCreateInput>[] = [
  {
    name: "Dell",
    email: "vendor@dell.com",
    phone_no: ["09123456789"],
    fax_no: "123456789",
    type: "Manufacturer",
    website: "dell.com",
    remarks: "Good vendor",
    address: {
      street: "Blk 21 Lot 13",
      state: "Pulanglupa Uno",
      city: "Las Piñas City",
      country: "Philippines",
      zip: "1742",
    },
  },
  {
    name: "Asus",
    email: "vendor@asus.com",
    phone_no: ["09123456789"],
    fax_no: "123456789",
    type: "Supplier",
    website: "asus.com",
    remarks: "Very good vendor",
    address: {
      street: "2206 Alacalde St.",
      state: "Brgy. 148",
      city: "City of Manila",
      country: "Philippines",
      zip: "1013",
    },
  },
  {
    name: "Allen Computer and Repair",
    email: "vendor@allen.com",
    phone_no: ["09954135867", "09292045190"],
    fax_no: "123456789",
    type: "Servicing",
    website: "allen.com",
    remarks: "Very bad vendor",
    address: {
      street: "Pelaez",
      state: "San Dionisio",
      city: "Parañaque City",
      country: "Philippines",
      zip: "1700",
    },
  },
]

export const assetSeed: z.infer<typeof AssetCreateInput>[] = [
  {
    name: "Dell Inspiron 15 3000",
    serial_no: "123456789",
    number: "THL-001",
    description: "lorem ipsum",
    barcode: "THL-001",
    custodianId: 1,
    locationId: 1,
    vendorId: 1,
    model: {
      name: "Inspiron 15 3000",
      brand: "Dell",
      number: "15 3000",
      classId: 1,
      categoryId: 1,
      typeId: 1,
    },
    management: {
      currency: "PHP",
      current_cost: 20000,
      original_cost: 20000,
      residual_value: 10000,
      purchase_date: new Date(),
      depreciation_status: "Active",
      depreciation_rule: "Straight Line",
      depreciation_period: 5,
      depreciation_start: new Date(),
      depreciation_end: new Date(),
    },
  },
  {
    name: "Auros M15",
    serial_no: "123456789",
    number: "THC-002",
    description: "lorem ipsum",
    barcode: "THC-002",
    custodianId: 1,
    locationId: 1,
    vendorId: 1,
    model: {
      name: "Auros M15",
      brand: "Auros",
      number: "M15",
      classId: 1,
      categoryId: 1,
      typeId: 2,
    },
    management: {
      currency: "PHP",
      current_cost: 20000,
      original_cost: 20000,
      residual_value: 10000,
      purchase_date: new Date(),
      depreciation_status: "Active",
      depreciation_rule: "Straight Line",
      depreciation_period: 5,
      depreciation_start: new Date(),
      depreciation_end: new Date(),
    },
  },
  {
    name: "EPSON L3110",
    serial_no: "123456789",
    number: "THC-003",
    description: "lorem ipsum",
    barcode: "THC-003",
    custodianId: 4,
    locationId: 2,
    vendorId: 3,
    model: {
      name: "EPSON L3110",
      brand: "EPSON",
      number: "L3110",
      classId: 1,
      categoryId: 1,
      typeId: 2,
    },
    management: {
      currency: "PHP",
      current_cost: 20000,
      original_cost: 20000,
      residual_value: 10000,
      purchase_date: new Date(),
      depreciation_status: "Active",
      depreciation_rule: "Straight Line",
      depreciation_period: 5,
      depreciation_start: new Date(),
      depreciation_end: new Date(),
    },
  },
]
