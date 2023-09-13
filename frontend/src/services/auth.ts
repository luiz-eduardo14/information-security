import { RegisterFormFields } from "../features/register/types";
import api from "./api";

export const registerRequest = async (_param: null, data: RegisterFormFields) => api.post('/auth/signup', data);

export const loginRequest = async (_param: null, data: Omit<RegisterFormFields, 'firstName' | 'lastName'>) => api.post('/auth/signin', data);