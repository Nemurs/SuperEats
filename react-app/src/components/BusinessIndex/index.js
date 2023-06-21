import { useEffect, useState } from "react";
import BusinessIndexItem from "../BusinessIndexItem"
import './BusinessIndex.css'

const BusinessIndex = ({businesses, small}) =>  {
    // console.log(businesses)
    const [businessesActive, setBusinessesActive] = useState(businesses);

    useEffect(()=>{
        // console.log("old", businessesActive)
        // console.log("new", businesses)
        setBusinessesActive(businesses)
    },[businesses])
    if (!businesses) return (<></>)

    return (
        <div className="businessIndex">
            {businessesActive.map((business) => (
                <BusinessIndexItem
                    key={business.id} business={business} small={small}
                />
            ))}
        </div>
    )
}

export default BusinessIndex
