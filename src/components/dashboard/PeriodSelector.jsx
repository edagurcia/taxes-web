import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaSearch } from "react-icons/fa";
import { useTaxes } from "../../hooks/useTaxes";
import { useTaxesPeriod } from "../../hooks";
import { periodValidations } from "../../schemas";
import { Loader } from "../shared/Loader";
import { FormErrorMessage } from "../shared/FormErrorMessage";
import { MONTHS } from "../../constants/months";

export const PeriodSelector = () => {
  const { isLoading, selectedPeriod, startGetTaxes } = useTaxes();
  const { handleSetPeriod } = useTaxesPeriod();

  const formOptions = { resolver: yupResolver(periodValidations) };

  const { handleSubmit, reset, watch, register, setValue, formState } = useForm(
    formOptions,
    { defaultValues: { monthId: "", year: "" } }
  );

  const { errors } = formState;

  useEffect(() => {
    if (selectedPeriod) {
      setValue("monthId", selectedPeriod?.month);
      setValue("year", selectedPeriod?.year);
    }
  }, []);

  const onSubmit = (formData) => {
    handleSetPeriod(formData);
    setTimeout(() => {
      startGetTaxes();
    }, 100);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 mb-5 flex gap-5 items-center"
    >
      <div className="w-full flex flex-col">
        <select
          name="month"
          id="month"
          {...register("monthId")}
          disabled={isLoading}
          className={`w-full flex items-center p-1.5 border-b bg-transparent focus:outline-none focus:border-b ${
            errors.monthId
              ? "border-red-200 focus:border-red-400"
              : "border-gray-200 focus:border-b-primary"
          }`}
        >
          {MONTHS.map((month) => (
            <option key={month.id} value={month.id}>
              {month.month}
            </option>
          ))}
        </select>
        {errors.monthId && <FormErrorMessage error={errors.monthId} />}
      </div>

      <div className="w-full flex flex-col">
        <input
          type="text"
          name="year"
          id="year"
          {...register("year")}
          minLength={4}
          maxLength={4}
          placeholder="Eje: 2024"
          className={`w-full flex items-center p-1 border-b bg-transparent focus:outline-none focus:border-b ${
            errors.year
              ? "border-red-200 focus:border-red-400"
              : "border-gray-200 focus:border-b-primary"
          }`}
          autoComplete="off"
          autoCapitalize="off"
          disabled={isLoading}
        />
        {errors.year && <FormErrorMessage error={errors.year} />}
      </div>

      <button
        type="submit"
        className="w-15 h-15 p-2 rounded-lg bg-primary/70 hover:bg-primary text-white duration-200"
        disabled={isLoading}
      >
        {isLoading ? <Loader showText={false} /> : <FaSearch />}
      </button>
    </form>
  );
};
