import { createContext, useContext, useState } from 'react';

// Create Context
const ViewContext = createContext();

// Provider Component
export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(true); // Default to list view

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

// Custom Hook for consuming context
export const useView = () => useContext(ViewContext);
