import cron from "node-cron";
import MOTD from "../models/MOTD";
import dayjs = require("dayjs");
import axios, { AxiosResponse } from "axios";
import { Motd } from "../controllers/motdController";
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
  console.log('fetching message...')
  const today = dayjs().format("YYYY-MM-DD");

  try {
    const response = await MOTD.findOne({ date: today }).lean<Motd>();
    if (!response) {
      const data = await fetchData(today);
      const motd = new MOTD(data)
      await motd.save();
    }
  } catch (error) {
    const errorObj = {
      message: "there was an error while saving today's moosage",
      author: "sorry",
      date: today,
      };
    const motd = new MOTD(errorObj)
    motd.save()
  }
}

// get new Quote every day at midnight GMT-3
cron.schedule("0 0 * * *", motdFetcher)


