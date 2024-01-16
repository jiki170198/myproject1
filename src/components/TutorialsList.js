import { useEffect, useState } from "react";
import TutorialDataService from "../services/TutorialService";

const TutorialsList = () => {
    const [students, setTutorials] = useState([]);

    //call api to fill data into students
    useEffect(() => {
        retrieveTutorials();
    }, []);

    const retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then(response => {
                setTutorials(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <h2>Students Mark</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mark</th>
                    </tr>
                </thead>
                <tbody>

                    {students && students.map((student, index) => (
                        <tr>
                            <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.mark}</td>
                            <td></td>
                        </tr>
                    ))};

                </tbody>
            </table>
        </div>

        //list of students HTML

    );
};

export default TutorialsList;



