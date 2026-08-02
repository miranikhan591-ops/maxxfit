import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface NewRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewRoutineModal: React.FC<NewRoutineModalProps> = ({ isOpen, onClose }) => {
  const { addNewRoutine, setActiveRoutineId, setCurrentView } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Strength' | 'Powerlifting' | 'High Intensity' | 'Recovery'>('Strength');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [volume, setVolume] = useState<'Low' | 'Medium' | 'High' | 'Maxx'>('High');
  const [bgImage, setBgImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCUDwWqrDPX_0kOqFSpKwImVIp8RpeeNLZCctn_xJObNGSgHSOahnZcU7xoa-U4Uz5jmynvbeRgLmKnSKplKjYtVAt4wvlA5d6fB5JlHzxvqgpX7voP3tgOerC3Pl-Rnhf3JVgN-_zgRj5JjCotgdk9-B7XmocYtRfExvUXRRk7VuEgoIm2XJlsKw639rMfrUPbsAag1VBPJkc1Mqlnu0ViAPXDLf5Uej051sod5z1EZ8FAUZc-F3Ta');
  const [firstExName, setFirstExName] = useState('Barbell Squat');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newRoutineId = addNewRoutine({
      title,
      category,
      weekInfo: 'Custom Protocol / Member Defined',
      description: description || 'Custom performance routine.',
      bgImage,
      badge: category,
      badgeType: category === 'High Intensity' ? 'primary' : category === 'Powerlifting' ? 'cyan' : 'secondary',
      durationMinutes: Number(durationMinutes) || 45,
      volume,
      exercises: [
        {
          id: `ex_${Date.now()}_1`,
          name: firstExName || 'Primary Exercise',
          notes: 'Focus on full range of motion.',
          targetSets: 3,
          sets: [
            { id: `set_${Date.now()}_1`, setNumber: 1, weightLbs: 135, reps: 10, completed: false },
            { id: `set_${Date.now()}_2`, setNumber: 2, weightLbs: 155, reps: 8, completed: false },
            { id: `set_${Date.now()}_3`, setNumber: 3, weightLbs: 175, reps: 6, completed: false },
          ],
        },
      ],
    });

    setActiveRoutineId(newRoutineId);
    setCurrentView('routine_detail');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1a1a1a] border border-[#353535] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b border-[#353535] pb-3">
          <h2 className="font-headline font-black text-2xl text-white italic uppercase">
            Build Custom Protocol
          </h2>
          <button onClick={onClose} className="text-[#c4c9ac] hover:text-white cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
              Routine Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Back & Biceps Overload"
              className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-sm text-white focus:border-[#c3f400] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-sm text-white focus:border-[#c3f400] focus:outline-none"
              >
                <option value="Strength">Strength</option>
                <option value="High Intensity">High Intensity</option>
                <option value="Powerlifting">Powerlifting</option>
                <option value="Recovery">Recovery</option>
              </select>
            </div>

            <div>
              <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-sm text-white focus:border-[#c3f400] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
              Description / Goal
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Primary hypertrophy and structural density focus."
              rows={2}
              className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-sm text-white focus:border-[#c3f400] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
              First Exercise
            </label>
            <input
              type="text"
              value={firstExName}
              onChange={(e) => setFirstExName(e.target.value)}
              placeholder="e.g., Heavy Barbell Row"
              className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-sm text-white focus:border-[#c3f400] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="font-label-caps text-xs text-[#c4c9ac] uppercase block mb-1">
              Background Cover Image URL
            </label>
            <input
              type="text"
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#353535] p-3 text-xs text-white focus:border-[#c3f400] focus:outline-none truncate"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#353535]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-[#353535] font-label-caps text-xs text-[#c4c9ac] uppercase hover:bg-[#353535]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#c3f400] text-[#161e00] font-label-caps text-xs font-black uppercase tracking-wider hover:bg-[#abd600] neon-glow"
            >
              Create Protocol & Launch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
