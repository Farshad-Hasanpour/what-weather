import axios from 'axios';

export const fetchCities = async namePrefix => {
	if(!namePrefix) return [];
	const res = await axios.get(process.env.REACT_APP_CITY_API_URL, {
		params: {
			types: 'CITY',
			namePrefix
		},
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_CITY_API_KEY,
			'X-RapidAPI-Host': process.env.REACT_APP_CITY_API_HOST
		}
	});

	return res.data.data.map(city => city.name);
};