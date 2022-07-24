import TabContent from './TabContent'

const tabButtons = content => {
    return content.map(({id, onClickHandler, title}) => {
        return (
            <button key={id} className="tablinks" onClick={onClickHandler}>{title}</button>
        )
        })


}
const TabDisplay = props => {
    return (
        <>
            <div className="tab">
                {tabButtons(props.content)}
            </div>

            <TabContent content={props.content}/>
        </>
        )


}

export default TabDisplay;