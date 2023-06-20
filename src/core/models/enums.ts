export enum FileMode {
  PROFILE_IMAGE = "0",
  PLAYBOOK_HEADER_IMAGE = "1",
  IMAGES_FOR_PLAYBOOK_PAGES = "2",
  PLAYBOOK_THUMBNAILS = "3",
  PLAYYBOOK_ICON = "4",
}

export enum MainTabs {
  All = 0,
  My = 1,
  Favorite = 2,
  Purchased = 3,
  Listings = 4,
  Home = 5,
  Active = 6,
}

export enum ActiveTabs {
  All = 0,
  Open = 1,
  Success = 2,
  Failed = 3,
}

export enum Modal {
  PLAYBOOK_DELETE = "PLAYBOOK_DELETE",
  PLAYBOOK_DETAILS = "PLAYBOOK_DETAILS",
  PLAYBOOK_SOCIAL = "PLAYBOOK_SOCIAL",
  PLAYBOOK_SHARE = "PLAYBOOK_SHARE",
  PLAYBOOK_SALE = "PLAYBOOK_SALE",
  PAGE_DELETE = "PAGE_DELETE",
  ICONS = "ICONS",
  SIGN_UP = "SIGN_UP",
  PURCHASE = "PURCHASE",
  FREE_PURCHASE = "FREE_PURCHASE",
  WELCOME = "WELCOME",
  PRIVACY = "PRIVACY",
  CREATE_ACTIVE_PLAY = "CREATE_PLAY",
  EDIT_ACTIVE_PLAY = "EDIT_PLAY",
  DELETE_PLAY = "DELETE_PLAY",
}

export enum Welcome {
  CREATE = "CREATE",
  DISCOVER = "DISCOVER",
}

export enum SkeletonTypes {
  PUBLIC = "PUBLIC",
  DISCOVER = "DISCOVER",
  PROFILE = "PROFILE",
}

export enum PlaybookStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}

export enum ActivePlaybook {
  EDIT = 0,
  CREATE = 1,
}
