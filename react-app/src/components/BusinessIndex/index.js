import BusinessIndexItem from "../BusinessIndexItem"
import './BusinessIndex.css'

const BusinessIndex = ({businesses}) =>  {
    if (!businesses) return (<></>)

    return (
        <div className="businessIndex">
            {businesses.map((business) => (
                <BusinessIndexItem
                    key={business.id} business={business}
                />
            ))}
        </div>
    )
}

export default BusinessIndex
