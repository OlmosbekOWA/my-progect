
import { useEffect, useState } from "react";

export const useProductQueryParams = () => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchName(nameFilter); 
      setPage(1);
    }, 400);

    return () => clearTimeout(delayDebounce); 
  }, [nameFilter]);

  return {
    page,
    setPage,
    nameFilter,
    setNameFilter,
    searchName,
  };
};
