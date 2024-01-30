import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button,Dropdown } from 'react-bootstrap'
import { listSessions } from "../actions/sessionActions";
import { listMusics } from "../actions/musicActions";

const Search = () => {
    const [data, setData] = useState({
        session: "",
        search: "",
        searched: false
    });

    const pageNumber =  1

    const dispatch = useDispatch()

  const sessionList = useSelector((state) => state.sessionList)
  const {sessions } = sessionList


    const {session, search, searched } = data;

    useEffect(() => {
        dispatch(listSessions())
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
           dispatch(
            listMusics(search ||undefined,session,pageNumber)
           )
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const handleSessionChange =session => {
        setData({...data,session:session})
        dispatch(listMusics(search,session,pageNumber))
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={(e)=>handleSessionChange(e.target.value)
                            }
                        >
                            <option value="All">All</option>
                            {sessions?.map((s, i) => (
                                <option key={i} value={s._id}>
                                    {s.moduleName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Form.Control
                        type='text'
                        name='q'
                        onChange={handleChange("search")}
                        placeholder='Search Music...'
                        className='p-2'
                    ></Form.Control>
              
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
        </div>
    );
};

export default Search;