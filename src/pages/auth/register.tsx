import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { InputField } from "../../components/atoms/forms/InputField"
import { trpc } from "../../utils/trpc"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import AlertInput from "../../components/atoms/forms/AlertInput"
import { CreateUserInput } from "../../server/schemas/user"
import { generateRandomPass, generateCertificate } from "../../lib/functions"
import { User } from "tabler-icons-react"
import Modal from "../../components/headless/modal/modal"
import DropZoneComponent from "../../components/dropzone/DropZoneComponent"
import { Select } from "@mantine/core"
import { env } from "../../env/client.mjs"
import { DatePicker } from "@mantine/dates"
import { SelectValueType } from "../../components/atoms/select/TypeSelect"
import moment from "moment"
import { ImageJSON } from "../../types/table"
import PasswordChecker from "../../components/atoms/forms/PasswordChecker"

type User = z.infer<typeof CreateUserInput>

const Register2 = () => {
  const [userId, setUserId] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [completeModal, setCompleteModal] = useState<boolean>(false)
  const [passwordCheck, setPassword] = useState<string>("")
  const [certificateCheck, setCertificate] = useState<string>("")
  const [searchValue, onSearchChange] = useState("")
  const [images, setImage] = useState<ImageJSON[]>([])
  const [isLoadingNow, setIsLoading] = useState<boolean>(false)
  const futureDate = new Date()
  futureDate.setFullYear(futureDate.getFullYear() + 1)

  const { mutate, isLoading, error } = trpc.user.create.useMutation({
    onSuccess() {
      setCompleteModal(true)
      // invalidate query of asset id when mutations is successful
      //utils.asset.findAll.invalidate()
    },
  })
  const { data: teams } = trpc.team.findAll.useQuery()

  const teamList = useMemo(() => {
    const list = teams?.teams.map((team) => {
      return { value: team.id.toString(), label: team.name }
    }) as SelectValueType[]
    return list ?? []
  }, [teams]) as SelectValueType[]

  useEffect(() => {
    setUserId(moment().format("YY-MDhms"))
    setCertificate(generateCertificate())
  }, [setUserId, setCertificate])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(CreateUserInput), // Configuration the validation with the zod schema.
    defaultValues: {
      name: "test",
      user_Id: `${env.NEXT_PUBLIC_CLIENT_USER_ID}${userId}`,
      // supervisee: {
      //   name: ""
      // },
      // superviseeId: 0,
      teamId: 0,
      email: "",
      hired_date: new Date(),
      position: "",
      address: {
        city: "",
        country: "",
        street: "",
        zip: "",
      },
      profile: {
        first_name: "",
        middle_name: "",
        last_name: "",
        image: "",
      },
      validateTable: {
        certificate: "",
        validationDate: futureDate,
      },
      firstLogin: true,
      password: "",
    },
  })

  // The onSubmit function is invoked by RHF only if the validation is OK.
  const onSubmit = async (user: User) => {
    console.log("ewaaaa"),
      // Register function
      mutate({
        firstLogin: true,
        name: `${user.profile.first_name} ${user.profile.last_name}`,
        user_type: "user",
        image: "",
        oldPassword: user.oldPassword,
        password: passwordCheck,
        user_Id: env.NEXT_PUBLIC_CLIENT_USER_ID + userId,
        teamId: user.teamId,
        hired_date: new Date(),
        position: user.position,
        profile: {
          first_name: user.profile.first_name,
          middle_name: user.profile.middle_name,
          last_name: user.profile.last_name,
          image: images[0]?.file ?? "",
        },
        email: user.email,
        address: {
          city: user.address?.city,
          country: user.address?.country,
          street: user.address?.street,
          zip: user.address?.zip,
        },
        inactivityDate: new Date(),
        passwordAge: new Date(),
        validateTable: {
            certificate: certificateCheck,
            validationDate: futureDate,
          },
      }),
    console.log("Cert: " + certificateCheck)
    console.log(user.validateTable)
    reset()
  }

  return (
    <main className="container mx-auto flex flex-col justify-center p-4">
      <h3 className="mb-2 bg-gradient-to-r from-yellow-400 via-tangerine-200 to-yellow-500 bg-clip-text text-xl font-bold leading-normal text-transparent md:text-[2rem]">
        Register
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
        noValidate
      >
        <div className="flex w-full flex-wrap gap-4 py-2.5">
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">First Name</label>
            <InputField
              register={register}
              name="profile.first_name"
              type={"text"}
              label={""}
            />
            <AlertInput>{errors?.profile?.first_name?.message}</AlertInput>
          </div>
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">Middle Name (Optional)</label>
            <InputField
              type={"text"}
              label={""}
              name={"profile.middle_name"}
              register={register}
            />
          </div>
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">Last Name</label>
            <InputField
              type={"text"}
              label={""}
              name={"profile.last_name"}
              register={register}
            />
            <AlertInput>{errors?.profile?.last_name?.message}</AlertInput>
          </div>
        </div>

        {/* <InputField
            label="Password"
            register={register}
            name="password"
            type="password"
            className="border-b"
            withIcon="fa-solid fa-eye"
            isPassword={true}
          />
          <PasswordChecker password={watch().password} /> */}
        <div className="flex flex-wrap gap-4 py-2.5">
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">Team</label>
            <Select
              placeholder="Pick one"
              onChange={(value) => {
                setValue("teamId", Number(value) ?? 0)
                onSearchChange(value ?? "")
              }}
              value={searchValue}
              data={teamList}
              styles={(theme) => ({
                item: {
                  // applies styles to selected item
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor:
                        theme.colorScheme === "light"
                          ? theme.colors.orange[3]
                          : theme.colors.orange[1],
                      color:
                        theme.colorScheme === "dark"
                          ? theme.white
                          : theme.black,
                    },
                  },

                  // applies styles to hovered item (with mouse or keyboard)
                  "&[data-hovered]": {},
                },
              })}
              variant="unstyled"
              className="mt-2 w-full rounded-md border-2 border-gray-400 bg-transparent px-2 py-0.5 text-gray-600 outline-none  ring-tangerine-400/40 focus:border-tangerine-400 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">User Number</label>
            {/* <InputField
              disabled
              label={""}
              type={"text"}
              placeholder={(
                env.NEXT_PUBLIC_CLIENT_USER_ID + userId
              ).toString()}
              value={(env.NEXT_PUBLIC_CLIENT_USER_ID + userId).toString()}
              name={"user_Id"}
              register={register}
            /> */}
            <p className="mt-2 w-full rounded-md border-2 border-gray-400 bg-transparent px-4 py-2 text-gray-600 outline-none  ring-tangerine-400/40 focus:border-tangerine-400 focus:outline-none focus:ring-2">
              {`${env.NEXT_PUBLIC_CLIENT_USER_ID}`}
              {userId}
            </p>
          </div>
          <div className="flex w-[32%] flex-col">
            <label className="sm:text-sm">Designation / Position</label>
            <InputField
              type={"text"}
              label={""}
              name={"position"}
              register={register}
            />

            <AlertInput>{errors?.position?.message}</AlertInput>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 py-2.5">
          <div className="flex w-[49%] flex-col">
            <label className="sm:text-sm">Email</label>
            <InputField
              // disabled={!editable}
              type={"text"}
              label={""}
              name={"email"}
              register={register}
              placeholder={"--@email.com"}
            />
            <AlertInput>{errors?.email?.message}</AlertInput>
          </div>
          <div className="flex w-[49%] flex-col">
            <label className="sm:text-sm">Departmemt</label>
            {/* <InputField
              // placeholder={props.employee?.department}
              type={"text"}
              // disabled={!editable}
              label={""}
              value={props.employee?.team?.department?.name}
              name={"department"}
              register={register}
            /> */}
            <p className="my-2 w-full rounded-md border-2 border-gray-400 bg-transparent px-4 py-2 text-gray-600 outline-none  ring-tangerine-400/40 focus:border-tangerine-400 focus:outline-none focus:ring-2">
              {"--"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 py-2.5">
          <div className="flex flex-col sm:w-1/3 md:w-[49%]">
            <label className="sm:text-sm ">Hired Date</label>
            {/* <InputField
            className= appearance-none border  border-black py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-outline"
            type={"text"}
          /> */}
            <DatePicker
              dropdownType="modal"
              placeholder="Pick Date"
              size="sm"
              variant="unstyled"
              value={date}
              onChange={(value) => {
                setValue("hired_date", value)
                value === null ? setDate(new Date()) : setDate(value)
              }}
              className="my-2 w-full rounded-md border-2 border-gray-400 bg-transparent p-0.5 px-4 text-gray-600 outline-none  ring-tangerine-400/40 focus:border-tangerine-400 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex w-[49%] flex-col">
            <label className="mb-2 sm:text-sm">Mobile Number</label>
            <input
              type="number"
              className="my-2 w-full rounded-md border-2 border-gray-400 bg-transparent px-4 py-2 text-gray-600 outline-none  ring-tangerine-400/40 placeholder:text-sm focus:border-tangerine-400 focus:outline-none focus:ring-2"
              onKeyDown={(e) => {
                if (e.key === "e") {
                  e.preventDefault()
                }
              }}
              onChange={(event) => {
                if (event.target.value.length > 11) {
                  console.log("more than 11")
                  event.target.value = event.target.value.slice(0, 11)
                }
                setValue(
                  "profile.phone_no",
                  event.currentTarget.value.toString()
                )
              }}
            />
            <AlertInput>{errors?.profile?.phone_no?.message}</AlertInput>
          </div>
          <div className="flex w-full flex-wrap gap-4 py-2.5">
            <div className="flex w-[18.4%] flex-col">
              <label className="sm:text-sm">Street</label>
              <InputField
                type={"text"}
                label={""}
                name="address.street"
                register={register}
              />
            </div>
            <div className="flex w-[18.4%] flex-col">
              <label className="sm:text-sm">Barangay</label>
              <InputField
                type={"text"}
                label={""}
                name={"address.state"}
                register={register}
              />

              <AlertInput>{errors?.address?.state?.message}</AlertInput>
            </div>
            <div className="flex w-[18.4%] flex-col">
              <label className="sm:text-sm">City</label>
              <InputField
                type={"text"}
                label={""}
                name={"address.city"}
                register={register}
              />

              <AlertInput>{errors?.address?.city?.message}</AlertInput>
            </div>
            <div className="flex w-[18.4%] flex-col">
              <label className="sm:text-sm">Zip Code</label>
              <InputField
                type={"text"}
                label={""}
                name={"address.zip"}
                register={register}
              />
              <AlertInput>{errors?.address?.zip?.message}</AlertInput>
            </div>
            <div className="flex w-[18.4%] flex-col">
              <label className="sm:text-sm">Country</label>
              <InputField
                type={"text"}
                label={""}
                name={"address.country"}
                register={register}
              />

              <AlertInput>{errors?.address?.country?.message}</AlertInput>
            </div>
          </div>
        </div>

        <DropZoneComponent
          setImage={setImage}
          setIsLoading={setIsLoading}
          images={images}
          isLoading={isLoadingNow}
          acceptingMany={false}
        />
        <AlertInput>{errors?.password?.message}</AlertInput>
        <button
          type="submit"
          className="rounded bg-tangerine-500 px-4 py-1 font-medium text-white duration-150 hover:bg-tangerine-400 disabled:bg-gray-300 disabled:text-gray-500"
          disabled={isLoading}
          onClick={() => setPassword(generateRandomPass())}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && (
        <pre className="mt-2 text-sm italic text-red-500">
          Something went wrong!
          {JSON.stringify({ error, errors }, null, 2)}
        </pre>
      )}

      <Modal
        isVisible={completeModal}
        setIsVisible={setCompleteModal}
        className="max-w-2xl"
        title="New Account"
      >
        <div className="flex w-full flex-col px-4 py-2">
          <div>
            <p className="text-center text-lg font-semibold">
              New account registration successful.
            </p>

            <p className="text-center text-lg font-semibold">
              Password: {passwordCheck}
            </p>
          </div>
          <button
            className="rounded bg-tangerine-500 px-4 py-1 font-medium text-white duration-150 hover:bg-tangerine-400 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={() => {
              setCompleteModal(false)
              setUserId(moment().format("YY-MDhms"))
              setCertificate(generateCertificate())
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </main>
  )
}

export default Register2
