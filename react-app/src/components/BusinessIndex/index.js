import { useEffect, useState } from "react";
import BusinessIndexItem from "../BusinessIndexItem"
import './BusinessIndex.css'

const BusinessIndex = ({businesses, small}) =>  {
    const [businessesActive, setBusinessesActive] = useState(businesses);

    useEffect(()=>{
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
