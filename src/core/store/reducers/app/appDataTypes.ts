export type AppDataTypes = {
  language: string;
  searchData: {
    search: string;
    data: any;
  };
  sideOpen: boolean;
  data: {
    selected: boolean;
    open: boolean;
    id: null | number;
    title?: string;
    type?: string;
    name?: string;
    chapters?: Array<any>;
    page_id?: null | number;
    page_title?: string;
    page_text?: string;
    status?: string;
  };
  sidebarTabs: number[];
  selectedTab: number | null;
  selectedPlaybook: { id: string; tabType: number } | null;
  pages: any;
  openedPlaybooks: any[];
  openedPages: any[];
  listType: boolean;
  isModalOpen: boolean;
  modalType: string;
  mainTab: number;
};
