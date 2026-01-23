'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

const STORAGE_KEY = 'migrastil-items';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface StoredData {
  items: string[];
  timestamp: number;
}

function getStoredItems(): string[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: StoredData = JSON.parse(stored);
    const now = Date.now();

    if (now - data.timestamp > ONE_DAY_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data.items;
  } catch {
    return null;
  }
}

function saveItems(items: string[]): void {
  if (typeof window === 'undefined') return;

  const data: StoredData = {
    items,
    timestamp: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function Home() {
  const [items, setItems] = useState<string[]>(['']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedItems = getStoredItems();
    if (storedItems && storedItems.length > 0) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, '');
      setItems(newItems);
      setCurrentIndex(index + 1);

      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleCopyAll = () => {
    const numberedText = items
      .map((item, index) => `${index + 1}. ${item}`)
      .filter(item => item.trim() !== `${items.indexOf('')}. ` && item.length > 3)
      .join('\n');

    navigator.clipboard.writeText(numberedText).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleDelete = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);

      setTimeout(() => {
        const focusIndex = index > 0 ? index - 1 : 0;
        inputRefs.current[focusIndex]?.focus();
      }, 0);
    } else {
      setItems(['']);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Numbered Link List
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Press Enter to create a new numbered item. Paste your links below.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 min-w-[2rem]">
                  {index + 1}.
                </span>
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="Paste link here..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white outline-none transition-all"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  title="Delete item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyAll}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Copy All
            </button>
            <button
              onClick={() => setItems([''])}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Tip: Press Enter after pasting each link to create the next numbered item.</p>
        </div>
      </div>
    </div>
  );
}
