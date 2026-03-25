import { useState, useEffect } from 'react';
import { Search, Plus, Folder, FileText, TrendingDown, TrendingUp, Clock, MoreVertical, Trash2, Edit2 } from 'lucide-react';

const CollectionCard = ({ collection, onDelete, onEdit }) => {
  const total = collection.aiGenerated + collection.authentic + collection.inconclusive;
  const aiPercent = total > 0 ? Math.round((collection.aiGenerated / total) * 100) : 0;

  return (
    <div className="glass-panel p-6 hover:shadow-xl hover:shadow-neon-blue/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-neon-blue/20 group-hover:bg-neon-blue/30 transition-all">
            <Folder className="w-5 h-5 text-neon-blue" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{collection.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{collection.fileCount} files • {new Date(collection.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(collection)} className="p-2 text-slate-400 hover:text-neon-cyan transition-colors hover:bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(collection.id)} className="p-2 text-slate-400 hover:text-rose-400 transition-colors hover:bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">AI Detected</span>
              <span className="font-semibold text-rose-400">{collection.aiGenerated}</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 transition-all" style={{ width: `${aiPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dark-700/50">
          <div>
            <p className="text-xs text-slate-400">Authentic</p>
            <p className="text-lg font-bold text-emerald-400">{collection.authentic}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Inconclusive</p>
            <p className="text-lg font-bold text-amber-400">{collection.inconclusive}</p>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2 px-3 rounded-lg bg-dark-900/50 hover:bg-dark-800 text-slate-300 hover:text-white text-sm font-medium transition-all">
        View Details
      </button>
    </div>
  );
};

const CaseManager = () => {
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading collections (in real app, fetch from backend)
    setTimeout(() => {
      setCollections([
        {
          id: '1',
          name: 'Social Media Batch - March 2026',
          fileCount: 12,
          aiGenerated: 3,
          authentic: 7,
          inconclusive: 2,
          createdAt: '2026-03-22',
        },
        {
          id: '2',
          name: 'News Article Screenshots',
          fileCount: 8,
          aiGenerated: 1,
          authentic: 6,
          inconclusive: 1,
          createdAt: '2026-03-24',
        },
        {
          id: '3',
          name: 'Profile Picture Verification',
          fileCount: 5,
          aiGenerated: 0,
          authentic: 5,
          inconclusive: 0,
          createdAt: '2026-03-20',
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'flagged') return matchesSearch && collection.aiGenerated > 0;
    if (filterBy === 'clean') return matchesSearch && collection.aiGenerated === 0;
    return matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter((c) => c.id !== id));
    }
  };

  const handleEdit = (collection) => {
    console.log('Edit collection:', collection);
  };

  const stats = {
    totalCollections: collections.length,
    totalFiles: collections.reduce((sum, c) => sum + c.fileCount, 0),
    totalFlagged: collections.reduce((sum, c) => sum + c.aiGenerated, 0),
    flagRate: collections.length > 0 ? Math.round((collections.reduce((sum, c) => sum + c.aiGenerated, 0) / collections.reduce((sum, c) => sum + c.fileCount, 0)) * 100) : 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-8 bg-gradient-to-br from-neon-blue/10 via-dark-800 to-neon-cyan/5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Collections</h2>
            <p className="text-slate-400">Organize and manage your media verification submissions</p>
          </div>
          <button className="btn-primary flex items-center gap-2 w-fit">
            <Plus className="w-5 h-5" />
            New Collection
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5">
          <p className="text-slate-400 text-sm mb-1">Total Collections</p>
          <p className="text-3xl font-bold">{stats.totalCollections}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-slate-400 text-sm mb-1">Files Submitted</p>
          <p className="text-3xl font-bold text-neon-blue">{stats.totalFiles}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-slate-400 text-sm mb-1">Flagged</p>
          <p className="text-3xl font-bold text-rose-400">{stats.totalFlagged}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-slate-400 text-sm mb-1">Flag Rate</p>
          <p className="text-3xl font-bold text-amber-400">{stats.flagRate}%</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search collections by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-10"
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="glass-input w-full md:w-48 appearance-none"
          >
            <option value="all">All Collections</option>
            <option value="flagged">Has Flagged Items</option>
            <option value="clean">All Clean</option>
          </select>
        </div>
      </div>

      {/* Collections Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-dark-700 border-t-neon-blue animate-spin mx-auto mb-3" />
            <p className="text-slate-400">Loading your collections...</p>
          </div>
        </div>
      ) : filteredCollections.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400 text-lg mb-4">No collections found</p>
          <button className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Your First Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseManager;
