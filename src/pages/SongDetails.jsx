import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Error, DetailsHeader, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid, id: artistId, artistData } = useParams();
  console.log(
    "🚀 ~ file: SongDetails.jsx ~ line 12 ~ SongDetails ~ artistId",
    songid
  );
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });
  const { data, isFetchingRelatedSongs } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching song details" />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={" "} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-#xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text?.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">No, lyrics found! </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
