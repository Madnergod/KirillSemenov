import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { BoardList } from "../components/BoardList";

export const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchBoards = useCallback(async () => {
    try {
      const fetched = await request("/api/board", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setBoards(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }
  return  <BoardList boards={boards} />;
};
