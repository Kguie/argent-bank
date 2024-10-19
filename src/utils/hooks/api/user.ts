import { usePost, usePut } from ".";

type UserLoginDTO = {
  email: string;
  password: string;
};

type UserUpdateDTO = {
  firstName: string;
  lastName: string;
};

type UserSignUpDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginProps = { token: string };

type UserProfileProps = {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

type UserCreatedProps = UserProfileProps & {
  password: string;
};

export const useLogIn = () => usePost<UserLoginDTO, LoginProps>("/user/login");

export const useSignUp = () =>
  usePost<UserSignUpDTO, UserCreatedProps>("/user/signup");

export const useRetrieveProfile = () =>
  usePost<void, UserProfileProps>("/user/profile");

export const useUpdateProfile = () =>
  usePut<UserUpdateDTO, UserProfileProps>("/user/profile");
