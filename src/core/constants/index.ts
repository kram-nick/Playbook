 
import Select, { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig<any, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
 
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#F5F5F5'
        : isFocused
        ? '#F5F5F5'
        : undefined,
      color: isSelected
        ? '#242428' 
        : '#242428',
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#F5F5F5'
            : '#FFFFFF'
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
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
 
    return {
      ...styles,
      ...dot(data.color),
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#F5F5F5'
        : isFocused
        ? '#F5F5F5'
        : undefined,
      color: isSelected
        ? '#242428' 
        : '#242428',
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#F5F5F5'
            : '#FFFFFF'
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }) 
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
  email:"ebrown@mail.com",
  photo:''
}

export const tabsIcons = [
  {
    id: 1,
    title: 'Emojis'
  },
  {
    id: 2,
    title: 'Icons'
  },
  {
    id: 3,
    title: 'Custom'
  }
]

export const Filters = [
  {
    id: 1,
    title: 'All'
  },
  {
    id: 2,
    title: 'My Playbooks'
  },
  {
    id: 3,
    title: 'Favorite'
  },
  {
    id: 4,
    title: 'Purchased'
  }
]
export const SettingsTabs = [
  {
    id: 1,
    title: 'Profile'
  },
  {
    id: 2,
    title: 'Password'
  },
  {
    id: 3,
    title: 'Plan'
  },
  {
    id: 4,
    title: 'Notifications'
  }
]