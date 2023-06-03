type Playbook = {
  id: null | number;
  title?: string;
  type?: string;
  name?: string;
  chapters?: Array<any>;
  page_id?: null | number;
  page_title?: string;
  page_text?: string;
  status?: string;
  edited?: string;
  favorited?: boolean | any;
  selected: boolean;
  open: boolean;
  header_url: any;
};

export default Playbook;
