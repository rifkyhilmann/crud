import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faAdd, faPen } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import ModalAdd from '../components/ModalsAdd'
import ModalUpdate from '../components/ModalsUpdate'
import Swal from 'sweetalert2'

Modal.setAppElement('#root');

export default function Pages() {
    const [data, setData] = useState([])
    const [modalAdd, setModalAdd] = useState(false)
    const [modalUpdate, setModaUpdate] = useState(false)
    const [idUpdate, setIdUpdate] = useState('')
    const [search, setSearch] = useState('');

    const filteredData = data.filter(row =>
        row.username.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }  

    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`)
            setData(response.data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const updateClick = (id) => {
        setIdUpdate(id)
        setModaUpdate(true)
    }

    const fetchData = () => {
        getData()
    }

    const btnDelete = (id) => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/${id}`)
                if (response.status === 200) {
                    Swal.fire({
                        text: 'Data Berhasil Di Hapus',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    getData()
                }
            } catch (error) {
                alert(error)
            }
        }
        fetchDelete()
    }

    const columns = [
        {
            name : 'Id',
            selector : (row, index) => index + 1,
            sortable : true,
        },
        {
            name : "Name",
            selector : (row) => row.username,
            sortable : true, 
        },
        {
            name : "First Name",
            selector : (row) => row.firstname,
            sortable : true, 
        },
        {
            name : "Last Name",
            selector : (row) => row.lastname,
            sortable : true, 
        },
        {
            name : "Password",
            selector : (row) => row.password,
            sortable : true, 
        },
        {
            name : "Email",
            selector : (row) => row.email,
            sortable : true, 
        },
        {
            name : "Aksi",
            cell : (row) => (
                <div className='flex items-center gap-2'>
                    <button
                        className='py-2 px-3 bg-green-500 text-white rounded hover:bg-green-600'
                        onClick={() => updateClick(row.id)}
                    >
                        <FontAwesomeIcon 
                            icon={faPen}
                            className=''
                        />
                    </button>
                    <button
                        onClick={() => btnDelete(row.id)}
                        className='py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'
                    >
                        <FontAwesomeIcon 
                            icon={faTrash}
                            className=''
                        />
                    </button>
                </div>
            )
        }
    ]

    return (
        <div className='h-screen w-full  flex  justify-center font-poppins relative'>
            <div className='flex flex-col w-[90%] h-max mt-20 '>
                <div className='h-10 w-full flex justify-between mb-10'>
                    <input 
                        type="text" 
                        className='w-64 rounded indent-3 text-sm focus:outline-none border'
                        placeholder='Search Name...'
                        value={search}
                        onChange={handleSearch}
                    />
                    <button
                        onClick={() => setModalAdd(true)}
                        className='h-full px-10 bg-blue-500 rounded text-white text-sm hover:bg-blue-600'                    
                    >
                        Tambah Data
                    </button>
                </div>
                <DataTable 
                    columns={columns}
                    data={filteredData}
                    pagination
                />
            </div>
            <ModalAdd 
                isOpen={modalAdd}
                setIsOpen={setModalAdd}
                fetch={fetchData}
            />
            <ModalUpdate 
                id={idUpdate}
                isOpen={modalUpdate}
                setIsOpen={setModaUpdate}
                fetch={fetchData}
            />
        </div>
    )
}
