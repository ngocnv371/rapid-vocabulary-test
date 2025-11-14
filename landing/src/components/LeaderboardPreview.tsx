
import React from 'react';
import { TrophyIcon } from './icons';

const leaderboardData = [
  { rank: 1, name: 'LexiMaster', score: 24580, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704d' },
  { rank: 2, name: 'WordNinja', score: 23100, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704e' },
  { rank: 3, name: 'VocabVixen', score: 22850, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704f' },
  { rank: 4, name: 'ThePro-fessor', score: 21500, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704a' },
  { rank: 5, name: 'SynonymSam', score: 20990, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704b' },
];

const LeaderboardPreview: React.FC = () => {
  return (
    <section id="leaderboard" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Climb the Ranks</h2>
          <p className="text-lg text-gray-400 mt-2">See how you stack up against the best.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg shadow-purple-900/30">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-yellow-400" />
              Top 5 Players
            </h3>
          </div>
          <ul className="divide-y divide-white/10">
            {leaderboardData.map((player, index) => (
              <li
                key={player.rank}
                className={`flex items-center justify-between p-4 transition-colors ${
                  index === 0 ? 'bg-purple-500/20' : ''
                } hover:bg-purple-500/10`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg w-6 text-center text-gray-400">{player.rank}</span>
                  <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full" />
                  <span className="font-medium text-white">{player.name}</span>
                </div>
                <span className="font-bold text-purple-400">{player.score.toLocaleString()} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
