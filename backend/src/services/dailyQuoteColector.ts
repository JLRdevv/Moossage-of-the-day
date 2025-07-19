import cron from "node-cron";
import MOTD from "../models/MOTD";
import dayjs = require("dayjs");
import axios, { AxiosResponse } from "axios";

type motdObject = {
  message: string;
  author: string;
  date: string;
};



async function fetchData(date: string): Promise<motdObject> {
  const url = "https://zenquotes.io/api/today";

  const response: AxiosResponse = await axios.get(url);
  if (response.data.length == 0) {
    throw new Error('error while fetching data from API')
  }

  const resObject: motdObject = {
    message: response.data[0].q,
    author: response.data[0].a,
    date,
  };

  return resObject;
}

export default async function motdFetcher() {
  console.log('gathering message...')
  const today = dayjs().format("YYYY-MM-DD");
  try {
    const response = await MOTD.findOne({ where: { date: today }, raw: true });
    if (!response) {
      const data = await fetchData(today);
      await MOTD.create(data);
    }
  } catch (error) {
    await MOTD.create({
      message: "there was an error while saving today's moosage",
      author: "sorry",
      date: today,
    });
  }
}

// get new Quote every day at 8 AM
cron.schedule("0 8 * * *", motdFetcher);


