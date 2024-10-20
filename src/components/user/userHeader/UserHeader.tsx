import { memo, MemoExoticComponent, useEffect, useState } from "react";
import { useRetrieveProfile } from "../../../utils/hooks/api/user";
import Button from "../../button/Button";
import {
  selectUserInfos,
  useAppSelector,
} from "../../../utils/hooks/selectors";
import Skeleton from "../../../utils/skeleton/Skeleton";
import UserHeaderEdit from "./userHeaderEdit/UserHeaderEdit";

export default function UserHeader(): React.ReactElement {
  const { isLoading, handleRetrieveProfile } = useRetrieveProfile();
  const userInfos = useAppSelector(selectUserInfos);

  const [editMode, setEditMode] = useState<boolean>(false);

  const Head: MemoExoticComponent<() => React.ReactElement<any, any> | null> =
    memo(() => (
      <>
        {isLoading && !userInfos ? (
          <span className="user-header__head__skeleton">
            <Skeleton />
          </span>
        ) : (
          <UserHeaderEdit
            onEdit={editMode}
            setOnEdit={(state: boolean) => setEditMode(state)}
          />
        )}
      </>
    ));

  useEffect(() => {
    handleRetrieveProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-header">
      <Head />
      <Button onClick={() => setEditMode(true)} label="Edit Name" />
    </div>
  );
}
