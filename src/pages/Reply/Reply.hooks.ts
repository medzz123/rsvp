import { unauthenticatedFetch } from '@lib/fetch';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useReply = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handler = useCallback((input) => {
    setLoading(input);
  }, []);

  const [state, setState] = useState(undefined);
  useEffect(() => {
    const getEvents = async () => {
      const params = router.query;

      const response = await unauthenticatedFetch({
        url: `/get-reply?id=${params.id}&event=${params.event}&token=${params.token}`,
      });

      if (response?.data) {
        setState(response.data);
      }

      setLoading(false);
    };

    if (router.isReady) {
      getEvents();
    }
  }, [router.isReady]);

  return { state, loading, handler };
};
