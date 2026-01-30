import { Home, Dumbbell, Utensils, User } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "workout", icon: Dumbbell, label: "Workout" },
    { id: "nutrition", icon: Utensils, label: "Nutrition" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300
              ${activeTab === id 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className={`
              p-2 rounded-xl transition-all duration-300
              ${activeTab === id ? 'bg-primary/20 glow-volt' : ''}
            `}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
