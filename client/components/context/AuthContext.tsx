import React, {
  createContext,
  useContext,
  FunctionComponent,
  useState,
} from "react";
import { IUser } from "../Types/IUser";
import { useRequest } from "../hooks/useRequest";
import { HTTP_METHOD } from "../Types/httpMethod";
import { useRouter } from "next/router";

interface IAuthContextProps {
  currentUser: IUser | null;
  signout: () => void;
}

const initalState: IAuthContextProps = {
  currentUser: null,
  signout: () => {},
};

const AuthContext = createContext(initalState);

const useAuthContext = () => useContext(AuthContext);

interface IAuthProviderProps {
  currentUser: IUser | null;
}

const AuthProvider: FunctionComponent<IAuthProviderProps> = ({
  children,
  currentUser,
}) => {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: HTTP_METHOD.POST,
    body: {},
    onSuccess: () => router.push("/signin"),
  });

  const signout = async () => {
    try {
      await doRequest();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useAuthContext, AuthProvider };
