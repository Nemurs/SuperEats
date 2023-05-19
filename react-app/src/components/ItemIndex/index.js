import ItemIndexItem from "../ItemIndexItem"
import './ItemIndex.css'

const ItemIndex = ({items}) =>  {
    if (!items) return (<></>)

    return (
        <div className="itemIndex">
            {items.map((item) => (
                <ItemIndexItem
                    key={item.id} item={item}
                />
            ))}
        </div>
    )
}

export default ItemIndex
