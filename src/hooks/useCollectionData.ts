import firestore, { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

type UseCollectionProps = {
    collection: string;
    customQuery?: <T extends FirebaseFirestoreTypes.DocumentData>(collectionRef: FirebaseFirestoreTypes.CollectionReference) => FirebaseFirestoreTypes.Query<T>;
};

const ft = firestore();

type CollectionResponseData<T = FirebaseFirestoreTypes.DocumentData> = {
    data: T[] | null;
    isLoading: boolean;
    error: any;
};

export default function useCollectionData<T extends FirebaseFirestoreTypes.DocumentData>({
    collection,
    customQuery,
}: UseCollectionProps) {
    const [data, setData] = useState<CollectionResponseData<T>>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let query = ft.collection<T>(collection);

        if (customQuery) {
            const subscriber = customQuery<T>(query).onSnapshot(
                (querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.data());
                    setData({ data, error: null, isLoading: false });
                },
                (error) => {
                    setData({ data: null, error, isLoading: false });
                }
            );

            return () => subscriber();
        }

        const subscriber = query.onSnapshot(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setData({ data, error: null, isLoading: false });
            },
            (error) => {
                setData({ data: null, error, isLoading: false });
            }
        );

        return () => subscriber();
    }, [collection, customQuery]);

    return data;
}
