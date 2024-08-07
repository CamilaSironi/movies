/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Table, notification} from "antd";
import {useEffect, useRef, useState} from "react";
import AddNew from "./AddNew";
import RateModal from "./RateModal";

const URL= 'https://movies-black-ten.vercel.app/api/v1/movies';

function MainView() {

    const [data, setData] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isRateModalOpen, setIsRateModalOpen] = useState(false);

    const [isToastOpen, setIsToastOpen] = useState(false);

    const [key, setKey] = useState();

    const useFirstRender = () => {
        const firstRender = useRef(true);
      
        useEffect(() => {
          firstRender.current = false;
        }, []);
      
        return firstRender.current;
    }

    const firstRender = useFirstRender();

    const getMovies = async () => {
        try {
            const res = await fetch(URL);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            const movies = await res.json();
            setData(() =>
                movies.data
                /*data.map((item) => ({
                  ...item,
                  key: movies.data.id
                }))*/
            ) 

        } catch (error) {
            console.error(error.message);
        }
    }
      
    const showToast = () => {
        notification.open({
            message: 'Warning',
            description: 'An error ocurred while processing your request'
        });
    }

    useEffect(() => {
        getMovies()
    }, [data])

    useEffect(() => {
        if(!firstRender){
            showToast()
        }
    }, [isToastOpen])
      
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseYear',
            key: 'releaseYear',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Rate Average',
            dataIndex: ['rateAverage','voteCount'],
            key: '_id',
            render: (_,{rateAverage, voteCount}) => (
                <p>{rateAverage} ({voteCount})</p>
            ) 
        },
        { 
            title: 'Action', 
            dataIndex: '_id', 
            key: '_id', 
            render: (key) => (
                    <Button id={key} onClick={showRateModal} type="primary">Add Rate</Button>
            ) 
        }
    ]
        
    if(!data ){
        return(
            <>
                Loading...
            </>
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const showRateModal = (e) => {
        console.log(e.target.id);
        setKey(e.target.id);
        setIsRateModalOpen(true);
    }

    return(
        <>
            <h2>List of Movies</h2>
            {data && <Table dataSource={data} columns={columns} />}
            <Button onClick={showModal}>Add new</Button>
            <AddNew isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} url={URL} setIsToastOpen={setIsToastOpen}/>
            <RateModal isRateModalOpen={isRateModalOpen} setIsRateModalOpen={setIsRateModalOpen} id={key}/>
        </>
    )

}

export default MainView
