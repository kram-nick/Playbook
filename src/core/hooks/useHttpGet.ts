/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"; 
import RequestsService from "../services/request.service";

interface IOptions {
  dependencies?: any[];
  query?: any;
  defaultValue?: any;
  resolve?: (response?: any) => void;
  reject?: (error?: any) => void;
  condition?: boolean;
}
interface IState<T> {
  loading: boolean;
  fetchedData: T;
}
const useHttpGet = <T>(url: string, newOptions?: IOptions): IState<T> => {
  const [state, setState] = useState<IState<T>>(() => ({
    loading: false,
    fetchedData: newOptions?.defaultValue || null,
  }));

  const options: IOptions = {
    dependencies: [],
    query: null,
    defaultValue: null,
    resolve: undefined,
    reject: undefined,
    condition: true,
    ...newOptions,
  };

  useEffect(() => {
    if (options?.condition) {
      setState((s) => ({ ...s, loading: true }));

      RequestsService.getMethod<T>(url, options?.query)
        .then((response) => {
          setState({
            loading: false,
            fetchedData: response.data,
          });
          options?.resolve && options?.resolve(response.data);
        })
        .catch((error) => {
          setState((s) => ({ ...s, loading: false }));
          options?.reject && options?.reject(error);
        });
    }

    return () => {
      setState({ loading: false, fetchedData: [] as any });
    };
  }, options.dependencies);

  return state;
};
export default useHttpGet;