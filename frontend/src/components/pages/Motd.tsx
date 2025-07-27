// Libs
import { useState, useEffect } from "react";

// Utils
import api from "../../utils/Api";

// Components
import MotdBody from "../motd/MotdBody";
import Timer from "../layout/Timer";

interface MotdData {
  data: string;
  date: string;
  sucess: boolean;
  weekDay: string;
  motdId: number;
}

type expectedMotd = MotdData | null;

export default function Motd() {
  const [motd, setMotd] = useState<expectedMotd>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMotd() {
      try {
        const response = await api.get("/get/motd");
        setMotd(response.data);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    }
    fetchMotd();
  }, []);

  return (
    <>
      <Timer />
      <MotdBody
        message={motd ? motd.data : null}
        loading={loading}
        error={error}
        date={motd ? motd.date : null}
        weekDay={motd ? motd.weekDay : null}
        motdId={motd ? motd.motdId : 0}
      />
    </>
  );
}
