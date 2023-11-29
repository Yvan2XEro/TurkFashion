import { useMemo } from 'react'
import { useFiltersStore } from '@/store/useFiltersStore';

export default function useFilterSearchParams() {
    const {
        activeCategory: category,
        activeSubCategory: subCategory,
        activeFilters,
        minPrice,
        maxPrice,
    } = useFiltersStore();
    const filterString = useMemo(() => {
        return Object.entries(activeFilters)
            .map(([key, value]) => {
                return key + '=' + value;
            })
            .join(',');
    }, [activeFilters]);

    return `${!!subCategory?.id ? '&sub_category_id=' + subCategory?.id : ''}${filterString.length > 0 ? '&filters=' + filterString : ''
        }${!!category?.id ? '&category_id=' + category?.id : ''}${!!Number(minPrice) ? '&min_price=' + minPrice : ''
        }${!!Number(maxPrice) ? '&max_price=' + maxPrice : ''}`
}