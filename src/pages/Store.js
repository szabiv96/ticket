import { Row, Col } from "react-bootstrap";
import { Container } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";



function Store() {

    // tolunk egy fetchelést mielőtt elkezdünk dolgozni a termékekkel
    //useEffect és useState méég annyira nem értem pontosan hogyan is működik
    const [products, setProducts] = useState([]);

    useEffect(() => { 
        fetch('http://127.0.0.1:5000/ticket') //szükséges a teljes elérési útvonal a CORS engedélye miatt
            .then((response) => response.json())
            .then((data) => {
                console.log("micsoda ? : ", data);
                setProducts(data);
            })
            .catch(console.error);
    }, []);
    // fetch vége


    return (
        <>
            <h1>Welcome to the store!</h1>
            <Container>
                {products.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Container>
        </>
    )
}

export default Store;