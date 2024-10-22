import { createContext, useContext } from "react";

export const meContext = createContext({
  me: [],
  loading: false,
  error: false,
  isAuthenticated:false,
  fetchMe : async ()=>{},
  clearErrors : ()=>{}
});


export const MeContextProvider = meContext.Provider;

export default function useMe() {
  return useContext(meContext);
}
