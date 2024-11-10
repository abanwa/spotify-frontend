import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  // console.log("songsData : ", songsData);
  return (
    <div className="h-screen bg-black">
      {songsData.length > 0 && (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      )}

      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
}

export default App;