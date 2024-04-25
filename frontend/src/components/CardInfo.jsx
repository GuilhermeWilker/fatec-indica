export default function CardInfo({ title, content }) {
    return (
        <div className='content__card-info'>
            <div className="line"></div>
            <h3 className="card-info__title">{title}</h3>
            <p>{content}</p>
        </div>
    )
}