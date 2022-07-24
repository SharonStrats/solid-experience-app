
const tabList = content => {
    return content.map(({ id, class, data}) => {
        return (
            <div id={id} className={class}>
                {data}
            </div>
        )
    })
}
const TabContent = props => {

    return (<>
        {tabList(props.content)}
    </>)
}

export default TabContent;