import { useEffect } from "react";

import { useRetrieveProfile } from "../../utils/hooks/api/user";
import { selectAuthToken, useAppSelector } from "../../utils/hooks/selectors";

export default function UserInfosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authToken = useAppSelector(selectAuthToken);

  const { handleRetrieveProfile } = useRetrieveProfile();

  useEffect(() => {
    if (authToken) {
      handleRetrieveProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);
  return <>{children}</>;
}
