import * as dotenv from 'dotenv';
import * as fs from 'fs';

import {Injectable} from '@nestjs/common';

@Injectable()
export class ConfigService {

    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        // 读取.env文件，通过dotenv.parse方法形成key-value pairs
        // 存在envConfig变量里
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    // 传进來key，回传value
    get(key: string) {
        return this.envConfig[key];
    }

    // 可以写方法处理env变量，这样也比较好除错
    getDbConfig() {
        const config = this.envConfig;
        return {
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PW,
            database: config.DB_NAME,
            charset: config.DB_CHARSET,
        };
    }

}
