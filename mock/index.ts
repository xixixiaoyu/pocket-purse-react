import type { MockMethod } from 'vite-plugin-mock';
import { itemsAPI } from './api/items.mock.api';
import { statisticsAPI } from './api/statistics.mock.api';
import { tagsAPI } from './api/tags.mock.api';
import { userAPI } from './api/user.mock.api';

export default [
  ...userAPI,
  ...itemsAPI,
  ...tagsAPI,
  ...statisticsAPI,
] as MockMethod[];
