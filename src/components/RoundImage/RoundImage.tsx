import './RoundImage.scss'

function RoundImage({ url, size }: any) {
    return (
        <div className={`round-image ${size}`}>
            <img src={url} />
        </div>
    )
}

export default RoundImage