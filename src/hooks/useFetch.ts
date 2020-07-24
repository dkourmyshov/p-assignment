import { useEffect, useCallback } from "react";
import { getTradingInfo } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import { random } from "../helpers/random";

export const useFetch = (seconds: number) => {
  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(getTradingInfo());
    setTimeout(fetchData, random(seconds));
  }, [dispatch, seconds]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};
