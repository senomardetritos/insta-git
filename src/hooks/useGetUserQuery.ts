import { useQuery } from '@tanstack/react-query';
import api from '../helpers/api';
import { getStorage, setStorage } from '../helpers/store';

export function useGetUserQuery(user: string) {
	const keyName = `getUser${user}`;
	return useQuery({
		queryKey: [keyName],
		queryFn: async () => {
			const data = getStorage(keyName);
			if (data && data.name) return data;
			const res = await api.get(`/users/${user}`);
			if (res && res.data) {
				setStorage(keyName, res.data);
				return res.data;
			}
			return {};
		},
	});
}
