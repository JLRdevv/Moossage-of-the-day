// Libs
import { useState, useCallback, useEffect } from "react";
import { MoonLoader } from "react-spinners";

// Utils
import Button from "./Button";

// Components
import api from "./../../utils/Api";

// Css
import style from "./like.module.css";

interface LikeProps {
  motdId: number;
  userUuid?: string;
}

export default function Like({ motdId, userUuid }: LikeProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLikes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/like/get", { motdId });
      setLikes(response.data.likes);
    } catch (err) {
      setError("Failed to fetch likes.");
    } finally {
      setLoading(false);
    }
  }, [motdId]);

  async function handleLike() {
    setLoading(true);
    try {
      const like = await api.post("/like/add", {
        motdId,
        user_uuid: userUuid,
      });
      if (like.data.message === "liked") {
        setIsLiked(true)
      } else {
        setIsLiked(false);
      }
      await fetchLikes();
    } catch (err) {
      setError("Error while fetching likes.");
    } finally {
      setLoading(false);
    }
  }

  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    fetchLikes();
    async function fetchIsLiked() {
      const fetch = await api.post("/like/isLiked", {
        motdId,
        user_uuid: userUuid,
      });
      if(fetch && fetch.data.liked === true) {
        setIsLiked(true)
        return
      }
      setIsLiked(false)
    }
    fetchIsLiked()
  }, [fetchLikes]);

  return (
    <>
      <div className={style.likeContainer}>
        <Button
          text={isLiked ? 'Dislike' : 'Like'}
          onclick={handleLike}
          icon={<i className="bi bi-hand-thumbs-up"></i>}
          iconOnHover={<i className="bi bi-hand-thumbs-up-fill"></i>}
          toggled={isLiked}
        />
        {loading ? (
          <MoonLoader color="white" size={20} />
        ) : error ? (
          <p className={style.likesCount}>{error}</p>
        ) : (
          <p className={style.likesCount}>{likes}</p>
        )}
      </div>
    </>
  );
}
