import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRtn } from "../../hooks";
import { rtnsValidations } from "../../schemas";
import { FormErrorMessage } from "../shared/FormErrorMessage";
import { Loader } from "../shared/Loader";

export const FormRTNS = () => {
  const { isLoading, rtns, selectedRtn, startSaveRtn } = useRtn();

  const formOptions = { resolver: yupResolver(rtnsValidations) };

  const { handleSubmit, reset, watch, register, setValue, formState } = useForm(
    formOptions,
    { defaultValues: { name: "", rtnNumber: "" } }
  );

  const { errors } = formState;

  useEffect(() => {
    if (selectedRtn) {
      setValue("rtnNumber", selectedRtn?.RTN);
      setValue("name", selectedRtn?.RTN_Name);
    }
  }, [selectedRtn]);

  const onSubmit = async (formData) => {
    if (!selectedRtn) {
      const foundRtn = rtns?.documents.find(
        (rtn) =>
          rtn?.RTN.toLowerCase() === formData?.rtnNumber.trim().toLowerCase()
      );

      if (foundRtn) return toast.warning("Ya existe un RTN registrado.");
    }

    await startSaveRtn(formData).then((ok) => {
      if (ok) {
        reset();
        if (selectedRtn) {
          toast.success("RTN actualizado con exito");
        } else {
          toast.success("RTN registrado con exito");
        }
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 mb-5 p-5 flex items-center shadow-md"
    >
      <div className="w-full">
        <div className="w-full flex flex-col mb-2">
          <input
            type="text"
            name="rtnNumber"
            id="rtnNumber"
            {...register("rtnNumber")}
            placeholder="Eje: 08011986078980"
            className={`w-full flex items-center p-1 border-b bg-transparent focus:outline-none focus:border-b ${
              errors.rtnNumber
                ? "border-red-200 focus:border-red-400"
                : "border-gray-200 focus:border-b-primary"
            }`}
            autoComplete="on"
            autoCapitalize="off"
            disabled={isLoading}
          />
          {errors.name && <FormErrorMessage error={errors.rtnNumber} />}
        </div>

        <div className="w-full flex flex-col">
          <input
            type="text"
            name="name"
            id="name"
            {...register("name")}
            placeholder="Eje: Juan Lopez"
            className={`w-full flex items-center p-1 border-b bg-transparent focus:outline-none focus:border-b ${
              errors.name
                ? "border-red-200 focus:border-red-400"
                : "border-gray-200 focus:border-b-primary"
            }`}
            autoComplete="on"
            autoCapitalize="off"
            disabled={isLoading}
          />
          {errors.name && <FormErrorMessage error={errors.name} />}
        </div>
      </div>

      <button
        type="submit"
        className="w-15 h-15 p-2 rounded-lg bg-primary/70 hover:bg-primary text-white duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader showText={false} />
        ) : (
          <span>{selectedRtn ? "Actualizar" : "Guardar"}</span>
        )}
      </button>
    </form>
  );
};
