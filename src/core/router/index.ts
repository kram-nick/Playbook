export interface IRoute {
  path: string;
  element: React.ReactElement;
}

export enum UIRoutes {
  HOME = "home",
  DISCOVER = "discover",
  SQUEEZE_SALES = "squeeze-sales",
  SQUEEZE_PRODUCT = "squeeze-product",
  SQUEEZE_ENGINEERING = "squeeze-engineering",
  SQUEEZE_ENTREPRENEUR = "squeeze-entrepreneur",
  TERM_OF_USE = "term-of-use",
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  NEW_PASSWORD = "create-password",
  RESET_PASSWORD = "reset-password",
  PAYMENT = "payment",
  PRIVACY_POLICY = "pricacy-policy",
}

export enum PrivateUIRoutes {
  Main = "main",
  Create = "editor",
  Chapters = "creating",
  Preview = "preview",
  PreviewChapter = "preview-chapter",
  Profile = "profile",
  CardDetail = "playbook",
  Settings = "settings",
  Success = "success",
  Cancel = "cancel",
}
