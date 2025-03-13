import InputCity from "./InputCity";
import '../styles/InputSide.css';


const InputSide = () => {


    return (
        <>
        <div className="input_side">
            <p className="input_child input_description">Use our weather app to see the weather around the world</p>
            <InputCity className="input_child input_components"/>
       </div> 
       </>
    )
}
export default InputSide;