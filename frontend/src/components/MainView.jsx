import {Button, Table} from "antd";
import { useEffect, useState } from "react";
import AddNew from "./AddNew";
import RateModal from "./RateModal";

const URL= 'http://127.0.0.1:3000/api/v1/movies';

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
        
            const movies = await res.json();
            setData(movies.data);

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
        title: 'Action', 
        dataIndex: '_id', 
        key: '_id', 
        render: (key) => (
                <button id={key} onClick={showRateModal} type="primary">Add Rate</button>
          ) 
        }
    ];
      
      
    if(!data ){
        return(<>
            Loading...
        </>)
    }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showRateModal = (e) => {
    setKey(e.target.id);
    setIsRateModalOpen(true);
  };

    return(
        <>
            <h2>List of Movies</h2>
            {data && <Table dataSource={data} columns={columns} />}
            <Button onClick={showModal}>Add new</Button>
            <AddNew isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} url={URL}/>
            <RateModal isRateModalOpen={isRateModalOpen} setIsRateModalOpen={setIsRateModalOpen} id={key}/>
        </>
    )
}

export default MainView