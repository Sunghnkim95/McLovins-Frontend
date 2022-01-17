import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Profile, Products, Header, Home, IndividualProduct, Login, Register, Cart, Checkout, Confirmation, OrderHistory } from './component';
import { getCurrentUserToken, getIsAdmin } from './auth'
import { fetchAllProducts, fetchUsersCartItems } from './api'
import './style.css'


const App = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [userToken, setUserToken] = useState(getCurrentUserToken());
	const [myUsername, setMyUsername] = useState(localStorage.getItem('myUsername') ? localStorage.getItem('myUsername').slice(1, -1) : null);
	const [isAdmin, setIsAdmin] = useState(getIsAdmin());
	const [myPassword, setMyPassword] = useState('');
	const [myEmail, setMyEmail] = useState(localStorage.getItem('email') ? localStorage.getItem('email') : null);
	const [hiddenPass, setHiddenPass ]= useState(localStorage.getItem('hiddenPass') ? localStorage.getItem('hiddenPass') : null);
	const [selectedProduct, setselectedProduct] = useState(getProdId());
	const [productName, setProductName] = useState("");
	const [productDescript, setProductDescript] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productQuantity, setProductQuantity] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productPhoto, setProductPhoto] = useState("");
	const [allCartItem, setAllCartItem] = useState([]);
	const [userId, setUserId] = useState("");
	const [featuredProds, setFeaturedProds] = useState([]);
	const [cartDisplayNumber, setCartDisplayNumber] = useState(localStorage.getItem('cartDisplayNumb') ? localStorage.getItem('cartDisplayNumb') : null);

	function productID(prod_ID) {
		localStorage.removeItem('prodId');
		localStorage.setItem('prodId', JSON.stringify(prod_ID));
	}
	function getProdId() {
		const selectedProductID = JSON.parse(localStorage.getItem('prodId'));
		return selectedProductID;
	}
	useEffect(() => {
		fetchAllProducts()
			.then((allProducts) => {
				setAllProducts(allProducts);
				const arr = [];
				for (let i = 0; i < allProducts.length; i++) {
					const randomProd = Math.floor(Math.random() * allProducts.length)
					arr.push(allProducts[randomProd])
				}
				const ids = arr.map(o => o.id)
				const filtered = arr.filter(({ id }, index) => !ids.includes(id, index + 1))
				filtered.length = 4;
				setFeaturedProds(filtered);
			})
			.catch(error => console.error(error))

		if (JSON.parse(localStorage.getItem('userId')) && userToken) {
			const userId = JSON.parse(localStorage.getItem('userId'))
			fetchUsersCartItems(userId, userToken)
				.then((allCartItem) => {
					setAllCartItem(allCartItem);
					localStorage.setItem('cartItems', JSON.stringify(allCartItem));
				})
				.catch(error => console.error(error))
		}
		if (JSON.parse(localStorage.getItem('userId'))) {
			setUserId(JSON.parse(localStorage.getItem('userId')))
		}
		if (!userToken) {
			setAllCartItem(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
		}
	}, []);

	return (
		<Router>
			<div className="app">
				<Header
					userToken={userToken}
					setUserToken={setUserToken}
					setMyUsername={setMyUsername}
					setIsAdmin={setIsAdmin}
					setUserId={setUserId}
					setMyEmail={setMyEmail}
					cartDisplayNumber={cartDisplayNumber}
					setCartDisplayNumber={setCartDisplayNumber}
					setAllCartItem={setAllCartItem}
				/>
				{userToken
					?
					(<div className="backdrop">
						<Switch>
							<Route exact path="/">
								<Home
									userToken={userToken}
									myUsername={myUsername}
									isAdmin={isAdmin}
									allProducts={featuredProds}
									setselectedProduct={setselectedProduct}
								/>
							</Route>
							<Route exact path="/home">
								<Home
									userToken={userToken}
									myUsername={myUsername}
									isAdmin={isAdmin}
									allProducts={featuredProds}
									setselectedProduct={setselectedProduct}
								/>
							</Route>
							<Route exact path="/user/me">
								<Profile
									myUsername={myUsername}
									isAdmin={isAdmin}
									myPassword={myPassword}
									setMyPassword={setMyPassword}
									myEmail={myEmail}
									setMyEmail={setMyEmail}
									userToken={userToken}
									hiddenPass={hiddenPass} 
									setHiddenPass={setHiddenPass}
								/>
							</Route>
							<Route exact path="/product">
								<Products
									userToken={userToken}
									allProducts={allProducts}
									setAllProducts={setAllProducts}
									setselectedProduct={setselectedProduct}
									productID={productID}
									isAdmin={isAdmin}
								/>
							</Route>
							<Route path="/product/:productid">
								<IndividualProduct
									allProducts={allProducts}
									setAllProducts={setAllProducts}
									userToken={userToken}
									selectedProduct={selectedProduct}
									productName={productName}
									setProductName={setProductName}
									productDescript={productDescript}
									setProductDescript={setProductDescript}
									productPrice={productPrice}
									setProductPrice={setProductPrice}
									productCategory={productCategory}
									setProductCategory={setProductCategory}
									productQuantity={productQuantity}
									setProductQuantity={setProductQuantity}
									productPhoto={productPhoto}
									setProductPhoto={setProductPhoto}
									isAdmin={isAdmin}
									key={window.location.pathname}
									allCartItem={allCartItem}
									setAllCartItem={setAllCartItem}
									setCartDisplayNumber={setCartDisplayNumber}
								/>
							</Route>
							<Route exact path="/cart">
								<Cart
									userToken={userToken}
									allProducts={allProducts}
									allCartItem={allCartItem}
									isAdmin={isAdmin}
									setAllCartItem={setAllCartItem}
									userId={userId}
									cartDisplayNumber={cartDisplayNumber}
									setCartDisplayNumber={setCartDisplayNumber}
								/>
							</Route>
							<Route exact path="/checkout">
								<Checkout
									userToken={userToken}
									userId={userId}
									setAllCartItem={setAllCartItem}
								/>
							</Route>
							<Route exact path="/order_history">
								<OrderHistory
								/>
							</Route>
							<Route exact path="/confirmation">
								<Confirmation
								/>
							</Route>
							
						</Switch>
					</div>)
					:
					(<div className="backdrop" >
						<Switch>
							<Route exact path="/">
								<Home
									userToken={userToken}
									myUsername={myUsername}
									isAdmin={isAdmin}
									allProducts={featuredProds}
									setselectedProduct={setselectedProduct}
								/>
							</Route>
							<Route exact path="/home">
								<Home
									userToken={userToken}
									myUsername={myUsername}
									isAdmin={isAdmin}
									allProducts={featuredProds}
									setselectedProduct={setselectedProduct}
								/>
							</Route>
							<Route exact path="/product">
								<Products
									userToken={userToken}
									allProducts={allProducts}
									setAllProducts={setAllProducts}
									setselectedProduct={setselectedProduct}
									productID={productID} />
							</Route>
							<Route path="/product/:productid">
								<IndividualProduct
									allProducts={allProducts}
									setAllProducts={setAllProducts}
									userToken={userToken}
									selectedProduct={selectedProduct}
									productName={productName}
									setProductName={setProductName}
									productDescript={productDescript}
									setProductDescript={setProductDescript}
									productPrice={productPrice}
									setProductPrice={setProductPrice}
									productCategory={productCategory}
									setProductCategory={setProductCategory}
									productQuantity={productQuantity}
									setProductQuantity={setProductQuantity}
									productPhoto={productPhoto}
									setProductPhoto={setProductPhoto}
									isAdmin={isAdmin}
									key={window.location.pathname}
									allCartItem={allCartItem}
									setAllCartItem={setAllCartItem}
									setCartDisplayNumber={setCartDisplayNumber}
								/>
							</Route>
							<Route path="/register">
								<Register
									setUserToken={setUserToken}
									myUsername={myUsername}
									setMyUsername={setMyUsername}
									myPassword={myPassword}
									setMyPassword={setMyPassword}
									myEmail={myEmail}
									setMyEmail={setMyEmail} />
							</Route>
							<Route path="/login">
								<Login
									myUsername={myUsername}
									setMyUsername={setMyUsername}
									myPassword={myPassword}
									setMyPassword={setMyPassword}
									setUserToken={setUserToken}
									setIsAdmin={setIsAdmin}
									userId={userId}
									setUserId={setUserId}
									setAllCartItem={setAllCartItem}
									myEmail={myEmail}
									setMyEmail={setMyEmail}
									cartDisplayNumber={cartDisplayNumber}
									setCartDisplayNumber={setCartDisplayNumber}
									allCartItem={allCartItem}
									userToken={userToken}
								/>
							</Route>
							<Route exact path="/cart">
								<Cart
									userToken={userToken}
									allProducts={allProducts}
									allCartItem={allCartItem}
									isAdmin={isAdmin}
									setAllCartItem={setAllCartItem}
									userId={userId}
									cartDisplayNumber={cartDisplayNumber}
									setCartDisplayNumber={setCartDisplayNumber}
								/>
							</Route>
							<Route exact path="/checkout">
								<Checkout
									userToken={userToken}
									userId={userId}
									setAllCartItem={setAllCartItem}
								/>
							</Route>
							<Route exact path="/confirmation">
								<Confirmation
								/>
							</Route>
						</Switch>
					</div>)
				}
			</div>
		</Router>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))