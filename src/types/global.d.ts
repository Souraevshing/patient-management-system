declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      API_TOKEN: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
