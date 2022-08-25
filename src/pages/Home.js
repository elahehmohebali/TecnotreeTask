import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

async function getImageURL()
{
	const json = await axios.get('https://random.dog/woof.json');
	if(json) return json.data.url;
	return '';
}

async function getImagesList (count)
{
	const list = [];
	for(let i = 0; i < count; ++i){
		const url = await getImageURL();
		if(url) list.push(url);
	}
	return list;
}

function Home() {
	const [imagesList, setImageList] = useState([]);
	const [refreshActive, setRefreshActive] = useState(true);
	const [favorites, setFavorites] = useState([]);
	
	const onRefresh = () => {
		console.log('GET 6 IMAGES');
		setRefreshActive(false);
		getImagesList(6).then((list) => {
			setImageList(list);
			setRefreshActive(true);
		});
	}

	const addToFavorites = (url) => {
		const favList = JSON.parse(localStorage.getItem('favorites') || '[]');
		if(!favList.includes(url)) favList.push(url);
		setFavorites(favList);
		localStorage.setItem('favorites', JSON.stringify(favList));
	};
	
	useEffect(() => {
		setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
		onRefresh();
	}, []);

    return (
		<div className="pt-4">
			<div className="container d-flex flex-column justify-content-center align-items-center h-100">
				<div className="row gy-2 gx-3" style={{ width: '720px' }}>
					{imagesList.map(url => {
						return (<div className="overflow-hidden position-relative" style={{ width: 'calc(100% / 3)', height: 'calc(240px - 2rem)' }} key={url}>
							{(favorites.includes(url) ? 
							<div className="position-absolute rounded-2 px-3 py-2" style={{ left:'50%' , top:'50%', transform: 'translate(-50%, -50%)', color:'white', backgroundColor:'rgba(0,0,0,0.5)' }}>Added!</div>
							: ''
							)}
							<a href="#" onClick={(e) => { e.preventDefault(); addToFavorites(url); }} className="d-block">
								<img src={url} className="d-block mx-auto" style={{ minWidth: '256px', maxWidth: '100%', minHeight: '256px' }} />
							</a>
						</div>)
					})}
				</div>
				<div className="row my-4 justify-content-center bg-light py-2" style={{ width: '720px' }}>
					<div className="col-auto"><button type="button" disabled={!refreshActive} onClick={()=> onRefresh()} className="btn btn-primary d-block" style={{ width: '160px' }}>Refresh</button></div>
					<div className="col-auto"><Link to="/favorites" className="btn btn-secondary" style={{ width: '160px' }}>My Favorites</Link></div>
				</div>
			</div>
    	</div>
	);
}

export default Home;
