import React, { useState } from 'react'
import InputField from '../InputField'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function ModalAdd({isOpen, setIsOpen, fetch}) {
    const [nameValue, setNameValue] = useState('')
    const [firstValue, setFirstValue] = useState('')
    const [secondValue, setSecondValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [emailValue, setEmailValue] = useState('')

    const postData = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user`, {
                username : nameValue,
                firstname : firstValue,
                lastname : secondValue,
                password : passwordValue,
                email : emailValue 
            })
            if (response.status === 200) {
                Swal.fire({
                    text: 'Data Berhasil Di Tambahkan',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                setIsOpen(false)
                setNameValue('')
                setFirstValue('')
                setSecondValue('')
                setPasswordValue('')
                setEmailValue('')
                fetch()
            }
        } catch (error) {
            alert(error)
        }
    }

    const btnSubmit = () => {
        postData()
    }

    return (
        <div className={`modals ${isOpen ? 'flex absolute' : 'hidden'} w-full h-screen justify-center items-center `}>
            <div className='h-max w-[400px] bg-white rounded flex flex-col'>
                <p 
                    className='my-4 mx-4 font-bold'>
                        Create User
                </p>
                <div className='mx-4 mt-3 mb-10 flex flex-col gap-5'>
                    <InputField 
                        title="Name :"
                        value={nameValue}
                        setValue={setNameValue}
                    />
                    <InputField 
                        title="First Name :"
                        value={firstValue}
                        setValue={setFirstValue}
                    />
                    <InputField 
                        title="Second Name :"
                        value={secondValue}
                        setValue={setSecondValue}
                    />
                    <InputField 
                        title="Password :"
                        value={passwordValue}
                        setValue={setPasswordValue}
                    />
                    <InputField 
                        title="Email :"
                        value={emailValue}
                        setValue={setEmailValue}
                    />
                    <div className='flex items-center justify-end gap-4'>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className='w-20 bg-red-500 h-9 rounded text-white text-sm hover:bg-red-600'>
                            Cancel
                        </button>
                        <button 
                            onClick={btnSubmit}
                            className='w-20 bg-blue-500 h-9 rounded text-white text-sm hover:bg-blue-600'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
