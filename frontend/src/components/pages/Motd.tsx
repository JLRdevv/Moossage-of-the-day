import { useState, useEffect } from "react";
import api from "../../utils/Api";
import MotdBody from "../motd/MotdBody";

interface MotdData {
  data: string;
  date: string;
  sucess: boolean;
  weekDay: string;
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
        setError("Failed to fetch message of the day.");
      } finally {
        setLoading(false);
      }
    }
    fetchMotd();
  }, []);

  return (
    <>
      <MotdBody
        message={motd ? motd.data : null}
        loading={loading}
        error={error}
        date={motd ? motd.date : null}
        weekDay={motd ? motd.weekDay : null}
      />
    </>
  );
}
