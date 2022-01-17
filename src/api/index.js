export const BASE_URL = 'https://radiant-fjord-00657.herokuapp.com/api';

export async function fetchRegisterUser(url, username, password, email) {
    try {
        const response = await fetch(`${url}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "email": email
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function editUser(url, userToken,  email, password) {
    try {
        const response = await fetch(`${url}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify({
                ...(email && {email: email}), 
                ...(password && {password: password})
              }
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function makeAdmin(url, userToken, admin) {
    const actObj = {}
    if (admin) {
        actObj["admin"] = admin;
    }
   
    try {
        const response = await fetch(`${url}/user/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function removeAdmin(url, userToken, admin) {
    const actObj = {}
    if (admin) {
        actObj["admin"] = admin;
    }
   
    try {
        const response = await fetch(`${url}/user/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function deleteUser(url, userToken ) {
   
    try {
        const response = await fetch(`${url}/user/me`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchLoginUser(url, username, password) {
    try {
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllProducts() {
    try {
        const response = await fetch(`${BASE_URL}/product`)
        const results = await response.json()
        const products = await results
        return products
    } catch (error) {
        console.error(error);
    }
}


export async function createProduct(url, userToken, name, description, category, quantity, price, photo) {
    const actObj = {
        "name": name,
        "description": description,
        "category": category,
        "quantity": quantity,
        "price": price,
        "photo": photo
    }
    try {
        const response = await fetch(`${url}/product`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUsersCart(usersId, userToken) {
    try {
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await fetch(`${BASE_URL}/users/${usersId}/cart`, headers)
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function fetchUsersCartItems(id, userToken) {
    try {
        const response = await fetch(`${BASE_URL}/cart/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function createCartItems(userToken, cartId, product_id, item_quantity, price, userId) {
    const actObj = {
        "cartId": cartId,
        "product_id": product_id,
        "item_quantity": item_quantity,
        "price": price,
        "userId": userId
    }
    try {
        const response = await fetch(`${BASE_URL}/cart_items`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}
export async function deleteProduct(url, SelectedProduct, userToken ) {
    try {
        const response = await fetch(`${url}/product/${SelectedProduct}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        const results = await response.json();
        return results
    } catch (error) {
        console.error(error);
    }
}



export async function editThisProduct(url, SelectedProduct, userToken, name, description, category, quantity, price, photo) {
    const actObj = {}
    if (name) {
        actObj["name"] = name;
    }
    if (description) {
        actObj["description"] = description;
    }
    if (category) {
        actObj["category"] = category;
    }
    if (quantity) {
        actObj["quantity"] = quantity;
    }
    if (price) {
        actObj["price"] = price;
    }
    if (photo) {
        actObj["photo"] = photo;
    }
    try {
        const response = await fetch(`${url}/product/${SelectedProduct}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function fetchAllUsers(userToken) {
    try {
        const response = await fetch(`${BASE_URL}/users/allUsers`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function checkCartByProduct(userToken, userId, cartId, product_id) {
    try {
        const response = await fetch(`${BASE_URL}/cart/cart_check/${userId}/${cartId}/${product_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            })
        const results = await response.json()
        const products = await results
        return products
    } catch (error) {
        console.error(error);
    }
}

export async function updateItemQuantity(userToken, userId, cartItemId, item_quantity) {
    try {
        const actObj = {
            "cartItemId": cartItemId,
            "item_quantity": item_quantity,
            "userId": userId
        }
        const response = await fetch(`${BASE_URL}/cart_items/cartItemUpdate`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        const products = await results
        return products
    } catch (error) {
        console.error(error);
    }
}

export async function checkByProduct(userToken, product_id) {
    try {
        const response = await fetch(`${BASE_URL}/product/${product_id}`,
            {
                headers: {
                    "Content-Type": "application/json",

                }
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function setCartInactive(userToken, userId, cartId) {
    try {
        const actObj = {
            "userId": userId
        }
        const response = await fetch(`${BASE_URL}/cart/cartInactive/${cartId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        const products = await results
        return products
    } catch (error) {
        console.error(error);
    }
}

export async function createOrderHistory(userToken, userId, cartId, fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv) {
    const actObj = {
        userId: userId,
        cartId: cartId,
        fullname: fullname,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        cardname: cardname,
        cardnumber: cardnumber,
        expmonth: expmonth,
        expyear: expyear,
        cvv: cvv
    };
    try {
        const response = await fetch(`${BASE_URL}/order_history`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function createNewCart(userToken, userId, email, street, city, state, zip) {
    const actObj = {
        userId: userId,
        email: email,
        street: street,
        city: city,
        state: state,
        zip: zip
    };
    try {
        const response = await fetch(`${BASE_URL}/cart/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function checkAnonymousUser(fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv) {
    const actObj = {
        fullname: fullname,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        cardname: cardname,
        cardnumber: cardnumber,
        expmonth: expmonth,
        expyear: expyear,
        cvv: cvv
    };
    try {
        const response = await fetch(`${BASE_URL}/users/anonymouslogin/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    actObj
                )
            })
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}

export async function fetchOrderHistory(usersId, userToken) {
    try {
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        }
        const response = await fetch(`${BASE_URL}/order_history/${usersId}`, headers)
        const results = await response.json()
        return results
    } catch (error) {
        console.error(error)
    }
}