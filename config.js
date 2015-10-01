const FRONTEND_DIR = process.env.FRONTEND_DIR || './frontend';
const PROJECT = process.env.PROJECT || 'project';
const DIST_PATH = process.env.DIST_PATH || `${PROJECT}/static/${PROJECT}`;

export default {
  FRONTEND_DIR: FRONTEND_DIR,
  DIST_PATH: DIST_PATH,
  PROJECT: PROJECT,
};
