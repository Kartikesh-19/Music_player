import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useSelector, useDispatch } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
// import player from "./../components/MusicPlayer/Player";
// CAKE={
//     CHOCO:MUSIC PLAYER FUNCTIONALITY
//     VANILLA:SAZAM CORE FUNCTIONALITY

// }
const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const { isPlaying, activeSong, genreListId } = useSelector(
    (state) => state.player
  );

  const genretitle = "Pop";
  if (isFetching) return <Loader title="lodaing songs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genretitle}
        </h2>
        <select
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 tex-sm rounded-lg outline-none sm:mt-0 mt-5"
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
        >
          {genres.map((genre) => (
            <>
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            </>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            i={i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
