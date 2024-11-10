import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
// import { albumsData, assets, songsData } from "../assets/assets";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useEffect } from "react";
import { useState } from "react";

function DisplayAlbum({ album }) {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  // we will get the album data base on the album id
  // const albumData = albumsData[id];

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, [albumsData, id]);

  if (!albumData) return null;

  // these two are the same
  // console.log("album  : ", album);
  // console.log("albumData  : ", albumData);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={albumData.image} className="w-48 rounded" alt="album_pic" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              className="inline-block w-5"
              alt="spotify_logo"
            />
            <b>Spotify</b> . 1,323,154 likes . <b>50 songs,</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} className="m-auto w-4" alt="clock_icon" />
      </div>
      <hr />
      {songsData
        .filter((filItem) => filItem.album === album.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item?.id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            key={item?.id}
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                src={item.image}
                className="inline w-10 mr-5"
                alt={`album_song_pic_${item?.id}`}
              />
              {item?.name}
            </p>
            <p className="text-[15px]">{albumData?.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item?.duration}</p>
          </div>
        ))}
    </>
  );
}

export default DisplayAlbum;
