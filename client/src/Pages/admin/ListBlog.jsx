import React, { useState, useEffect } from 'react'
import BlogTableItem from '../../Components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {

  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } 
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  const [blogs, setBlogs] = useState([]);

  const togglePublish = async (id) => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-8 sm:px-12 bg-blue-50/50 min-h-screen overflow-y-auto">
      <p className="text-xs sm:text-sm font-medium text-gray-700 mb-4">All Blogs</p>

      <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden max-w-4xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-white text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                <th className="px-6 py-4 w-12 text-gray-400 font-semibold">#</th>
                <th className="px-4 py-4 text-gray-400 font-semibold">BLOG TITLE</th>
                <th className="px-4 py-4 text-gray-400 font-semibold">DATE</th>
                <th className="px-4 py-4 text-gray-400 font-semibold">STATUS</th>
                <th className="px-4 py-4 text-gray-400 font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  togglePublish={togglePublish}
                  deleteBlog={deleteBlog}
                />
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListBlog