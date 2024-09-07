import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginValidations } from "../../schemas";
import { FormErrorMessage } from "../shared/FormErrorMessage";
import { Loader } from "../shared/Loader";
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
  const [type, setType] = useState("password");

  const showPassword = useMemo(() => type === "text", [type]);

  const { isLoading, startLoginUserWithEmail } = useAuth();

  const formOptions = { resolver: yupResolver(loginValidations) };

  const { handleSubmit, reset, watch, register, formState } = useForm(
    formOptions,
    { defaultValues: { email: "", password: "" } }
  );

  const { errors } = formState;

  const handleShowPassword = () => {
    setType("text");

    setTimeout(() => {
      setType("password");
    }, 2000);
  };

  const onSubmit = (user) => {
    startLoginUserWithEmail(user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 flex flex-col gap-5 mt-5"
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className={`mb-1 ${errors.email ? "text-red-400" : ""}`}
        >
          Email
        </label>
        <div className="flex gap-1 items-center">
          <input
            type="email"
            name="email"
            id="email"
            {...register("email")}
            placeholder="Eje: jherrera@mail.com"
            className={`w-full flex items-center gap-1 p-1 border-b bg-transparent focus:outline-none focus:border-b ${
              errors.email
                ? "border-red-200 focus:border-red-400"
                : "border-gray-200 focus:border-b-primary"
            }`}
            autoComplete="off"
            autoCapitalize="off"
            disabled={isLoading}
          />
          <span className="w-5" />
        </div>
        {errors.email && <FormErrorMessage error={errors.email} />}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className={`mb-1 ${errors.password ? "text-red-400" : ""}`}
        >
          Contraseña
        </label>
        <div className="flex gap-1 items-center">
          <input
            type={type}
            name="password"
            id="password"
            {...register("password")}
            placeholder="Eje: *******"
            className={`w-full flex items-center gap-1 p-1 border-b bg-transparent focus:outline-none focus:border-b ${
              errors.password
                ? "border-red-200 focus:border-red-400"
                : "border-gray-200 focus:border-b-primary"
            }`}
            autoComplete="off"
            autoCapitalize="off"
            disabled={isLoading}
          />
          {showPassword ? (
            <FaRegEyeSlash />
          ) : (
            <FaRegEye
              className={`text-gray-400 hover:text-gray-600 duration-200 cursor-pointer`}
              onClick={handleShowPassword}
              title="Mostrar contraseña"
            />
          )}
        </div>
        {errors.password && <FormErrorMessage error={errors.password} />}
      </div>

      <button
        type="submit"
        className="bg-primary/70 hover:bg-primary p-2 rounded-md text-white font-bold duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex-center gap-2">
            <Loader />
          </div>
        ) : (
          "Ingresar"
        )}
      </button>
    </form>
  );
};
