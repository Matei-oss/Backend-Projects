import React, {useState} from "react";
import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/icons/Fab';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props){  
    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    function handleChange(event){
        const {name, value} = event.target;
        setNote(prevNote => {
            return{
                ...prevNote,
                [name]: value
            }
        })

    }

    function submitNote(event){
        event.preventDefault();
        setNote({
            title: "",
            content: ""
        });
        props.onAdd(note);
    }

    function expand(){
        setExpanded(true);
    }
    return (
        <div>
            <form className="create-note">

                {isExpanded ? <input name="title" onChange={handleChange} value={note.title} placeholder="Title"/> : null }

                <textarea onClick={expand} name="content" onChange={handleChange} value={note.content} placeholder="Take a note.." rows={isExpanded ? 3 : 1} />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;