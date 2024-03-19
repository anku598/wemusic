import { useLayoutEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import CardItem from "../components/CardItem";
import { formatDate } from "../utills/dateFormatter";

function Home() {
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTracks, setFilteredTracks] = useState([]);

  const getTracks = async () => {
    const url = `https://v1.nocodeapi.com/ray598/spotify/fZNFuuxXJcemcqjC/search?q=bangla&type=track&perPage=20`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTracks(data.tracks.items);
      setFilteredTracks(data.tracks.items);

      localStorage.setItem("cachedTracks", JSON.stringify(data.tracks.items));
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
      setFilteredTracks([]);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const cachedTracks = localStorage.getItem("cachedTracks");

    if (cachedTracks) {
      const parsedTracks = JSON.parse(cachedTracks);
      setTracks(parsedTracks);
      setFilteredTracks(parsedTracks);
      setLoading(false);
    } else {
      getTracks();
    }
  }, []);

  const playTrack = (index) => {
    setSelectedTrackIndex(index);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const newIndex =
      selectedTrackIndex === tracks.length - 1 ? 0 : selectedTrackIndex + 1;
    setSelectedTrackIndex(newIndex);
  };

  const prevTrack = () => {
    const newIndex =
      selectedTrackIndex === 0 ? tracks.length - 1 : selectedTrackIndex - 1;
    setSelectedTrackIndex(newIndex);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        formatDate(track.album.release_date).toLowerCase().includes(query)
    );
    setFilteredTracks(filtered);
  };

  return (
    <div className="container-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="offset-md-7 col-md-5 form-inline gap-3 my-2 my-lg-0 d-flex align-items-end"
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          type="submit"
          className="btn btn-outline-success my-2 my-sm-0 py-2 px-5"
        >
          Search
        </button>
      </form>

      <div className="track-card-container">
        {loading ? (
          <p>Loading...</p>
        ) : filteredTracks && filteredTracks.length > 0 ? (
          filteredTracks.map((track, index) => (
            <CardItem
              key={track.id}
              track={track}
              index={index}
              playTrack={playTrack}
              selectedTrackIndex={selectedTrackIndex}
              isPlaying={isPlaying}
            />
          ))
        ) : (
          <p>No tracks found.</p>
        )}
      </div>
      {selectedTrackIndex !== null && (
        <div className="music-player shadow">
          <AudioPlayer
            autoPlay
            src={tracks[selectedTrackIndex].preview_url}
            layout="horizontal-reverse"
            showSkipControls={true}
            showJumpControls={false}
            header={`Now playing: ${tracks[selectedTrackIndex].name}`}
            footer="All music from: www.bensound.com"
            onClickPrevious={prevTrack}
            onClickNext={nextTrack}
            onEnded={nextTrack}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
