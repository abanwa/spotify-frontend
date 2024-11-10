import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCallback } from "react";
// import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // const url = "http://localhost:4000";
  const url = import.meta.env.VITE_BACKEND_URL;

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  // const [track, setTrack] = useState(songsData[0]);
  const [track, setTrack] = useState([]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });

  // play song
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await songsData.map((item) => {
      if (item._id === id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    // we will check if the track id is greater than zero
    /*
    if (track.id > 0) {
      // we will provide track whose if is less than current id
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
    */

    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const next = async () => {
    // we will check if the track id is less than the total current song id
    /*
    if (track.id < songsData.length - 1) {
      // we will provide track whose if is greater than current id
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
    */

    songsData.map(async (item, index) => {
      if (track._id === item && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  // start to play music from the current time stamp we click on
  const seekSong = async (e) => {
    // we will calculate the value of current time by dividing where we click and the total width of the div we clicked and we multiply it with the total duration of the song
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongsData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (err) {
      console.log("error from getSongsData in playerContext: ", err);
    }
  }, [url]);

  const getAlbumsData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (err) {
      console.log("error from getAlbumsData in playerContext: ", err);
    }
  }, [url]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        // we will increase the width of the song as the song continues playing every seconds
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
          }
        });
      };
    }, 1000);
    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [audioRef]);

  // to get the songs and albums
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, [getAlbumsData, getSongsData]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
