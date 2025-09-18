import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export const SearchBar = () => {
  return (
    <div className="relative">
      <span className=" absolute top-2 left-2">
        <Search width={24} className="text-gray-400"/>
      </span>
      <Input 
        name="search-bar"
        id="search-bar"
        type="text"
        placeholder="Search product ..."
        className="ps-8 h-10"
      />
    </div>
  );
};
