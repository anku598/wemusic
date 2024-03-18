import { useLayoutEffect, useState } from "react";

function Home() {
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTracks = async () => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/ray598/spotify/fZNFuuxXJcemcqjC/search?q=track&perPage=20"
      );

      const data = await response.json();
      setTracks(data.albums.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
  };

  useLayoutEffect(() => {
    getTracks();
  }, []);

  return (
    <div className="container-full">
      <div className="track-card-container">
        {loading ? (
          <p>Loading...</p>
        ) : tracks && tracks.length > 0 ? (
          tracks.map((track) => (
            <div key={track.id} className="list-item shadow">
              <img src={track.images[0].url} alt={track.name} />
              <div className="track-name">{track.name}</div>
              <div>
                Artist: {track.artists.map((artist) => artist.name).join(", ")}
              </div>
              <div>Release Date: {formatReleaseDate(track.release_date)}</div>
              <audio src="{track.preview_url}" controls></audio>
            </div>
          ))
        ) : (
          <p>No tracks found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
