'use strict';

function fuzzyMatch(skills, query) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);

  return skills
    .map(skill => {
      let score = 0;
      const name = skill.name.toLowerCase();
      const cat = skill.category.toLowerCase();
      const desc = (skill.description || '').toLowerCase();

      if (name === q) score += 10;

      for (const word of words) {
        if (name.includes(word)) score += 3;
        if (cat.includes(word)) score += 2;
        if (desc.includes(word)) score += 1;
      }
      return { skill, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.skill);
}

function resolveSkill(skills, name) {
  const q = name.toLowerCase();
  const exact = skills.find(s => s.name === q || s.id === q);
  if (exact) return { match: exact, ambiguous: false };

  const subs = skills.filter(s =>
    s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  );
  if (subs.length === 1) return { match: subs[0], ambiguous: false };
  if (subs.length > 1) return { matches: subs, ambiguous: true };

  return { match: null, ambiguous: false };
}

module.exports = { fuzzyMatch, resolveSkill };
