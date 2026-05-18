const fs = require('fs');

let content = fs.readFileSync('app/cars/[id]/CarDetailClient.tsx', 'utf8');

// Replace multi-line template literals in className
content = content.replace(/className=\{`([^`]+)\$\{([^}]+)\s\?\s"([^"]+)"\s:\s"([^"]+)"\}([^`]*)`\}/g, (match, p1, p2, p3, p4, p5) => {
  const base = p1.trim();
  const cond = p2.trim();
  const dark = p3.trim();
  const light = p4.trim();
  const extra = p5.trim();
  return `className={${cond} ? "${base} ${dark}${extra}" : "${base} ${light}${extra}"}`;
});

// Replace single-line template literals in className
content = content.replace(/className=\{`([^`]+)\$\{([^}]+)\s\?\s"([^"]+)"\s:\s"([^"]+)"`\}/g, (match, p1, p2, p3, p4) => {
  const base = p1.trim();
  const cond = p2.trim();
  const dark = p3.trim();
  const light = p4.trim();
  return `className={${cond} ? "${base} ${dark}" : "${base} ${light}"}`;
});

// Replace template literals in other attributes
content = content.replace(/className=\{`([^`]+)\$\{([^}]+)\s\?\s"([^"]+)"\s:\s"([^"]+)"\}([^`]*)`\}/g, (match, p1, p2, p3, p4, p5) => {
  const base = p1.trim();
  const cond = p2.trim();
  const dark = p3.trim();
  const light = p4.trim();
  const extra = p5.trim();
  return `className={${cond} ? "${base} ${dark}${extra}" : "${base} ${light}${extra}"}`;
});

fs.writeFileSync('app/cars/[id]/CarDetailClient.tsx', content, 'utf8');
console.log('Fixed all template literals');
