import { FormEvent, useState } from "react";
import {
  selectUserInfos,
  useAppSelector,
} from "../../../../utils/hooks/selectors";
import Button from "../../../button/Button";
import { useUpdateProfile } from "../../../../utils/hooks/api/user";

type UserHeaderEditProps = {
  setOnEdit: (state: boolean) => void;
};

export default function UserHeaderEdit({ setOnEdit }: UserHeaderEditProps) {
  const userInfos = useAppSelector(selectUserInfos);
  const { handleUpdateProfile } = useUpdateProfile();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    let firstName = formData.get("firstName") as string;
    let lastName = formData.get("lastName") as string;

    if (!firstName.trim().length && userInfos) {
      firstName = userInfos.firstName;
    }

    if (!lastName.trim().length && userInfos) {
      lastName = userInfos.lastName;
    }

    if (
      firstName.trim() === userInfos?.firstName &&
      lastName.trim() === userInfos?.lastName
    ) {
      setIsLoading(false);
      setOnEdit(false);
      return;
    }

    const res = await handleUpdateProfile({ firstName, lastName });
    if (res) setOnEdit(false);
    setIsLoading(false);
  }

  return (
    <form className="user-header-edit" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>
      <div className="user-header-edit__inputs-wrapper">
        <input placeholder={userInfos?.firstName} name="firstName" />
        <input placeholder={userInfos?.lastName} name="lastName" />
      </div>
      <div className="user-header-edit__buttons-wrapper">
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          type="submit"
          label="Save"
        />
        <Button
          disabled={isLoading}
          onClick={() => setOnEdit(false)}
          label="Cancel"
        />
      </div>
    </form>
  );
}
