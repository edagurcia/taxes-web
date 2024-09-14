import { useDispatch, useSelector } from "react-redux";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, databases } from "../lib/appwrite-config";
import {
  onGetBusinesses,
  onGetRtns,
  onGetTaxes,
  setPeriod,
  taxesLoading,
  taxesError,
  selectBusiness,
} from "../features/taxesInfoSlice";

export const useTaxes = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    taxes,
    rtns,
    businesses,
    selectedTax,
    selectedRtn,
    selectedBusiness,
    selectedPeriod,
  } = useSelector((state) => state.taxesInfo);

  const { user } = useSelector((state) => state.auth);

  const handleSetInitialPeriod = (period) => {
    dispatch(setPeriod(period));
  };

  //* RTNS methods

  const startGetRTNS = async () => {
    try {
      dispatch(taxesLoading(true));
      const rtns = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.rtnsCollectionId,
        [Query.equal("owner", user?.connId)]
      );

      dispatch(onGetRtns(rtns));
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

  //* Businesses Methods

  const startGetBusiness = async () => {
    try {
      dispatch(taxesLoading(true));
      const business = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.businessesCollectionId,
        [Query.equal("owner", user?.connId)]
      );

      dispatch(onGetBusinesses(business));
    } catch (error) {
      dispatch(
        taxesError({
          title: "Error de base de datos",
          description:
            "Hubo un error al intentar obtener la información de comercios",
        })
      );
    } finally {
      dispatch(taxesLoading(false));
    }
  };

  const handleSelectBusiness = (item) => {
    const data = {
      id: item.$id,
      commerce_name: item.commerce_name,
    };

    dispatch(selectBusiness(data));
  };

  const startSaveBusiness = async (formData) => {
    try {
      dispatch(taxesLoading(true));
      if (selectedBusiness) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.businessesCollectionId,
          selectedBusiness.id,
          {
            commerce_name: formData,
          }
        );
        dispatch(selectBusiness(null));
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.businessesCollectionId,
          ID.unique(),
          {
            owner: user?.connId,
            commerce_name: formData,
          }
        );
      }

      const business = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.businessesCollectionId,
        [Query.equal("owner", user?.connId)]
      );

      dispatch(onGetBusinesses(business));

      return { ok: true };
    } catch (error) {
      dispatch(
        taxesError({
          title: "Error de base de datos",
          description:
            "Hubo un error al intentar obtener la información de comercios",
        })
      );
    } finally {
      dispatch(taxesLoading(false));
    }
  };

  //* Taxes methods

  const startGetTaxes = async () => {
    try {
      dispatch(taxesLoading(true));
      const taxesInfo = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.taxescollectionId,
        [
          Query.equal("owner", user?.connId),
          Query.equal("month_year", selectedPeriod?.strPeriod),
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

  return {
    isLoading,
    error,
    taxes,
    rtns,
    businesses,
    selectedTax,
    selectedRtn,
    selectedBusiness,
    selectedPeriod,
    handleSetInitialPeriod,
    startGetRTNS,
    startGetBusiness,
    handleSelectBusiness,
    startSaveBusiness,
    startGetTaxes,
  };
};
