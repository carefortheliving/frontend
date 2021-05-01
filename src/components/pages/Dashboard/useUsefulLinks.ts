import * as React from 'react';
import useFirestore from 'src/hooks/useFirestore';
import { UsefulLink } from 'src/types';
import { defaultUsefulLinks } from './constants';

interface UseUsefulLinksProps {
}

const useUsefulLinks = (props: UseUsefulLinksProps) => {
  const [data, setData] = React.useState([] as UsefulLink[]);
  const [loading, setLoading] = React.useState(false);
  const { getUsefulLinks } = useFirestore();

  const loadData = async (onFailure: (e: any) => void) => {
    setLoading(true);
    setData([]);
    try {
      const links = await getUsefulLinks();
      setData(links);
    } catch (e) {
      onFailure && onFailure(e);
    }
    setLoading(false);
  };

  const loadFallbackData = async () => {
    setData(defaultUsefulLinks);
  };

  return {
    data,
    loadData,
    loading,
    loadFallbackData,
  };
};

export default useUsefulLinks;
