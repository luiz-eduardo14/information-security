import { RegisterFormFields } from "../features/register/types";
import api from "./api";
import { JwtResponseDTO } from "./types/auth";

export const registerRequest = async (_param: null, data: RegisterFormFields) => api.post<JwtResponseDTO>('/auth/signup', data);

export const loginRequest = async (_param: null, data: Omit<RegisterFormFields, 'firstName' | 'lastName'>) => api.post<JwtResponseDTO>('/auth/signin', data);