import dotenv from 'dotenv';
import { bot } from './bot';
import { web } from './web';

dotenv.config();

web(bot);
