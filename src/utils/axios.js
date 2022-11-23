/*
 * Project: Dynamedics Portal Web
 * Created Date: Monday August 23rd 2021
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Monday August 23rd 2021 12:49:44 am
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 * 2021-08-23	NRB	Added base URL.
 */

import axios from 'axios';
import { apiBaseUrl } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: apiBaseUrl
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      (error.response || {}).data || 'Something went wrong'
    );
  }
);

export default axiosInstance;
