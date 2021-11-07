import React from 'react';
import FeaturedProducts from './FeaturedProducts';

const Home = ({userToken, myUsername, isAdmin, allProducts, setselectedProduct}) => {
    return (
        <>
            <div className="home">
                {userToken ?
                    <div className="message">
                        <div className="welcome">
                            <h1 className="userName">Welcome Back To</h1>
                            <h1 className="shopName">McLovin's Scents</h1>
                            <h1 className="userName">{myUsername}</h1>
                        </div>    
                            <p className="slogan">Let's get to smellin' good</p>
                    </div>
                :
                    <div className="message">
                        <div className="welcome">
                            <h1 className="userName">Welcome To</h1>
                            <h1 className="shopName"> McLovin's Scents </h1>
                        </div>    
                            <p className="slogan">Appeal to your nostrils</p>
                    </div>
                }
            </div>
            <FeaturedProducts
				isAdmin={isAdmin}
				allProducts={allProducts}
                setselectedProduct={setselectedProduct}
			/>
        </>
    ) 
}

export default Home; 