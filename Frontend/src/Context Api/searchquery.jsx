import { createContext, useState } from "react";

const SearchQueryContext = createContext(); // Capitalized context name

const SearchQueryProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchQueryContext.Provider>
    );
};

export { SearchQueryProvider, SearchQueryContext };
