import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

type UseCollectionProps = {
    collection: string;
    customQuery?: <T extends FirebaseFirestoreTypes.DocumentData>(collectionRef: FirebaseFirestoreTypes.CollectionReference) => FirebaseFirestoreTypes.Query<T>;
    enabled?: boolean;
};

const ft = firestore();

type CollectionResponseData<T = FirebaseFirestoreTypes.DocumentData> = T[] | null;

export default function useCollectionData<T extends FirebaseFirestoreTypes.DocumentData>({
    collection,
    customQuery,
    enabled = true,
}: UseCollectionProps) {
    const [data, setData] = useState<CollectionResponseData<T>>(null);

    const [isLoading, setIsLoading] = useState(!data);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!enabled && data && data.length > 0) {
            setData(null)
        }
    }, [enabled])

    useEffect(() => {
        let query = ft.collection<T>(collection);

        if (!enabled) {
            return;
        }

        if (customQuery) {
            const subscriber = customQuery<T>(query).onSnapshot(
                (querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.data());
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                },
                (error) => {

                    setIsLoading(false);
                    setError(error);
                }
            );

            return () => subscriber();
        }

        const subscriber = query.onSnapshot(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setData(data);
            },
            (error) => {

                setIsLoading(false);
                setError(error);
            }
        );

        return () => subscriber();
    }, [collection, customQuery, enabled]);

    return { data, isLoading, error };
}
