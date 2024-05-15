import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import searchAtom from "../recoil/searchAtom";
import axios from "axios";
import resultAtom from "../recoil/resultAtom";
import loadingAtom from "../recoil/loadingAtom";
import Loading from "./Loading";
import SaltCard from "./SaltCard";

function Results() {
  const [resultData, setResultData] = useRecoilState(resultAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const search = useRecoilValue(searchAtom);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://backend.cappsule.co.in/api/v1/new_search?q=${search}&pharmacyIds=1,2,3`
      );
      const data = response.data.data.saltSuggestions;
      setResultData(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    search.length > 0 ? loadData() : "";
  }, [search]);
  return loading ? (
    <Loading />
  ) : search === "" ? (
    <div className="text-center text-[rgba(136,136,136,1)] font-semibold text-lg mt-48">
      “ Find medicines with amazing discount “
    </div>
  ) : resultData.length > 0 ? (
    <div className="flex flex-col justify-center items-center gap-10">
      {resultData.map((salt, index) => {
        return <SaltCard index={index} info={salt} />;
      })}
    </div>
  ) : (
    <div>No results found</div>
  );
}

export default Results;
