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

    handleOnChangeMark = (event) => {
        this.setState({
            mark: event.target.value,
        })
    }

    handleUpdateButton = () => {
        const { name, mark, students } = this.state;

        // Find the student with the given name
        const studentToUpdate = students.find(student => student.name === name);

        if (studentToUpdate) {
            // Make a PUT request to update the student's name and mark
            axios.put(`http://localhost:3000/students/${studentToUpdate.id}`, { name, mark })
                .then(response => {
                    console.log('Student updated successfully:', response.data);

                    this.setState({
                        notice: 'Update successful',
                        name: 'Enter name', // Reset the name input field
                        mark: 'Enter mark to update', // Reset the mark input field
                        foundobject: [] // Clear foundobject after update
                    });

                    // Update the state to reflect the name and mark update
                    this.setState(prevState => ({
                        students: prevState.students.map(student =>
                            student.id === studentToUpdate.id
                                ? { ...student, name: response.data.name, mark: response.data.mark }
                                : student
                        )
                    }));
                })
                .catch(error => {
                    console.error('Error updating student:', error);
                    this.setState({
                        notice: 'Error updating student'
                    });
                });
        } else {
            console.log('Student not found');
            this.setState({
                notice: 'Student not found'
            });
        }
    }


    render() {
        return (
            <>
                < div className='first'>
                    <input value={this.state.name} type="text"
                        onChange={(event) => this.handleOnChangeName(event)} />
                    serching for {this.state.name}
                </div >

                < div className='six'>
                    <input value={this.state.mark} type="text"
                        onChange={(event) => this.handleOnChangeMark(event)} />
                    udated mark: {this.state.mark}
                </div >

                <div className='seven'>
                    <button onClick={() => this.handleUpdateButton()}>Update</button>
                </div>

                <div className='five'>
                    {this.state.notice}
                </div>
            </>


        )
    }
}

export default Del;