import {Injectable} from '@nestjs/common';

import config from './config.default';

@Injectable()
export class ConfigService {

  private readonly envConfig: { [key: string]: any };

  constructor() {
    this.envConfig = config;
  }

  get(key: string) {
    return this.envConfig[key];
  }

  getDbConfig() {
    return this.envConfig.mysql;
  }

}
