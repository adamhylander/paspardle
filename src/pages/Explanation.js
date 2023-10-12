import './styling/Explanation.css'
import Subheader from '../components/Subheader';

function Explanation(){
    
    return(
        <div>
            <Subheader text={"Förklaring"} />
            <div className="ExplanationDiv">
                <h2 className='Title'>Vad är På-Spårdle?</h2>
                <div className='Text'>Det klassiska spelet, inspirerat av spelet Resan i tv-programmet På spåret fungerar som följt. Du ska med hjälp av ledtrådar gissa vilken svensk stad som vi är påväg mot. Ledtrådar utdelas på 10, 8, 6, 4 och 2 poäng. Du har 20 sekunder per poängnivå att trycka på ledtråden innan nästa dyker upp. Om du svarar rätt adderas poängen till din totala poäng och du får gissa på en ny destination med nya ledtrådar. Du har max 1 gissning på hela omgången. Ifall du gissar fel förloras omgången, utan möjlighet att gissa på lägre poäng.</div>

            </div>
        </div>
    )
}

export default Explanation; 

