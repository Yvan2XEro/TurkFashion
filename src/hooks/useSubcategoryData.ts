import { useFiltersStore } from "@/store/useFiltersStore";
import { useMemo } from "react";


export default function useSubcategoryData({
    subCategoryid,
    categoryid
}: {
    subCategoryid?: string | null
    categoryid?: string | null
}) {

    const { filters, subCategories, categories } = useFiltersStore();
    const subCategory = useMemo(() => {
        return subCategories?.find(c => c.id === subCategoryid);
    }, [subCategoryid, subCategories]);

    const category = useMemo(() => {
        return categories?.find(c => c.id === categoryid);
    }, [categoryid, categories]);


    return ({
        subCategory,
        filters: filters?.filter(f => subCategory?.filters?.includes(f.id)) || [],
        category
    }
    )
}