export interface IRoute {
  path: string;
  element: React.ReactElement;
}

export enum UIRoutes {
  HOME = "home",
  SQUEEZE = "squeeze",
  TERM_OF_USE = "term-of-use",
}
