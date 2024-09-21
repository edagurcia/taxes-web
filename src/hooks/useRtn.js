import { useDispatch, useSelector } from "react-redux";
import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../lib/appwrite-config";
import {
  onGetRtns,
  selectRtn,
  taxesLoading,
  taxesError,
} from "../features/taxesInfoSlice";

export const useRtn = () => {
  const dispatch = useDispatch();

  const { isLoading, error, rtns, selectedRtn } = useSelector(
    (state) => state.taxesInfo
  );

  const { user } = useSelector((state) => state.auth);

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

  const startSaveRtn = async (formData) => {
    try {
      dispatch(taxesLoading(true));

      if (selectedRtn) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.rtnsCollectionId,
          selectedRtn.id,
          {
            RTN: formData.rtnNumber,
            RTN_Name: formData.name,
          }
        );
        dispatch(selectRtn(null));
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.rtnsCollectionId,
          ID.unique(),
          {
            owner: user?.connId,
            RTN: formData.rtnNumber,
            RTN_Name: formData.name,
          }
        );
      }

      const rtn = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.rtnsCollectionId,
        [Query.equal("owner", user?.connId)]
      );

      dispatch(onGetRtns(rtn));

      return { ok: true };
    } catch (error) {
      dispatch(
        taxesError({
          title: "Error de base de datos",
          description:
            "Hubo un error al intentar obtener la información de RTNS",
        })
      );
    } finally {
      dispatch(taxesLoading(false));
    }
  };

  const handleSelectRtn = (item) => {
    const data = {
      id: item.$id,
      RTN: item.RTN,
      RTN_Name: item.RTN_Name,
    };

    dispatch(selectRtn(data));
  };

  return {
    isLoading,
    error,
    rtns,
    selectedRtn,
    startGetRTNS,
    startSaveRtn,
    handleSelectRtn,
  };
};
