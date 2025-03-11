import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/graph-api");
        const jsonData = await res.json();
        setData(jsonData);
        console.log("Data fetched:", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
