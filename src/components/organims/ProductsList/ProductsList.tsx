import RMasonList from 'reanimated-masonry-list';
import React from 'react';
import {ProductDetailsCard} from '@/components/moleculs/ProductDetailsCard';
import {universalFetch} from '@/lib/api/universalfetch';
import {Product} from '@/lib/api/products';
import {useQuery} from '@tanstack/react-query';
import ProductsListSkeleton from './ProductsListSkeleton';
import useFilterSearchParams from '@/hooks/useFilterSearchParams';

type TProps = {
  selectedSubCategory: number | null;
  q: string;
  search?: boolean;
};

export default function ProductsList(props: TProps) {
  const {selectedSubCategory, q, search = false} = props;
  const [page, setPage] = React.useState(1);
  const filterQueryParams = useFilterSearchParams();

  const handledQueryParams = React.useMemo(() => {
    if (!search) {
      return `${
        !!selectedSubCategory ? '&sub_category_id=' + selectedSubCategory : ''
      }`;
    }
    return `${filterQueryParams}${q.length > 0 ? '&q=' + q : ''}`;
  }, [selectedSubCategory, filterQueryParams, q, search]);
  console.log(handledQueryParams);

  const {
    data: products,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ['products', 'sub-category', handledQueryParams],
    queryFn: () =>
      universalFetch<Product>({
        limit: 100,
        page,
        path: `/products/search?`,
        q: handledQueryParams,
      }),
  });
  if (isPending) {
    return <ProductsListSkeleton />;
  }
  return (
    <RMasonList
      data={products?.data || []}
      numColumns={2}
      onRefresh={async () => {
        setPage(1);
        console.log('refresh');
        await refetch();
      }}
      onEndReached={() => {
        if (!products) return;
        if (products.meta.count > products.data.length) {
          setPage(p => p + 1);
        }
      }}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, i}: {item: any; i: number}) => (
        <ProductDetailsCard index={i} data={item} />
      )}
    />
  );
}
