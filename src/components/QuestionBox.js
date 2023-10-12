import './styling/QuestionBox.css'



function QuestionBox(props) {

    return(
        <div className="QuestionBox" {...(!props.disabled && { onClick: props.onClick })}>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </div>
    )
}

export default QuestionBox