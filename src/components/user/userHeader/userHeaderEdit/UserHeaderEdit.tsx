import {
  selectUserInfos,
  useAppSelector,
} from "../../../../utils/hooks/selectors";

type UserHeaderEditProps = {
  onEdit: boolean;
  setOnEdit: (state: boolean) => void;
};

export default function UserHeaderEdit({
  onEdit,
  setOnEdit,
}: UserHeaderEditProps) {
  const userInfos = useAppSelector(selectUserInfos);

  return (
    <>
      <h2>
        Welcome back
        <br />
        {`${userInfos?.firstName} ${userInfos?.lastName}`}
      </h2>
    </>
  );
}
