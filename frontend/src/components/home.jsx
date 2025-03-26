import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { ReactTyped } from 'react-typed';



const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data_get, setData ] = useState([]);
    const [data_featured , setFeature ] = useState([]);

    const csrfToken = document.cookie.split('=')[1];  

    console.log(csrfToken);

    const fetchData = async () => {

        try {

            const response = await fetch('http://127.0.0.1:8080/show_categories', {

                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  
                },
                credentials: 'same-origin', 

            });

            const data = await response.json();

            console.log("Data fetched:", data);

            setData(data.data);
            setFeature(data.feature);

        } catch (error) {

            console.log("Error:", error);
        }
    };
    

    useEffect(() => {
        fetchData();
        setLoading(false);

    }, []);
    

    if (loading) {
        return (
            <div className="root_loader">
                <div className="loader">
                    <div className="box box0">
                      <div></div>
                    </div>
                    <div className="box box1">
                      <div></div>
                    </div>
                    <div className="box box2">
                      <div></div>
                    </div>
                    <div className="box box3">
                      <div></div>
                    </div>
                    <div className="box box4">
                      <div></div>
                    </div>
                    <div className="box box5">
                      <div></div>
                    </div>
                    <div className="box box6">
                      <div></div>
                    </div>
                    <div className="box box7">
                      <div></div>
                    </div>
                    <div className="ground">
                      <div></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">

            <div className="hero-section text-center text-light py-5" style={styles.hero}>
                <div className="frame">
                    <label className="display-4 ">
                    <ReactTyped
                            strings={['Welcome to EchoMarket']}
                            typeSpeed={70} 
                            backSpeed={30} 
                            loop={true} 
                        />
                    </label>
                    <p className="lead">Discover the best deals, top brands, and exciting offers!</p>
                </div>
            </div>

            {/* Categories Section */}
            <section className="categories-section py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Shop by Category</h2>

                    <hr />
                    <br />
                    <br />

                    <div className="row">

                    {data_get.map((item) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={item.id} id='images-block'>
                                <div className="card shadow-sm h-100">
                                    <img 
                                        src= {`http://localhost:8000/${item.image}`}
                                        className="card-img-top" 
                                        alt={item.category} 
                                        
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{item.category}</h5>
                                        <button className="btn btn-outline-primary">Explore</button>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4">Featured Products</h2>

                    <hr />

                    <br />

                    <br />

                    <div className="row">
                        {data_featured.map((item) => (
                            <div className="col-md-3 col-sm-6 mb-4" key={item} id='images-block'>
                                <div className="card shadow-sm h-100">
                                    <img
                                        src = {`http://localhost:8000/${item.image}`}
                                        className="card-img-top"
                                        alt={`Product ${item.category}`}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{item.category}</h5>
                                        <p className="card-text">Rs.{item.price}</p>
                                        <button className="btn btn-primary">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const styles = {
    hero: {
        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
};

export default Home;
