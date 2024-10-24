import { usePost, usePut } from ".";
import { logIn } from "../../../features/authToken";
import { setUserInfos } from "../../../features/userInfos";
import { setLocalStorageAuthToken } from "../../utils";
import { useAppDispatch } from "../selectors";

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

export const useSignUp = () =>
  usePost<UserSignUpDTO, UserCreatedProps>("/user/signup");

export function useLogIn() {
  const { postData, isLoading, error } = usePost<UserLoginDTO, LoginProps>(
    "/user/login"
  );
  const dispatch = useAppDispatch();

  async function handleLogIn(
    payload: UserLoginDTO & { rememberMe: boolean }
  ): Promise<LoginProps | undefined> {
    const res = await postData({
      password: payload.password,
      email: payload.email,
    });
    if (res?.token) {
      dispatch(logIn(res.token));
      setLocalStorageAuthToken(payload.rememberMe ? res.token : null);
      return res;
    }
    return;
  }
  return { handleLogIn, isLoading, error };
}

export function useRetrieveProfile() {
  const { postData, isLoading, error } = usePost<void, UserProfileProps>(
    "/user/profile"
  );
  const dispatch = useAppDispatch();
  async function handleRetrieveProfile(): Promise<
    UserProfileProps | undefined
  > {
    const res = await postData();
    if (res) {
      dispatch(setUserInfos(res));
      return res;
    }
    return;
  }

  return { handleRetrieveProfile, isLoading, error };
}

export function useUpdateProfile() {
  const { putData, isLoading, error } = usePut<UserUpdateDTO, UserProfileProps>(
    "/user/profile"
  );
  const dispatch = useAppDispatch();
  async function handleUpdateProfile(
    payload: UserUpdateDTO
  ): Promise<UserProfileProps | undefined> {
    const res = await putData(payload);
    if (res) {
      dispatch(setUserInfos(res));
      return res;
    }
    return;
  }
  return { handleUpdateProfile, isLoading, error };
}
