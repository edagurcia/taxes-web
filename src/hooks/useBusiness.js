import { useDispatch, useSelector } from "react-redux";
import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../lib/appwrite-config";
import {
  onGetBusinesses,
  taxesLoading,
  taxesError,
  selectBusiness,
} from "../features/taxesInfoSlice";

export const useBusiness = () => {
  const dispatch = useDispatch();

  const { isLoading, error, businesses, selectedBusiness } = useSelector(
    (state) => state.taxesInfo
  );
  const { user } = useSelector((state) => state.auth);

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

  const handleSelectBusiness = (item) => {
    const data = {
      id: item.$id,
      commerce_name: item.commerce_name,
    };

    dispatch(selectBusiness(data));
  };

  return {
    isLoading,
    error,
    businesses,
    selectedBusiness,
    startGetBusiness,
    startSaveBusiness,
    handleSelectBusiness,
  };
};
