import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useTaxes } from "../../hooks/useTaxes";
import { businessValidations } from "../../schemas";
import { FormErrorMessage } from "../shared/FormErrorMessage";
import { Loader } from "../shared/Loader";

export const FormBusiness = () => {
  const { isLoading, businesses, selectedBusiness, startSaveBusiness } =
    useTaxes();

  const formOptions = { resolver: yupResolver(businessValidations) };

  const { handleSubmit, reset, watch, register, setValue, formState } = useForm(
    formOptions,
    { defaultValues: { name: "" } }
  );

  const { errors } = formState;

  useEffect(() => {
    if (selectedBusiness) {
      setValue("name", selectedBusiness?.commerce_name);
    }
  }, [selectedBusiness]);

  const onSubmit = async (formData) => {
    if (!selectedBusiness) {
      const foundBusiness = businesses?.documents.find(
        (business) =>
          business?.commerce_name.toLowerCase() ===
          formData?.name.trim().toLowerCase()
      );

      if (foundBusiness)
        return toast.warning("Ya existe un comercio registrado con ese nombre");
    }

    await startSaveBusiness(formData.name).then((ok) => {
      if (ok) {
        reset();
        if (selectedBusiness) {
          toast.success("Comercio actualizado con exito");
        } else {
          toast.success("Comercio registrado con exito");
        }
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 mb-5 p-5 flex gap-2 items-center shadow-md"
    >
      <div className="w-full flex flex-col">
        <input
          type="text"
          name="name"
          id="name"
          {...register("name")}
          placeholder="Eje: Supermercado"
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

      <button
        type="submit"
        className="w-15 h-15 p-2 rounded-lg bg-primary/70 hover:bg-primary text-white duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader showText={false} />
        ) : (
          <span>{selectedBusiness ? "Actualizar" : "Guardar"}</span>
        )}
      </button>
    </form>
  );
};
