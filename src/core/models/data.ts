export declare namespace Data {
  interface Page {
    id: string;
    playbook_id: string;
    title: string;
    url: string;
    content: string;
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
    slug_url: string;
    status: string;
    thumbnail_url: null | string;
    user_id: string;
  }
  interface Tag {
    id: string;
    name: string;
  }
}
