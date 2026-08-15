import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  })

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const stats = [
    { label: 'Blogs',    value: dashboardData.blogs,    icon: assets.dashboard_icon_1 },
    { label: 'Comments', value: dashboardData.comments, icon: assets.dashboard_icon_2 },
    { label: 'Drafts',   value: dashboardData.drafts,   icon: assets.dashboard_icon_3 },
  ]

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return 'N/A'
    const day    = d.getDate()
    const month  = d.toLocaleString('en-US', { month: 'long' })
    const year   = d.getFullYear()
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th'
    return `${day}${suffix} ${month}, ${year}`
  }

  const togglePublish = async (id) => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id })
      if (data.success) {
        toast.success(data.message)
        fetchDashboard()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteBlog = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
    if (!confirm) return
    try {
      const { data } = await axios.post('/api/blog/delete', { id })
      if (data.success) {
        toast.success(data.message)
        fetchDashboard()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">

      {/* ── Stat Cards ── */}
      <div className="flex flex-wrap gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-6 py-4 min-w-40 shadow-sm"
          >
            <img src={stat.icon} alt={stat.label} className="w-10 h-10" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Latest Blogs Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
          <img src={assets.list_icon} alt="" className="w-6 h-6" />
          <h2 className="font-semibold text-gray-700 text-sm">Latest Blogs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left w-8">#</th>
                <th className="px-4 py-3 text-left">Blog Title</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentBlogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-3.5 text-gray-400 font-medium">{index + 1}</td>
                  <td className="px-4 py-3.5 text-gray-700 font-medium max-w-xs truncate">
                    {blog.title}
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`font-semibold text-xs ${
                        blog.isPublished ? 'text-green-500' : 'text-orange-400'
                      }`}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(blog._id)}
                        className="text-xs px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <img src={assets.cross_icon} alt="delete" className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {dashboardData.recentBlogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No blogs found.
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

export default Dashboard
