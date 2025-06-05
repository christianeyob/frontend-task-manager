'use client';

import React, { useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

const initialTasks: Task[] = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true },
];

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTask = () => {
    const title = newTask.trim();
    
    // Validation
    if (!title) {
      setError('Task title cannot be empty');
      return;
    }
    if (title.length < 3) {
      setError('Task title must be at least 3 characters');
      return;
    }
    if (tasks.some(task => task.title.toLowerCase() === title.toLowerCase())) {
      setError('Task already exists');
      return;
    }
    
    const newTaskItem: Task = {
      id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title,
      completed: false,
    };

    setTasks([newTaskItem, ...tasks]);
    setNewTask('');
    setError('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Tasks</h1>
          
          {/* Add Task Form */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className={`flex-1 rounded-lg border text-gray-600 ${
                  error ? 'border-red-300' : 'border-gray-200'
                } px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
                  error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                } focus:border-transparent`}
              />
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 border-b pb-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors ${
                  task.completed ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded border ${
                    task.completed
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  } flex items-center justify-center flex-shrink-0 transition-colors`}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                {tasks.length === 0
                  ? 'No tasks yet. Add one above!'
                  : `No ${filter === 'completed' ? 'completed' : 'active'} tasks`}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
