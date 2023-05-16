/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// declare namespace NodeJS {
//   interface ProcessEnv {
//     readonly NODE_ENV: "development" | "production" | "test";
//     readonly PUBLIC_URL: string;
//     readonly REACT_APP_API_URL: string;
//     readonly REACT_APP_TOKEN_KEY: string;
//     readonly REACT_APP_GTM_ID: string;
//     readonly REACT_APP_ANALYTICS_ID: string;
//     readonly REACT_APP_GOOGLE_KEY: string;
//     readonly REACT_APP_LOGO_NAME: string;
//     readonly REACT_APP_ANALYTICS_NAME: string;
//   }
// }
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly REACT_APP_TOKEN_KEY: string;
    readonly REACT_APP_API_URL: string;
  }
}