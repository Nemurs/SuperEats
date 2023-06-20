import BusinessIndexItem from "../BusinessIndexItem"
import './BusinessIndex.css'

const BusinessIndex = ({businesses, small}) =>  {
    if (!businesses) return (<></>)

    return (
        <div className="businessIndex">
            {businesses.map((business) => (
                <BusinessIndexItem
                    key={business.id} business={business} small={small}
                />
            ))}
        </div>
    )
}

export default BusinessIndex
