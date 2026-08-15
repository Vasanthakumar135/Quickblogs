import React from "react";
import { assets } from "../../assets/assets";

const BlogTableItem = ({ blog, index, togglePublish, deleteBlog }) => {
  const { _id, title, date, createdAt, isPublished } = blog;

  const formatDate = (dateStr) => {
    if (!dateStr) return "24th July, 2024";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "24th July, 2024";
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "long" });
    const year = d.getFullYear();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
            ? "rd"
            : "th";
    return `${day}${suffix} ${month}, ${year}`;
  };

  const displayDate = date || formatDate(createdAt);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 text-xs text-gray-500 font-normal">{index}</td>
      <td className="px-4 py-4 text-xs sm:text-sm text-gray-700 font-medium">
        {title}
      </td>
      <td className="px-4 py-4 text-xs text-gray-500 font-normal whitespace-nowrap">
        {displayDate}
      </td>
      <td
        className={`px-4 py-4 text-xs font-semibold ${isPublished ? "text-emerald-500" : "text-amber-500"}`}
      >
        {isPublished ? "Published" : "Unpublished"}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => togglePublish(_id)}
            className="text-xs px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <img
            onClick={() => deleteBlog(_id)}
            src={assets.cross_icon}
            alt="delete"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
