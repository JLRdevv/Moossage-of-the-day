import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limita 100 reqs per window
  standardHeaders: true, 
  legacyHeaders: false, 
  message: 'Exceded requisition limit, try again later.',
});

export default limiter