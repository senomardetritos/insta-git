import { useQuery } from '@tanstack/react-query';
import api from '../helpers/api';
import { getStorage, setStorage } from '../helpers/store';

export function useGetReposQuery(user: string) {
	const keyName = `getRepos${user}`;
	
	return useQuery({
		queryKey: [keyName],
		queryFn: async () => {
			const data = getStorage(keyName);
			if (data && data.length > 0) return data;
			const res = await api.get(`/users/${user}/repos`);
			if (res && res.data) {
				setStorage(keyName, res.data);
				return res.data;
			}
			return [];
		},
	});
}
