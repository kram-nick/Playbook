export interface IRoute {
  path: string;
  element: React.ReactElement;
}

export enum UIRoutes {
  HOME = "home",
  SQUEEZE_SALES = "squeeze-sales",
  SQUEEZE_PRODUCT = "squeeze-product",
  SQUEEZE_ENGINEERING = "squeeze-engineering",
  SQUEEZE_ENTREPRENEUR = "squeeze-entrepreneur",
  TERM_OF_USE = "term-of-use",
  SIGN_IN = "sign-in",
}

export enum PrivateUIRoutes {
  Create = "create",
}
