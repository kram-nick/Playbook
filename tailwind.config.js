/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "footer-main": "#242428",
        "buttons-bg": "#2B71F7",
        "buttons-color": "#FFF",
        "header-links": "#4F4C68",
        "home-title": "#242428",
        "people-bg": "#F8F8F8",
        "simple-text": "#606266",
        "tools-bg": "#F8F8F8",
        "tools-block": "#FFF",
        "banner-bg": "#4CB7FB",
        "banner-txt": "#FFF",
        "banner-btn": "#1B163A",
        "copyrights-main": "#8A90A2",
        "border-copyrights": "#38383F",
        "list-title": "#fff",
        "button-submit-footer": "#2B71F7",
        "footer-placeholder": "#313138",
        "top-playbook-title": "#242428",
        "top-subtitle-playbook": "#606266",
        "top-playbook": "#F8F8F8",
        "top-engineering": "#2B71F7",
        "top-entrepreneur": "#FF2B80",
        "top-ceo": "#FBCB33",
        "top-sub-accent": "#FFFEFE",
        "top-sub-secondary": "#606266",
        "review-main": "#F8F8F8",
        "review-name": "#1F2228",
        "term-of-use-head": "#3666E4",
        "input-squeeze": '#F0F1F2',
        'inp-squeez-placeholder': '#9A9EA6',
        "header-bottom": "#E5E5E5",
        'squeeze-footer': "#6B6B6B",
        "bg-squeeze-engineering": "#00B8B8",
        "create-bg-main": "#F9F9F9",
        "nav-txt-private": "#737373",
        "active-playbook": "rgba(43, 113, 247, 0.12);",
        "border-input":"#D4D4D4",
        "border-btn":"#DAE0E6",
        "input-paceholder":"#A3A3A3",
        "checkbox-bg":"#437EF7",
        "search-input":"#F5F5F5",
        "card-border":"#EDEDED",
        "overlay":"rgba(138, 138, 138, 0.6)",
        "side-overlay":"rgba(92, 92, 92, 0.5);",
        "btn-free":"rgba(43, 113, 247, 0.04)",
        "blue-light":"#F3F7FF",
        "danger":"#FF3B30",
        "gray-btn":"#EDEDED",
        "chapter-color":"#F6F6F6",
        "option-btn":"#E3E3E3",
        "chart-color":"#47B5FF"
      },
      fontFamily: {
        poppins: ["Poppins, sans-serif"],
        inter: ["Inter , sans-serif"],
        manrope: ["Manrope, sans-serif"],
      },
      boxShadow: {
        "review-card": "0px 13px 60px rgba(53, 52, 116, 0.08);",
        "3xl": "0px 13px 60px rgba(53, 52, 116, 0.08)",
        "inp-squeeze": "0px 1px 2px rgba(16, 24, 40, 0.04);",
        "free-trial": " 0px 1px 2px rgba(16, 24, 40, 0.04);",
        "dropmenu":"0px 1px 2px -1px rgba(16, 24, 40, 0.1), 0px 1px 3px rgba(16, 24, 40, 0.1);",
        "chart":"-9px 4px 222px rgba(135, 135, 135, 0.25), 0px 0px 0px 9px rgba(71, 181, 255, 0.1);",
        "chart-mobile":"-3.87497px 1.72221px 95.5825px rgba(135, 135, 135, 0.25), 0px 0px 0px 3.87497px rgba(71, 181, 255, 0.1);",
        "chart-grow":"-10px 6px 34px rgba(50, 50, 61, 0.04)",
        "review":"-4px -4px 27px rgba(38, 37, 47, 0.05)",
        "pricing":"0 0 0 8px rgba(71, 181, 255, 0.12)"
      },
      backgroundImage: {
        "sign": "url('./assets/photos/sign/bg-sign.svg')",
        "banner-back": "url('./assets/photos/home/banner-bg.svg')",
        "term-back": "url('./assets/photos/terms/top-bg.svg')",
        "tablet-transparent": "url('./assets/photos/squeeze/transparent-tablet.svg')",
        "mob-transparent": "url('./assets/photos/squeeze/transparent-mobile.svg')",
        "sales-bckg": "url('./assets/photos/squeeze/sales-bckg.svg')",
        "product-bckg": "url('./assets/photos/squeeze/product-bckg.svg')",
        "engineering-bckg": "url('./assets/photos/squeeze/engineering-bckg.svg')",
        "entrepreneur-bckg": "url('./assets/photos/squeeze/entrepreneur-bckg.svg')",
        "without-photo": "url('./assets/photos/main/user.svg')",
      },
      screens: {
        mobile: "480px"
      }
    },
  },
  plugins: [],
};
