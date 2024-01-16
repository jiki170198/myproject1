import http from "./http-common";
import axios from "axios";

const getAll = () => {
    //call API to get JSON from db.json
    return http.get("/students");
};

const createNewTutorial = (data) => {
    // alert("Called");
    return http.post("/students", data);
};

const TutorialService = {
    getAll,
    createNewTutorial
};

export default TutorialService;

