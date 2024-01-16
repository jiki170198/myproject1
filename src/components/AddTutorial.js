import { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
    const initialTutorialState = {
        name: "",
        mark: ""
    };
    const [student, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutorial({ ...student, [name]: value });
    };

    const saveTutorial = () => {
        //get data from student
        const data = {
            name: student.name,
            mark: student.mark
        }

        //call api to create new Tutorial
        TutorialDataService.createNewTutorial(data)
            .then(response => {
                console.log("test res");
                setTutorial({
                    id: response.data.id,
                    name: response.data.name,
                    mark: response.data.mark
                });
                setTutorial({
                    name: "",
                    mark: ""
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>


            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={student.name}
                    onChange={handleInputChange}
                    name="name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="mark">Mark</label>
                <input
                    type="text"
                    className="form-control"
                    id="mark"
                    required
                    value={student.mark}
                    onChange={handleInputChange}
                    name="mark"
                />
            </div>

            <button onClick={saveTutorial} className="btn btn-success">
                Submit
            </button>
        </div>
    );

};

export default AddTutorial;