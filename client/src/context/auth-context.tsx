import { createContext } from "react";

interface AuthContextInterface {
  userId: number,
  token: string,
  login: (token: string, userId: number) => void,
  logout: () => void,
}

const AuthCtx = createContext<AuthContextInterface | null>(null);

export default AuthCtx;