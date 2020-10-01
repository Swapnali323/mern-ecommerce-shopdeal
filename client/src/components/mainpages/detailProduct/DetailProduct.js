import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GobalState} from '../../../GobalState'
import {Link} from 'react-router-dom'
import ProductContainer from '../../utils/productContainer/ProductContainer'



export default function DetailProduct() {
    const value = useContext(GobalState)
    const params = useParams()
    const [isLogged] = value.isLogged
    
    const [products] = value.products
    const [product, setProduct] = useState([])
    const [related, setRelated] = useState([])

    const addCart = value.addCart
    const user = {
        display: isLogged ? 'inline-block' : 'none'
    }

    useEffect(() =>{
        if(params){
            const newData = products.filter(item =>{
                return item._id === params.id
            })
            const related = products.filter(item =>{
                return item.category === newData[0].category
            })
            setProduct(newData)
            setRelated(related)
        }
    },[params,products])

    return (
        <>
            {
                product.map(item => (
                    <div className="details" key={item._id}>
                        <img src={item.images.url} alt=""/>
                        <div className="box-details">
                            <div className="row">
                                <h2>{item.title}</h2>
                                {/* <h6>#id: {item.product_id}</h6> */}
                            </div>
                            <h3>Rs.{item.price}</h3>
                            <p className="content">{item.content}</p>
                            <p>{item.description}</p>
                            
                            <p>Sold: {item.sold}</p>
                            {/* <li style={{display:isLogged? <Link to="/cart" className="cart"
                            onClick={() => addCart(item._id)}>
                                Add to Cart
                            </Link> 
                            :<Link to="/login" className="cart"
                            onClick={() => addCart(item._id)}>
                                Add to Cart
                            </Link>   }}>

                            </li> */}
                            <Link to="/cart" className="cart"
                            onClick={() => addCart(item._id)}>
                                Add to Cart
                            </Link>
                            
                        </div>
                    </div>
                ))
            }
            
            <div className="related_products">
                <h2>Related products</h2>
                <ProductContainer
                    productsOutside={related}
                    addCart={addCart}
                    />
            </div>
        </>
    )
}
