import useCollectionData from '@/hooks/useCollectionData';
import {useFiltersStore} from '@/store/useFiltersStore';
import {Category, Filter, SubCategory, TagObj} from '@/types/models';
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

  const {data: tags} = useCollectionData<TagObj>({
    collection: 'tags',
  });

  const {setFilters, setCategories, setSubCategories, setTags} =
    useFiltersStore();

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

  React.useEffect(() => {
    if (!!tags) {
      setTags(tags.map(t => t.label));
    }
  }, [tags]);
  return children;
}
