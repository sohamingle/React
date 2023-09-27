import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Modal = ({open,onClose}) => {

    

    const [overlayForm,setOverlayForm] = useState({
        name: '',
        type:'',
        value: '',
        position_x:0,
        position_y:0,
        width:0,
        height:0
    })

    const handleChange =(e)=>{
        setOverlayForm({
          ...overlayForm,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await axios.post('https://flask-project-0b59.onrender.com/post',overlayForm)
            toast.success('Created Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }finally{
            onClose()
            setOverlayForm({
                name: '',
                type:'',
                value: '',
                position_x:0,
                position_y:0,
                width:0,
                height:0
            })
        }
        
        
    }

    return (
        <dialog open={open} className="modal">
            <div className="modal-box">
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg text-white">Add New Overlay</h3>
                <div className="modal-action">
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-y-6'>
                        <div className='flex items-center gap-x-8'>
                        <label className='flex text-white flex-col' htmlFor="name">
                            Name
                        <input 
                        type="text" 
                        name="name" 
                        id='name'
                        value={overlayForm.name} 
                        onChange={handleChange}
                        required
                        placeholder='Name'
                        className='input bg-white text-black'
                        />
                        </label>
                        <label className='flex text-white flex-col' htmlFor="type">
                            Type
                        <select className='select bg-white text-black' id='type' type="text" name="type" placeholder='Select type' value={overlayForm.type} required onChange={handleChange}>
                            <option disabled value="">Select Type</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                        </select>
                        </label>
                        </div>
                        {overlayForm.type === 'image' &&
                        <label className='flex text-white flex-col' htmlFor="value">
                            Image Url
                        <input 
                        type="text" 
                        name="value" 
                        id='value'
                        placeholder='Url'
                        value={overlayForm.value} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        required
                        />
                        </label>}
                        {overlayForm.type === 'text' &&
                        <label className='flex text-white flex-col' htmlFor="value">
                            Text
                        <input 
                        type="text" 
                        name="value" 
                        id='value'
                        placeholder='Text'
                        value={overlayForm.value} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        required
                        />
                        </label>}
                        
                        <div className='flex items-center gap-x-8'>
                        <label className='flex text-white flex-col' htmlFor="position_x">
                            Position x-axis
                        <input 
                        type="number" 
                        name="position_x" 
                        id='position_x'
                        value={overlayForm.position_x} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        />
                        </label>
                        <label className='flex text-white flex-col' htmlFor="position_y">
                            Position y-axis
                        <input 
                        type="number" 
                        name="position_y" 
                        id='position_y'
                        value={overlayForm.position_y} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        />
                        </label>
                        </div>
                        <div className='flex items-center gap-x-8'>
                        <label className='flex text-white flex-col' htmlFor="width">
                            Width
                        <input 
                        type="number" 
                        name="width" 
                        id='width'
                        value={overlayForm.width} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        required
                        />
                        </label>
                        <label className='flex text-white flex-col' htmlFor="height">
                            Height
                        <input 
                        type="number" 
                        name="height" 
                        id='height'
                        value={overlayForm.height} 
                        onChange={handleChange}
                        className='input bg-white text-black'
                        />
                        </label>
                        </div>
                        <button type='submit' className="btn btn-success text-white">Add Overlay</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal