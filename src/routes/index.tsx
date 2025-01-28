import { createHashRouter } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Profile from '../pages/Profile/Profile';

export const router = createHashRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/profile/:login',
		element: <Profile />
	},
	{
		path: '/search',
		element: <Search />
	}
]);
