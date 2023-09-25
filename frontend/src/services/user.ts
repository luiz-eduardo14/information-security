import api from "./api"
import { UserDTO } from "./types/user";


export const meRequest = (_param: null, token: string) => api.get<UserDTO>('/user/me?jwt=' + token);