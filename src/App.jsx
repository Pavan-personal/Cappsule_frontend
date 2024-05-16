import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Results from "./components/Results";
import { useRecoilState } from "recoil";
import searchAtom from "./recoil/searchAtom";

function App() {
  const [search, setSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useRecoilState(searchAtom);
  return (
    <div className="select-none">
      <div className="text-2xl py-4 text-slate-600 font-[700]">
        Cappsule web developement test
      </div>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          setGlobalSearch(search);
        }}
      >
        <div className="relative bg-red-400 m-4 my-8">
          <div className="absolute inset-y-0 start-[6.4rem] flex items-center ps-3 pointer-events-">
            {globalSearch === "" ? (
              <svg
                className="w-5 h-5 text-gray-600 font-bold"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            ) : (
              <img
                onClick={(e) => {
                  e.preventDefault();
                  setGlobalSearch("");
                  setSearch("");
                }}
                className="h-6 z-10 cursor-pointer select-none opacity-[0.6]"
                src="https://cdn-icons-png.flaticon.com/512/0/340.png"
                alt=""
                srcset=""
              />
            )}
          </div>
          <input
            type="search"
            id="default-search"
            autoFocus
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ boxShadow: "3px 3px 30px rgba(0,0,0,0.19)" }}
            className="block w-[62.625rem] mx-auto font-semibold p-4 ps-16 text-[rgba(42,82,122,1)] rounded-full focus:ring-blue-500 "
            placeholder="Type your medicine name here"
            // required
          />
          <button
            // type="submit"
            className="absolute end-28 text-[rgba(42,82,122,1)] bottom-2.5 font-medium rounded-lg px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="h-[0.1rem] w-[63.586rem] mx-auto bg-slate-300 my-10"></div>
      <Results />
    </div>
  );
}

export default App;
