import Select, { StylesConfig } from "react-select";
import { ColourOption } from "../../components/Modals/WindowTypes/ModalPlaybookDetail";

export const selectStyles: StylesConfig<any, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#F5F5F5"
        : isFocused
        ? "#F5F5F5"
        : undefined,
      color: isSelected ? "#242428" : "#242428",
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#F5F5F5"
            : "#FFFFFF"
          : undefined,
      },
    };
  },
};

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 2,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 20,
    width: 20,
  },
});

export const colourStyles: StylesConfig<any> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      ...dot(data.color),
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#F5F5F5"
        : isFocused
        ? "#F5F5F5"
        : undefined,
      color: isSelected ? "#242428" : "#242428",
      cursor: isDisabled ? "not-allowed" : "pointer",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#F5F5F5"
            : "#FFFFFF"
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export const Documents = [
  "Privacy Policy",
  "Publisher Agreement",
  "Content Guidelines",
  "Copyright Dispute Policy",
  "Copyright Repeat Infringer Policy",
  "CCPA Policy",
];

export const User = {
  name: "Erik Brown",
  email: "ebrown@mail.com",
  photo: "",
};

export const tabsIcons = [
  {
    id: 1,
    title: "Emojis",
  },
  {
    id: 2,
    title: "Icons",
  },
  {
    id: 3,
    title: "Custom",
  },
];

export const TabsHeadings: string[] = [
  "MAIN.ALL",
  "MAIN.MY_PLAYBOOKS",
  "MAIN.FAVORITE",
  "MAIN.PURCHASED",
  "MAIN.LISTINGS",
];
export const SettingsTabs = [
  {
    id: 1,
    title: "SETTINGS.PROFILE",
  },
  {
    id: 2,
    title: "SETTINGS.PASSWORD",
  },
  // {
  //   id: 3,
  //   title: "SETTINGS.TRANSACTIONS",
  // },
  // {
  //   id: 4,
  //   title: "SETTINGS.NOTIFICATIONS",
  // },
];

export const DiscoverTabs = [
  {
    id: 1,
    title: "I’m a",
  },
  {
    id: 2,
    title: "Hobbyist",
  },
  {
    id: 3,
    title: "First time founder",
  },
  {
    id: 4,
    title: "Soloentrepreneur",
  },
  {
    id: 5,
    title: "Small Business Owner",
  },
  {
    id: 6,
    title: "Product Builder",
  },
  {
    id: 7,
    title: "Startup Executive",
  },
];

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
  { value: "white", label: "White", color: "#FFFFFF" },
  { value: "black", label: "Black", color: "#000000" },
];
