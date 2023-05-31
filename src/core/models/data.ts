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
}
