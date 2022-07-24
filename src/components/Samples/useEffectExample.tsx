import {useEffect} from "react";
import {useSelector} from "react-redux";

const App = () => {
    // @ts-ignore
    const cart = useSelector((state) => state.cart) // subscription to redux

    useEffect(() => {
        const sendCartData = async () => {
          const response = await  fetch(.....)

          if (!response.ok) {
              throw new Error('Sending cart data failed')
          }
          const responseData = await response.json()
            //if you then want to dispatch the reponse
            dispatch(addressActions.function())
    } // database call work...

    }, [cart, dispatch])
}