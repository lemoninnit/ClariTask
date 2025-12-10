// import React, { useState } from 'react'
// import Card from './Card'
// import CategoryChip from './CategoryChip'
// import Button from './Button'
// import { Plus } from 'lucide-react'
// import { deleteCategory } from '../api/categories'

// export default function CategoriesCard({ categories = [], activeCategoryId, onSelect, onAddCategory, onCategoryDeleted }) {
//   const [newCategoryName, setNewCategoryName] = useState('')
//   const [adding, setAdding] = useState(false)

//   const handleAdd = async (e) => {
//     e.preventDefault()
//     if (!newCategoryName.trim()) return
//     setAdding(true)
//     try {
//       await onAddCategory(newCategoryName.trim())
//       setNewCategoryName('')
//     } catch (error) {
//       console.error('Failed to add category:', error)
//     } finally {
//       setAdding(false)
//     }
//   }

//   const handleDelete = async (categoryId) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return
//     try {
//       await deleteCategory(categoryId)
//       if (onCategoryDeleted) {
//         onCategoryDeleted(categoryId)
//       }
//     } catch (error) {
//       console.error('Failed to delete category:', error)
//       alert('Failed to delete category')
//     }
//   }

//   return (
//     <Card
//       title="Categories"
//       right={
//         <span
//           style={{
//             background: '#f1f5f9',
//             color: '#475569',
//             padding: '4px 12px',
//             borderRadius: 12,
//             fontSize: 14,
//             fontWeight: 600,
//           }}
//         >
//           {categories.length}
//         </span>
//       }
//     >
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
//         {categories.length === 0 ? (
//           <div
//             style={{
//               width: '100%',
//               textAlign: 'center',
//               padding: 24,
//               color: '#94a3b8',
//               fontSize: 14,
//             }}
//           >
//             No categories yet.
//           </div>
//         ) : (
//           <>
//             <CategoryChip
//               key="all"
//               name="All"
//               active={!activeCategoryId}
//               onClick={() => onSelect(null)}
//             />
//             {categories.map((c) => (
//               <CategoryChip
//                 key={c.categoryId || c.name}
//                 name={c.name}
//                 active={activeCategoryId === c.categoryId}
//                 onClick={() => onSelect(c.categoryId)}
//                 onDelete={handleDelete}
//                 categoryId={c.categoryId}
//               />
//             ))}
//           </>
//         )}
//       </div>

//       <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8 }}>
//         <input
//           type="text"
//           value={newCategoryName}
//           onChange={(e) => setNewCategoryName(e.target.value)}
//           placeholder="New category..."
//           style={{
//             flex: 1,
//             padding: '8px 12px',
//             border: '1px solid #e5e7eb',
//             borderRadius: 8,
//             fontSize: 14,
//             transition: 'all 0.2s'
//           }}
//           onFocus={(e) => e.target.style.borderColor = '#3f5d2a'}
//           onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
//         />
//         <Button 
//           type="submit" 
//           disabled={adding || !newCategoryName.trim()}
//           style={{ padding: '8px 16px', fontSize: '14px', minWidth: 'auto' }}
//         >
//           <Plus size={16} style={{ marginRight: '4px' }} /> Add
//         </Button>
//       </form>
//     </Card>
//   )
// }

import React, { useState } from 'react'
import Card from './Card'
import CategoryChip from './CategoryChip'
import Button from './Button'
import { Plus } from 'lucide-react'
import { deleteCategory } from '../api/categories'

export default function CategoriesCard({ categories = [], activeCategoryId, onSelect, onAddCategory, onCategoryDeleted }) {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return
    setAdding(true)
    try {
      await onAddCategory(newCategoryName.trim())
      setNewCategoryName('')
    } catch (error) {
      console.error('Failed to add category:', error)
      // Error is handled by parent component (Dashboard)
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? All tasks in this category will be uncategorized.')) return
    try {
      await deleteCategory(categoryId)
      if (onCategoryDeleted) {
        onCategoryDeleted(categoryId)
      }
    } catch (error) {
      console.error('Failed to delete category:', error)
      const errorMessage = error.message || error.response?.data?.message || 'Failed to delete category'
      alert(errorMessage)
    }
  }

  // helper to normalize id to string|null for safe comparison
  const normalizeId = (id) => id != null ? String(id) : null
  const activeIdStr = normalizeId(activeCategoryId)

  return (
    <Card
      title="Categories"
      right={
        <span
          style={{
            background: '#f1f5f9',
            color: '#475569',
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {categories.length}
        </span>
      }
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {categories.length === 0 ? (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: 24,
              color: '#94a3b8',
              fontSize: 14,
            }}
          >
            No categories yet.
          </div>
        ) : (
          <>
            <CategoryChip
              key="all"
              name="All"
              active={!activeIdStr}
              onClick={() => onSelect(null)}
            />
            {categories.map((c) => {
              const idStr = normalizeId(c.categoryId)
              return (
                <CategoryChip
                  key={idStr || c.name}
                  name={c.name}
                  active={activeIdStr === idStr}
                  onClick={() => onSelect(idStr)}
                  onDelete={() => handleDelete(c.categoryId)}
                  categoryId={c.categoryId}
                />
              )
            })}
          </>
        )}
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            fontSize: 14,
            transition: 'all 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3f5d2a'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        <Button 
          type="submit" 
          disabled={adding || !newCategoryName.trim()}
          style={{ padding: '8px 16px', fontSize: '14px', minWidth: 'auto' }}
        >
          <Plus size={16} style={{ marginRight: '4px' }} /> Add
        </Button>
      </form>
    </Card>
  )
}
