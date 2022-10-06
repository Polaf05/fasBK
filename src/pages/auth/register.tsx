import Head from "next/head";
import Link from "next/link";
import React from "react";
import { z } from "zod";
import { InputField } from "../../components/atoms/forms/InputField";
import { trpc } from "../../utils/trpc";
import { RegisterUserInput } from "../../server/common/input-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AlertInput from "../../components/atoms/forms/AlertInput";
import PasswordChecker from "../../components/atoms/forms/PasswordChecker";

// TODO input validations
type User = z.infer<typeof RegisterUserInput>;

const Register = () => {
  const { mutate, isLoading, error } = trpc.auth.register.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(RegisterUserInput), // Configuration the validation with the zod schema.
    defaultValues: {
      name: "amogus",
      profile: {
        first_name: "",
        last_name: "",
      },
      password: "",
    },
  });

  // The onSubmit function is invoked by RHF only if the validation is OK.
  const onSubmit = async (user: User) => {
    // Register function
    mutate({
      password: user.password,
      name: `${user.profile.first_name} ${user.profile.last_name}`,
      profile: {
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,
      },
    });
    reset();
  };

  return (
    <>
      <Head>
        <title>FAS Server</title>
        <meta name="description" content="Fixed Asset System server" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <h3 className="text-xl md:text-[2rem] leading-normal font-bold text-gray-700 mb-2">
          Register
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
          noValidate
        >
          <InputField
            register={register}
            label="First Name"
            name="profile.first_name"
            className="border-b"
          />
          <AlertInput>{errors?.profile?.first_name?.message}</AlertInput>

          <InputField
            register={register}
            label="Last Name"
            name="profile.last_name"
            className="border-b"
          />
          <AlertInput>{errors?.profile?.last_name?.message}</AlertInput>

          <InputField
            label="Password"
            register={register}
            name="password"
            type="password"
            className="border-b"
            withIcon="fa-solid fa-eye"
            isPassword={true}
          />
          <PasswordChecker password={watch().password} />

          <AlertInput>{errors?.password?.message}</AlertInput>
          <button
            type="submit"
            className="px-4 py-1 bg-tangerine-500 hover:bg-tangerine-400 duration-150 text-white rounded font-medium disabled:bg-gray-300 disabled:text-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        {error && (
          <pre className="text-red-500 text-sm mt-2 italic">
            Something went wrong!
          </pre>
        )}
        <Link href="/auth/login">
          <a className="px-4 py-1 text-amber-300 hover:text-amber-400 underline my-2">
            Login
          </a>
        </Link>
      </main>
    </>
  );
};

export default Register;
