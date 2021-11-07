import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { BASE_URL, createCartItems, checkCartByProduct, updateItemQuantity} from '../api'
import EditProduct from './EditProduct';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const IndividualProduct = ({setCartDisplayNumber, userToken, isAdmin, allProducts, setAllProducts, selectedProduct, setProductName, setProductDescript, setProductPrice, setProductCategory, setProductQuantity, setProductPhoto, allCartItem, setAllCartItem}) => {
    console.log('=====>', allCartItem);
    const [isActiveEdit, setActiveEdit] = useState("false");
    const [valueQuant, setValueQuant] = useState(0);
    const ToggleClass = () => {
        setActiveEdit(!isActiveEdit);
    };
    const { productid } = useParams();
    const filteredProduct = allProducts.filter(product => {
        return parseInt(productid) == product.id
    })[0];
    
    const Removehandler = (e)=>{
        e.preventDefault()
        if(valueQuant>0){
        setValueQuant(valueQuant - 1)
        }    
    }
    const Addhandler = (e)=>{
        e.preventDefault()
        if(valueQuant<filteredProduct.quantity){
        setValueQuant(valueQuant + 1)}
    }
    async function SubmitHandler (e) {
        e.preventDefault();
        const cartId = JSON.parse(localStorage.getItem('Cart')) ? JSON.parse(localStorage.getItem('Cart')).id : null
        const userId = JSON.parse(localStorage.getItem('userId'))
        if(!userToken){
            const checkLocalStorageCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
            if(checkLocalStorageCart.filter(item=>item.product_id === filteredProduct.id).length > 0){
                const cartIndex = checkLocalStorageCart.findIndex((obj=>obj.product_id === filteredProduct.id))
                checkLocalStorageCart[cartIndex].item_quantity += valueQuant
                localStorage.setItem('cartItems', JSON.stringify(checkLocalStorageCart));
                const countNumbers=[];
                let sum = 0;
                checkLocalStorageCart.map(
                    (item)=>{
                        countNumbers.push(item.item_quantity);
                    }
                )
                for(let i=0; i<countNumbers.length; i++){
                    sum += parseInt(countNumbers[i]);
                }
                setCartDisplayNumber(sum);
                localStorage.setItem('cartDisplayNumb', sum)
                setAllCartItem(checkLocalStorageCart)
                setValueQuant(0);
            } else {
                const productItem = { product_id:filteredProduct.id, item_quantity:valueQuant, price:filteredProduct.price, };
                checkLocalStorageCart.push(productItem);
                localStorage.setItem('cartItems', JSON.stringify(checkLocalStorageCart));
                
                const countNumbers=[];
                let sum = 0;
                checkLocalStorageCart.map(
                    (item)=>{
                        countNumbers.push(item.item_quantity);
                    }
                )
                for(let i=0; i<countNumbers.length; i++){
                    sum += parseInt(countNumbers[i]);
                }
                setCartDisplayNumber(sum);
                localStorage.setItem('cartDisplayNumb', sum)
                setAllCartItem(checkLocalStorageCart)
                setValueQuant(0);

            }
            }
        else {console.log('here?')
                try{
                const productCheck = await checkCartByProduct(userToken, userId, cartId, filteredProduct.id)     
                if(productCheck && productCheck.length){
                    const countNumbers=[];
                    let sum = 0;
                    const quantity = productCheck[0].item_quantity + valueQuant
                    const updateItem = await updateItemQuantity(userToken, userId, productCheck[0].id, quantity)
                    const updatedAllCart = allCartItem.map(
                        (item)=>{
                            if (item.product_id === filteredProduct.id){
                                return updateItem[0]
                            } else {
                                return item
                            }
                        }
                    )
                    updatedAllCart.map(
                        (item)=>{
                            countNumbers.push(item.item_quantity);
                        }
                    )
                    for(let i=0; i<countNumbers.length; i++){
                        sum += parseInt(countNumbers[i]);
                    }
                    setCartDisplayNumber(sum);
                    localStorage.setItem('cartDisplayNumb', sum)
                    setAllCartItem(updatedAllCart);
                    setValueQuant(0);
                } else {
                    const createItem = await createCartItems(userToken, cartId, filteredProduct.id, valueQuant, filteredProduct.price, userId);
                    const newArr = [...allCartItem, createItem]
                    setAllCartItem(newArr);
                    localStorage.setItem('cartItems', JSON.stringify(newArr))
                    const countNumbers=[];
                        let sum = 0;
                        newArr.map(
                            (item)=>{
                                countNumbers.push(item.item_quantity);
                            }
                        )
                        for(let i=0; i<countNumbers.length; i++){
                            sum += parseInt(countNumbers[i]);
                        }
                        setCartDisplayNumber(sum);
                        localStorage.setItem('cartDisplayNumb', sum)
                }
            }
            catch(error){
                console.error(error)
            }
        }
    }
    return (
        <> {filteredProduct?
            <div className="ip">
                <div className="individualContainer" key={filteredProduct.id}>
                        <div className="showbox">
                            <div className="ipText">
                                <h2 className="innerboxTextName"> {filteredProduct.name}</h2>
                                <img className="prodPhoto"src={filteredProduct.photo} alt="a picture of product" width="300" height="400" />
                                <p className="innerText"> {filteredProduct.description}</p>
                                <p className="innerText">Price:$ {filteredProduct.price}</p>
                                <p className="innerText">Available Quantity: {filteredProduct.quantity}</p>
                                <form className="addRemoveProduct" onSubmit={(e)=>{
                                    SubmitHandler(e)
                                }}>
                                    <div className="quantBox"> 
                                        <button className="removeProduct" onClick={e =>Removehandler(e)}><RemoveIcon /></button>
                                        <input className="quantNumber"type="number" min="1" value={valueQuant} onChange={ event=> {setValueQuant(parseInt(event.target.value))}}></input>
                                        <button className="addProduct" onClick={e => Addhandler(e)}><AddIcon /></button>
                                        <button className="submitBtn" type="submit"><CheckIcon /></button>
                                    </div>  
                                </form>
                            </div> 
                        {isAdmin
                        ?
                        (<div>
                            <button className="edit button" 
                            onClick={ToggleClass}>
                                <EditIcon></EditIcon>
                            </button>
                        </div>)
                        :
                        (<div></div>)
                        }
                        {isAdmin
                        ?
                        (<div className="iaInteractiveBox">
                                <div 
                                className={`editFeild-${isActiveEdit ? "inactive" : "active"}`}
                                >
                                    <EditProduct 
                                        userToken={userToken} 
                                        allProducts={allProducts} 
                                        setAllProducts={setAllProducts} 
                                        selectedProduct={selectedProduct}
                                        ToggleClass={ToggleClass}                             
                                        setProductName={setProductName}                                             
                                        setProductDescript={setProductDescript}
                                        setProductPrice={setProductPrice} 
                                        setProductCategory={setProductCategory} 
                                        setProductQuantity={setProductQuantity} 
                                        setProductPhoto={setProductPhoto}
                                        productId={productid}
                                    />
                                </div>
                        </div>)
                        :
                        (<div></div>)
                        }
                    </div> 
                </div>
                    
                
            </div>:null}
        </>
    )
} 
export default IndividualProduct; 