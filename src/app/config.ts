import * as envalid from 'envalid';

const { str, num, host, port } = envalid;

export const config = envalid.cleanEnv(process.env, {
    JWT_SECRET: str({ desc: 'JWT secret' }),
})