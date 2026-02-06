export function getBestFor(tool) {
  if (tool.bestFor && tool.bestFor.length > 0) {
    return tool.bestFor;
  }

  const categoryMap = {
    "Automation": [
      "Developers",
      "Business Teams",
      "No-code Users"
    ],
    "Design": [
      "Designers",
      "Content Creators",
      "Marketing Teams"
    ],
    "Code": [
      "Developers",
      "Backend Engineers",
      "Frontend Engineers"
    ],
    "Writing": [
      "Content Creators",
      "Bloggers",
      "Marketing Teams"
    ],
    "Productivity": [
      "Professionals",
      "Freelancers",
      "Startup Teams"
    ]
  };

  return categoryMap[tool.category] || ["General Users"];
}

export function getUseCases(tool) {
  if (tool.useCases && tool.useCases.length > 0) {
    return tool.useCases;
  }

  const baseCases = {
    "Automation": [
      "Automate repetitive tasks",
      "Connect multiple apps and services",
      "Save time using AI-powered workflows"
    ],
    "Design": [
      "Create visual assets using AI",
      "Improve design workflows",
      "Generate creative ideas faster"
    ],
    "Code": [
      "Write and refactor code faster",
      "Debug and understand complex logic",
      "Improve developer productivity"
    ],
    "Writing": [
      "Generate content ideas",
      "Write blogs, emails, and copy",
      "Improve writing quality using AI"
    ],
    "Productivity": [
      "Organize work more efficiently",
      "Reduce manual effort",
      "Improve daily productivity"
    ]
  };

  return baseCases[tool.category] || [
    "Explore AI-powered features",
    "Improve workflow efficiency"
  ];
}


export function getAlternatives(currentTool, allTools) {
  if (!currentTool || !allTools) return [];

  return allTools
    .filter(
      t =>
        t.category === currentTool.category &&
        t.slug !== currentTool.slug
    )
    .slice(0, 6);
}

