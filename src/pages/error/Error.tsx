import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { selectUserInfos, useAppSelector } from "../../utils/hooks/selectors";

export default function Error() {
  const navigate = useNavigate();
  const userInfos = useAppSelector(selectUserInfos);

  useEffect(() => {
    if (userInfos) {
      navigate("/profile/" + userInfos.id);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfos, navigate]);
  return null;
}
