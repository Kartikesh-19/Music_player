import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";

const Search = () => {
  console.log("Search");
  const { searchTerm } = useParams();
  console.log(
    "🚀 ~ file: Search.jsx ~ line 11 ~ Search ~ serachTerm",
    searchTerm
  );
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song.track);
  console.log("🚀 ~ file: Search.jsx ~ line 22 ~ Search ~ songs", songs);
  if (isFetching) return <Loader title="Loading top charts" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => {
          return (
            <SongCard
              key={song?.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
