import { useFiltersStore } from "@/store/useFiltersStore";
import { useMemo } from "react";


export default function useSubcategoryData({
    subCategoryuuid,
    categoryUuid
}: {
    subCategoryuuid?: string | null
    categoryUuid?: string | null
}) {

    const { filters, subCategories, categories } = useFiltersStore();
    const subCategory = useMemo(() => {
        return subCategories?.find(c => c.uuid === subCategoryuuid);
    }, [subCategoryuuid, subCategories]);

    const category = useMemo(() => {
        return categories?.find(c => c.uuid === categoryUuid);
    }, [categoryUuid, categories]);


    return ({
        subCategory,
        filters: filters?.filter(f => subCategory?.filters?.includes(f.uuid)) || [],
        category
    }
    )
}