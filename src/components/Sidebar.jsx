import React from 'react';
import { 
  LayoutDashboard, ClipboardList, Package, 
  ArrowDownCircle, ArrowUpCircle, ClipboardCheck, 
  BarChart4, FileSearch, Filter, Settings 
} from 'lucide-react';

export default function Sidebar() {
  const menuGroups = [
    {
      title: "Hệ thống",
      items: [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
        { name: "Nhiệm vụ", icon: <ClipboardList size={18} /> },
        { name: "Sản phẩm", icon: <Package size={18} /> },
      ]
    },
    {
      title: "Quản lý kho",
      items: [
        { name: "Nhập hàng", icon: <ArrowDownCircle size={18} /> },
        { name: "Xuất hàng", icon: <ArrowUpCircle size={18} /> },
        { name: "Kiểm hàng", icon: <ClipboardCheck size={18} /> },
      ]
    },
    {
      title: "Công cụ & Báo cáo",
      items: [
        { name: "Báo cáo hàng", icon: <BarChart4 size={18} /> },
        { name: "Tra mã chéo", icon: <FileSearch size={18} /> },
        { name: "Lọc thông tin", icon: <Filter size={18} /> },
        { name: "Cài đặt", icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <h1 className="text-lg font-black text-blue-700 uppercase tracking-wider">AutoParts WMS</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {menuGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h2 className="px-6 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{group.title}</h2>
            <ul>
              {group.items.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                      item.active ? 'text-blue-700 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}>
                    {item.icon} {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
