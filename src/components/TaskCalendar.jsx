import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function TaskCalendar() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });
      if (data) setTasks(data);
    }
    fetchTasks();
  }, []);

  // Hàm đánh giá trạng thái màu sắc
  const getTaskStatusColor = (dueDate, status) => {
    if (status === 'Hoàn thành') return 'bg-green-100 text-green-700 border-green-200';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dueDate);
    
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'bg-red-100 text-red-700 border-red-300 font-bold'; // Quá hạn
    if (diffDays >= 0 && diffDays <= 2) return 'bg-yellow-100 text-yellow-700 border-yellow-300 font-bold'; // Sắp hết hạn (0-2 ngày)
    
    return 'bg-gray-50 text-gray-700 border-gray-200'; // Bình thường
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-bold text-gray-800 mb-4">Lịch & Nhiệm vụ</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có nhiệm vụ nào.</p>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-3 rounded-lg border-l-4 text-sm flex justify-between items-center transition-all ${getTaskStatusColor(task.due_date, task.status)}`}
            >
              <div>
                <p className="font-semibold">{task.name}</p>
                <p className="text-xs mt-1 opacity-80">Hạn: {new Date(task.due_date).toLocaleDateString('vi-VN')}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-md bg-white/50 border border-black/10">
                {task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
