import path from 'path';

export const FRONTEND_DIR = path.join(__dirname, 'frontend');
export const SCSS_PATH = path.join(__dirname, 'scss');
export const PROJECT = (process.env.PROJECT !== undefined) ? process.env.PROJECT : 'project';
export const DIST_PATH = path.join(__dirname, `${PROJECT}/static/${PROJECT}`);
