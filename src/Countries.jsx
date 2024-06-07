import { useEffect } from "react";
import { useState } from "react";
const CountryCards = ({name,flagImg,flagAlt}) => {
    return (
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            padding:"10px",
            margin:"10px",
            border:"1px solid black",
            borderRadius:"8px",
            width:"200px",
            height:"200px",
        }}>
            <img src={flagImg} alt={flagAlt} style={{height:"100px",width:"100px"}} />
            <h2>{name}</h2>

        </div>

    )
}
export default function Countries(){
    const API ="https://restcountries.com/v3.1/all";
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.log("ERROR", error);
            }
        };

        fetchCountries();
    }, []);
    
    return (
        <div style={{
            display:"flex",
            flexWrap:"wrap",
            alignItems:"center",
            justifyContent:"center",
            height:"100vh",
             }}>
                {countries.map((country)=><CountryCards name={country.name.common} flagImg={country.flags.png} flagAlt={country.flags.alt} />)}
            
        </div>
    )
}
