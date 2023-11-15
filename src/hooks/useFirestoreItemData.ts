import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

type UseFirestoreItemDataProps = {
    collection: string,
    uuid: string
}

const ft = firestore();
export default function useFirestoreItemData<T extends FirebaseFirestoreTypes.DocumentData>({ collection, uuid }: UseFirestoreItemDataProps) {

    const [data, setData] = useState<T | null>(null);

    const [isLoading, setIsLoading] = useState(!data);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const subscriber = ft.collection<T>(collection).doc(uuid).onSnapshot(
            (querySnapshot) => {
                const data = querySnapshot.data();
                setData(data || null);
                setIsLoading(false);
                setError(null);
            },
            (error) => {
                setError(error);
                setIsLoading(false);
                setData(null)
            }
        )
        return subscriber
    }, [collection, uuid]);

    return ({
        data,
        isLoading,
        error
    })
}