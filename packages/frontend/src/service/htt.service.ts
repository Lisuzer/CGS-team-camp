import axios from 'axios';
import { APP_KEYS } from '../modules/common/consts';

axios.defaults.validateStatus = () => true;

export default class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_SERVERURL,
    public fetchingService = axios,
    public apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN)
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any) {
    return configWithoutDataAndUrl;
  }

  async get(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const respoce = await this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return respoce.data;
  }

  post(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .post(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config))
      .then((res) => {
        if (res.data.token) {
          const { token } = res.data;
          localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token);
        }
        return res.data;
      });
  }

  put(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .put(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config))
      .then((res) => res.data);
  }

  delete(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .delete(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config))
      .then((res) => res.data);
  }

  patch(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .patch(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config))
      .then((res) => res.data);
  }
}
