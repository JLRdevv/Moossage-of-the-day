import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limits to 500 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Exceded request limit, try again later.",
});

export default limiter;
