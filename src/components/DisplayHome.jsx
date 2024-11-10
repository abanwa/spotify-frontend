import Navbar from "./Navbar";
// import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
// import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function DisplayHome() {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <AlbumItem
              name={item?.name}
              desc={item?.desc}
              image={item?.image}
              id={item?._id}
              key={item?._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Todays biggest hits Charts</h1>
        <div className="flex overflow-auto">
          {songsData.map((item) => (
            <SongItem
              name={item?.name}
              desc={item?.desc}
              image={item?.image}
              id={item?._id}
              key={item?._id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayHome;
