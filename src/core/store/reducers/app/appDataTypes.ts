export type AppDataTypes = {
  language: string;
  sideOpen: boolean;
  data: {
    selected: boolean;
    id: null | number;
    title: string;
    chapters?: Array<any>;
    chapter_id?:  null | number;
    chapter_title?:  string;
    chapter_text?:  string;
  };
};
