import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { fetchAdminUsers, updateUser, deleteUser } from '../../services/adminService'

const AdminUsersPage = () => {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const load = async () => {
    const res = await fetchAdminUsers(token)
    if (res.success) setUsers(res.users)
  }

  useEffect(() => {
    if (token) load()
  }, [token])

  const toggleBlock = async (user) => {
    await updateUser(user._id, { isBlocked: !user.isBlocked }, token)
    load()
  }

  const changeRole = async (user, role) => {
    await updateUser(user._id, { role }, token)
    load()
  }

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Delete ${user.fullName || 'this user'}?`)
    if (!confirmed) return
    await deleteUser(user._id, token)
    load()
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-slate-100">
                <td className="py-2">{u.fullName}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u, e.target.value)}
                    className="border border-slate-200 rounded-lg px-2 py-1 text-xs"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                  </select>
                </td>
                <td>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.isBlocked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {u.isBlocked ? 'blocked' : 'active'}
                  </span>
                </td>
                <td className="text-right space-x-3">
                  <button className="text-xs text-slate-600 hover:text-slate-900" onClick={() => setSelectedUser(u)}>
                    View
                  </button>
                  <button className="text-xs text-red-600" onClick={() => toggleBlock(u)}>
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button className="text-xs text-red-600" onClick={() => handleDelete(u)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-slate-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold">User Details</h4>
              <button className="text-slate-400 hover:text-slate-700" onClick={() => setSelectedUser(null)}>
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase text-slate-400 font-bold">Name</p>
                <p className="text-slate-700 font-medium">{selectedUser.fullName || '-'}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 font-bold">Email</p>
                <p className="text-slate-700 font-medium">{selectedUser.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 font-bold">Role</p>
                <p className="text-slate-700 font-medium">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 font-bold">Status</p>
                <p className="text-slate-700 font-medium">{selectedUser.isBlocked ? 'blocked' : 'active'}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="text-xs font-semibold text-slate-600" onClick={() => setSelectedUser(null)}>
                Close
              </button>
              <button className="text-xs font-semibold text-red-600" onClick={() => handleDelete(selectedUser)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsersPage
