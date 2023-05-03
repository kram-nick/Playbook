export type AppDataTypes = {
  language: string;
  data: {
    selected: boolean;
    id: null | number;
    title: string;
    chapters?: Array<any>;
    chapter_id?:  null | number;
  };
};
