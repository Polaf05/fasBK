import type { UseFormRegister } from "react-hook-form/dist/types"

type InputFieldType = {
  label: string
  name: string
  type?: string
  className?: string
  withIcon?: string
  register: UseFormRegister<any>
}

export function InputField({
  label,
  name,
  type,
  className,
  withIcon,
  register,
}: InputFieldType) {
  return (
    <div className="text-gray-700">
      <div className="relative z-0 flex">
        <div className="flex-1">
          <input
            type={type}
            id={name}
            {...register(name)}
            className={
              className
                ? className +
                  " block py-2.5 px-0 w-full peer text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-tangerine-500 focus:outline-none focus:ring-0 peer"
                : "outline-none focus:outline-none focus:ring-2 ring-amber-200/40 px-4 py-2 rounded-md border-2  bg-transparent border-gray-400 focus:border-amber-200 text-gray-600"
            }
            placeholder=" "
          />
          <label
            htmlFor={name}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-tangerine-600 peer-focus:dark:text-tangerine-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {label}
          </label>
          <div className="peer-focus:text-tangerine-500 text-gray-400 absolute inset-0 pointer-events-none flex justify-end items-center pt-2">
            <i className={withIcon}></i>
          </div>
        </div>
      </div>
    </div>
  )
}
