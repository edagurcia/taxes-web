import { useDispatch, useSelector } from "react-redux";
import { ID, OAuthProvider, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import {
  account,
  avatars,
  appwriteConfig,
  databases,
} from "../lib/appwrite-config";
import {
  setError,
  setIsLoading,
  appLogout,
  onLogin,
  onLogout,
} from "../features";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, session, status, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const checkIfUserExists = async (email) => {
    try {
      const userExist = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", email)]
      );

      return userExist.total;
    } catch (error) {
      dispatch(
        setError({
          title: "Hubo un error",
          description: error.message,
        })
      );
    }
  };

  const getActualSession = async () => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setError(null));
      const actualSession = await account.getSession("current");
      const actualUser = await account.get();
      const avatarUrl = avatars.getInitials(actualUser.name);

      const userDocID = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("userId", actualUser.$id)]
      );

      const userDB = {
        userId: actualUser.$id,
        name: actualUser.name,
        email: actualUser.email,
        avatarurl: avatarUrl.href,
      };

      const user = {
        connId: userDocID.documents[0].$id,
        userId: actualUser.$id,
        name: actualUser.name,
        email: actualUser.email,
        avatarurl: avatarUrl.href,
      };

      const session = {
        provider: actualSession.provider,
        token:
          actualSession.providerAccessToken !== ""
            ? actualSession.providerAccessToken
            : actualUser.$id,
        countryName: actualSession.countryName,
        countryCode: actualSession.countryCode,
      };

      const payload = {
        user,
        session,
      };

      dispatch(onLogin(payload));

      const token = sessionStorage.getItem("taxestoken");

      if (!token) {
        await sessionStorage.setItem(
          "taxestoken",
          actualSession.providerAccessToken !== ""
            ? actualSession.providerAccessToken
            : actualUser.$id
        );
      }

      const totalUsers = await checkIfUserExists(actualUser.email);

      if (totalUsers === 0) {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          userDB
        );
      }
    } catch (error) {
      dispatch(
        setError({
          title: "Error de autenticación",
          description:
            "Hubo un error al intentar obtener la sesión actual del usuario.",
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const startRegisterUserWithEmail = async (user) => {
    try {
      dispatch(setIsLoading(true));

      user.provider = "email";

      const totalUsers = await checkIfUserExists(user.email);

      if (totalUsers > 0) {
        dispatch(
          setError({
            title: "Cuenta ya existe",
            description: "Esta dirección de correo ya esta registrada.",
          })
        );

        return;
      }

      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      if (!newAccount) throw Error;

      await account.createEmailPasswordSession(user.email, user.password);

      navigate("/app");
    } catch (error) {
      dispatch(
        setError({
          title: "Hubo un error",
          description: error.message,
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const startLoginUserWithEmail = async (user) => {
    try {
      dispatch(setIsLoading(true));
      await account.createEmailPasswordSession(user.email, user.password);

      navigate("/app");
    } catch (error) {
      dispatch(
        setError({
          title: "Hubo un error",
          description: error.message,
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const startSessionWithGoogle = async () => {
    try {
      dispatch(setIsLoading(true));
      await account.createOAuth2Session(
        OAuthProvider.Google,
        `${import.meta.env.VITE_APP_URL}/app/logged`,
        `${import.meta.env.VITE_APP_URL}`
      );
    } catch (error) {
      dispatch(
        setError({
          title: "Error de autenticación",
          description:
            "Hubo un error al intentar aunticarse, por favor intentelo de nuevo más tarde.",
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem("taxestoken");
      dispatch(onLogout());
      dispatch(appLogout());
      await account.deleteSessions("current");
      navigate("/");
    } catch (error) {
      dispatch(
        setError({
          title: "Hubo un error",
          description: error.message,
        })
      );
    }
  };

  return {
    user,
    session,
    status,
    isLoading,
    error,
    checkIfUserExists,
    getActualSession,
    startRegisterUserWithEmail,
    startLoginUserWithEmail,
    startSessionWithGoogle,
    logout,
  };
};
