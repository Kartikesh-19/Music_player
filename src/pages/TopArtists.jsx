import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Error, Loader, SongCard } from "../components";
import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import ArtistCard from "./../components/ArtistCard";

const TopArtists = () => {
  console.log("TopArtists");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top charts" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track, i) => {
          return <ArtistCard key={track?.key} track={track} />;
        })}
      </div>
    </div>
  );
};

export default TopArtists;
