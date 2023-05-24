export type AppDataTypes = {
  language: string;
  searchData: {
    search: string;
    data: any;
  }
  sideOpen: boolean;
  data: {
    selected: boolean;
    id: null | number;
    title?: string;
    name?: string;
    chapters?: Array<any>;
    chapter_id?:  null | number;
    chapter_title?:  string;
    chapter_text?:  string;
  };
};
