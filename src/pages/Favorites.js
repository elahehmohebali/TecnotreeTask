import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Favorites()
{
    const [favorites , setFavorites ] = useState([]);
    useEffect(() => {
		setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
	}, []);
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
            <h1 class="text-align-center h1 mb-4">My Favorites</h1>
            <div className="row gy-2 gx-3 justify-content-center" style={{ width: '720px' }}>
                {favorites.map(url => (<div className="overflow-hidden position-relative" style={{ width: 'calc(100% / 3)', height: 'calc(240px - 2rem)' }} key={url}>
                    <img
                        src={url}
                        className="d-block mx-auto"
                        style={{ minWidth: '256px', maxWidth: '100%', minHeight: '256px' }}
                    />
                </div>))}
            </div>
            <div className="row my-4 justify-content-center py-2" style={{ width: '720px' }}>
                <div className="col-auto"><Link to="/" className="btn btn-primary" style={{ width: '160px' }}>Back</Link></div>
            </div>
        </div>
    );
}
export default Favorites;