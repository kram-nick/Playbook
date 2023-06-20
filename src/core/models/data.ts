export declare namespace Data {
  interface Page {
    id: string;
    playbook_id: string;
    title: string;
    url: string;
    editor_content: {
      editor_state: string;
      element: string;
    };
    created_at: string;
    updated_at: string;
    privacy: string;
    views: string;
    tags: string;
  }

  interface File {
    mode: string;
    file: any;
    playbook_id: string;
  }

  interface UserAccount {
    first_name: "";
    last_name: "";
    username: "";
    profile_image: "";
    country_code: "";
    timezone: "";
    title: "";
    bio: "";
  }

  interface Playbook {
    category_id: number;
    color_code: string;
    content: string;
    favorited: boolean;
    header_url: string;
    icon_url: string;
    id: string;
    name: string;
    order: null | string[];
    privacy: string;
    profile_first_name: string;
    profile_last_name: string;
    profile_image: string;
    slug_url: string;
    status: string;
    thumbnail_url: null | string;
    user_id: string;
  }

  interface Tag {
    id: string;
    name: string;
  }

  interface Listing {
    chargeable: false;
    discount_price: string;
    header_url: string;
    id: string;
    name: string;
    playbook_id: string;
    profile_first_name: string;
    profile_image: string;
    profile_last_name: string;
    retail_price: string | null;
    sale_price: string | null;
    tags: null | Tag[];
    status: string;
    user_id: string;
    thumbnail_url: any;
    content: string;
    profile_bio: string;
  }

  interface Cookie {
    necessary: boolean;
    experienced: boolean;
    measured: boolean;
  }

  interface TaskCard {
    id: string;
    name: string;
    description: string;
    status: string;
    due_date: string;
    tag: string;
    tags?: string[];
    playbook?: {
      id: string;
      title: string;
      user: string;
      page: string;
      image: string;
    };
  }
}
