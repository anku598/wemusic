/* eslint-disable react/prop-types */
import { formatDate } from "../utills/dateFormatter";
const CardItem = ({
  track,
  index,
  playTrack,
  selectedTrackIndex,
  isPlaying,
}) => {
  return (
    <div key={track.id} className="list-item shadow">
      <img src={track.album.images[0].url} alt={track.name} />
      <div className="track-name">{track.name}</div>
      <div>
        Artist: {track.album.artists.map((artist) => artist.name).join(", ")}
      </div>
      <div>Release Date: {formatDate(track.album.release_date)}</div>
      <button className="play-button shadow" onClick={() => playTrack(index)}>
        {selectedTrackIndex === index && isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default CardItem;
