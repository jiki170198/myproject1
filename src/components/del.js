import { useEffect, useState } from "react";
import TutorialDataService from "../services/TutorialService";
import React from 'react';
import axios from 'axios';

class Del extends React.Component {
    state = {
        name: 'Enter name',
        mark: 'Enter mark to update',
        students: [],
        foundobject: [],
        notice: ''
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    students: response.data,
                });
                // console.log(response.data);
            })
        // .catch(e => {
        //     console.log(e);
        // });
    };

    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleClickButton = () => {
        console.log(this.state.name)
        let foundObjectArray = [];
        // console.log(this.state.students)
        const { students, name, foundobject } = this.state; // Destructure students and name from state

        students && students.forEach((student) => {
            if (student.name === name) {
                console.log(student.name);
                console.log(student.id);
                console.log(student.mark);
                // this.setState({
                //     foundid: student.id,
                //     foundtitle: student.name,
                //     founddescription: student.mark
                // });
                let newObj = {
                    id: student.id,
                    name: student.name,
                    mark: student.mark
                };

                foundObjectArray.push(newObj);
            }
        });
        console.log(foundObjectArray);
        this.setState({
            foundobject: foundObjectArray
        })
    }

    handleDellButton = () => {

        this.setState({
            notice: ''
        });

        const { name, students } = this.state;
        let studentToDelete = null;

        students && students.forEach((student) => {
            if (student.name === name) {
                studentToDelete = student;
                if (studentToDelete) {
                    // Make a DELETE request to delete the student by id
                    axios.delete(`http://localhost:3000/students/${studentToDelete.id}`)
                        .then(response => {
                            console.log('Tutorial deleted successfully:', response.data);

                            this.setState({
                                notice: 'Delete successful'
                            });

                            // Update the state to reflect the deletion
                            this.setState(prevState => ({
                                students: prevState.students.filter(student => student.id !== studentToDelete.id),
                                foundobject: [] // Clear foundobject after deletion
                            }));
                        })
                        .catch(error => {
                            console.error('Error deleting student:', error);
                            this.setState({
                                notice: 'Error deleting student'
                            });
                        });
                } else {
                    console.log('Tutorial not found');
                    this.setState({
                        notice: 'Tutorial not found'
                    });
                }
            }
        });
    }

    render() {
        return (
            <>
                < div className='first'>
                    <input value={this.state.name} type="text"
                        onChange={(event) => this.handleOnChangeName(event)} />
                    serching for {this.state.name}
                </div >

                <div className='second'>
                    <button onClick={() => this.handleClickButton()}>Find</button>
                </div>

                <table className="table">
                    <tbody>
                        {this.state.foundobject.map((object, index) => (
                            <tr key={index}>
                                <td>{object.id}</td>
                                <td>{object.name}</td>
                                <td>{object.mark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='four'>
                    <button onClick={() => this.handleDellButton()}>Dell</button>
                </div>

                <div className='five'>
                    {this.state.notice}
                </div>
            </>


        )
    }
}

export default Del;