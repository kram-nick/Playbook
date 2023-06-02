import accountDataSlice from "./account/accountDataSlice";
import appDataSlice from "./app/appDataSlice";
import helpersDataSlice from "./helpers/helpersDataSlice";

export default Object.assign(
  {},
  {
    app: appDataSlice,
    helpers: helpersDataSlice,
    account: accountDataSlice,
  }
);
