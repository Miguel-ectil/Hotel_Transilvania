import { AxiosResponse } from "axios"
import { httpClient } from "../config/axios"
import { IUserRegister } from "@/src/interfaces/user"

const Url = "/auth"

export const ServiceUser = () => {
  const RegisterUser = async (form: IUserRegister): Promise<AxiosResponse> => {
    const url = `${Url}/register`;
    const resp: AxiosResponse = await httpClient.post(url, form)
    return resp;
  }
    
  return {
    RegisterUser
  }
} 