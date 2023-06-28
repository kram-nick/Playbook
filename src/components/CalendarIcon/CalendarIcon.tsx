type Props = {
  IconType: boolean;
};

const CalendarIcon: React.FC<Props> = ({ IconType }) => {
  return (
    <>
      {IconType ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.09277 9.40445H20.9167"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.442 13.3088H16.4512"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0045 13.3088H12.0137"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.55818 13.3088H7.56744"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.442 17.1955H16.4512"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0045 17.1955H12.0137"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.55818 17.1955H7.56744"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0433 2V5.29078"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.96515 2V5.29078"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.2383 3.58008H7.77096C4.83427 3.58008 3 5.21601 3 8.2231V17.2727C3 20.3271 4.83427 22.0009 7.77096 22.0009H16.229C19.175 22.0009 21 20.3555 21 17.3484V8.2231C21.0092 5.21601 19.1842 3.58008 16.2383 3.58008Z"
            stroke="#2B71F7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.09277 9.40445H20.9167"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.442 13.3088H16.4512"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0045 13.3088H12.0137"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.55818 13.3088H7.56744"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.442 17.1955H16.4512"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0045 17.1955H12.0137"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.55818 17.1955H7.56744"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0433 2V5.29078"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.96515 2V5.29078"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2383 3.58008H7.77096C4.83427 3.58008 3 5.21601 3 8.2231V17.2727C3 20.3271 4.83427 22.0009 7.77096 22.0009H16.229C19.175 22.0009 21 20.3555 21 17.3484V8.2231C21.0092 5.21601 19.1842 3.58008 16.2383 3.58008Z"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default CalendarIcon;
