import React, {useState, useEffect} from 'react';
import './App.css';

import {fetchWeather} from "./api/fetchWeather";
import {fetchCities} from "./api/fetchCities";

function App() {
	const [search, setSearch] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [cityOptions, setCityOptions] = useState([]);
	const [weather, setWeather] = useState({});

	useEffect(() => {
		clearTimeout(searchTimeout);
		setSearchTimeout(
			setTimeout(async () => {
				try{
					setCityOptions(await fetchCities(search));
				}catch(err){
					console.error(err)
				}
			}, 500)
		)
	}, [search, fetchCities])

	const handleSubmit = async e => {
		e.preventDefault();
		const data = await fetchWeather(search);
		setWeather(data);
		setSearch('');
	};

	return (
		<form className="main-container" onSubmit={handleSubmit}>
			{cityOptions.join(', ')}
			<input
				type="text"
				className="search"
				placeholder="search..."
				value={search}
				onInput={(e) => setSearch(e.target.value)}
			/>
			{weather.main && (
				<div className="city">
					<h2 className="city-name">
						<span>{weather.name}</span>
						<sup>{weather.sys.country}</sup>
					</h2>
					<div className="city-temp">
						{Math.round(weather.main.temp)}
						<sup>&deg;C</sup>
					</div>
					<div className="info">
						<img
							className="city-icon"
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							alt={weather.weather[0].description}
						/>
						<p>{weather.weather[0].description}</p>
					</div>
				</div>
			)}
		</form>
	);
}

export default App;
