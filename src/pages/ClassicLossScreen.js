import "./styling/ClassicLossScreen.css"

function ClassicalLossScreen(props){

    return(
        <div className="container">
            <h2 className="LossHeader">Du hade tyvärr fel. Rätt svar var {props.answer}</h2>
            <div className="Results">
                <h3 className="resultHeader">Det här blev ditt resultat</h3>
                <div className="result">Du fick {props.points} poäng</div>
                <div className="result">Det tog {props.time} sekunder</div>
                <div className="result">Du var på runda {props.round}</div>
            </div>
        </div>
    )
}

export default ClassicalLossScreen;