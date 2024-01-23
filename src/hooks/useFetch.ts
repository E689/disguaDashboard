import { useState, useEffect } from 'react';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

type FetchState<T> = {
  status: FetchStatus;
  data: T | null;
  error: Error | null;
};

export function useFetch<T>(url: string): [FetchStatus, T | null, Error | null] {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null
  });
  /*
  useEffect(() => {
      const fetchData = async () => {
          setState({status: 'loading', data: null, error: null});
          try {
              const response = await fetch(url);
              const data = await response.json();
              setState({status: 'success', data, error: null});
          } catch (error) {
              setState({status: 'error', data: null, error:(error as Error)});
          }
      };

      fetchData();
  }, [url]);
  */

  // dummy data for now

  useEffect(() => {
    setState({ status: 'loading', data: null, error: null })
    setTimeout(() => {
      const dummyData = [
        {
          date: 'Lunes 17 de febrero', schedule: [
            { timeStart: '08:00', timeEnd: '09:00', available: true },
            { timeStart: '09:00', timeEnd: '10:00', available: true },
            { timeStart: '10:00', timeEnd: '11:00', available: true },
            { timeStart: '11:00', timeEnd: '12:00', available: true },
            {
              timeStart: '12:00',
              timeEnd: '13:00',
              available: false,
              client: { name: 'Juan Perez', phone: '12345678' }
            },
            { timeStart: '13:00', timeEnd: '14:00', available: true },
            { timeStart: '14:00', timeEnd: '15:00', available: false, client: { name: 'Daniel Castillo', phone: '12345678' } },
            { timeStart: '15:00', timeEnd: '16:00', available: true },
            {
              timeStart: '16:00',
              timeEnd: '17:00',
              available: false,
              client: { name: 'Joao Castillo', phone: '12345678' }
            },
          ],
        },
        {
          date: 'Martes 18 de febrero', schedule: [
            { timeStart: '08:00', timeEnd: '09:00', available: true },
            { timeStart: '09:00', timeEnd: '10:00', available: true },
            { timeStart: '10:00', timeEnd: '11:00', available: true },
            { timeStart: '11:00', timeEnd: '12:00', available: true },
            { timeStart: '12:00', timeEnd: '13:00', available: true },
            { timeStart: '13:00', timeEnd: '14:00', available: true },
            { timeStart: '14:00', timeEnd: '15:00', available: true },
            { timeStart: '15:00', timeEnd: '16:00', available: true },
            { timeStart: '16:00', timeEnd: '17:00', available: true },
          ],
        }
      ] as T;
      setState({ status: 'success', data: dummyData, error: null });
    }, 2000);
  }, [url]);

  return [state.status, state.data, state.error];
}