import ReactGA from "react-ga4";

export const LogEvent = (category: string, action: string) => {
  ReactGA.event({ category, action });
};
