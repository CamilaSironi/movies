/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Table} from "antd";
import {useEffect, useState} from "react";
import AddNew from "./AddNew";
import RateModal from "./RateModal";
import { LoadingOutlined } from "@ant-design/icons";

const URL= 'https://movies-black-ten.vercel.app/api/v1/movies';

function MainView() {

    const [data, setData] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isRateModalOpen, setIsRateModalOpen] = useState(false);

    const [key, setKey] = useState();

    const getMovies = async () => {
        try {
            const res = await fetch(URL);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            console.log(res.status);
            const movies = await res.json()
            setData(() => movies.data)            

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getMovies()
    }, [])
      
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
            title: 'Actions', 
            dataIndex: '_id', 
            key: '_id', 
            render: (key) => (
                <>
                    <Button id={key} onClick={showRateModal} type="primary">Add Rate</Button>
                </>
            ) 
        }
    ]
        
    if(!data ){
        return(
            <>
                Loading <LoadingOutlined />
            </>
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const showRateModal = (e) => {
        setKey(e.currentTarget.id);
        setIsRateModalOpen(true);
    }

    return(
        <>  
            <h2>List of Movies</h2>
            {data && <Table rowKey={obj => obj._id} dataSource={data} columns={columns} />}
            <Button onClick={showModal}>Add new</Button>
            <AddNew isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} url={URL} />
            <RateModal isRateModalOpen={isRateModalOpen} setIsRateModalOpen={setIsRateModalOpen} id={key}/>
        </>
    )

}

export default MainView
