import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'somefile.log',
      dirname: 'logs',
    }),
  ],
  exitOnError: false,
});

export default logger;
