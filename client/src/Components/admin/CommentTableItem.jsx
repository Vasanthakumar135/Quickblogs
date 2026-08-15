import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {
   const {blog, createdAt , _id} = comment;
   const BlogDate = new Date(createdAt)


   const {axios} = useAppContext();

   const approveComment = async () =>{
    try{
     const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
     if(data.success){
      toast.success(data.message)
      fetchComments();

     }else{
      toast.error(data.message)
     }
    }catch(error){
     toast.error(error.message)
    }
   }
   const deleteComment = async()=>{
    const confirm = window.confirm("Are you sure you want to delete this comment?")
    if(!confirm){
      return
    }
    try{
    const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
    if(data.success){
      toast.success(data.message)
      fetchComments()
    }else{
      toast.error(data.message)
    }
  }catch(error){
    toast.error(error.message)
  }
}
  return (
    <tr className='border-y border-gray-300'>
       <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog?.title || 'Untitled Blog'}
        <br/>
        <br/>
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br/>
        <b className='font-medium text-gray-600'>Comments</b> : {comment.content}
       </td>
       <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
       </td>
       <td className='px-6 py-4 flex items-center gap-3'>
        {!comment.isApproved ? (
          <img
            onClick={approveComment}
            src={assets.tick_icon}
            alt="Approve"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
          />
        ) : (
          <span className='text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded border border-emerald-200'>
            Approved
          </span>
        )}
        <img
          onClick={deleteComment}
          src={assets.bin_icon}
          alt="Delete"
          className='w-5 hover:scale-110 transition-all cursor-pointer'
        />
       </td>
    </tr>
  )
}

export default CommentTableItem
