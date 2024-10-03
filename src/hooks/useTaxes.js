import { useDispatch, useSelector } from "react-redux";
import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../lib/appwrite-config";
import {
  onGetTaxes,
  setPeriod,
  taxesLoading,
  taxesError,
  selectTax,
} from "../features/taxesInfoSlice";

export const useTaxes = () => {
  const dispatch = useDispatch();

  const { isLoading, error, taxes, selectedTax, selectedPeriod } = useSelector(
    (state) => state.taxesInfo
  );

  const { user } = useSelector((state) => state.auth);

  const handleSetInitialPeriod = (period) => {
    dispatch(setPeriod(period));
  };

  const startGetTaxes = async () => {
    try {
      dispatch(taxesLoading(true));
      const taxesInfo = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.taxescollectionId,
        [
          Query.equal("owner", user?.connId),
          Query.equal("year", selectedPeriod?.year),
        ]
      );

      dispatch(onGetTaxes(taxesInfo));
    } catch (error) {
      dispatch(
        taxesError({
          title: "Error de base de datos",
          description:
            "Hubo un error al intentar obtener la información de RTN's",
        })
      );
    } finally {
      dispatch(taxesLoading(false));
    }
  };

  const handleSelectTax = (tax) => {
    dispatch(selectTax(tax));
  };

  return {
    isLoading,
    error,
    taxes,
    selectedTax,
    selectedPeriod,
    handleSetInitialPeriod,
    startGetTaxes,
    handleSelectTax,
  };
};
