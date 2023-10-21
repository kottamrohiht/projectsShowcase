import './index.css'

const EachItem = props => {
  const {item} = props
  const {imageUrl, name} = item

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="item-img" />
      <p className="item-heading"> {name} </p>
    </li>
  )
}

export default EachItem
