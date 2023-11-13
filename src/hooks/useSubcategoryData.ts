import { useFiltersStore } from "@/store/useFiltersStore";
import { useMemo } from "react";


export default function useSubcategoryData(SubCategoryuuid: string | null) {

    const { filters, subCategories } = useFiltersStore();
    const subCategory = useMemo(() => {
        return subCategories?.find(c => c.uuid === SubCategoryuuid);
    }, [SubCategoryuuid, subCategories]);

    return ({
        subCategory,
        filters: filters?.filter(f => subCategory?.filters?.includes(f.uuid)) || []
    }
    )
}