import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";

export interface UserContextInterface {
  user: Models.Document|undefined;
  setUser: Dispatch<SetStateAction<Models.Document|undefined>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  user: {},
  setUser: (user: Models.Document) => {},
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);
export const useUserContext = () => useContext(UserContext);
type UserContextProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState(defaultState.user);
  const [isLoggedIn, setIsLoggedIn] = useState(defaultState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultState.isLoading);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setUser({} as Models.Document);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
