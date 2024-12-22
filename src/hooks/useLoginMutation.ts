import { useMutation } from '@tanstack/react-query';
import api from '../helpers/api';
import { setStorage } from '../helpers/store';
import { useNavigate } from 'react-router-dom';

export function useLoginMutation() {
	const navigate = useNavigate();

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: (user: string) => {
			return api.get('/users/' + user);
		},
		onSuccess(data) {
			setStorage('logged', data.data);
			navigate('/home');
		},
	});

	return { mutate, isPending, isError, error };
}
