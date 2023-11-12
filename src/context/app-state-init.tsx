import useCollectionData from '@/hooks/useCollectionData';
import {useFiltersStore} from '@/store/useFiltersStore';
import {Category, Filter, SubCategory} from '@/types/models';
import React, {PropsWithChildren} from 'react';

export function AppStateInitProvider({children}: PropsWithChildren) {
  const {data: filters, isLoading} = useCollectionData<Filter>({
    collection: 'filters',
  });

  const {data: categories} = useCollectionData<Category>({
    collection: 'categories',
  });

  const {data: subCategories} = useCollectionData<SubCategory>({
    collection: 'subcategories',
  });

  const {setFilters, setCategories, setSubCategories} = useFiltersStore();

  React.useEffect(() => {
    if (!!filters) {
      setFilters(filters);
    }
  }, [filters, isLoading]);

  React.useEffect(() => {
    if (!!categories) {
      setCategories(categories);
    }
  }, [categories]);

  React.useEffect(() => {
    if (!!subCategories) {
      setSubCategories(subCategories);
    }
  }, [subCategories]);
  return children;
}
