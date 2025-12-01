import React from 'react'
import Card from './Card'
import CategoryChip from './CategoryChip'

export default function CategoriesCard({ categories = [], activeCategoryId, onSelect }) {
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: 0 }}>
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
              active={!activeCategoryId}
              onClick={() => onSelect(null)}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.categoryId || c.name}
                name={c.name}
                active={activeCategoryId === c.categoryId}
                onClick={() => onSelect(c.categoryId)}
              />
            ))}
          </>
        )}
      </div>
    </Card>
  )
}
