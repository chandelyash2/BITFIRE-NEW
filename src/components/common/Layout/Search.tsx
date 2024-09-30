import {
  Event,
  useGetEventsBySearchLazyQuery,
} from "@/graphql/generated/schema";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";

export const Search = () => {
  const [search, { loading }] = useGetEventsBySearchLazyQuery();
  const [searchResult, setSearchResult] = useState<Event[] | any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm) {
        setSearchResult([]); // Clear previous results
        const searchData = await search({
          variables: {
            query: searchTerm,
          },
        });

        if (searchData.data?.getEventsBySearch) {
          setSearchResult(searchData.data?.getEventsBySearch);
        }
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup the timeout on unmount or when searchTerm changes
  }, [searchTerm, search]);

  return (
    <div>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdSearch />
        </InputLeftElement>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      {loading && <p>Loading...</p>}
      {searchResult.length > 0 &&
        searchResult.map((item: Event) => (
          <Link
            href={`/event/${item.eventId}`}
            key={item.id}
            className="border-b p-2"
          >
            <h2>{item.name}</h2>
            <h4 className="text-xs">
              {moment(item.openDate).format("MMMM Do YYYY, h:mm:ss a")}
            </h4>
          </Link>
        ))}
    </div>
  );
};
