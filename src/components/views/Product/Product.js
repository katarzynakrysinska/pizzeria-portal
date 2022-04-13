import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchOneFromAPI, getOne } from '../../../redux/productsRedux.js';
import { addToCart } from '../../../redux/cartRedux.js';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './Product.module.scss';


const Component = ({className, product, addToCart}) => {

  const dispatch = useDispatch();
  const {id} = useParams();


  useEffect(() => {
    dispatch(fetchOneFromAPI(id));
  },[dispatch, id]);

  const addItemToCartObject = {
    _id: product && product._id,
    name: product && product.name,
    price: product && product.price,
  };

  const handleAddToCart = e => {
    e.preventDefault();
    addToCart(addItemToCartObject);
  };

  console.log(addItemToCartObject);

  

  if (product) {
    return (
      <div className="styles.root">
        <h1>Read more about the {product.name}</h1> 
        <div className={styles.item}> 
          <div className={clsx(className, styles.root)} fluid={'md'}>
            {product.text} {product.text} {product.text}
          </div>
          <div className={styles.image}>
            <img src={product.image2} alt="Example"></img>
          </div>
          <div className={styles.image}>
            <img src={product.image3} alt="Example"></img>
          </div>
        </div>
        <div className={styles.actions}>
          <button 
            onClick = {handleAddToCart}
            className={styles.button}>
              Add { product.name} to cart
          </button>
        </div>  
        
      </div>
    );
  }
  else {
    return (
      <span>Loading...</span>
      
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
    price: PropTypes.number,
    text: PropTypes.string,
  }),
  fetchOneFromApi: PropTypes.func,
  match: PropTypes.object,
  addToCart: PropTypes.func,

};


const mapStateToProps = state => ({
  product: getOne(state),
});

const mapDispatchToProps = dispatch => ({
  fetchOneFromAPI: (id) => dispatch(fetchOneFromAPI(id)),
  addToCart: arg => dispatch(addToCart(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};
