import React, { useState } from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated";
import { SearchResult } from '../search/indexService'
import { InputActionMeta } from "react-select/dist/declarations/src";

const AsyncSearchBar = ({ onSelect, loadOptions: load }) => {
  const [isloading, setIsloading] = useState(false)

   //set default query terms
   const [query, setQuery] = useState("")

  //get animated components wrapper
  const animatedComponents = makeAnimated()

  const loadOptions = (value: string): Promise<SearchResult[]> => {
    setIsloading(true)
    return load(value)
        .then((res) => res.json())
        .catch(() => setIsloading(false))
        .finally(() => setIsloading(false))
  };

  return (
    <>
      <AsyncSelect
        isSearchable
        cacheOptions
        placeholder="Search"
        theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: 'var(--bg-color)',
              primary: 'var(--content-text)',
              neutral0: 'var(--bg-color)',
            },
          })}
        isLoading={isloading}
        components={animatedComponents}
        getOptionLabel={(e: SearchResult) => e.name}
        getOptionValue={(e: SearchResult) => e.slug}
        loadOptions={(value) => loadOptions(value)}
        onInputChange={(newValue: string, actionMeta: InputActionMeta) => {
          if(actionMeta.action == 'input-blur' || actionMeta.action == 'menu-close') return
          setQuery(newValue)
        }}
        onChange={(value) => onSelect(value)}
        value={query}
        inputValue={query}
      />
    </>
  );
};

export default AsyncSearchBar;
